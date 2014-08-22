Hull.component({
  templates: ['intro', 'question', 'finished', 'result', 'profile-form', 'header', 'footer', 'styles'],

  require: ['i18n'],

  refreshEvents: ['model.hull.me.change'],

  topLevelFields: ['email', 'picture', 'name', 'login', 'password'],

  defaultOptions: {
    sampleQuestions: false,
    autoStart: false,
    autoSubmit: false,
    autoNext: false,
    shuffleAnswers: true,
    questionTimer: 0,
    quizTimer: 0
  },

  datasources: {
    ship: function() {
      if (this.ship) {
        return this.ship;
      } else {
        if (this.options.shipId) {
          return this.api(this.options.shipId);
        } else {
          return this.api(this.sandbox.config.appId);
        }
      }
    }
  },


  events: {
    'submit form[data-action="profile"]': function(e) {
      e.preventDefault();
      var self = this;
      var formData = this.sandbox.dom.getFormData(e.target);
      this.updateCurrentUser(formData).then(function() {
        self.renderSection('profile');
      }, function(err) {
        alert(err.message);
      });
    }
  },

  actions: {

    answer: function(event, action) {
      var qRef = action.data.questionRef.toString(),
          aRef = action.data.answerRef.toString();
      this.selectAnswer(qRef, aRef);
    },

    submit: function(event, action) {
      this.finishQuiz();
    },

    next: function() {
      this.selectNextQuestion();
    },

    previous: function() {
      this.selectPreviousQuestion();
    },

    replay: function(event, action) {
      this.initState();
      this.startQuiz();
    },

    start: function(event, action) {
      if (this.loggedIn()) {
        this.startQuiz();
      } else if (action.data.provider) {
        var self = this;
        this.sandbox.login(action.data.provider).then(function() {
          self.startQuiz.call(self);
        });
      }

    }
  },

  helpers: {
    t: function(key, opts) {
      return I18n.t(key, opts);
    }
  },

  updateCurrentUser: function(attributes) {
    var topLevelFields = this.topLevelFields;

    function isTopLevelField(k) {
      return topLevelFields.indexOf(k) > -1;
    }

    var self = this,
      _ = this.sandbox.util._;
    if (this.loggedIn()) {
      var user = {
        extra: {}
      };
      _.map(attributes, function(v, k) {
        if (isTopLevelField(k)) {
          user[k] = v;
        } else {
          user.extra[k] = v;
        }
      });
      this.disableForm();
      var dfd = this.api.put('me', user);
      dfd.then(function() {
        self.enableForm();
      }, function() {
        self.enableForm();
      })
      return dfd;
    } else {
      return false;
    }
  },

  disableForm: function() {
    this.$('form fieldset').attr('disabled', true);
  },

  enableForm: function() {
    this.$('form fieldset').attr('disabled', false);
  },

  getForm: function(formName, user) {
    var self = this,
      _ = this.sandbox.util._,
      formConfig = this.ship.config[formName];
    if (!formConfig || !formConfig.form) {
      return {};
    };
    if (user) {
      var form = _.map(formConfig.form, function(field) {
        var f = _.clone(field);
        var k = f.name;
        f.id = _.uniqueId('profile-form-field-');
        if (user[k]) {
          f.value = user[k];
        } else if (user.extra && user.extra[k]) {
          f.value = user.extra[k];
        }
        return f;
      });
    }
    return form;
  },

  initialize: function() {
    var _ = this.sandbox.util._;
    if (this.options.editMode) {
      this.sandbox.on('ship.update', function(ship) {
        this.ship.config = ship.config;
        if (this.state) {
          this.state.options = this.getOptions();
          this.initTimer();
          this.renderSection(this.currentSection);
        }
      }, this);
    }
    this.$el.attr('id', this.cid);
    I18n.fallbacks = true;
    I18n.locale = this.options.locale || navigator.language;
  },

  renderSection: function(section, data) {
    console.warn("Rendering section", section, data);
    var _ = this.sandbox.util._;
    this.currentSection = section || this.currentSection || this.getTemplate();
    this.render(this.currentSection, data);
  },

  getTemplate: function(tpl) {
    var _ = this.sandbox.util._;
    if (!this.loggedIn()) {
      return 'intro';
    }
    if (!this.state.playing) {
      if (this.state.badge) {
        return 'result';
      } else if (_.values(this.state.answers).length > 0) {
        return 'finished';
      } else {
        return 'intro';
      }
    } else {
      return 'question';
    }
  },

  initState: function() {
    var _ = this.sandbox.util._;
    this.state = {
      options: this.getOptions(),
      playing: false,
      currentQuestionIndex: 0,
      answers: {}
    };
    this.state.questions = this.getQuestions();
    this.initTimer();
    return this.state;
  },

  initTimer: function() {
    this.state.timer = {
      countdowns: { question: this.getOption('questionTimer'), quiz: this.getOption('quizTimer') },
      timings: {},
      startedAt: new Date()
    };
  },

  getOptions: function() {
    var _ = this.sandbox.util._;
    var shipConfig = this.ship.config || {};
    return _.extend({}, this.defaultOptions, (shipConfig.quiz && shipConfig.quiz.options) || {}, shipConfig.options || {}, _.pick(this.options, _.keys(this.defaultOptions)));
  },

  // Rendering

  beforeRender: function(data) {
    var _ = this.sandbox.util._, shipConfig = data.ship.config || {};
    I18n.translations = data.ship.config.locales || {};
    data.styleNamespace = "#" + this.cid;
    this.ship = data.ship;
    this.quiz = data.quiz = data.quiz || data.ship.config.quiz || {};
    data._renderCount = this._renderCount;
    if (!this.state) this.initState();
    data.state = this.state;
    data.question = this.getCurrentQuestion();
    var socialProviders = (shipConfig.social && shipConfig.social.providers) || [];
    var authServices = _.intersection(this.authServices(), socialProviders);
    data.authServices = {};
    var loggedIn = this.loggedIn();
    _.map(authServices, function(provider) {
      data.authServices[provider] = {
        linked: loggedIn && loggedIn[provider]
      };
    });
    data.profileFormFields = this.getForm('profile', data.me);
  },

  getOption: function (key) {
    return this.state.options[key];
  },


  // Questions

  getQuestions: function() {
    var _ = this.sandbox.util._, self = this;
    var questions = (this.quiz.questions || []).slice(0);
    if (this.getOption('sampleQuestions') > 0) {
      questions = _.sample(questions, this.getOption('sampleQuestions'));
    }
    var questionsCount = questions.length
    return _.map(questions, function(q, i) {
      var index = i + 1
      if (self.getOption('shuffleAnswers')) {
        q.answers = _.shuffle(q.answers);
      }
      return _.extend(q, { pagination: {
        index: index,
        total: questions.length,
        next: (index < questionsCount),
        previous: (index > 1)
      } });
    });
  },

  getQuestion: function(idx) {
    return this.state.questions && this.state.questions[idx];
  },

  getCurrentQuestion: function() {
    return this.getQuestion(this.state.currentQuestionIndex);
  },

  getNextQuestion: function() {
    return this.getQuestion(this.state.currentQuestionIndex + 1);
  },

  getPreviousQuestion: function() {
    return this.getQuestion(this.state.currentQuestionIndex - 1);
  },

  // Quiz Lifecycle

  startQuiz: function() {
    var self = this;
    this.state.currentQuestionIndex = 0;
    this.state.playing = true;
    this.startTicker();
    this.renderSection('question');
    return this;
  },

  finishQuiz: function() {
    var self = this, timer = this.state.timer;
    this.stopTicker();
    var $submitBtn = this.$find('[data-hull-action="submit"]');
    var timing = timer.finishedAt - timer.startedAt;
    if (this.quiz_id) {
      $submitBtn.attr('disabled', true);
      this.api(this.id + "/achieve", 'post', { answers: this.answers, timing: timing }, function(badge) {
        $submitBtn.attr('disabled', false);
        self.state.playing = false;
        self.state.badge = badge;
        self.renderSection('result');
      });
    } else {
      this.state.playing = false;
      this.state.badge = this.computeScore();
      this.renderSection('result');
    }
  },

  computeScore: function() {
    var _ = this.sandbox.util._, answers = this.state.answers;
    if (this.ship.config.quiz) {
      var result = { score: 0, stats: { attempts: 1 }, data: { answers: answers } };
      _.map(this.ship.config.quiz.questions, function(q) {
        var answer, answerRef = answers[q.ref];
        if (answerRef) {
          answer = _.find(q.answers, function(a) { return a.ref === answerRef; });
          if (answer) {
            result.score += (answer.weight || 0);
          }
        }
      });
      return result;
    }
  },


  // Timers
  startTicker: function() {
    this.ticker = setInterval(this.onTick.bind(this), 1000);
    this.initTimer();
  },

  stopTicker: function() {
    this.state.timer.finishedAt = new Date();
    clearInterval(this.ticker);
  },

  onTick: function() {
    if (this.sandbox.stopped) {
      return this.stopTicker();
    }
    var timer = this.state.timer;

    // Global Timer
    if (this.getOption('quizTimer')) {
      if (timer.countdowns.quiz > 0) {
        timer.countdowns.quiz -= 1;
        this.onQuizTick(timer.countdowns.quiz, this.getOption('quizTimer'));
      } else if (timer.countdowns.quiz === 0) {
        this.finishQuiz();
      }
    }

    // Question Timer
    if (this.getOption('questionTimer')) {
      if (timer.countdowns.question > 0) {
        timer.countdowns.question -= 1;
        this.onQuestionTick(timer.countdowns.question);
      } else if (timer.countdowns.question === 0) {
        this.selectNextQuestion();
      }
    }
  },

  resetQuestionCountdown: function() {
    if (this.getOption('questionTimer')) {
      this.state.timer.countdowns.question = this.getOption('questionTimer');
      this.onQuestionTick(this.getOption('questionTimer'));
    }
  },

  onQuestionTick: function(remaining, total) {
    this.$find('[data-hull-question-ticker]').html(remaining);
  },

  onQuizTick: function(remaining, total) {
    this.$find('[data-hull-quiz-ticker]').html(remaining);
  },

  // Navigation

  selectNextQuestion: function() {
    var q = this.getNextQuestion();
    if (q) {
      this.state.currentQuestionIndex += 1;
      this.resetQuestionCountdown();
      this.renderSection('question');
    } else {
      this.state.playing = false;
      if (this.getOption('autoSubmit')) {
        this.finishQuiz();
      } else {
        this.renderSection('finished');
        this.stopTicker();
      }
    }
  },

  selectPreviousQuestion: function() {
    var q = this.getPreviousQuestion();
    if (q) {
      this.state.currentQuestionIndex -= 1;
      this.resetQuestionCountdown();
      this.renderSection('question');
    }
  },

  selectAnswer: function(qRef, aRef) {
    this.state.answers[qRef] = aRef;
    this.$('.next-step').removeClass('disabled');
    if (this.getOption('autoNext')) {
      this.selectNextQuestion();
    }
  }

});
