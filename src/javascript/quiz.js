// TODO rename shuffle_answers to sample_questions in manifest
// TODO rename question_timer to question countdown

CHANGE_EVENT = 'COUCOU';

var _ = require('_');

var Constants = {
  INTRODUCTION_STEP = 'introduction_step',
  PLAY_STEP = 'play_step',
  RESULT_STEP = 'result_step',
  THANKS_STEP = 'thanks_step'
};

function Quiz(options) {
  this._listeners = [];
  this._ship: options.ship;
  this._user: options.user;
  this._quiz: this._ship.resources.quiz;
  this._form: this._ship.resources.form;
  this._badge: this._user && this._ship.resources.quiz.badg;
  this._settings = options.ship.settings;
  this._translations = options.ship.translations;
  this._questions = this._getQuestions();
  this._countdown = (this._settings.quiz_countdown > 0) && this._settings.quiz_countdown;
  this._currentQuestionIndex = 0;
  this._answers = {};
  this._quizIsStarted = false;
  this._quizStartedAt = null;
  this._quizIsFinished = false;
  this._quizFinishedAt = null;
  this._formIsSubmited = false;
}

Quiz.prototype = {
  getState: function() {
    return {
      ship: this._ship,
      user: this._user,
      quiz: this._quiz,
      form: this._form,
      badge: this._badge,
      settings: this._settings,
      translations: this._translations,
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

  startQuiz: function() {
    this._quizIsStarted = true;
    this._quizStartedAt = new Date();

    this._startTicker();

    this._emitChange();
  },

  selectAnswer: function(question, answer) {
    this._answers[question.ref] = answer.ref;

    var i = this._getNextQuestionIndex();
    if (i != null) {
      this.selectQuestion(i);
    } else {
      this.finishQuiz();
    }
  },

  selectQuestion: function(index) {
    if (index > 0 && index < this._questions.length) {
      this._currentQuestionIndex = index;
      this._emitChange();
    } else {
      console.error('index must be between 0 and %s', this._questions.length - 1);
    }
  },

  finishQuiz: function() {
    this._emitChange({ isLoading: 'quiz' });

    this._clearTicker();

    this._quizFinishedAt = new Date();

    Hull.api(this._quiz.id + '/achieve' ,'post', {
      answers: this._answers,
      timing: this._quizFinishedAt - this._quizStartedAt;
    }, function(badge) {
      this._quizIsStarted = false;
      this._quizIsFinished = true;
      this._badge = badge;

      this._emitChange();
    }.bind(this));
  },

  /**
   *
   */
  submitForm: function(data) {
    this._emitChange({ isLoading: 'form' });

    var r = Hull.api(this._form.id + '/submit' ,'put', { data: data });
    r.then(function(form) {
      this._form = form;
      this._formIsSubmited = true;

      this._emitChange();
    }, function(error) {
      this._emitChange({ error: error });
    });
  },

  onChange: function(callback) {
    var c = function() {
      var a = [].slice.call(arguments);
      setTimeout(function() { callback.apply(undefined, a); });
    };

    this._listeners.push(c);

    Hull.on(CHANGE_EVENT, c);
  },

  _emitChange: function(temporary) {
    var state = _.extend({}, (temporary || {}), this.getState());

    Hull.emit(CHANGE_EVENT, state);
  },

  _getCurrentStep: function() {
    if (this._user == null) {
      return Constants.INTRODUCTION_STEP;
    } else if (this._formIsSubmited) {
      return Constants.THANKS_STEP;
    } else if (this._quizIsFinished && !this._quizIsStarted) {
      return Constants.RESULT_STEP;
    } else if (this._quizIsStarted && !this._quizIsFinished) {
      return Constants.PLAY_STEP;
    } else {
      console.error('This is not supposed to happen...');
    }
  },

  _getQuestions: function() {
    var questions = this._ship.resources.quiz.questions;
    if (this._settings.sample_questions > 0) {
      questions = _.sample(questions, this.settings.sample_questions);
    }

    return _.map(questions, function(q) {
      var answers = q.answers;
      if (this._settings.sample_answers > 0) {
        answers = _.sample(q.answers, this.settings.sample_answers);
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
    if (_.isNumber(this._countdown)) {
      if (this._countdown > 0) {
        this._countdown--;
      } else if (this._countdown === 0) {
        this.finishQuiz();
      }
    }

    var q = this._getCurrentQuestion();
    if (_.isNumber(q.countdown)) {
      if (q.countdown > 0) {
        q.countdown--;
      } else if (q.countdown === 0) {
        this.selectQuestion(this._getNextQuestionIndex);
      }
    }
  }
};

Quiz.Constants = Constants;

module.exports = Quiz;

