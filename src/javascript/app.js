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

var app = angular.module('hull-quiz', ['schemaForm'])

.config(['$sceProvider', function($sceProvider) {
  $sceProvider.enabled(false);
}])

.controller('QuizController', ['$scope', '$engine', function($scope, $engine) {

  function getFormData(form) {
    var fields_list = (form && form.fields_list) || [];
    return _.reduce(fields_list, function(m, field) {
      m[field.name] = field.value;
      return m;
    }, {});
  }


  $scope.state = $engine.getState();
  $scope.formData = getFormData($scope.state.form);

  $engine.addChangeListener(function(state) {
    $scope.$apply(function() {
      $scope.state = state;
      $scope.formData = getFormData(state.form);
    });
  });

  $scope.play = $engine.play.bind($engine);
  $scope.selectQuestion = $engine.selectQuestion.bind($engine);
  $scope.selectAnswer = $engine.selectAnswer.bind($engine);
  $scope.finishQuiz = $engine.finishQuiz.bind($engine);
  $scope.reset = $engine.reset.bind($engine, { replay: true });
  $scope.share = $engine.share.bind($engine);

  $scope.translate = i18n.translate;

  $scope.form = [ '*', { type: 'submit', title: i18n.translate('Save profile') } ];

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
  var e = new Engine(Hull.currentUser(), deployment);
  app.value('$engine', e);

  i18n.setTranslations(deployment.ship.translations);

  angular.bootstrap(element, ['hull-quiz']);
  Hull.autoSize();
});

