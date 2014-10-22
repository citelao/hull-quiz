Hull.component({
  templates: [
    'intro',
    'question',
    'result',
    'profile-form',
    'header',
    'footer',
    'styles',
    'thanks',
    'fields/text',
    'fields/date',
    'fields/number',
    'fields/dropdown',
    'fields/paragraph',
    'fields/radio',
    'fields/checkboxes',
    'fields/website',
    'fields/email'
  ],

  refreshEvents: ['model.hull.me.change'],

  require: ['i18n', 'parsley'],

  defaultOptions: {
    sample_questions: false,
    auto_start: false,
    auto_next: false,
    shuffle_answers: true,
    question_timer: 0,
    quiz_timer: 0
  },

  datasources: {
    ship: function() {
      return this.api.model('app');
    }
  },

  events: {
    'submit form[data-action="profile"]': function(e) {
      e.preventDefault();
      var _ = this.sandbox.util._;
      var self = this;
      var formResource = this.profileForm;
      var formData = this.sandbox.dom.getFormData(e.target);
      this.disableForm();
      var ret = this.api.put(formResource.id + "/submit", { data: formData });
      ret.then(function(form) {
        self.ship.resources['profile-form'] = form;
        self.profileForm = form;
        self.renderSection('thanks');
      }, function(err) {
        self.enableForm();
        self.alertMessage(err.message);
      });
    }
  },

  alertMessage: function(msg) {
    var $alert = this.$('.alert-message');
    if (msg) {
      $alert.html(msg);
      $alert.show();
    } else {
      $alert.hide();
    }
  },

  actions: {

    share: function(event, action) {
      event && event.preventDefault()
      var provider = action.data.provider;
      if (provider) {
        Hull.share({ provider: provider, params: { href: document.location.toString() } });
      }
    },

    answer: function(event, action) {
      var qRef = action.data.questionRef.toString();
      var aRef = action.data.answerRef.toString();

      this.selectAnswer(qRef, aRef);
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
    formField: function(field) {
      var tpl = "fields/" + field.field_type;
      return this.renderTemplate(tpl, field);
    },

    t: function(key, opts) {
      return I18n.t(key, opts);
    }
  },

  disableForm: function() {
    this.$('form fieldset').attr('disabled', true);
  },

  enableForm: function() {
    this.$('form fieldset').attr('disabled', false);
  },

  initialize: function() {
    this.injectLinkTag('parsley');
    var _ = this.sandbox.util._;
    this.sandbox.on('ship.update', function(ship) {
      this.ship = ship;
      this.initState();
      this.initTimer();
      this.renderSection(this.currentSection);
    }, this);

    this.$el.attr('id', this.cid);
    I18n.fallbacks = true;
    I18n.locale = this.options.locale || navigator.language;
    this.helpers.formField = _.bind(this.helpers.formField, this);
  },

  renderSection: function(section, data) {
    var _ = this.sandbox.util._;
    this.currentSection = section || this.currentSection || this.getTemplate();
    this.render(this.currentSection, data);
  },

  getTemplate: function(tpl) {
    var _ = this.sandbox.util._;

    if (!this.loggedIn()) { return 'intro'; }

    if (this.state.playing) { return 'question'; }

    if (this.state.badge) {
      return tpl;
    } else {
      return 'intro';
    }
  },

  initState: function() {
    var _ = this.sandbox.util._;
    I18n.translations = this.ship.translations;
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
      countdowns: { question: this.getOption('question_timer'), quiz: this.getOption('quiz_timer') },
      timings: {},
      startedAt: new Date()
    };
  },

  getOptions: function() {
    var _ = this.sandbox.util._;
    var shipConfig = this.ship.settings || {};
    return _.extend({}, this.defaultOptions, shipConfig);
  },

  // Rendering

  beforeRender: function(data) {
    console.warn("--------------------------> RENDER");
    this.ship = data.ship;
    this.profileForm = $.extend(true, {}, this.ship.resources['profile-form']);
    shipConfig = this.ship.settings;
    var _ = this.sandbox.util._;
    data.styleNamespace = "#" + this.cid;
    data.quiz = this.quiz = data.ship.resources.quiz;
    if (!this.state) this.initState();
    data.state = this.state;
    data.question = this.getCurrentQuestion();
    var authServices = this.authServices();
    data.authServices = {};
    var loggedIn = this.loggedIn();
    _.map(authServices, function(provider) {
      data.authServices[provider] = {
        linked: loggedIn && loggedIn[provider]
      };
    });
    data.profileFormFields = data.ship.resources['profile-form'].fields_list;
  },

  afterRender: function() {
    this.$('form.profile-form').parsley();
  },

  getOption: function (key) {
    return this.state.options[key];
  },


  // Questions

  getQuestions: function() {
    var _ = this.sandbox.util._, self = this;
    var questions = (this.quiz.questions || []).slice(0);
    if (this.getOption('sample_questions') > 0) {
      questions = _.sample(questions, this.getOption('sample_questions'));
    }
    var questionsCount = questions.length
    var questions = _.map(questions, function(q, i) {
      var index = i + 1
      if (self.getOption('shuffle_answers')) {
        q.answers = _.shuffle(q.answers);
      }
      return _.extend(q, { pagination: {
        index: index,
        total: questions.length,
        next: (index < (questionsCount + 1)),
        previous: (index > 1)
      } });
    });
    return questions;
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
    var timing = timer.finishedAt - timer.startedAt;
    if (this.quiz && this.quiz.id) {
      this.api(this.quiz.id + "/achieve", 'post', { answers: this.state.answers || [], timing: timing }, function(badge) {
        self.state.playing = false;
        self.state.badge = badge;
        self.renderSection('result');
      });
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
    if (this.sandbox.stopped) { return this.stopTicker(); }

    var timer = this.state.timer;

    // Global Timer
    if (this.getOption('quiz_timer')) {
      if (timer.countdowns.quiz > 0) {
        timer.countdowns.quiz -= 1;
        this.onQuizTick(timer.countdowns.quiz, this.getOption('quiz_timer'));
      } else if (timer.countdowns.quiz === 0) {
        this.finishQuiz();
      }
    }

    // Question Timer
    if (this.getOption('question_timer')) {
      if (timer.countdowns.question > 0) {
        timer.countdowns.question -= 1;
        this.onQuestionTick(timer.countdowns.question);
      } else if (timer.countdowns.question === 0) {
        this.selectNextQuestion();
      }
    }
  },

  resetQuestionCountdown: function() {
    if (this.getOption('question_timer')) {
      this.state.timer.countdowns.question = this.getOption('question_timer');
      this.onQuestionTick(this.getOption('question_timer'));
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
      this.finishQuiz();
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
    this.selectNextQuestion();
  },

  injectLinkTag: function(file) {
    // Helper to inject styles
    if (this.linkTagInjected || this.options.injectLinkTag === false) { return; }

    var e = document.createElement('link');
    e.href = this.options.baseUrl + '/' + file + '.css';
    e.rel = 'stylesheet';

    document.getElementsByTagName('head')[0].appendChild(e);

    this.linkTagsInjected = true;
  }


});
