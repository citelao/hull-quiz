var _ = require('underscore');

CHANGE_EVENT = 'QUIZ_CHANGE';

var Constants = {
  INTRODUCTION_STEP: 'introduction_step',
  PLAY_STEP: 'play_step',
  RESULT_STEP: 'result_step',
  THANKS_STEP: 'thanks_step'
};


function camelize(str) {
  return str.replace (/(?:^|[-_])(\w)/g, function (_, c) {
    return c ? c.toUpperCase () : '';
  })
}

function Engine(user, ship) {
  this._setInitialState(user, ship);

  Hull.on('hull.user.update', function() {
    // handle log out this way for now, because "hull.user.logout" event is
    // not triggered consistently.
    if (this._user != null && Hull.currentUser() == null) { this.reset(); }
  }.bind(this));

  window.addEventListener('message', function(e) {
    var message = e.data;
    if (message && message.event === 'ship.update') {
      this._settings = message.ship.settings;
      this._emitChange();
    }
  }.bind(this), false);
}

Engine.prototype = {
  getState: function() {
    return {
      ship: this._ship,
      user: this._user,
      quiz: this._quiz,
      form: this._form,
      badge: this._badge,
      settings: this._settings,
      questions: this._questions,
      countdown: this._countdown,
      currentStep: this._getCurrentStep(),
      currentQuestion: this._getQuestion(this._currentQuestionIndex),
      currentQuestionIndex: this._currentQuestionIndex,
      nextQuestionIndex: this._getNextQuestionIndex(),
      previousQuestionIndex: this._getPreviousQuestionIndex(),
      answers: this._answers,
      quizIsStarted: this._quizIsStarted,
      quizisFinished: this._quizIsFinished,
      formIsSubmited: this._formIsSubmited,
      authServices: this._getAuthServices()
    };
  },

  play: function(provider) {
    if (this._user) {
      this._startQuiz();
    } else if (provider) {
      this._emitChange({ isLogingIn: true });
      var self = this;
      Hull.login(provider).then(function(user) {
        self.reset().then(function(ship) {
          self._startQuiz();
        });
      }, function(error) {
        self._emitChange({ error: error })
      })
    } else {
      throw 'provider is missing...';
    }
  },

  selectAnswer: function(question, answer) {
    this._answers[question.ref] = answer.ref;
    this._next();
  },

  selectQuestion: function(index) {
    if (index >= 0 && index < this._questions.length) {
      this._currentQuestionIndex = index;
      this._emitChange();
    } else {
      throw 'index must be between 0 and' + (this._questions.length - 1);
    }
  },

  finishQuiz: function() {
    this._emitChange({ isLoading: 'quiz' });

    this._clearTicker();

    this._quizFinishedAt = new Date();

    Hull.api(this._quiz.id + '/achieve' ,'post', {
      answers: this._answers,
      timing: this._quizFinishedAt - this._quizStartedAt
    }, function(badge) {
      this._quizIsFinished = true;
      this._badge = badge;

      this._emitChange();
    }.bind(this));
  },

  submitForm: function(data) {
    this._emitChange({ isLoading: 'form' });

    var r = Hull.api(this._form.id + '/submit' ,'put', { data: data });
    r.then(function(form) {
      this._form = form;
      this._formIsSubmited = true;

      this._emitChange();
    }.bind(this), function(error) {
      this._emitChange({ error: error });
    }.bind(this));
  },

  addChangeListener: function(listener) {
    this._listeners = this._listeners || [];

    var c = function() {
      var a = [].slice.call(arguments);
      setTimeout(function() { listener.apply(undefined, a); });
    };

    this._listeners.push(c);

    Hull.on(CHANGE_EVENT, c);
  },

  reset: function(opts) {
    var options = opts || { replay: false };
    this._emitChange({ isLoading: 'reset' });
    var self = this, user = Hull.currentUser();
    return Hull.api(this._ship.id).then(function(ship) {
      self._setInitialState(user, ship, options.replay);
      self._emitChange();
      return ship;
    }, function(error) {
      self._emitChange({ error: error });
      return error;
    });
  },

  _getAuthServices: function() {
    return _.map(Object.keys(Hull.config('services').auth || {}).filter(function(s) {
      return s !== 'hull';
    }), function(s) {
      return { name: s, displayName: camelize(s) };
    });
  },

  _setInitialState: function(user, ship, canReplay) {
    this._ship = ship;
    this._user = user;
    this._quiz = this._ship.resources.quiz;
    this._form = this._ship.resources.form;

    this._badge = this._user && this._quiz.badge;
    this._settings = ship.settings;
    this._questions = this._getQuestions();
    this._countdown = (this._settings.quiz_countdown > 0) && this._settings.quiz_countdown;
    this._currentQuestionIndex = 0;
    this._answers = {};
    this._quizIsStarted = false;
    this._quizStartedAt = null;

    var canUserReplay = canReplay || ship.settings.can_replay;

    if (canUserReplay) {
      this._quizIsStarted = false;
      this._quizIsFinished = false;
      this._quizFinishedAt = null;
      this._formIsSubmited = false;
    } else {
      this._quizIsStarted = !!this._badge;
      this._quizIsFinished = !!this._badge;
      this._quizFinishedAt = this._badge && this._badge.updated_at;
      this._formIsSubmited = this._form && this._form.user_data && this._form.user_data.updated_at;
    }
  },

  _startQuiz: function() {
    this._quizIsStarted = true;
    this._quizStartedAt = new Date();

    this._startTicker();

    this._emitChange();
  },

  _next: function() {
    var i = this._getNextQuestionIndex();
    if (i) {
      this.selectQuestion(i);
    } else {
      this.finishQuiz();
    }
  },

  _emitChange: function(temporary) {
    var state = _.extend({}, (temporary || {}), this.getState());

    Hull.emit(CHANGE_EVENT, state);
  },

  _getCurrentStep: function() {
    if (!this._user || !this._quizIsStarted) {
      return Constants.INTRODUCTION_STEP;
    } else if (this._formIsSubmited) {
      return Constants.THANKS_STEP;
    } else if (this._quizIsFinished) {
      return Constants.RESULT_STEP;
    } else if (this._quizIsStarted && !this._quizIsFinished) {
      return Constants.PLAY_STEP;
    } else {
      throw 'This is not supposed to happen...';
    }
  },

  _preloadImage: function(src) {
    if (src && /http/.test(src)) {
      this._preloadedImages = this._preloadedImages || {};
      if (!this._preloadedImages[src]) {
        var img = document.createElement('img');
        img.src = src;
        this._preloadedImages[src] = true
      }
    }
  },

  _getQuestions: function() {
    var questions = this._ship.resources.quiz.questions;
    if (this._settings.sample_questions > 0) {
      questions = _.sample(questions, this._settings.sample_questions);
    }

    return _.map(questions, function(q) {
      this._preloadImage(q.picture)
      var answers = q.answers;
      if (this._settings.sample_answers > 0) {
        answers = _.sample(q.answers, this._settings.sample_answers);
      }
      _.map(answers, function(a) {
        this._preloadImage(a.picture);
      }, this);
      q.answers = answers;
      q.countdown = (this._settings.question_countdown > 0) && this._settings.question_countdown;

      return q;
    }, this);
  },

  _getQuestion: function(index) {
    return this._questions[index];
  },

  _getNextQuestionIndex: function() {
    return (this._currentQuestionIndex !== this._questions.length - 1) && this._currentQuestionIndex + 1;
  },

  _getPreviousQuestionIndex: function() {
    return (this._currentQuestionIndex > 0) && this._currentQuestionIndex - 1;
  },

  _startTicker: function() {
    this._ticker = setInterval(this._tick.bind(this), 1000);
  },

  _clearTicker: function() {
    clearInterval(this._ticker);
  },

  _tick: function() {
    // TODO This is not perfect...
    var emit = false;

    if (_.isNumber(this._countdown)) {
      if (this._countdown > 0) {
        emit = true;
        this._countdown--;
      } else if (this._countdown === 0) {
        this.finishQuiz();
      }
    }

    var q = this._getQuestion(this._currentQuestionIndex);
    if (_.isNumber(q.countdown)) {
      if (q.countdown > 0) {
        emit = true;
        q.countdown--;
      } else if (q.countdown === 0) {
        this._next();
      }
    }

    if (emit) { this._emitChange(); }
  }
};

Engine.Constants = Constants;

module.exports = Engine;

