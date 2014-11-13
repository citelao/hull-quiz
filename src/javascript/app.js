var _ = require('underscore');

function getAuthenticationServices() {
  return Object.keys(Hull.config('services').auth || {}).filter(function(s) {
    return s !== 'hull';
  });
}

var Engine = require('./engine');

window.tv4 = require('tv4');
var ObjectPath = require('objectpath');
try {
  angular.module('ObjectPath', []).provider('ObjectPath', function(){
    this.parse = ObjectPath.parse;
    this.stringify = ObjectPath.stringify;
    this.normalize = ObjectPath.normalize;
    this.$get = function(){
      return ObjectPath;
    };
  });
} catch(e) {}
require('angular-schema-form/dist/schema-form');
require('./schema-form/foundation-decorator');
require('./schema-form/foundation-decorator-datepicker');
require('angular-datepicker/build/angular-datepicker');

var app = angular.module('hull-quiz', ['schemaForm'])

.controller('QuizController', ['$scope', '$engine', function($scope, $engine) {
  $scope.authenticationServices = getAuthenticationServices();

  $scope.state = $engine.getState();
  $engine.addChangeListener(function(state) {
    $scope.$apply(function() {
      $scope.state = state;
    });
  });

  $scope.play = $engine.play.bind($engine);
  $scope.selectQuestion = $engine.selectQuestion.bind($engine);
  $scope.selectAnswer = $engine.selectAnswer.bind($engine);
  $scope.finishQuiz = $engine.finishQuiz.bind($engine);
  $scope.reset = $engine.reset.bind($engine);
  $scope.translate = $engine.translate.bind($engine);

  $scope.form = [ '*', { type: 'submit', title: $engine.translate('save_profile_button') } ];
  $scope.formData = _.reduce($scope.state.form.fields_list, function(m, field) {
    m[field.name] = field.value;
    return m;
  }, {});

  $scope.submitForm = function(form) {
    $scope.$broadcast('schemaFormValidate');

    if (form.$valid) {
      $engine.submitForm($scope.formData);
    }
  };
}])

.directive('countdown', function() {
  return {
    restrict: 'E',
    scope: {
      value: '=',
      max: '='
    },
    templateUrl: 'directives/countdown.html',
    controller: ['$scope', function($scope) {
      $scope.getWidth = function() {
        return 100 * ($scope.value / $scope.max);
      }
    }]
  };
})

.filter('opacity', function() {
  return function(color, alpha) {
    var h = color.replace('#', '');
    h = h.match(new RegExp('(.{' + h.length / 3 + '})', 'g'));

    for(var i = 0; i < h.length; i++)
    h[i] = parseInt(h[i].length === 1 ? h[i]+h[i] : h[i], 16);

    if (typeof alpha != 'undefined') { h.push(alpha); }

    return 'rgba(' + h.join(',') + ')';
  };
})

Hull.ready(function(_, user, ship) {
  var e = new Engine(user, ship);
  app.value('$engine', e);

  window.ENGINE = e;

  angular.bootstrap(document, ['hull-quiz']);
});

