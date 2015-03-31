var _ = require('underscore');

CHANGE_EVENT = 'QUIZ_CHANGE';

var Constants = {
  INTRODUCTION_STEP: 'introduction_step',
  PLAY_STEP: 'play_step',
  RESULT_STEP: 'result_step',
  THANKS_STEP: 'thanks_step'
};

var MessageFormat = require('messageformat');
var mf = new MessageFormat('en');

// TODO Move this to en.json
var T = {
  "loader_message": "Loading...",
  "footer_message": "By playing, you agree to {privacy_policy} and {terms_of_service}",
  "introduction_title": "Let's Play",
  "introduction_subtitle": "Play the quiz",
  "play_button": "Play",
  "play_with_service_button": "Play with {service}",
  "loging_in_message": "Waiting for login to complete...",
  "result_title": "Bravo",
  "result_subtitle": "Score {score} after {attempts, plural, one{one attempt} other{# attemps}}.",
  "replay": "Replay",
  "or_complete_your_profile": "or complete your profile.",
  "save_profile_button": "Save profile",
  "thanks_title": "Thanks for playing!",
  "thanks_subtitle": "Thanks subtitle"
};

function Engine(user, ship) {
  this._setInitialState(user, ship);

  Hull.on('hull.auth.logout', this.reset.bind(this));

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
    console.log(this._badge);
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
      formIsSubmited: this._formIsSubmited
    };
  },

  play: function(provider) {
    if (this._user) {
      this._startQuiz();
    } else if (provider) {
      this._emitChange({ isLogingIn: true });

      Hull.login(provider).then(function() {
        this._user = Hull.currentUser();
        this._startQuiz();
      }.bind(this), function(error) {
        this._emitChange({ error: error })
      }.bind(this));
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

  reset: function() {
    this._emitChange({ isLoading: 'reset' });

    Hull.api(this._ship.id).then(function(ship) {
      this._setInitialState(Hull.currentUser(), ship);

      this._emitChange();
    }.bind(this), function(error) {
      // TODO handle API errors.
    });
  },

  _setInitialState: function(user, ship) {
    this._ship = ship;
    this._user = user;
    this._quiz = this._ship.resources.quiz;
    this._form = this._ship.resources.form;
    this._badge = this._user && this._ship.resources.quiz.badg;
    this._settings = ship.settings;
    this._questions = this._getQuestions();
    this._countdown = (this._settings.quiz_countdown > 0) && this._settings.quiz_countdown;
    this._currentQuestionIndex = 0;
    this._answers = {};
    this._quizIsStarted = false;
    this._quizStartedAt = null;
    this._quizIsFinished = false;
    this._quizFinishedAt = null;
    this._formIsSubmited = false;
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

  _getQuestions: function() {
    var questions = this._ship.resources.quiz.questions;
    if (this._settings.sample_questions > 0) {
      questions = _.sample(questions, this._settings.sample_questions);
    }

    return _.map(questions, function(q) {
      var answers = q.answers;
      if (this._settings.sample_answers > 0) {
        answers = _.sample(q.answers, this._settings.sample_answers);
      }
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

