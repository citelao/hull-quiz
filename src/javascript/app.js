var _ = require('underscore');
var i18n = require('./i18n');

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

function getAuthenticationServices() {
  return Object.keys(Hull.config('services').auth || {}).filter(function(s) {
    return s !== 'hull';
  });
}

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

  $scope.translate = i18n.translate;

  $scope.form = [ '*', { type: 'submit', title: i18n.translate('Save profile') } ];
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

Hull.onEmbed(document, function(element, deployment) {
  var e = new Engine(Hull.currentUser(), deployment.ship);
  app.value('$engine', e);

  i18n.setTranslations(deployment.ship.translations);

  angular.bootstrap(element, ['hull-quiz']);
});

