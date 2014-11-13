(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/javascript/app.js":[function(require,module,exports){
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


},{"./engine":"/Users/Jimmy/code/hull/components/kwiz/src/javascript/engine.js","./schema-form/foundation-decorator":"/Users/Jimmy/code/hull/components/kwiz/src/javascript/schema-form/foundation-decorator.js","./schema-form/foundation-decorator-datepicker":"/Users/Jimmy/code/hull/components/kwiz/src/javascript/schema-form/foundation-decorator-datepicker.js","angular-datepicker/build/angular-datepicker":"/Users/Jimmy/code/hull/components/kwiz/node_modules/angular-datepicker/build/angular-datepicker.js","angular-schema-form/dist/schema-form":"/Users/Jimmy/code/hull/components/kwiz/node_modules/angular-schema-form/dist/schema-form.js","objectpath":"/Users/Jimmy/code/hull/components/kwiz/node_modules/objectpath/index.js","tv4":"/Users/Jimmy/code/hull/components/kwiz/node_modules/tv4/tv4.js","underscore":"/Users/Jimmy/code/hull/components/kwiz/node_modules/underscore/underscore.js"}],"/Users/Jimmy/code/hull/components/kwiz/node_modules/angular-datepicker/build/angular-datepicker.js":[function(require,module,exports){
/*!
 * pickadate.js v3.4.0, 2014/02/15
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */
!function(a){"function"==typeof define&&define.amd?define("picker",["angular"],a):this.Picker=a(angular)}(function(a){function b(a,d,e,g){function h(){return b._.node("div",b._.node("div",b._.node("div",b._.node("div",r.component.nodes(o.open),n.box),n.wrap),n.frame),n.holder)}function i(){p.data(d,r),p.addClass(n.input),p[0].value=p.attr("data-value")?r.get("select",m.format):a.value,angular.element(document.querySelectorAll("#"+o.id)).on("focus",l),angular.element(document.querySelectorAll("#"+o.id)).on("click",l),m.editable||angular.element(document.querySelectorAll("#"+o.id)).on("keydown",function(a){var b=a.keyCode,c=/^(8|46)$/.test(b);return 27==b?(r.close(),!1):void((32==b||c||!o.open&&r.component.key[b])&&(a.preventDefault(),a.stopPropagation(),c?r.clear().close():r.open()))}),c(a,{haspopup:!0,expanded:!1,readonly:!1,owns:a.id+"_root"+(r._hidden?" "+r._hidden.id:"")})}function j(){function d(){angular.element(r.$root[0].querySelectorAll("[data-pick], [data-nav], [data-clear]")).on("click",function(){var c=angular.element(this),e=c.hasClass(n.navDisabled)||c.hasClass(n.disabled),f=document.activeElement;f=f&&(f.type||f.href)&&f,(e||f&&!r.$root[0].contains(f))&&a.focus(),c.attr("data-nav")&&!e?(r.set("highlight",r.component.item.highlight,{nav:parseInt(c.attr("data-nav"))}),d()):b._.isInteger(parseInt(c.attr("data-pick")))&&!e?(r.set("select",parseInt(c.attr("data-pick"))).close(!0),d()):c.attr("data-clear")&&(r.clear().close(!0),d())})}r.$root.on("focusin",function(a){r.$root.removeClass(n.focused),c(r.$root[0],"selected",!1),a.stopPropagation()}),r.$root.on("mousedown click",function(b){var c=b.target;c!=r.$root.children()[0]&&(b.stopPropagation(),"mousedown"==b.type&&"input"!==angular.element(c)[0].tagName&&"OPTION"!=c.nodeName&&(b.preventDefault(),a.focus()))}),d(),c(r.$root[0],"hidden",!0)}function k(){var b=["string"==typeof m.hiddenPrefix?m.hiddenPrefix:"","string"==typeof m.hiddenSuffix?m.hiddenSuffix:"_submit"];r._hidden=angular.element('<input type=hidden name="'+b[0]+a.name+b[1]+'"id="'+b[0]+a.id+b[1]+'"'+(p.attr("data-value")||a.value?' value="'+r.get("select",m.formatSubmit)+'"':"")+">")[0],p.on("change."+o.id,function(){r._hidden.value=a.value?r.get("select",m.formatSubmit):""}).after(r._hidden)}function l(a){a.stopPropagation(),"focus"==a.type&&(r.$root.addClass(n.focused),c(r.$root[0],"selected",!0)),r.open()}if(!a)return b;var m;e?(m=e.defaults,angular.extend(m,g)):m=g||{};var n=b.klasses();angular.extend(n,m.klass);var o={id:a.id||"P"+Math.abs(~~(Math.random()*new Date))},p=angular.element(a),q=function(){return this.start()},r=q.prototype={constructor:q,$node:p,start:function(){return o&&o.start?r:(o.methods={},o.start=!0,o.open=!1,o.type=a.type,a.autofocus=a==document.activeElement,a.type="text",a.readOnly=!m.editable,a.id=a.id||o.id,r.component=new e(r,m),r.$root=angular.element(b._.node("div",h(),n.picker,'id="'+a.id+'_root"')),j(),m.formatSubmit&&k(),i(),m.container?angular.element(m.container).append(r.$root):p.after(r.$root),r.on({start:r.component.onStart,render:r.component.onRender,stop:r.component.onStop,open:r.component.onOpen,close:r.component.onClose,set:r.component.onSet}).on({start:m.onStart,render:m.onRender,stop:m.onStop,open:m.onOpen,close:m.onClose,set:m.onSet}),a.autofocus&&r.open(),r.trigger("start").trigger("render"))},render:function(a){return a?r.$root.html(h()):angular.element(r.$root[0].querySelectorAll("."+n.box)).html(r.component.nodes(o.open)),r.trigger("render")},stop:function(){return o.start?(r.close(),r._hidden&&r._hidden.parentNode.removeChild(r._hidden),r.$root.remove(),p.removeClass(n.input).removeData(d),setTimeout(function(){p.off("."+o.id)},0),a.type=o.type,a.readOnly=!1,r.trigger("stop"),o.methods={},o.start=!1,r):r},open:function(d){return o.open?r:(p.addClass(n.active),c(a,"expanded",!0),r.$root.addClass(n.opened),c(r.$root[0],"hidden",!1),d!==!1&&(o.open=!0,p.triggerHandler("focus"),angular.element(document.querySelectorAll("#"+o.id)).on("click focusin",function(b){var c=b.target;c!=a&&c!=document&&3!=b.which&&r.close(c===r.$root.children()[0])}),angular.element(document.querySelectorAll("#"+o.id)).on("keydown",function(c){var d=c.keyCode,e=r.component.key[d],f=c.target;27==d?r.close(!0):f!=a||!e&&13!=d?r.$root[0].contains(f)&&13==d&&(c.preventDefault(),f.click()):(c.preventDefault(),e?b._.trigger(r.component.key.go,r,[b._.trigger(e)]):angular.element(r.$root[0].querySelectorAll("."+n.highlighted)).hasClass(n.disabled)||r.set("select",r.component.item.highlight).close())})),r.trigger("open"))},close:function(b){return b&&(p.off("focus."+o.id),p.triggerHandler("focus"),setTimeout(function(){angular.element(document.querySelectorAll("#"+o.id)).on("focus",l)},0)),p.removeClass(n.active),c(a,"expanded",!1),r.$root.removeClass(n.opened+" "+n.focused),c(r.$root[0],"hidden",!0),c(r.$root[0],"selected",!1),o.open?(setTimeout(function(){o.open=!1},1e3),f.off("."+o.id),r.trigger("close")):r},clear:function(){return r.set("clear")},set:function(a,b,c){var d,e,f=angular.isObject(a),g=f?a:{};if(c=f&&angular.isObject(b)?b:c||{},a){f||(g[a]=b);for(d in g)e=g[d],d in r.component.item&&r.component.set(d,e,c),("select"==d||"clear"==d)&&(p[0].value="clear"==d?"":r.get(d,m.format),p.triggerHandler("change"));r.render()}return c.muted?r:r.trigger("set",g)},get:function(c,d){return c=c||"value",null!=o[c]?o[c]:"value"==c?a.value:c in r.component.item?"string"==typeof d?b._.trigger(r.component.formats.toString,r.component,[d,r.component.get(c)]):r.component.get(c):void 0},on:function(a,b){var c,d,e=angular.isObject(a),f=e?a:{};if(a){e||(f[a]=b);for(c in f)d=f[c],o.methods[c]=o.methods[c]||[],o.methods[c].push(d)}return r},off:function(){var a,b,c=arguments;for(a=0,namesCount=c.length;namesCount>a;a+=1)b=c[a],b in o.methods&&delete o.methods[b];return r},trigger:function(a,c){var d=o.methods[a];return d&&d.map(function(a){b._.trigger(a,r,[c])}),r}};return new q}function c(a,b,c){if(angular.isObject(b))for(var e in b)d(a,e,b[e]);else d(a,b,c)}function d(a,b,c){angular.element(a).attr(("role"==b?"":"aria-")+b,c)}function e(a,b){angular.isObject(a)||(a={attribute:b}),b="";for(var c in a){var d=("role"==c?"":"aria-")+c,e=a[c];b+=null==e?"":d+'="'+a[c]+'"'}return b}var f=angular.element(document);return b.klasses=function(a){return a=a||"picker",{picker:a,opened:a+"--opened",focused:a+"--focused",input:a+"__input",active:a+"__input--active",holder:a+"__holder",frame:a+"__frame",wrap:a+"__wrap",box:a+"__box"}},b._={group:function(a){for(var c,d="",e=b._.trigger(a.min,a);e<=b._.trigger(a.max,a,[e]);e+=a.i)c=b._.trigger(a.item,a,[e]),d+=b._.node(a.node,c[0],c[1],c[2]);return d},node:function(b,c,d,e){return c?(c=a.isArray(c)?c.join(""):c,d=d?' class="'+d+'"':"",e=e?" "+e:"","<"+b+d+e+">"+c+"</"+b+">"):""},lead:function(a){return(10>a?"0":"")+a},trigger:function(a,b,c){return"function"==typeof a?a.apply(b,c||[]):a},digits:function(a){return/\d/.test(a[1])?2:1},isDate:function(a){return{}.toString.call(a).indexOf("Date")>-1&&this.isInteger(a.getDate())},isInteger:function(a){return{}.toString.call(a).indexOf("Number")>-1&&a%1===0},ariaAttr:e},b.extend=function(a,c){angular.element.prototype[a]=function(d,e){var f=this.data(a);if("picker"==d)return f;if(f&&"string"==typeof d)return b._.trigger(f[d],f,[e]),this;for(var g=0;g<this.length;g++){var h=angular.element(this[g]);h.data(a)||new b(h[0],a,c,d)}},angular.element.prototype[a].defaults=c.defaults},b});
/*!
 * Date picker for pickadate.js v3.4.0
 * http://amsul.github.io/pickadate.js/date.htm
 */
!function(a){"function"==typeof define&&define.amd?define(["picker","angular"],a):a(Picker,angular)}(function(a,b){function c(a,c){var d=this,e=a.$node[0].value,f=a.$node.attr("data-value"),g=f||e,h=f?c.formatSubmit:c.format,i=function(){return"rtl"===getComputedStyle(a.$root[0]).direction};d.settings=c,d.$node=a.$node,d.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},d.item={},d.item.disable=(c.disable||[]).slice(0),d.item.enable=-function(a){return a[0]===!0?a.shift():-1}(d.item.disable),d.set("min",c.min).set("max",c.max).set("now"),g?d.set("select",g,{format:h,fromValue:!!e}):d.set("select",null).set("highlight",d.item.now),d.key={40:7,38:-7,39:function(){return i()?-1:1},37:function(){return i()?1:-1},go:function(a){var b=d.item.highlight,c=new Date(b.year,b.month,b.date+a);d.set("highlight",[c.getFullYear(),c.getMonth(),c.getDate()],{interval:a}),this.render()}},a.on("render",function(){b.element(a.$root[0].querySelectorAll("."+c.klass.selectMonth)).on("change",function(){var d=this.value;d&&(a.set("highlight",[a.get("view").year,d,a.get("highlight").date]),b.element(a.$root[0].querySelectorAll("."+c.klass.selectMonth)).triggerHandler("focus"))}),b.element(a.$root[0].querySelectorAll("."+c.klass.selectYear)).on("change",function(){var d=this.value;d&&(a.set("highlight",[d,a.get("view").month,a.get("highlight").date]),b.element(a.$root[0].querySelectorAll("."+c.klass.selectYear)).triggerHandler("focus"))})}).on("open",function(){b.element(a.$root[0].querySelectorAll("button, select")).attr("disabled",!1)}).on("close",function(){b.element(a.$root[0].querySelectorAll("button, select")).attr("disabled",!0)})}var d=7,e=6,f=a._;c.prototype.set=function(a,b,c){var d=this,e=d.item;return null===b?(e[a]=b,d):(e["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",e.select,c):"highlight"==a?d.set("view",e.highlight,c):a.match(/^(flip|min|max|disable|enable)$/)&&(e.select&&d.disabled(e.select)&&d.set("select",e.select,c),e.highlight&&d.disabled(e.highlight)&&d.set("highlight",e.highlight,c)),d)},c.prototype.get=function(a){return this.item[a]},c.prototype.create=function(a,c,d){var e,g=this;return c=void 0===c?a:c,c==-1/0||1/0==c?e=c:b.isObject(c)&&f.isInteger(c.pick)?c=c.obj:b.isArray(c)?(c=new Date(c[0],c[1],c[2]),c=f.isDate(c)?c:g.create().obj):c=f.isInteger(c)||f.isDate(c)?g.normalize(new Date(c),d):g.now(a,c,d),{year:e||c.getFullYear(),month:e||c.getMonth(),date:e||c.getDate(),day:e||c.getDay(),obj:e||c,pick:e||c.getTime()}},c.prototype.createRange=function(a,c){var d=this,e=function(a){return a===!0||b.isArray(a)||f.isDate(a)?d.create(a):a};return f.isInteger(a)||(a=e(a)),f.isInteger(c)||(c=e(c)),f.isInteger(a)&&b.isObject(c)?a=[c.year,c.month,c.date+a]:f.isInteger(c)&&b.isObject(a)&&(c=[a.year,a.month,a.date+c]),{from:e(a),to:e(c)}},c.prototype.withinRange=function(a,b){return a=this.createRange(a.from,a.to),b.pick>=a.from.pick&&b.pick<=a.to.pick},c.prototype.overlapRanges=function(a,b){var c=this;return a=c.createRange(a.from,a.to),b=c.createRange(b.from,b.to),c.withinRange(a,b.from)||c.withinRange(a,b.to)||c.withinRange(b,a.from)||c.withinRange(b,a.to)},c.prototype.now=function(a,b,c){return b=new Date,c&&c.rel&&b.setDate(b.getDate()+c.rel),this.normalize(b,c)},c.prototype.navigate=function(a,c,d){var e,f,g,h,i=b.isArray(c),j=b.isObject(c),k=this.item.view;if(i||j){for(j?(f=c.year,g=c.month,h=c.date):(f=+c[0],g=+c[1],h=+c[2]),d&&d.nav&&k&&k.month!==g&&(f=k.year,g=k.month),e=new Date(f,g+(d&&d.nav?d.nav:0),1),f=e.getFullYear(),g=e.getMonth();new Date(f,g,h).getMonth()!==g;)h-=1;c=[f,g,h]}return c},c.prototype.normalize=function(a){return a.setHours(0,0,0,0),a},c.prototype.measure=function(a,b){var c=this;return b?f.isInteger(b)&&(b=c.now(a,b,{rel:b})):b="min"==a?-1/0:1/0,b},c.prototype.viewset=function(a,b){return this.create([b.year,b.month,1])},c.prototype.validate=function(a,c,d){var e,g,h,i,j=this,k=c,l=d&&d.interval?d.interval:1,m=-1===j.item.enable,n=j.item.min,o=j.item.max,p=m&&j.item.disable.filter(function(a){if(b.isArray(a)){var d=j.create(a).pick;d<c.pick?e=!0:d>c.pick&&(g=!0)}return f.isInteger(a)}).length;if((!d||!d.nav)&&(!m&&j.disabled(c)||m&&j.disabled(c)&&(p||e||g)||!m&&(c.pick<=n.pick||c.pick>=o.pick)))for(m&&!p&&(!g&&l>0||!e&&0>l)&&(l*=-1);j.disabled(c)&&(Math.abs(l)>1&&(c.month<k.month||c.month>k.month)&&(c=k,l=l>0?1:-1),c.pick<=n.pick?(h=!0,l=1,c=j.create([n.year,n.month,n.date-1])):c.pick>=o.pick&&(i=!0,l=-1,c=j.create([o.year,o.month,o.date+1])),!h||!i);)c=j.create([c.year,c.month,c.date+l]);return c},c.prototype.disabled=function(a){var c=this,d=c.item.disable.filter(function(d){return f.isInteger(d)?a.day===(c.settings.firstDay?d:d-1)%7:b.isArray(d)||f.isDate(d)?a.pick===c.create(d).pick:b.isObject(d)?c.withinRange(d,a):void 0});return d=d.length&&!d.filter(function(a){return b.isArray(a)&&"inverted"==a[3]||b.isObject(a)&&a.inverted}).length,-1===c.item.enable?!d:d||a.pick<c.item.min.pick||a.pick>c.item.max.pick},c.prototype.parse=function(a,c,d){var e,g=this,h={};return!c||f.isInteger(c)||b.isArray(c)||f.isDate(c)||b.isObject(c)&&f.isInteger(c.pick)?c:(d&&d.format||(d=d||{},d.format=g.settings.format),e="string"!=typeof c||d.fromValue?0:1,g.formats.toArray(d.format).map(function(a){var b=g.formats[a],d=b?f.trigger(b,g,[c,h]):a.replace(/^!/,"").length;b&&(h[a]=c.substr(0,d)),c=c.substr(d)}),[h.yyyy||h.yy,+(h.mm||h.m)-e,h.dd||h.d])},c.prototype.formats=function(){function a(a,b,c){var d=a.match(/\w+/)[0];return c.mm||c.m||(c.m=b.indexOf(d)),d.length}function b(a){return a.match(/\w+/)[0].length}return{d:function(a,b){return a?f.digits(a):b.date},dd:function(a,b){return a?2:f.lead(b.date)},ddd:function(a,c){return a?b(a):this.settings.weekdaysShort[c.day]},dddd:function(a,c){return a?b(a):this.settings.weekdaysFull[c.day]},m:function(a,b){return a?f.digits(a):b.month+1},mm:function(a,b){return a?2:f.lead(b.month+1)},mmm:function(b,c){var d=this.settings.monthsShort;return b?a(b,d,c):d[c.month]},mmmm:function(b,c){var d=this.settings.monthsFull;return b?a(b,d,c):d[c.month]},yy:function(a,b){return a?2:(""+b.year).slice(2)},yyyy:function(a,b){return a?4:b.year},toArray:function(a){return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(a,b){var c=this;return c.formats.toArray(a).map(function(a){return f.trigger(c.formats[a],c,[0,b])||a.replace(/^!/,"")}).join("")}}}(),c.prototype.isDateExact=function(a,c){var d=this;return f.isInteger(a)&&f.isInteger(c)||"boolean"==typeof a&&"boolean"==typeof c?a===c:(f.isDate(a)||b.isArray(a))&&(f.isDate(c)||b.isArray(c))?d.create(a).pick===d.create(c).pick:b.isObject(a)&&b.isObject(c)?d.isDateExact(a.from,c.from)&&d.isDateExact(a.to,c.to):!1},c.prototype.isDateOverlap=function(a,c){var d=this;return f.isInteger(a)&&(f.isDate(c)||b.isArray(c))?a===d.create(c).day+1:f.isInteger(c)&&(f.isDate(a)||b.isArray(a))?c===d.create(a).day+1:b.isObject(a)&&b.isObject(c)?d.overlapRanges(a,c):!1},c.prototype.flipEnable=function(a){var b=this.item;b.enable=a||(-1==b.enable?1:-1)},c.prototype.deactivate=function(a,c){var d=this,e=d.item.disable.slice(0);return"flip"==c?d.flipEnable():c===!1?(d.flipEnable(1),e=[]):c===!0?(d.flipEnable(-1),e=[]):c.map(function(a){for(var c,g=0;g<e.length;g+=1)if(d.isDateExact(a,e[g])){c=!0;break}c||(f.isInteger(a)||f.isDate(a)||b.isArray(a)||b.isObject(a)&&a.from&&a.to)&&e.push(a)}),e},c.prototype.activate=function(a,c){var d=this,e=d.item.disable,g=e.length;return"flip"==c?d.flipEnable():c===!0?(d.flipEnable(1),e=[]):c===!1?(d.flipEnable(-1),e=[]):c.map(function(a){var c,h,i,j;for(i=0;g>i;i+=1){if(h=e[i],d.isDateExact(h,a)){c=e[i]=null,j=!0;break}if(d.isDateOverlap(h,a)){b.isObject(a)?(a.inverted=!0,c=a):b.isArray(a)?(c=a,c[3]||c.push("inverted")):f.isDate(a)&&(c=[a.getFullYear(),a.getMonth(),a.getDate(),"inverted"]);break}}if(c)for(i=0;g>i;i+=1)if(d.isDateExact(e[i],a)){e[i]=null;break}if(j)for(i=0;g>i;i+=1)if(d.isDateOverlap(e[i],a)){e[i]=null;break}c&&e.push(c)}),e.filter(function(a){return null!=a})},c.prototype.nodes=function(a){var b=this,c=b.settings,g=b.item,h=g.now,i=g.select,j=g.highlight,k=g.view,l=g.disable,m=g.min,n=g.max,o=function(a){return c.firstDay&&a.push(a.shift()),f.node("thead",f.node("tr",f.group({min:0,max:d-1,i:1,node:"th",item:function(b){return[a[b],c.klass.weekdays]}})))}((c.showWeekdaysFull?c.weekdaysFull:c.weekdaysShort).slice(0)),p=function(a){return f.node("div"," ",c.klass["nav"+(a?"Next":"Prev")]+(a&&k.year>=n.year&&k.month>=n.month||!a&&k.year<=m.year&&k.month<=m.month?" "+c.klass.navDisabled:""),"data-nav="+(a||-1))},q=function(b){return c.selectMonths?f.node("select",f.group({min:0,max:11,i:1,node:"option",item:function(a){return[b[a],0,"value="+a+(k.month==a?" selected":"")+(k.year==m.year&&a<m.month||k.year==n.year&&a>n.month?" disabled":"")]}}),c.klass.selectMonth,a?"":"disabled"):f.node("div",b[k.month],c.klass.month)},r=function(){var b=k.year,d=c.selectYears===!0?5:~~(c.selectYears/2);if(d){var e=m.year,g=n.year,h=b-d,i=b+d;if(e>h&&(i+=e-h,h=e),i>g){var j=h-e,l=i-g;h-=j>l?l:j,i=g}return f.node("select",f.group({min:h,max:i,i:1,node:"option",item:function(a){return[a,0,"value="+a+(b==a?" selected":"")]}}),c.klass.selectYear,a?"":"disabled")}return f.node("div",b,c.klass.year)};return f.node("div",p()+p(1)+q(c.showMonthsShort?c.monthsShort:c.monthsFull)+r(),c.klass.header)+f.node("table",o+f.node("tbody",f.group({min:0,max:e-1,i:1,node:"tr",item:function(a){var e=c.firstDay&&0===b.create([k.year,k.month,1]).day?-7:0;return[f.group({min:d*a-k.day+e+1,max:function(){return this.min+d-1},i:1,node:"td",item:function(a){a=b.create([k.year,k.month,a+(c.firstDay?1:0)]);var d=i&&i.pick==a.pick,e=j&&j.pick==a.pick,g=l&&b.disabled(a)||a.pick<m.pick||a.pick>n.pick;return[f.node("div",a.date,function(b){return b.push(k.month==a.month?c.klass.infocus:c.klass.outfocus),h.pick==a.pick&&b.push(c.klass.now),d&&b.push(c.klass.selected),e&&b.push(c.klass.highlighted),g&&b.push(c.klass.disabled),b.join(" ")}([c.klass.day]),"data-pick="+a.pick+" "+f.ariaAttr({role:"button",controls:b.$node[0].id,checked:d&&b.$node[0].value===f.trigger(b.formats.toString,b,[c.format,a])?!0:null,activedescendant:e?!0:null,disabled:g?!0:null}))]}})]}})),c.klass.table)+f.node("div",f.node("button",c.today,c.klass.buttonToday,"type=button data-pick="+h.pick+(a?"":" disabled"))+f.node("button",c.clear,c.klass.buttonClear,"type=button data-clear=1"+(a?"":" disabled")),c.klass.footer)},c.defaults=function(a){return{monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],today:"Today",clear:"Clear",format:"d mmmm, yyyy",klass:{table:a+"table",header:a+"header",navPrev:a+"nav--prev",navNext:a+"nav--next",navDisabled:a+"nav--disabled",month:a+"month",year:a+"year",selectMonth:a+"select--month",selectYear:a+"select--year",weekdays:a+"weekday",day:a+"day",disabled:a+"day--disabled",selected:a+"day--selected",highlighted:a+"day--highlighted",now:a+"day--today",infocus:a+"day--infocus",outfocus:a+"day--outfocus",footer:a+"footer",buttonClear:a+"button--clear",buttonToday:a+"button--today"}}}(a.klasses().picker+"__"),a.extend("pickadate",c)});
/*!
 * Time picker for pickadate.js v3.4.0
 * http://amsul.github.io/pickadate.js/time.htm
 */
!function(a){"function"==typeof define&&define.amd?define(["picker","angular"],a):a(Picker,angular)}(function(a,b){function c(a,b){var c=this,d=a.$node[0].value,e=a.$node.data("value"),f=e||d,g=e?b.formatSubmit:b.format;c.settings=b,c.$node=a.$node,c.queue={interval:"i",min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse create validate",view:"parse create validate",disable:"deactivate",enable:"activate"},c.item={},c.item.interval=b.interval||30,c.item.disable=(b.disable||[]).slice(0),c.item.enable=-function(a){return a[0]===!0?a.shift():-1}(c.item.disable),c.set("min",b.min).set("max",b.max).set("now"),f?c.set("select",f,{format:g,fromValue:!!d}):c.set("select",null).set("highlight",c.item.now),c.key={40:1,38:-1,39:1,37:-1,go:function(a){c.set("highlight",c.item.highlight.pick+a*c.item.interval,{interval:a*c.item.interval}),this.render()}},a.on("render",function(){var c=a.$root.children(),d=c.find("."+b.klass.viewset);d.length&&(c[0].scrollTop=~~d.position().top-2*d[0].clientHeight)}).on("open",function(){a.$root.find("button").attr("disable",!1)}).on("close",function(){a.$root.find("button").attr("disable",!0)})}var d=24,e=60,f=12,g=d*e,h=a._;c.prototype.set=function(a,b,c){var d=this,e=d.item;return null===b?(e[a]=b,d):(e["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",e.select,c):"highlight"==a?d.set("view",e.highlight,c):"interval"==a?d.set("min",e.min,c).set("max",e.max,c):a.match(/^(flip|min|max|disable|enable)$/)&&("min"==a&&d.set("max",e.max,c),e.select&&d.disabled(e.select)&&d.set("select",e.select,c),e.highlight&&d.disabled(e.highlight)&&d.set("highlight",e.highlight,c)),d)},c.prototype.get=function(a){return this.item[a]},c.prototype.create=function(a,c,f){var i=this;return c=void 0===c?a:c,h.isDate(c)&&(c=[c.getHours(),c.getMinutes()]),b.isObject(c)&&h.isInteger(c.pick)?c=c.pick:b.isArray(c)?c=+c[0]*e+ +c[1]:h.isInteger(c)||(c=i.now(a,c,f)),"max"==a&&c<i.item.min.pick&&(c+=g),"min"!=a&&"max"!=a&&(c-i.item.min.pick)%i.item.interval!==0&&(c+=i.item.interval),c=i.normalize(a,c,f),{hour:~~(d+c/e)%d,mins:(e+c%e)%e,time:(g+c)%g,pick:c}},c.prototype.createRange=function(a,c){var d=this,e=function(a){return a===!0||b.isArray(a)||h.isDate(a)?d.create(a):a};return h.isInteger(a)||(a=e(a)),h.isInteger(c)||(c=e(c)),h.isInteger(a)&&b.isObject(c)?a=[c.hour,c.mins+a*d.settings.interval]:h.isInteger(c)&&b.isObject(a)&&(c=[a.hour,a.mins+c*d.settings.interval]),{from:e(a),to:e(c)}},c.prototype.withinRange=function(a,b){return a=this.createRange(a.from,a.to),b.pick>=a.from.pick&&b.pick<=a.to.pick},c.prototype.overlapRanges=function(a,b){var c=this;return a=c.createRange(a.from,a.to),b=c.createRange(b.from,b.to),c.withinRange(a,b.from)||c.withinRange(a,b.to)||c.withinRange(b,a.from)||c.withinRange(b,a.to)},c.prototype.now=function(a,b){var c,d=this.item.interval,f=new Date,g=f.getHours()*e+f.getMinutes(),i=h.isInteger(b);return g-=g%d,c=0>b&&-d>=d*b+g,g+="min"==a&&c?0:d,i&&(g+=d*(c&&"max"!=a?b+1:b)),g},c.prototype.normalize=function(a,b){var c=this.item.interval,d=this.item.min&&this.item.min.pick||0;return b-="min"==a?0:(b-d)%c},c.prototype.measure=function(a,c,f){var g=this;return c?c===!0||h.isInteger(c)?c=g.now(a,c,f):b.isObject(c)&&h.isInteger(c.pick)&&(c=g.normalize(a,c.pick,f)):c="min"==a?[0,0]:[d-1,e-1],c},c.prototype.validate=function(a,b,c){var d=this,e=c&&c.interval?c.interval:d.item.interval;return d.disabled(b)&&(b=d.shift(b,e)),b=d.scope(b),d.disabled(b)&&(b=d.shift(b,-1*e)),b},c.prototype.disabled=function(a){var c=this,d=c.item.disable.filter(function(d){return h.isInteger(d)?a.hour==d:b.isArray(d)||h.isDate(d)?a.pick==c.create(d).pick:b.isObject(d)?c.withinRange(d,a):void 0});return d=d.length&&!d.filter(function(a){return b.isArray(a)&&"inverted"==a[2]||b.isObject(a)&&a.inverted}).length,-1===c.item.enable?!d:d||a.pick<c.item.min.pick||a.pick>c.item.max.pick},c.prototype.shift=function(a,b){var c=this,d=c.item.min.pick,e=c.item.max.pick;for(b=b||c.item.interval;c.disabled(a)&&(a=c.create(a.pick+=b),!(a.pick<=d||a.pick>=e)););return a},c.prototype.scope=function(a){var b=this.item.min.pick,c=this.item.max.pick;return this.create(a.pick>c?c:a.pick<b?b:a)},c.prototype.parse=function(a,c,d){var f,g,i,j,k,l=this,m={};if(!c||h.isInteger(c)||b.isArray(c)||h.isDate(c)||b.isObject(c)&&h.isInteger(c.pick))return c;d&&d.format||(d=d||{},d.format=l.settings.format),l.formats.toArray(d.format).map(function(a){var b,d=l.formats[a],e=d?h.trigger(d,l,[c,m]):a.replace(/^!/,"").length;d&&(b=c.substr(0,e),m[a]=b.match(/^\d+$/)?+b:b),c=c.substr(e)});for(j in m)k=m[j],h.isInteger(k)?j.match(/^(h|hh)$/i)?(f=k,("h"==j||"hh"==j)&&(f%=12)):"i"==j&&(g=k):j.match(/^a$/i)&&k.match(/^p/i)&&("h"in m||"hh"in m)&&(i=!0);return(i?f+12:f)*e+g},c.prototype.formats={h:function(a,b){return a?h.digits(a):b.hour%f||f},hh:function(a,b){return a?2:h.lead(b.hour%f||f)},H:function(a,b){return a?h.digits(a):""+b.hour%24},HH:function(a,b){return a?h.digits(a):h.lead(b.hour%24)},i:function(a,b){return a?2:h.lead(b.mins)},a:function(a,b){return a?4:g/2>b.time%g?"a.m.":"p.m."},A:function(a,b){return a?2:g/2>b.time%g?"AM":"PM"},toArray:function(a){return a.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g)},toString:function(a,b){var c=this;return c.formats.toArray(a).map(function(a){return h.trigger(c.formats[a],c,[0,b])||a.replace(/^!/,"")}).join("")}},c.prototype.isTimeExact=function(a,c){var d=this;return h.isInteger(a)&&h.isInteger(c)||"boolean"==typeof a&&"boolean"==typeof c?a===c:(h.isDate(a)||b.isArray(a))&&(h.isDate(c)||b.isArray(c))?d.create(a).pick===d.create(c).pick:b.isObject(a)&&b.isObject(c)?d.isTimeExact(a.from,c.from)&&d.isTimeExact(a.to,c.to):!1},c.prototype.isTimeOverlap=function(a,c){var d=this;return h.isInteger(a)&&(h.isDate(c)||b.isArray(c))?a===d.create(c).hour:h.isInteger(c)&&(h.isDate(a)||b.isArray(a))?c===d.create(a).hour:b.isObject(a)&&b.isObject(c)?d.overlapRanges(a,c):!1},c.prototype.flipEnable=function(a){var b=this.item;b.enable=a||(-1==b.enable?1:-1)},c.prototype.deactivate=function(a,c){var d=this,e=d.item.disable.slice(0);return"flip"==c?d.flipEnable():c===!1?(d.flipEnable(1),e=[]):c===!0?(d.flipEnable(-1),e=[]):c.map(function(a){for(var c,f=0;f<e.length;f+=1)if(d.isTimeExact(a,e[f])){c=!0;break}c||(h.isInteger(a)||h.isDate(a)||b.isArray(a)||b.isObject(a)&&a.from&&a.to)&&e.push(a)}),e},c.prototype.activate=function(a,c){var d=this,e=d.item.disable,f=e.length;return"flip"==c?d.flipEnable():c===!0?(d.flipEnable(1),e=[]):c===!1?(d.flipEnable(-1),e=[]):c.map(function(a){var c,g,i,j;for(i=0;f>i;i+=1){if(g=e[i],d.isTimeExact(g,a)){c=e[i]=null,j=!0;break}if(d.isTimeOverlap(g,a)){b.isObject(a)?(a.inverted=!0,c=a):b.isArray(a)?(c=a,c[2]||c.push("inverted")):h.isDate(a)&&(c=[a.getFullYear(),a.getMonth(),a.getDate(),"inverted"]);break}}if(c)for(i=0;f>i;i+=1)if(d.isTimeExact(e[i],a)){e[i]=null;break}if(j)for(i=0;f>i;i+=1)if(d.isTimeOverlap(e[i],a)){e[i]=null;break}c&&e.push(c)}),e.filter(function(a){return null!=a})},c.prototype.i=function(a,b){return h.isInteger(b)&&b>0?b:this.item.interval},c.prototype.nodes=function(a){var b=this,c=b.settings,d=b.item.select,e=b.item.highlight,f=b.item.view,g=b.item.disable;return h.node("ul",h.group({min:b.item.min.pick,max:b.item.max.pick,i:b.item.interval,node:"li",item:function(a){a=b.create(a);var i=a.pick,j=d&&d.pick==i,k=e&&e.pick==i,l=g&&b.disabled(a);return[h.trigger(b.formats.toString,b,[h.trigger(c.formatLabel,b,[a])||c.format,a]),function(a){return j&&a.push(c.klass.selected),k&&a.push(c.klass.highlighted),f&&f.pick==i&&a.push(c.klass.viewset),l&&a.push(c.klass.disabled),a.join(" ")}([c.klass.listItem]),"data-pick="+a.pick+" "+h.ariaAttr({role:"button",controls:b.$node[0].id,checked:j&&b.$node.val()===h.trigger(b.formats.toString,b,[c.format,a])?!0:null,activedescendant:k?!0:null,disabled:l?!0:null})]}})+h.node("li",h.node("button",c.clear,c.klass.buttonClear,"type=button data-clear=1"+(a?"":" disable"))),c.klass.list)},c.defaults=function(a){return{clear:"Clear",format:"h:i A",interval:30,klass:{picker:a+" "+a+"--time",holder:a+"__holder",list:a+"__list",listItem:a+"__list-item",disabled:a+"__list-item--disabled",selected:a+"__list-item--selected",highlighted:a+"__list-item--highlighted",viewset:a+"__list-item--viewset",now:a+"__list-item--now",buttonClear:a+"__button--clear"}}}(a.klasses().picker),a.extend("pickatime",c)});
/*!
 * Legacy browser support
 */
[].map||(Array.prototype.map=function(a,b){for(var c=this,d=c.length,e=new Array(d),f=0;d>f;f++)f in c&&(e[f]=a.call(b,c[f],f,c));return e}),[].filter||(Array.prototype.filter=function(a){if(null==this)throw new TypeError;var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError;for(var d=[],e=arguments[1],f=0;c>f;f++)if(f in b){var g=b[f];a.call(e,g,f,b)&&d.push(g)}return d}),[].indexOf||(Array.prototype.indexOf=function(a){if(null==this)throw new TypeError;var b=Object(this),c=b.length>>>0;if(0===c)return-1;var d=0;if(arguments.length>1&&(d=Number(arguments[1]),d!=d?d=0:0!==d&&1/0!=d&&d!=-1/0&&(d=(d>0||-1)*Math.floor(Math.abs(d)))),d>=c)return-1;for(var e=d>=0?d:Math.max(c-Math.abs(d),0);c>e;e++)if(e in b&&b[e]===a)return e;return-1});/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * http://blog.stevenlevithan.com/archives/cross-browser-split
 */
var nativeSplit=String.prototype.split,compliantExecNpcg=void 0===/()??/.exec("")[1];String.prototype.split=function(a,b){var c=this;if("[object RegExp]"!==Object.prototype.toString.call(a))return nativeSplit.call(c,a,b);var d,e,f,g,h=[],i=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.extended?"x":"")+(a.sticky?"y":""),j=0;for(a=new RegExp(a.source,i+"g"),c+="",compliantExecNpcg||(d=new RegExp("^"+a.source+"$(?!\\s)",i)),b=void 0===b?-1>>>0:b>>>0;(e=a.exec(c))&&(f=e.index+e[0].length,!(f>j&&(h.push(c.slice(j,e.index)),!compliantExecNpcg&&e.length>1&&e[0].replace(d,function(){for(var a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(e[a]=void 0)}),e.length>1&&e.index<c.length&&Array.prototype.push.apply(h,e.slice(1)),g=e[0].length,j=f,h.length>=b)));)a.lastIndex===e.index&&a.lastIndex++;return j===c.length?(g||!a.test(""))&&h.push(""):h.push(c.slice(j)),h.length>b?h.slice(0,b):h};
angular.module("angular-datepicker",[]).directive("pickADate",function(){return{restrict:"A",scope:{pickADate:"=",pickADateOptions:"="},link:function(a,b){function c(c){if("function"==typeof f&&f.apply(this,arguments),!a.$$phase&&!a.$root.$$phase){var d=b.pickadate("picker").get("select");a.$apply(function(){return c.hasOwnProperty("clear")?void(a.pickADate=null):(a.pickADate&&"string"!=typeof a.pickADate||(a.pickADate=new Date(0)),a.pickADate.setYear(d.obj.getYear()+1900),a.pickADate.setMonth(d.obj.getMonth()),void a.pickADate.setDate(d.obj.getDate()))})}}function d(){if("function"==typeof g&&g.apply(this,arguments),"undefined"!=typeof cordova&&cordova.plugins&&cordova.plugins.Keyboard){var a=function(){cordova.plugins.Keyboard.close(),window.removeEventListener("native.keyboardshow",this)};window.addEventListener("native.keyboardshow",a),setTimeout(function(){window.removeEventListener("native.keyboardshow",a)},500)}}var e=a.pickADateOptions||{},f=e.onSet,g=e.onClose;b.pickadate(angular.extend(e,{onSet:c,onClose:d,container:document.body})),setTimeout(function(){a.pickADate&&b.pickadate("picker").set("select",a.pickADate)},1e3)}}}).directive("pickATime",function(){return{restrict:"A",scope:{pickATime:"=",pickATimeOptions:"="},link:function(a,b){function c(c){if("function"==typeof f&&f.apply(this,arguments),!a.$$phase&&!a.$root.$$phase){var d=b.pickatime("picker").get("select");a.$apply(function(){return c.hasOwnProperty("clear")?void(a.pickATime=null):(a.pickATime&&"string"!=typeof a.pickATime||(a.pickATime=new Date),a.pickATime.setHours(d.hour),a.pickATime.setMinutes(d.mins),a.pickATime.setSeconds(0),void a.pickATime.setMilliseconds(0))})}}function d(){if("function"==typeof g&&g.apply(this,arguments),"undefined"!=typeof cordova&&cordova.plugins&&cordova.plugins.Keyboard){var a=function(){cordova.plugins.Keyboard.close(),window.removeEventListener("native.keyboardshow",this)};window.addEventListener("native.keyboardshow",a),setTimeout(function(){window.removeEventListener("native.keyboardshow",a)},500)}}var e=a.pickATimeOptions||{},f=e.onSet,g=e.onClose;b.pickatime(angular.extend(e,{onSet:c,onClose:d,container:document.body})),setTimeout(function(){a.pickATime&&b.pickatime("picker").set("select",a.pickATime)},1e3)}}});
},{}],"/Users/Jimmy/code/hull/components/kwiz/node_modules/angular-schema-form/dist/schema-form.js":[function(require,module,exports){
// Deps is sort of a problem for us, maybe in the future we will ask the user to depend
// on modules for add-ons

var deps = ['ObjectPath'];
try {
  //This throws an expection if module does not exist.
  angular.module('ngSanitize');
  deps.push('ngSanitize');
} catch (e) {}

try {
  //This throws an expection if module does not exist.
  angular.module('ui.sortable');
  deps.push('ui.sortable');
} catch (e) {}

try {
  //This throws an expection if module does not exist.
  angular.module('angularSpectrumColorpicker');
  deps.push('angularSpectrumColorpicker');
} catch (e) {}

angular.module('schemaForm', deps);

angular.module('schemaForm').provider('sfPath',
['ObjectPathProvider', function(ObjectPathProvider) {
  var ObjectPath = {parse: ObjectPathProvider.parse};

  // if we're on Angular 1.2.x, we need to continue using dot notation
  if (angular.version.major === 1 && angular.version.minor < 3) {
    ObjectPath.stringify = function(arr) {
      return Array.isArray(arr) ? arr.join('.') : arr.toString();
    };
  } else {
    ObjectPath.stringify = ObjectPathProvider.stringify;
  }

  // We want this to use whichever stringify method is defined above,
  // so we have to copy the code here.
  ObjectPath.normalize = function(data, quote) {
    return ObjectPath.stringify(Array.isArray(data) ? data : ObjectPath.parse(data), quote);
  };

  this.parse = ObjectPath.parse;
  this.stringify = ObjectPath.stringify;
  this.normalize = ObjectPath.normalize;
  this.$get = function() {
    return ObjectPath;
  };
}]);

/**
 * @ngdoc service
 * @name sfSelect
 * @kind function
 *
 */
angular.module('schemaForm').factory('sfSelect', ['sfPath', function(sfPath) {
  var numRe = /^\d+$/;

  /**
    * @description
    * Utility method to access deep properties without
    * throwing errors when things are not defined.
    * Can also set a value in a deep structure, creating objects when missing
    * ex.
    * var foo = Select('address.contact.name',obj)
    * Select('address.contact.name',obj,'Leeroy')
    *
    * @param {string} projection A dot path to the property you want to get/set
    * @param {object} obj   (optional) The object to project on, defaults to 'this'
    * @param {Any}    valueToSet (opional)  The value to set, if parts of the path of
    *                 the projection is missing empty objects will be created.
    * @returns {Any|undefined} returns the value at the end of the projection path
    *                          or undefined if there is none.
    */
  return function(projection, obj, valueToSet) {
    if (!obj) {
      obj = this;
    }
    //Support [] array syntax
    var parts = typeof projection === 'string' ? sfPath.parse(projection) : projection;

    if (typeof valueToSet !== 'undefined' && parts.length === 1) {
      //special case, just setting one variable
      obj[parts[0]] = valueToSet;
      return obj;
    }

    if (typeof valueToSet !== 'undefined' &&
        typeof obj[parts[0]] === 'undefined') {
       // We need to look ahead to check if array is appropriate
      obj[parts[0]] = parts.length > 2 && numRe.test(parts[1]) ? [] : {};
    }

    var value = obj[parts[0]];
    for (var i = 1; i < parts.length; i++) {
      // Special case: We allow JSON Form syntax for arrays using empty brackets
      // These will of course not work here so we exit if they are found.
      if (parts[i] === '') {
        return undefined;
      }
      if (typeof valueToSet !== 'undefined') {
        if (i === parts.length - 1) {
          //last step. Let's set the value
          value[parts[i]] = valueToSet;
          return valueToSet;
        } else {
          // Make sure to create new objects on the way if they are not there.
          // We need to look ahead to check if array is appropriate
          var tmp = value[parts[i]];
          if (typeof tmp === 'undefined' || tmp === null) {
            tmp = numRe.test(parts[i + 1]) ? [] : {};
            value[parts[i]] = tmp;
          }
          value = tmp;
        }
      } else if (value) {
        //Just get nex value.
        value = value[parts[i]];
      }
    }
    return value;
  };
}]);

angular.module('schemaForm').provider('schemaFormDecorators',
['$compileProvider', 'sfPathProvider', function($compileProvider, sfPathProvider) {
  var defaultDecorator = '';
  var directives = {};

  var templateUrl = function(name, form) {
    //schemaDecorator is alias for whatever is set as default
    if (name === 'sfDecorator') {
      name = defaultDecorator;
    }

    var directive = directives[name];

    //rules first
    var rules = directive.rules;
    for (var i = 0; i < rules.length; i++) {
      var res = rules[i](form);
      if (res) {
        return res;
      }
    }

    //then check mapping
    if (directive.mappings[form.type]) {
      return directive.mappings[form.type];
    }

    //try default
    return directive.mappings['default'];
  };

  var createDirective = function(name, options) {
    $compileProvider.directive(name, ['$parse', '$compile', '$http', '$templateCache',
      function($parse,  $compile,  $http,  $templateCache) {

        return {
          restrict: 'AE',
          replace: false,
          transclude: false,
          scope: true,
          require: '?^sfSchema',
          link: function(scope, element, attrs, sfSchema) {
            //rebind our part of the form to the scope.
            var once = scope.$watch(attrs.form, function(form) {

              if (form) {
                scope.form  = form;

                //ok let's replace that template!
                //We do this manually since we need to bind ng-model properly and also
                //for fieldsets to recurse properly.
                var url = templateUrl(name, form);
                $http.get(url, {cache: $templateCache}).then(function(res) {
                  var key = form.key ?
                            sfPathProvider.stringify(form.key).replace(/"/g, '&quot;') : '';
                  var template = res.data.replace(
                    /\$\$value\$\$/g,
                    'model' + (key[0] !== '[' ? '.' : '') + key
                  );

                  if (options && options.className) {
                  	element.addClass(options.className);
                  }
                  element.html(template);
                  $compile(element.contents())(scope);
                });
                once();
              }
            });

            //Keep error prone logic from the template
            scope.showTitle = function() {
              return scope.form && scope.form.notitle !== true && scope.form.title;
            };

            scope.listToCheckboxValues = function(list) {
              var values = {};
              angular.forEach(list, function(v) {
                values[v] = true;
              });
              return values;
            };

            scope.checkboxValuesToList = function(values) {
              var lst = [];
              angular.forEach(values, function(v, k) {
                if (v) {
                  lst.push(k);
                }
              });
              return lst;
            };

            scope.buttonClick = function($event, form) {
              if (angular.isFunction(form.onClick)) {
                form.onClick($event, form);
              } else if (angular.isString(form.onClick)) {
                if (sfSchema) {
                  //evaluating in scope outside of sfSchemas isolated scope
                  sfSchema.evalInParentScope(form.onClick, {'$event': $event, form: form});
                } else {
                  scope.$eval(form.onClick, {'$event': $event, form: form});
                }
              }
            };

            /**
             * Evaluate an expression, i.e. scope.$eval
             * but do it in sfSchemas parent scope sf-schema directive is used
             * @param {string} expression
             * @param {Object} locals (optional)
             * @return {Any} the result of the expression
             */
            scope.evalExpr = function(expression, locals) {
              if (sfSchema) {
                //evaluating in scope outside of sfSchemas isolated scope
                return sfSchema.evalInParentScope(expression, locals);
              }

              return scope.$eval(expression, locals);
            };

            /**
             * Evaluate an expression, i.e. scope.$eval
             * in this decorators scope
             * @param {string} expression
             * @param {Object} locals (optional)
             * @return {Any} the result of the expression
             */
            scope.evalInScope = function(expression, locals) {
              if (expression) {
                return scope.$eval(expression, locals);
              }
            };

            /**
             * Error message handler
             * An error can either be a schema validation message or a angular js validtion
             * error (i.e. required)
             */
            scope.errorMessage = function(schemaError) {
              //User has supplied validation messages
              if (scope.form.validationMessage) {
                if (schemaError) {
                  if (angular.isString(scope.form.validationMessage)) {
                    return scope.form.validationMessage;
                  }

                  return scope.form.validationMessage[schemaError.code] ||
                         scope.form.validationMessage['default'];
                } else {
                  return scope.form.validationMessage.number ||
                         scope.form.validationMessage['default'] ||
                         scope.form.validationMessage;
                }
              }

              //No user supplied validation message.
              if (schemaError) {
                return schemaError.message; //use tv4.js validation message
              }

              //Otherwise we only have input number not being a number
              return 'Not a number';

            };
          }
        };
      }
    ]);
  };

  var createManualDirective = function(type, templateUrl, transclude) {
    transclude = angular.isDefined(transclude) ? transclude : false;
    $compileProvider.directive('sf' + angular.uppercase(type[0]) + type.substr(1), function() {
      return {
        restrict: 'EAC',
        scope: true,
        replace: true,
        transclude: transclude,
        template: '<sf-decorator form="form"></sf-decorator>',
        link: function(scope, element, attrs) {
          var watchThis = {
            'items': 'c',
            'titleMap': 'c',
            'schema': 'c'
          };
          var form = {type: type};
          var once = true;
          angular.forEach(attrs, function(value, name) {
            if (name[0] !== '$' && name.indexOf('ng') !== 0 && name !== 'sfField') {

              var updateForm = function(val) {
                if (angular.isDefined(val) && val !== form[name]) {
                  form[name] = val;

                  //when we have type, and if specified key we apply it on scope.
                  if (once && form.type && (form.key || angular.isUndefined(attrs.key))) {
                    scope.form = form;
                    once = false;
                  }
                }
              };

              if (name === 'model') {
                //"model" is bound to scope under the name "model" since this is what the decorators
                //know and love.
                scope.$watch(value, function(val) {
                  if (val && scope.model !== val) {
                    scope.model = val;
                  }
                });
              } else if (watchThis[name] === 'c') {
                //watch collection
                scope.$watchCollection(value, updateForm);
              } else {
                //$observe
                attrs.$observe(name, updateForm);
              }
            }
          });
        }
      };
    });
  };

  /**
   * Create a decorator directive and its sibling "manual" use directives.
   * The directive can be used to create form fields or other form entities.
   * It can be used in conjunction with <schema-form> directive in which case the decorator is
   * given it's configuration via a the "form" attribute.
   *
   * ex. Basic usage
   *   <sf-decorator form="myform"></sf-decorator>
   **
   * @param {string} name directive name (CamelCased)
   * @param {Object} mappings, an object that maps "type" => "templateUrl"
   * @param {Array}  rules (optional) a list of functions, function(form) {}, that are each tried in
   *                 turn,
   *                 if they return a string then that is used as the templateUrl. Rules come before
   *                 mappings.
   */
  this.createDecorator = function(name, mappings, rules, options) {
    directives[name] = {
      mappings: mappings || {},
      rules:    rules    || []
    };

    if (!directives[defaultDecorator]) {
      defaultDecorator = name;
    }
    createDirective(name, options);
  };

  /**
   * Creates a directive of a decorator
   * Usable when you want to use the decorators without using <schema-form> directive.
   * Specifically when you need to reuse styling.
   *
   * ex. createDirective('text','...')
   *  <sf-text title="foobar" model="person" key="name" schema="schema"></sf-text>
   *
   * @param {string}  type The type of the directive, resulting directive will have sf- prefixed
   * @param {string}  templateUrl
   * @param {boolean} transclude (optional) sets transclude option of directive, defaults to false.
   */
  this.createDirective = createManualDirective;

  /**
   * Same as createDirective, but takes an object where key is 'type' and value is 'templateUrl'
   * Useful for batching.
   * @param {Object} mappings
   */
  this.createDirectives = function(mappings) {
    angular.forEach(mappings, function(url, type) {
      createManualDirective(type, url);
    });
  };

  /**
   * Getter for directive mappings
   * Can be used to override a mapping or add a rule
   * @param {string} name (optional) defaults to defaultDecorator
   * @return {Object} rules and mappings { rules: [],mappings: {}}
   */
  this.directive = function(name) {
    name = name || defaultDecorator;
    return directives[name];
  };

  /**
   * Adds a mapping to an existing decorator.
   * @param {String} name Decorator name
   * @param {String} type Form type for the mapping
   * @param {String} url  The template url
   */
  this.addMapping = function(name, type, url) {
    if (directives[name]) {
      directives[name].mappings[type] = url;
    }
  };

  //Service is just a getter for directive mappings and rules
  this.$get = function() {
    return {
      directive: function(name) {
        return directives[name];
      },
      defaultDecorator: defaultDecorator
    };
  };

  //Create a default directive
  createDirective('sfDecorator');

}]);

/**
 * Schema form service.
 * This service is not that useful outside of schema form directive
 * but makes the code more testable.
 */
angular.module('schemaForm').provider('schemaForm',
['sfPathProvider', function(sfPathProvider) {

  //Creates an default titleMap list from an enum, i.e. a list of strings.
  var enumToTitleMap = function(enm) {
    var titleMap = []; //canonical titleMap format is a list.
    enm.forEach(function(name) {
      titleMap.push({name: name, value: name});
    });
    return titleMap;
  };

  // Takes a titleMap in either object or list format and returns one in
  // in the list format.
  var canonicalTitleMap = function(titleMap, originalEnum) {
    if (!angular.isArray(titleMap)) {
      var canonical = [];
      if (originalEnum) {
        angular.forEach(originalEnum, function(value, index) {
          canonical.push({name: titleMap[value], value: value});
        });
      } else {
        angular.forEach(titleMap, function(name, value) {
          canonical.push({name: name, value: value});
        });
      }
      return canonical;
    }
    return titleMap;
  };

  var defaultFormDefinition = function(name, schema, options) {
    var rules = defaults[schema.type];
    if (rules) {
      var def;
      for (var i = 0; i < rules.length; i++) {
        def = rules[i](name, schema, options);
        //first handler in list that actually returns something is our handler!
        if (def) {
          return def;
        }
      }
    }
  };

  //Creates a form object with all common properties
  var stdFormObj = function(name, schema, options) {
    options = options || {};
    var f = options.global && options.global.formDefaults ?
            angular.copy(options.global.formDefaults) : {};
    if (options.global && options.global.supressPropertyTitles === true) {
      f.title = schema.title;
    } else {
      f.title = schema.title || name;
    }

    if (schema.description) { f.description = schema.description; }
    if (options.required === true || schema.required === true) { f.required = true; }
    if (schema.maxLength) { f.maxlength = schema.maxLength; }
    if (schema.minLength) { f.minlength = schema.maxLength; }
    if (schema.readOnly || schema.readonly) { f.readonly  = true; }
    if (schema.minimum) { f.minimum = schema.minimum + (schema.exclusiveMinimum ? 1 : 0); }
    if (schema.maximum) { f.maximum = schema.maximum - (schema.exclusiveMaximum ? 1 : 0); }

    //Non standard attributes
    if (schema.validationMessage) { f.validationMessage = schema.validationMessage; }
    if (schema.enumNames) { f.titleMap = canonicalTitleMap(schema.enumNames, schema['enum']); }
    f.schema = schema;

    // Ng model options doesn't play nice with undefined, might be defined
    // globally though
    f.ngModelOptions = f.ngModelOptions || {};
    return f;
  };

  var text = function(name, schema, options) {
    if (schema.type === 'string' && !schema['enum']) {
      var f = stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'text';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  //default in json form for number and integer is a text field
  //input type="number" would be more suitable don't ya think?
  var number = function(name, schema, options) {
    if (schema.type === 'number') {
      var f = stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'number';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  var integer = function(name, schema, options) {
    if (schema.type === 'integer') {
      var f = stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'number';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  var checkbox = function(name, schema, options) {
    if (schema.type === 'boolean') {
      var f = stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'checkbox';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  var select = function(name, schema, options) {
    if (schema.type === 'string' && schema['enum']) {
      var f = stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'select';
      if (!f.titleMap) {
        f.titleMap = enumToTitleMap(schema['enum']);
      }
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  var checkboxes = function(name, schema, options) {
    if (schema.type === 'array' && schema.items && schema.items['enum']) {
      var f = stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'checkboxes';
      if (!f.titleMap) {
        f.titleMap = enumToTitleMap(schema.items['enum']);
      }
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

  var fieldset = function(name, schema, options) {
    if (schema.type === 'object') {
      var f   = stdFormObj(name, schema, options);
      f.type  = 'fieldset';
      f.items = [];
      options.lookup[sfPathProvider.stringify(options.path)] = f;

      //recurse down into properties
      angular.forEach(schema.properties, function(v, k) {
        var path = options.path.slice();
        path.push(k);
        if (options.ignore[sfPathProvider.stringify(path)] !== true) {
          var required = schema.required && schema.required.indexOf(k) !== -1;

          var def = defaultFormDefinition(k, v, {
            path: path,
            required: required || false,
            lookup: options.lookup,
            ignore: options.ignore
          });
          if (def) {
            f.items.push(def);
          }
        }
      });

      return f;
    }

  };

  var array = function(name, schema, options) {

    if (schema.type === 'array') {
      var f   = stdFormObj(name, schema, options);
      f.type  = 'array';
      f.key   = options.path;
      options.lookup[sfPathProvider.stringify(options.path)] = f;

      var required = schema.required &&
                     schema.required.indexOf(options.path[options.path.length - 1]) !== -1;

      // The default is to always just create one child. This works since if the
      // schemas items declaration is of type: "object" then we get a fieldset.
      // We also follow json form notatation, adding empty brackets "[]" to
      // signify arrays.

      var arrPath = options.path.slice();
      arrPath.push('');

      f.items = [defaultFormDefinition(name, schema.items, {
        path: arrPath,
        required: required || false,
        lookup: options.lookup,
        ignore: options.ignore,
        global: options.global
      })];

      return f;
    }

  };

  //First sorted by schema type then a list.
  //Order has importance. First handler returning an form snippet will be used.
  var defaults = {
    string:  [select, text],
    object:  [fieldset],
    number:  [number],
    integer: [integer],
    boolean: [checkbox],
    array:   [checkboxes, array]
  };

  var postProcessFn = function(form) { return form; };

  /**
   * Provider API
   */
  this.defaults              = defaults;
  this.stdFormObj            = stdFormObj;
  this.defaultFormDefinition = defaultFormDefinition;

  /**
   * Register a post process function.
   * This function is called with the fully merged
   * form definition (i.e. after merging with schema)
   * and whatever it returns is used as form.
   */
  this.postProcess = function(fn) {
    postProcessFn = fn;
  };

  /**
   * Append default form rule
   * @param {string}   type json schema type
   * @param {Function} rule a function(propertyName,propertySchema,options) that returns a form
   *                        definition or undefined
   */
  this.appendRule = function(type, rule) {
    if (!defaults[type]) {
      defaults[type] = [];
    }
    defaults[type].push(rule);
  };

  /**
   * Prepend default form rule
   * @param {string}   type json schema type
   * @param {Function} rule a function(propertyName,propertySchema,options) that returns a form
   *                        definition or undefined
   */
  this.prependRule = function(type, rule) {
    if (!defaults[type]) {
      defaults[type] = [];
    }
    defaults[type].unshift(rule);
  };

  /**
   * Utility function to create a standard form object.
   * This does *not* set the type of the form but rather all shared attributes.
   * You probably want to start your rule with creating the form with this method
   * then setting type and any other values you need.
   * @param {Object} schema
   * @param {Object} options
   * @return {Object} a form field defintion
   */
  this.createStandardForm = stdFormObj;
  /* End Provider API */

  this.$get = function() {

    var service = {};

    service.merge = function(schema, form, ignore, options, readonly) {
      form  = form || ['*'];
      options = options || {};

      // Get readonly from root object
      readonly = readonly || schema.readonly || schema.readOnly;

      var stdForm = service.defaults(schema, ignore, options);

      //simple case, we have a "*", just put the stdForm there
      var idx = form.indexOf('*');
      if (idx !== -1) {
        form  = form.slice(0, idx)
                    .concat(stdForm.form)
                    .concat(form.slice(idx + 1));
      }

      //ok let's merge!
      //We look at the supplied form and extend it with schema standards
      var lookup = stdForm.lookup;

      return postProcessFn(form.map(function(obj) {

        //handle the shortcut with just a name
        if (typeof obj === 'string') {
          obj = {key: obj};
        }

        if (obj.key) {
          if (typeof obj.key === 'string') {
            obj.key = sfPathProvider.parse(obj.key);
          }
        }

        //If it has a titleMap make sure it's a list
        if (obj.titleMap) {
          obj.titleMap = canonicalTitleMap(obj.titleMap);
        }

        //
        if (obj.itemForm) {
          obj.items = [];
          var str = sfPathProvider.stringify(obj.key);
          var stdForm = lookup[str];
          angular.forEach(stdForm.items, function(item) {
            var o = angular.copy(obj.itemForm);
            o.key = item.key;
            obj.items.push(o);
          });
        }

        //extend with std form from schema.

        if (obj.key) {
          var strid = sfPathProvider.stringify(obj.key);
          if (lookup[strid]) {
            obj = angular.extend(lookup[strid], obj);
          }
        }

        // Are we inheriting readonly?
        if (readonly === true) { // Inheriting false is not cool.
          obj.readonly = true;
        }

        //if it's a type with items, merge 'em!
        if (obj.items) {
          obj.items = service.merge(schema, obj.items, ignore, options, obj.readonly);
        }

        //if its has tabs, merge them also!
        if (obj.tabs) {
          angular.forEach(obj.tabs, function(tab) {
            tab.items = service.merge(schema, tab.items, ignore, options, obj.readonly);
          });
        }

        // Special case: checkbox
        // Since have to ternary state we need a default
        if (obj.type === 'checkbox' && angular.isUndefined(obj.schema['default'])) {
          obj.schema['default'] = false;
        }

        return obj;
      }));
    };

    /**
     * Create form defaults from schema
     */
    service.defaults = function(schema, ignore, globalOptions) {
      var form   = [];
      var lookup = {}; //Map path => form obj for fast lookup in merging
      ignore = ignore || {};
      globalOptions = globalOptions || {};

      if (schema.type === 'object') {
        angular.forEach(schema.properties, function(v, k) {
          if (ignore[k] !== true) {
            var required = schema.required && schema.required.indexOf(k) !== -1;
            var def = defaultFormDefinition(k, v, {
              path: [k],         // Path to this property in bracket notation.
              lookup: lookup,    // Extra map to register with. Optimization for merger.
              ignore: ignore,    // The ignore list of paths (sans root level name)
              required: required, // Is it required? (v4 json schema style)
              global: globalOptions // Global options, including form defaults
            });
            if (def) {
              form.push(def);
            }
          }
        });

      } else {
        throw new Error('Not implemented. Only type "object" allowed at root level of schema.');
      }
      return {form: form, lookup: lookup};
    };

    //Utility functions
    /**
     * Traverse a schema, applying a function(schema,path) on every sub schema
     * i.e. every property of an object.
     */
    service.traverseSchema = function(schema, fn, path, ignoreArrays) {
      ignoreArrays = angular.isDefined(ignoreArrays) ? ignoreArrays : true;

      path = path || [];

      var traverse = function(schema, fn, path) {
        fn(schema, path);
        angular.forEach(schema.properties, function(prop, name) {
          var currentPath = path.slice();
          currentPath.push(name);
          traverse(prop, fn, currentPath);
        });

        //Only support type "array" which have a schema as "items".
        if (!ignoreArrays && schema.items) {
          var arrPath = path.slice(); arrPath.push('');
          traverse(schema.items, fn, arrPath);
        }
      };

      traverse(schema, fn, path || []);
    };

    service.traverseForm = function(form, fn) {
      fn(form);
      angular.forEach(form.items, function(f) {
        service.traverseForm(f, fn);
      });

      if (form.tabs) {
        angular.forEach(form.tabs, function(tab) {
          angular.forEach(tab.items, function(f) {
            service.traverseForm(f, fn);
          });
        });
      }
    };

    return service;
  };

}]);

/*  Common code for validating a value against its form and schema definition */
/* global tv4 */
angular.module('schemaForm').factory('sfValidator', [function() {

  var validator = {};

  /**
   * Validate a value against its form definition and schema.
   * The value should either be of proper type or a string, some type
   * coercion is applied.
   *
   * @param {Object} form A merged form definition, i.e. one with a schema.
   * @param {Any} value the value to validate.
   * @return a tv4js result object.
   */
  validator.validate = function(form, value) {
    if (!form) {
      return {valid: true};
    }
    var schema = form.schema;

    if (!schema) {
      return {valid: true};
    }

    // Input of type text and textareas will give us a viewValue of ''
    // when empty, this is a valid value in a schema and does not count as something
    // that breaks validation of 'required'. But for our own sanity an empty field should
    // not validate if it's required.
    if (value === '') {
      value = undefined;
    }

    // Numbers fields will give a null value, which also means empty field
    if (form.type === 'number' && value === null) {
      value = undefined;
    }

    // Version 4 of JSON Schema has the required property not on the
    // property itself but on the wrapping object. Since we like to test
    // only this property we wrap it in a fake object.
    var wrap = {type: 'object', 'properties': {}};
    var propName = form.key[form.key.length - 1];
    wrap.properties[propName] = schema;

    if (form.required) {
      wrap.required = [propName];
    }
    var valueWrap = {};
    if (angular.isDefined(value)) {
      valueWrap[propName] = value;
    }
    return tv4.validateResult(valueWrap, wrap);

  };

  return validator;
}]);

/**
 * Directive that handles the model arrays
 */
angular.module('schemaForm').directive('sfArray', ['sfSelect', 'schemaForm', 'sfValidator',
  function(sfSelect, schemaForm, sfValidator) {

    var setIndex = function(index) {
      return function(form) {
        if (form.key) {
          form.key[form.key.indexOf('')] = index;
        }
      };
    };

    return {
      restrict: 'A',
      scope: true,
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        var formDefCache = {};

        // Watch for the form definition and then rewrite it.
        // It's the (first) array part of the key, '[]' that needs a number
        // corresponding to an index of the form.
        var once = scope.$watch(attrs.sfArray, function(form) {

          // An array model always needs a key so we know what part of the model
          // to look at. This makes us a bit incompatible with JSON Form, on the
          // other hand it enables two way binding.
          var list = sfSelect(form.key, scope.model);

          // Since ng-model happily creates objects in a deep path when setting a
          // a value but not arrays we need to create the array.
          if (angular.isUndefined(list)) {
            list = [];
            sfSelect(form.key, scope.model, list);
          }
          scope.modelArray = list;

          // Arrays with titleMaps, i.e. checkboxes doesn't have items.
          if (form.items) {

            // To be more compatible with JSON Form we support an array of items
            // in the form definition of "array" (the schema just a value).
            // for the subforms code to work this means we wrap everything in a
            // section. Unless there is just one.
            var subForm = form.items[0];
            if (form.items.length > 1) {
              subForm = {
                type: 'section',
                items: form.items.map(function(item){
                  item.ngModelOptions = form.ngModelOptions;
                  item.readonly = form.readonly;
                  return item;
                })
              };
            }

          }

          // We ceate copies of the form on demand, caching them for
          // later requests
          scope.copyWithIndex = function(index) {
            if (!formDefCache[index]) {
              if (subForm) {
                var copy = angular.copy(subForm);
                copy.arrayIndex = index;
                schemaForm.traverseForm(copy, setIndex(index));
                formDefCache[index] = copy;
              }
            }
            return formDefCache[index];
          };

          scope.appendToArray = function() {
            var len = list.length;
            var copy = scope.copyWithIndex(len);
            schemaForm.traverseForm(copy, function(part) {
              if (part.key && angular.isDefined(part['default'])) {
                sfSelect(part.key, scope.model, part['default']);
              }
            });

            // If there are no defaults nothing is added so we need to initialize
            // the array. undefined for basic values, {} or [] for the others.
            if (len === list.length) {
              var type = sfSelect('schema.items.type', form);
              var dflt;
              if (type === 'object') {
                dflt = {};
              } else if (type === 'array') {
                dflt = [];
              }
              list.push(dflt);
            }

            // Trigger validation.
            if (scope.validateArray) {
              scope.validateArray();
            }
            return list;
          };

          scope.deleteFromArray = function(index) {
            list.splice(index, 1);

            // Trigger validation.
            if (scope.validateArray) {
              scope.validateArray();
            }
            return list;
          };

          // Always start with one empty form unless configured otherwise.
          // Special case: don't do it if form has a titleMap
          if (!form.titleMap && form.startEmpty !== true && list.length === 0) {
            scope.appendToArray();
          }

          // Title Map handling
          // If form has a titleMap configured we'd like to enable looping over
          // titleMap instead of modelArray, this is used for intance in
          // checkboxes. So instead of variable number of things we like to create
          // a array value from a subset of values in the titleMap.
          // The problem here is that ng-model on a checkbox doesn't really map to
          // a list of values. This is here to fix that.
          if (form.titleMap && form.titleMap.length > 0) {
            scope.titleMapValues = [];

            // We watch the model for changes and the titleMapValues to reflect
            // the modelArray
            var updateTitleMapValues = function(arr) {
              scope.titleMapValues = [];
              arr = arr || [];

              form.titleMap.forEach(function(item) {
                scope.titleMapValues.push(arr.indexOf(item.value) !== -1);
              });

            };
            //Catch default values
            updateTitleMapValues(scope.modelArray);
            scope.$watchCollection('modelArray', updateTitleMapValues);

            //To get two way binding we also watch our titleMapValues
            scope.$watchCollection('titleMapValues', function(vals) {
              if (vals) {
                var arr = scope.modelArray;

                // Apparently the fastest way to clear an array, readable too.
                // http://jsperf.com/array-destroy/32
                while (arr.length > 0) {
                  arr.shift();
                }

                form.titleMap.forEach(function(item, index) {
                  if (vals[index]) {
                    arr.push(item.value);
                  }
                });

              }
            });
          }

          // If there is a ngModel present we need to validate when asked.
          if (ngModel) {
            var error;

            scope.validateArray = function() {
              // The actual content of the array is validated by each field
              // so we settle for checking validations specific to arrays

              // Since we prefill with empty arrays we can get the funny situation
              // where the array is required but empty in the gui but still validates.
              // Thats why we check the length.
              var result = sfValidator.validate(
                form,
                scope.modelArray.length > 0 ? scope.modelArray : undefined
              );
              if (result.valid === false &&
                  result.error &&
                  (result.error.dataPath === '' ||
                  result.error.dataPath === '/' + form.key[form.key.length - 1])) {

                // Set viewValue to trigger $dirty on field. If someone knows a
                // a better way to do it please tell.
                ngModel.$setViewValue(scope.modelArray);
                error = result.error;
                ngModel.$setValidity('schema', false);

              } else {
                ngModel.$setValidity('schema', true);
              }
            };

            scope.$on('schemaFormValidate', scope.validateArray);

            scope.hasSuccess = function() {
              return ngModel.$valid && !ngModel.$pristine;
            };

            scope.hasError = function() {
              return ngModel.$invalid;
            };

            scope.schemaError = function() {
              return error;
            };

          }

          once();
        });
      }
    };
  }
]);

/**
 * A version of ng-changed that only listens if
 * there is actually a onChange defined on the form
 *
 * Takes the form definition as argument.
 * If the form definition has a "onChange" defined as either a function or
 */
angular.module('schemaForm').directive('sfChanged', function() {
  return {
    require: 'ngModel',
    restrict: 'AC',
    scope: false,
    link: function(scope, element, attrs, ctrl) {
      var form = scope.$eval(attrs.sfChanged);
      //"form" is really guaranteed to be here since the decorator directive
      //waits for it. But best be sure.
      if (form && form.onChange) {
        ctrl.$viewChangeListeners.push(function() {
          if (angular.isFunction(form.onChange)) {
            form.onChange(ctrl.$modelValue, form);
          } else {
            scope.evalExpr(form.onChange, {'modelValue': ctrl.$modelValue, form: form});
          }
        });
      }
    }
  };
});

/*
FIXME: real documentation
<form sf-form="form"  sf-schema="schema" sf-decorator="foobar"></form>
*/

angular.module('schemaForm')
       .directive('sfSchema',
['$compile', 'schemaForm', 'schemaFormDecorators', 'sfSelect',
  function($compile,  schemaForm,  schemaFormDecorators, sfSelect) {

    var SNAKE_CASE_REGEXP = /[A-Z]/g;
    var snakeCase = function(name, separator) {
      separator = separator || '_';
      return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
        return (pos ? separator : '') + letter.toLowerCase();
      });
    };

    return {
      scope: {
        schema: '=sfSchema',
        initialForm: '=sfForm',
        model: '=sfModel',
        options: '=sfOptions'
      },
      controller: ['$scope', function($scope) {
        this.evalInParentScope = function(expr, locals) {
          return $scope.$parent.$eval(expr, locals);
        };
      }],
      replace: false,
      restrict: 'A',
      transclude: true,
      require: '?form',
      link: function(scope, element, attrs, formCtrl, transclude) {

        //expose form controller on scope so that we don't force authors to use name on form
        scope.formCtrl = formCtrl;

        //We'd like to handle existing markup,
        //besides using it in our template we also
        //check for ng-model and add that to an ignore list
        //i.e. even if form has a definition for it or form is ["*"]
        //we don't generate it.
        var ignore = {};
        transclude(scope, function(clone) {
          clone.addClass('schema-form-ignore');
          element.prepend(clone);

          if (element[0].querySelectorAll) {
            var models = element[0].querySelectorAll('[ng-model]');
            if (models) {
              for (var i = 0; i < models.length; i++) {
                var key = models[i].getAttribute('ng-model');
                //skip first part before .
                ignore[key.substring(key.indexOf('.') + 1)] = true;
              }
            }
          }
        });
        //Since we are dependant on up to three
        //attributes we'll do a common watch
        var lastDigest = {};

        scope.$watch(function() {

          var schema = scope.schema;
          var form   = scope.initialForm || ['*'];

          //The check for schema.type is to ensure that schema is not {}
          if (form && schema && schema.type &&
              (lastDigest.form !== form || lastDigest.schema !== schema) &&
              Object.keys(schema.properties).length > 0) {
            lastDigest.schema = schema;
            lastDigest.form = form;

            var merged = schemaForm.merge(schema, form, ignore, scope.options);
            var frag = document.createDocumentFragment();

            //make the form available to decorators
            scope.schemaForm  = {form:  merged, schema: schema};

            //clean all but pre existing html.
            element.children(':not(.schema-form-ignore)').remove();

            //Create directives from the form definition
            angular.forEach(merged,function(obj,i){
              var n = document.createElement(attrs.sfDecorator || snakeCase(schemaFormDecorators.defaultDecorator,'-'));
              n.setAttribute('form','schemaForm.form['+i+']');
              var slot;
              try {
                slot = element[0].querySelector('*[sf-insert-field="' + obj.key + '"]');
              } catch(err) {
                // field insertion not supported for complex keys
                slot = null;
              }
              if(slot) {
                slot.innerHTML = "";
                slot.appendChild(n);  
              } else {
                frag.appendChild(n);
              }
            });

            element[0].appendChild(frag);

            //compile only children
            $compile(element.children())(scope);

            //ok, now that that is done let's set any defaults
            schemaForm.traverseSchema(schema, function(prop, path) {
              if (angular.isDefined(prop['default'])) {
                var val = sfSelect(path, scope.model);
                if (angular.isUndefined(val)) {
                  sfSelect(path, scope.model, prop['default']);
                }
              }
            });
          }
        });
      }
    };
  }
]);

angular.module('schemaForm').directive('schemaValidate', ['sfValidator', function(sfValidator) {
  return {
    restrict: 'A',
    scope: false,
    // We want the link function to be *after* the input directives link function so we get access
    // the parsed value, ex. a number instead of a string
    priority: 1000,
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      //Since we have scope false this is the same scope
      //as the decorator
      scope.ngModel = ngModel;

      var error = null;

      var getForm = function() {
        if (!form) {
          form = scope.$eval(attrs.schemaValidate);
        }
        return form;
      };
      var form   = getForm();

      // Validate against the schema.

      // Get in last of the parses so the parsed value has the correct type.
      if (ngModel.$validators) { // Angular 1.3
        ngModel.$validators.schema = function(value) {
          var result = sfValidator.validate(getForm(), value);
          error = result.error;
          return result.valid;
        };
      } else {

        // Angular 1.2
        ngModel.$parsers.push(function(viewValue) {
          form = getForm();
          //Still might be undefined
          if (!form) {
            return viewValue;
          }

          var result =  sfValidator.validate(form, viewValue);

          if (result.valid) {
            // it is valid
            ngModel.$setValidity('schema', true);
            return viewValue;
          } else {
            // it is invalid, return undefined (no model update)
            ngModel.$setValidity('schema', false);
            error = result.error;
            return undefined;
          }
        });
      }


      // Listen to an event so we can validate the input on request
      scope.$on('schemaFormValidate', function() {

        if (ngModel.$validate) {
          ngModel.$validate();
          if (ngModel.$invalid) { // The field must be made dirty so the error message is displayed
            ngModel.$dirty = true;
            ngModel.$pristine = false;
          }
        } else {
          ngModel.$setViewValue(ngModel.$viewValue);
        }
      });

      //This works since we now we're inside a decorator and that this is the decorators scope.
      //If $pristine and empty don't show success (even if it's valid)
      scope.hasSuccess = function() {
        return ngModel.$valid && (!ngModel.$pristine || !ngModel.$isEmpty(ngModel.$modelValue));
      };

      scope.hasError = function() {
        return ngModel.$invalid && !ngModel.$pristine;
      };

      scope.schemaError = function() {
        return error;
      };

    }
  };
}]);

},{}],"/Users/Jimmy/code/hull/components/kwiz/node_modules/browserify/lib/_empty.js":[function(require,module,exports){

},{}],"/Users/Jimmy/code/hull/components/kwiz/node_modules/browserify/node_modules/path-browserify/index.js":[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":"/Users/Jimmy/code/hull/components/kwiz/node_modules/browserify/node_modules/process/browser.js"}],"/Users/Jimmy/code/hull/components/kwiz/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"/Users/Jimmy/code/hull/components/kwiz/node_modules/messageformat/messageformat.js":[function(require,module,exports){
(function (__dirname){
/**
 * messageformat.js
 *
 * ICU PluralFormat + SelectFormat for JavaScript
 * 
 * Copyright 2014
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Alex Sexton - @SlexAxton
 * @version 0.1.7
 * @contributor_license Dojo CLA
 */

(function ( root ) {

  function MessageFormat ( locale, pluralFunc, globalName ) {
    var lc = locale || 'en', lcFile;
    if ( pluralFunc ) {
      MessageFormat.locale[lc] = pluralFunc;
    } else {
      while ( lc && ! MessageFormat.locale.hasOwnProperty( lc ) ) {
        lc = lc.replace(/[-_]?[^-_]*$/, '');
      }
      if ( ! lc ) {
        lc = locale.replace(/[-_].*$/, '');
        MessageFormat.loadLocale(lc);
      }
    }
    this.lc = lc;  // used in 'elementFormat'
    this.globalName = globalName || 'i18n';
  }

  if ( !('locale' in MessageFormat) ) MessageFormat.locale = {};

  MessageFormat.loadLocale = function ( lc ) {
    try {
      var lcFile = require('path').join(__dirname, 'locale', lc + '.js'),
          lcStr = ('' + require('fs').readFileSync(lcFile)).match(/{[^]*}/);
      if (!lcStr) throw "no function found in file '" + lcFile + "'";
      MessageFormat.locale[lc] = 'function(n)' + lcStr;
    } catch (ex) {
      if ( lc == 'en' ) {
        MessageFormat.locale[lc] = 'function(n){return n===1?"one":"other"}';
      } else {
        ex.message = 'Locale ' + lc + ' could not be loaded: ' + ex.message;
        throw ex;
      }
    }
  };

  MessageFormat.prototype.functions = function () {
    var l = [];
    for ( var lc in MessageFormat.locale ) {
      if ( MessageFormat.locale.hasOwnProperty(lc) ) {
        l.push(JSON.stringify(lc) + ':' + MessageFormat.locale[lc].toString().trim());
      }
    }
    return '{lc:{' + l.join(',') + '},\n'
      + 'c:function(d,k){if(!d)throw new Error("MessageFormat: Data required for \'"+k+"\'.")},\n'
      + 'n:function(d,k,o){if(isNaN(d[k]))throw new Error("MessageFormat: \'"+k+"\' isn\'t a number.");return d[k]-(o||0)},\n'
      + 'v:function(d,k){' + this.globalName + '.c(d,k);return d[k]},\n'
      + 'p:function(d,k,o,l,p){' + this.globalName + '.c(d,k);return d[k] in p?p[d[k]]:(k=' + this.globalName + '.lc[l](d[k]-o),k in p?p[k]:p.other)},\n'
      + 's:function(d,k,p){' + this.globalName + '.c(d,k);return d[k] in p?p[d[k]]:p.other}}';
  };

  // This is generated and pulled in for browsers.
  var mparser = (function() {
    /*
     * Generated by PEG.js 0.8.0.
     *
     * http://pegjs.majda.cz/
     */
  
    function peg$subclass(child, parent) {
      function ctor() { this.constructor = child; }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }
  
    function SyntaxError(message, expected, found, offset, line, column) {
      this.message  = message;
      this.expected = expected;
      this.found    = found;
      this.offset   = offset;
      this.line     = line;
      this.column   = column;
  
      this.name     = "SyntaxError";
    }
  
    peg$subclass(SyntaxError, Error);
  
    function parse(input) {
      var options = arguments.length > 1 ? arguments[1] : {},
  
          peg$FAILED = {},
  
          peg$startRuleFunctions = { start: peg$parsestart },
          peg$startRuleFunction  = peg$parsestart,
  
          peg$c0 = function(messageFormatPattern) { return { type: "program", program: messageFormatPattern }; },
          peg$c1 = peg$FAILED,
          peg$c2 = [],
          peg$c3 = function(s1, inner) {
              var st = [];
              if ( s1 && s1.val ) {
                st.push( s1 );
              }
              for( var i in inner ){
                if ( inner.hasOwnProperty( i ) ) {
                  st.push( inner[ i ] );
                }
              }
              return { type: 'messageFormatPattern', statements: st };
            },
          peg$c4 = "{",
          peg$c5 = { type: "literal", value: "{", description: "\"{\"" },
          peg$c6 = "}",
          peg$c7 = { type: "literal", value: "}", description: "\"}\"" },
          peg$c8 = function(mfe, s1) {
              var res = [];
              if ( mfe ) {
                res.push(mfe);
              }
              if ( s1 && s1.val ) {
                res.push( s1 );
              }
              return { type: "messageFormatPatternRight", statements : res };
            },
          peg$c9 = null,
          peg$c10 = ",",
          peg$c11 = { type: "literal", value: ",", description: "\",\"" },
          peg$c12 = function(argIdx, efmt) {
              var res = { 
                type: "messageFormatElement",
                argumentIndex: argIdx
              };
              if ( efmt && efmt.length ) {
                res.elementFormat = efmt[1];
              }
              else {
                res.output = true;
              }
              return res;
            },
          peg$c13 = "plural",
          peg$c14 = { type: "literal", value: "plural", description: "\"plural\"" },
          peg$c15 = function(t, s) {
              return {
                type : "elementFormat",
                key  : t,
                val  : s.val
              };
            },
          peg$c16 = "select",
          peg$c17 = { type: "literal", value: "select", description: "\"select\"" },
          peg$c18 = function(pfp) {
              return { type: "pluralStyle", val: pfp };
            },
          peg$c19 = function(sfp) {
              return { type: "selectStyle", val: sfp };
            },
          peg$c20 = function(op, pf) {
              var res = {
                type: "pluralFormatPattern",
                pluralForms: pf
              };
              if ( op ) {
                res.offset = op;
              }
              else {
                res.offset = 0;
              }
              return res;
            },
          peg$c21 = "offset",
          peg$c22 = { type: "literal", value: "offset", description: "\"offset\"" },
          peg$c23 = ":",
          peg$c24 = { type: "literal", value: ":", description: "\":\"" },
          peg$c25 = function(d) {
              return d;
            },
          peg$c26 = function(pf) {
              return {
                type: "selectFormatPattern",
                pluralForms: pf
              };
            },
          peg$c27 = function(k, mfp) {
              return {
                type: "pluralForms",
                key: k,
                val: mfp
              };
            },
          peg$c28 = function(i) {
              return i;
            },
          peg$c29 = "=",
          peg$c30 = { type: "literal", value: "=", description: "\"=\"" },
          peg$c31 = function(ws, s) {
              var tmp = [];
              for( var i = 0; i < s.length; ++i ) {
                for( var j = 0; j < s[ i ].length; ++j ) {
                  tmp.push(s[i][j]);
                }
              }
              return {
                type: "string",
                val: ws + tmp.join('')
              };
            },
          peg$c32 = /^[0-9a-zA-Z$_]/,
          peg$c33 = { type: "class", value: "[0-9a-zA-Z$_]", description: "[0-9a-zA-Z$_]" },
          peg$c34 = /^[^ \t\n\r,.+={}]/,
          peg$c35 = { type: "class", value: "[^ \\t\\n\\r,.+={}]", description: "[^ \\t\\n\\r,.+={}]" },
          peg$c36 = function(s1, s2) {
              return s1 + (s2 ? s2.join('') : '');
            },
          peg$c37 = function(chars) { return chars.join(''); },
          peg$c38 = /^[^{}\\\0-\x1F \t\n\r]/,
          peg$c39 = { type: "class", value: "[^{}\\\\\\0-\\x1F \\t\\n\\r]", description: "[^{}\\\\\\0-\\x1F \\t\\n\\r]" },
          peg$c40 = function(x) {
              return x;
            },
          peg$c41 = "\\#",
          peg$c42 = { type: "literal", value: "\\#", description: "\"\\\\#\"" },
          peg$c43 = function() {
              return "\\#";
            },
          peg$c44 = "\\{",
          peg$c45 = { type: "literal", value: "\\{", description: "\"\\\\{\"" },
          peg$c46 = function() {
              return "\u007B";
            },
          peg$c47 = "\\}",
          peg$c48 = { type: "literal", value: "\\}", description: "\"\\\\}\"" },
          peg$c49 = function() {
              return "\u007D";
            },
          peg$c50 = "\\u",
          peg$c51 = { type: "literal", value: "\\u", description: "\"\\\\u\"" },
          peg$c52 = function(h1, h2, h3, h4) {
                return String.fromCharCode(parseInt("0x" + h1 + h2 + h3 + h4));
            },
          peg$c53 = /^[0-9]/,
          peg$c54 = { type: "class", value: "[0-9]", description: "[0-9]" },
          peg$c55 = function(ds) {
              return parseInt((ds.join('')), 10);
            },
          peg$c56 = /^[0-9a-fA-F]/,
          peg$c57 = { type: "class", value: "[0-9a-fA-F]", description: "[0-9a-fA-F]" },
          peg$c58 = { type: "other", description: "whitespace" },
          peg$c59 = function(w) { return w.join(''); },
          peg$c60 = /^[ \t\n\r]/,
          peg$c61 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
  
          peg$currPos          = 0,
          peg$reportedPos      = 0,
          peg$cachedPos        = 0,
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
          peg$maxFailPos       = 0,
          peg$maxFailExpected  = [],
          peg$silentFails      = 0,
  
          peg$result;
  
      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
  
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }
  
      function text() {
        return input.substring(peg$reportedPos, peg$currPos);
      }
  
      function offset() {
        return peg$reportedPos;
      }
  
      function line() {
        return peg$computePosDetails(peg$reportedPos).line;
      }
  
      function column() {
        return peg$computePosDetails(peg$reportedPos).column;
      }
  
      function expected(description) {
        throw peg$buildException(
          null,
          [{ type: "other", description: description }],
          peg$reportedPos
        );
      }
  
      function error(message) {
        throw peg$buildException(message, null, peg$reportedPos);
      }
  
      function peg$computePosDetails(pos) {
        function advance(details, startPos, endPos) {
          var p, ch;
  
          for (p = startPos; p < endPos; p++) {
            ch = input.charAt(p);
            if (ch === "\n") {
              if (!details.seenCR) { details.line++; }
              details.column = 1;
              details.seenCR = false;
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
              details.line++;
              details.column = 1;
              details.seenCR = true;
            } else {
              details.column++;
              details.seenCR = false;
            }
          }
        }
  
        if (peg$cachedPos !== pos) {
          if (peg$cachedPos > pos) {
            peg$cachedPos = 0;
            peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
          }
          advance(peg$cachedPosDetails, peg$cachedPos, pos);
          peg$cachedPos = pos;
        }
  
        return peg$cachedPosDetails;
      }
  
      function peg$fail(expected) {
        if (peg$currPos < peg$maxFailPos) { return; }
  
        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }
  
        peg$maxFailExpected.push(expected);
      }
  
      function peg$buildException(message, expected, pos) {
        function cleanupExpected(expected) {
          var i = 1;
  
          expected.sort(function(a, b) {
            if (a.description < b.description) {
              return -1;
            } else if (a.description > b.description) {
              return 1;
            } else {
              return 0;
            }
          });
  
          while (i < expected.length) {
            if (expected[i - 1] === expected[i]) {
              expected.splice(i, 1);
            } else {
              i++;
            }
          }
        }
  
        function buildMessage(expected, found) {
          function stringEscape(s) {
            function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }
  
            return s
              .replace(/\\/g,   '\\\\')
              .replace(/"/g,    '\\"')
              .replace(/\x08/g, '\\b')
              .replace(/\t/g,   '\\t')
              .replace(/\n/g,   '\\n')
              .replace(/\f/g,   '\\f')
              .replace(/\r/g,   '\\r')
              .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
              .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
              .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
              .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
          }
  
          var expectedDescs = new Array(expected.length),
              expectedDesc, foundDesc, i;
  
          for (i = 0; i < expected.length; i++) {
            expectedDescs[i] = expected[i].description;
          }
  
          expectedDesc = expected.length > 1
            ? expectedDescs.slice(0, -1).join(", ")
                + " or "
                + expectedDescs[expected.length - 1]
            : expectedDescs[0];
  
          foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
  
          return "Expected " + expectedDesc + " but " + foundDesc + " found.";
        }
  
        var posDetails = peg$computePosDetails(pos),
            found      = pos < input.length ? input.charAt(pos) : null;
  
        if (expected !== null) {
          cleanupExpected(expected);
        }
  
        return new SyntaxError(
          message !== null ? message : buildMessage(expected, found),
          expected,
          found,
          pos,
          posDetails.line,
          posDetails.column
        );
      }
  
      function peg$parsestart() {
        var s0, s1;
  
        s0 = peg$currPos;
        s1 = peg$parsemessageFormatPattern();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c0(s1);
        }
        s0 = s1;
  
        return s0;
      }
  
      function peg$parsemessageFormatPattern() {
        var s0, s1, s2, s3;
  
        s0 = peg$currPos;
        s1 = peg$parsestring();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsemessageFormatPatternRight();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsemessageFormatPatternRight();
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c3(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
  
        return s0;
      }
  
      function peg$parsemessageFormatPatternRight() {
        var s0, s1, s2, s3, s4, s5, s6;
  
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
          s1 = peg$c4;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c5); }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsemessageFormatElement();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s5 = peg$c6;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c7); }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsestring();
                  if (s6 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c8(s3, s6);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c1;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
  
        return s0;
      }
  
      function peg$parsemessageFormatElement() {
        var s0, s1, s2, s3, s4;
  
        s0 = peg$currPos;
        s1 = peg$parseid();
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c11); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseelementFormat();
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$c1;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c1;
          }
          if (s2 === peg$FAILED) {
            s2 = peg$c9;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c12(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
  
        return s0;
      }
  
      function peg$parseelementFormat() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
  
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 6) === peg$c13) {
            s2 = peg$c13;
            peg$currPos += 6;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c14); }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s4 = peg$c10;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c11); }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsepluralStyle();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c15(s2, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c1;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c1;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c16) {
              s2 = peg$c16;
              peg$currPos += 6;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c17); }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parse_();
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                  s4 = peg$c10;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c11); }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parse_();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parseselectStyle();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parse_();
                      if (s7 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c15(s2, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c1;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c1;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c1;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        }
  
        return s0;
      }
  
      function peg$parsepluralStyle() {
        var s0, s1;
  
        s0 = peg$currPos;
        s1 = peg$parsepluralFormatPattern();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c18(s1);
        }
        s0 = s1;
  
        return s0;
      }
  
      function peg$parseselectStyle() {
        var s0, s1;
  
        s0 = peg$currPos;
        s1 = peg$parseselectFormatPattern();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c19(s1);
        }
        s0 = s1;
  
        return s0;
      }
  
      function peg$parsepluralFormatPattern() {
        var s0, s1, s2, s3;
  
        s0 = peg$currPos;
        s1 = peg$parseoffsetPattern();
        if (s1 === peg$FAILED) {
          s1 = peg$c9;
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsepluralForms();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsepluralForms();
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c20(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
  
        return s0;
      }
  
      function peg$parseoffsetPattern() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
  
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 6) === peg$c21) {
            s2 = peg$c21;
            peg$currPos += 6;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c22); }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 58) {
                s4 = peg$c23;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c24); }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsedigits();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c25(s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c1;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c1;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
  
        return s0;
      }
  
      function peg$parseselectFormatPattern() {
        var s0, s1, s2;
  
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsepluralForms();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsepluralForms();
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c26(s1);
        }
        s0 = s1;
  
        return s0;
      }
  
      function peg$parsepluralForms() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
  
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsestringKey();
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s4 = peg$c4;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c5); }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsemessageFormatPattern();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s8 = peg$c6;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c7); }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c27(s2, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c1;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c1;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c1;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
  
        return s0;
      }
  
      function peg$parsestringKey() {
        var s0, s1, s2;
  
        s0 = peg$currPos;
        s1 = peg$parseid();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c28(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 61) {
            s1 = peg$c29;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c30); }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsedigits();
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c25(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        }
  
        return s0;
      }
  
      function peg$parsestring() {
        var s0, s1, s2, s3, s4, s5, s6;
  
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsechars();
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c1;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c1;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c1;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsechars();
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c1;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c1;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c1;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c31(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
  
        return s0;
      }
  
      function peg$parseid() {
        var s0, s1, s2, s3, s4;
  
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (peg$c32.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c33); }
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            if (peg$c34.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c35); }
            }
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c34.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c35); }
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c36(s2, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c1;
        }
  
        return s0;
      }
  
      function peg$parsechars() {
        var s0, s1, s2;
  
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsechar();
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsechar();
          }
        } else {
          s1 = peg$c1;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c37(s1);
        }
        s0 = s1;
  
        return s0;
      }
  
      function peg$parsechar() {
        var s0, s1, s2, s3, s4, s5;
  
        s0 = peg$currPos;
        if (peg$c38.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c39); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c40(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c41) {
            s1 = peg$c41;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c42); }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c43();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c44) {
              s1 = peg$c44;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c45); }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c46();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c47) {
                s1 = peg$c47;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c48); }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c49();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c50) {
                  s1 = peg$c50;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c51); }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$parsehexDigit();
                  if (s2 !== peg$FAILED) {
                    s3 = peg$parsehexDigit();
                    if (s3 !== peg$FAILED) {
                      s4 = peg$parsehexDigit();
                      if (s4 !== peg$FAILED) {
                        s5 = peg$parsehexDigit();
                        if (s5 !== peg$FAILED) {
                          peg$reportedPos = s0;
                          s1 = peg$c52(s2, s3, s4, s5);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c1;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c1;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c1;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c1;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c1;
                }
              }
            }
          }
        }
  
        return s0;
      }
  
      function peg$parsedigits() {
        var s0, s1, s2;
  
        s0 = peg$currPos;
        s1 = [];
        if (peg$c53.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c54); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c53.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c54); }
            }
          }
        } else {
          s1 = peg$c1;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c55(s1);
        }
        s0 = s1;
  
        return s0;
      }
  
      function peg$parsehexDigit() {
        var s0;
  
        if (peg$c56.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c57); }
        }
  
        return s0;
      }
  
      function peg$parse_() {
        var s0, s1, s2;
  
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsewhitespace();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsewhitespace();
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c59(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c58); }
        }
  
        return s0;
      }
  
      function peg$parsewhitespace() {
        var s0;
  
        if (peg$c60.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c61); }
        }
  
        return s0;
      }
  
      peg$result = peg$startRuleFunction();
  
      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail({ type: "end", description: "end of input" });
        }
  
        throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
      }
    }
  
    return {
      SyntaxError: SyntaxError,
      parse:       parse
    };
  })();

  MessageFormat.prototype.parse = function () {
    // Bind to itself so error handling works
    return mparser.parse.apply( mparser, arguments );
  };

  MessageFormat.prototype.precompile = function ( ast ) {
    var self = this,
        needOther = false;

    function _next ( data ) {
      var res = JSON.parse( JSON.stringify( data ) );
      res.pf_count++;
      return res;
    }
    function interpMFP ( ast, data ) {
      // Set some default data
      data = data || { keys: {}, offset: {} };
      var r = [], i, tmp;

      switch ( ast.type ) {
        case 'program':
          return interpMFP( ast.program );
        case 'messageFormatPattern':
          for ( i = 0; i < ast.statements.length; ++i ) {
            r.push(interpMFP( ast.statements[i], data ));
          }
          tmp = r.join('+') || '""';
          return data.pf_count ? tmp : 'function(d){return ' + tmp + '}';
        case 'messageFormatPatternRight':
          for ( i = 0; i < ast.statements.length; ++i ) {
            r.push(interpMFP( ast.statements[i], data ));
          }
          return r.join('+');
        case 'messageFormatElement':
          data.pf_count = data.pf_count || 0;
          if ( ast.output ) {
            return self.globalName + '.v(d,"' + ast.argumentIndex + '")';
          }
          else {
            data.keys[data.pf_count] = '"' + ast.argumentIndex + '"';
            return interpMFP( ast.elementFormat, data );
          }
          return '';
        case 'elementFormat':
          if ( ast.key === 'select' ) {
            return self.globalName + '.s(d,' + data.keys[data.pf_count] + ',' + interpMFP( ast.val, data ) + ')';
          }
          else if ( ast.key === 'plural' ) {
            data.offset[data.pf_count || 0] = ast.val.offset || 0;
            return self.globalName + '.p(d,' + data.keys[data.pf_count] + ',' + (data.offset[data.pf_count] || 0)
              + ',"' + self.lc + '",' + interpMFP( ast.val, data ) + ')';
          }
          return '';
        /* // Unreachable cases.
        case 'pluralStyle':
        case 'selectStyle':*/
        case 'pluralFormatPattern':
          data.pf_count = data.pf_count || 0;
          needOther = true;
          // We're going to simultaneously check to make sure we hit the required 'other' option.

          for ( i = 0; i < ast.pluralForms.length; ++i ) {
            if ( ast.pluralForms[ i ].key === 'other' ) {
              needOther = false;
            }
            r.push('"' + ast.pluralForms[ i ].key + '":' + interpMFP( ast.pluralForms[ i ].val, _next(data) ));
          }
          if ( needOther ) {
            throw new Error("No 'other' form found in pluralFormatPattern " + data.pf_count);
          }
          return '{' + r.join(',') + '}';
        case 'selectFormatPattern':

          data.pf_count = data.pf_count || 0;
          data.offset[data.pf_count] = 0;
          needOther = true;

          for ( i = 0; i < ast.pluralForms.length; ++i ) {
            if ( ast.pluralForms[ i ].key === 'other' ) {
              needOther = false;
            }
            r.push('"' + ast.pluralForms[ i ].key + '":' + interpMFP( ast.pluralForms[ i ].val, _next(data) ));
          }
          if ( needOther ) {
            throw new Error("No 'other' form found in selectFormatPattern " + data.pf_count);
          }
          return '{' + r.join(',') + '}';
        /* // Unreachable
        case 'pluralForms':
        */
        case 'string':
          tmp = '"' + (ast.val || "").replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"';
          if ( data.pf_count ) {
            var o = data.offset[data.pf_count-1];
            tmp = tmp.replace(/(^|[^\\])#/g, '$1"+' + self.globalName + '.n(d,' + data.keys[data.pf_count-1] + (o ? ',' + o : '') + ')+"');
            tmp = tmp.replace(/^""\+/, '').replace(/\+""$/, '');
          }
          return tmp;
        default:
          throw new Error( 'Bad AST type: ' + ast.type );
      }
    }
    return interpMFP( ast );
  };

  MessageFormat.prototype.compile = function ( message ) {
    return (new Function(
      'this[\'' + this.globalName + '\']=' + this.functions() + ';' +
      'return ' + this.precompile( this.parse( message ))
    ))();
  };

  MessageFormat.prototype.precompileObject = function ( messages ) {
    var tmp = [];
    for (var key in messages) {
      tmp.push(JSON.stringify(key) + ':' + this.precompile(this.parse(messages[key])));
    }
    return '{\n' + tmp.join(',\n') + '}';
  };


  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = MessageFormat;
    }
    exports.MessageFormat = MessageFormat;
  }
  else if (typeof define === 'function' && define.amd) {
    define(function() {
      return MessageFormat;
    });
  }
  else {
    root['MessageFormat'] = MessageFormat;
  }

})( this );

}).call(this,"/node_modules/messageformat")
},{"fs":"/Users/Jimmy/code/hull/components/kwiz/node_modules/browserify/lib/_empty.js","path":"/Users/Jimmy/code/hull/components/kwiz/node_modules/browserify/node_modules/path-browserify/index.js"}],"/Users/Jimmy/code/hull/components/kwiz/node_modules/objectpath/index.js":[function(require,module,exports){
module.exports = require('./lib/ObjectPath.js').ObjectPath;

},{"./lib/ObjectPath.js":"/Users/Jimmy/code/hull/components/kwiz/node_modules/objectpath/lib/ObjectPath.js"}],"/Users/Jimmy/code/hull/components/kwiz/node_modules/objectpath/lib/ObjectPath.js":[function(require,module,exports){
'use strict';

;!function(undefined) {

	var ObjectPath = {
		parse: function(str){
			if(typeof str !== 'string'){
				throw new TypeError('ObjectPath.parse must be passed a string');
			}

			var i = 0;
			var parts = [];
			var d, b, q, c;
			while (i < str.length){
				d = str.indexOf('.', i);
				b = str.indexOf('[', i);

				// we've reached the end
				if (d === -1 && b === -1){
					parts.push(str.slice(i, str.length));
					i = str.length;
				}

				// dots
				else if (b === -1 || (d !== -1 && d < b)) {
					parts.push(str.slice(i, d));
					i = d + 1;
				}

				// brackets
				else {
					if (b > i){
						parts.push(str.slice(i, b));
						i = b;
					}
					q = str.slice(b+1, b+2);
					if (q !== '"' && q !=='\'') {
						c = str.indexOf(']', b);
						if (c === -1) c = str.length;
						parts.push(str.slice(i + 1, c));
						i = (str.slice(c + 1, c + 2) === '.') ? c + 2 : c + 1;
					} else {
						c = str.indexOf(q+']', b);
						if (c === -1) c = str.length;
						while (str.slice(c - 1, c) === '\\' && b < str.length){
							b++;
							c = str.indexOf(q+']', b);
						}
						parts.push(str.slice(i + 2, c).replace(new RegExp('\\'+q,'g'), q));
						i = (str.slice(c + 2, c + 3) === '.') ? c + 3 : c + 2;
					}
				}
			}
			return parts;
		},

		// root === true : auto calculate root; must be dot-notation friendly
		// root String : the string to use as root
		stringify: function(arr, quote){

			if(!Array.isArray(arr))
				arr = [arr.toString()];

			quote = quote === '"' ? '"' : '\'';

			return arr.map(function(n){ return '[' + quote + (n.toString()).replace(new RegExp(quote, 'g'), '\\' + quote) + quote + ']'; }).join('');
		},

		normalize: function(data, quote){
			return ObjectPath.stringify(Array.isArray(data) ? data : ObjectPath.parse(data), quote);
		}
	};

	// AMD
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return ObjectPath;
		});
	}

	// CommonJS
	else if (typeof exports === 'object') {
		exports.ObjectPath = ObjectPath;
	}

	// Angular
	else if (typeof angular === 'object') {
		angular.module('ObjectPath', []).provider('ObjectPath', function(){
			this.parse = ObjectPath.parse;
			this.stringify = ObjectPath.stringify;
			this.normalize = ObjectPath.normalize;
			this.$get = function(){
				return ObjectPath;
			};
		});
	}

	// Browser global.
	else {
		window.ObjectPath = ObjectPath;
	}
}();
},{}],"/Users/Jimmy/code/hull/components/kwiz/node_modules/tv4/tv4.js":[function(require,module,exports){
/*
Author: Geraint Luff and others
Year: 2013

This code is released into the "public domain" by its author(s).  Anybody may use, alter and distribute the code without restriction.  The author makes no guarantees, and takes no liability of any kind for use of this code.

If you find a bug or make an improvement, it would be courteous to let the author know, but it is not compulsory.
*/
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports){
    // CommonJS. Define export.
    module.exports = factory();
  } else {
    // Browser globals
    global.tv4 = factory();
  }
}(this, function () {

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FObject%2Fkeys
if (!Object.keys) {
	Object.keys = (function () {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;

		return function (obj) {
			if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
				throw new TypeError('Object.keys called on non-object');
			}

			var result = [];

			for (var prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}

			if (hasDontEnumBug) {
				for (var i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	})();
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
if (!Object.create) {
	Object.create = (function(){
		function F(){}

		return function(o){
			if (arguments.length !== 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}
			F.prototype = o;
			return new F();
		};
	})();
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2FisArray
if(!Array.isArray) {
	Array.isArray = function (vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	};
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2FindexOf
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		if (this === null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;

		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n !== n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n !== 0 && n !== Infinity && n !== -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	};
}

// Grungey Object.isFrozen hack
if (!Object.isFrozen) {
	Object.isFrozen = function (obj) {
		var key = "tv4_test_frozen_key";
		while (obj.hasOwnProperty(key)) {
			key += Math.random();
		}
		try {
			obj[key] = true;
			delete obj[key];
			return false;
		} catch (e) {
			return true;
		}
	};
}
// Based on: https://github.com/geraintluff/uri-templates, but with all the de-substitution stuff removed

var uriTemplateGlobalModifiers = {
	"+": true,
	"#": true,
	".": true,
	"/": true,
	";": true,
	"?": true,
	"&": true
};
var uriTemplateSuffices = {
	"*": true
};

function notReallyPercentEncode(string) {
	return encodeURI(string).replace(/%25[0-9][0-9]/g, function (doubleEncoded) {
		return "%" + doubleEncoded.substring(3);
	});
}

function uriTemplateSubstitution(spec) {
	var modifier = "";
	if (uriTemplateGlobalModifiers[spec.charAt(0)]) {
		modifier = spec.charAt(0);
		spec = spec.substring(1);
	}
	var separator = "";
	var prefix = "";
	var shouldEscape = true;
	var showVariables = false;
	var trimEmptyString = false;
	if (modifier === '+') {
		shouldEscape = false;
	} else if (modifier === ".") {
		prefix = ".";
		separator = ".";
	} else if (modifier === "/") {
		prefix = "/";
		separator = "/";
	} else if (modifier === '#') {
		prefix = "#";
		shouldEscape = false;
	} else if (modifier === ';') {
		prefix = ";";
		separator = ";";
		showVariables = true;
		trimEmptyString = true;
	} else if (modifier === '?') {
		prefix = "?";
		separator = "&";
		showVariables = true;
	} else if (modifier === '&') {
		prefix = "&";
		separator = "&";
		showVariables = true;
	}

	var varNames = [];
	var varList = spec.split(",");
	var varSpecs = [];
	var varSpecMap = {};
	for (var i = 0; i < varList.length; i++) {
		var varName = varList[i];
		var truncate = null;
		if (varName.indexOf(":") !== -1) {
			var parts = varName.split(":");
			varName = parts[0];
			truncate = parseInt(parts[1], 10);
		}
		var suffices = {};
		while (uriTemplateSuffices[varName.charAt(varName.length - 1)]) {
			suffices[varName.charAt(varName.length - 1)] = true;
			varName = varName.substring(0, varName.length - 1);
		}
		var varSpec = {
			truncate: truncate,
			name: varName,
			suffices: suffices
		};
		varSpecs.push(varSpec);
		varSpecMap[varName] = varSpec;
		varNames.push(varName);
	}
	var subFunction = function (valueFunction) {
		var result = "";
		var startIndex = 0;
		for (var i = 0; i < varSpecs.length; i++) {
			var varSpec = varSpecs[i];
			var value = valueFunction(varSpec.name);
			if (value === null || value === undefined || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
				startIndex++;
				continue;
			}
			if (i === startIndex) {
				result += prefix;
			} else {
				result += (separator || ",");
			}
			if (Array.isArray(value)) {
				if (showVariables) {
					result += varSpec.name + "=";
				}
				for (var j = 0; j < value.length; j++) {
					if (j > 0) {
						result += varSpec.suffices['*'] ? (separator || ",") : ",";
						if (varSpec.suffices['*'] && showVariables) {
							result += varSpec.name + "=";
						}
					}
					result += shouldEscape ? encodeURIComponent(value[j]).replace(/!/g, "%21") : notReallyPercentEncode(value[j]);
				}
			} else if (typeof value === "object") {
				if (showVariables && !varSpec.suffices['*']) {
					result += varSpec.name + "=";
				}
				var first = true;
				for (var key in value) {
					if (!first) {
						result += varSpec.suffices['*'] ? (separator || ",") : ",";
					}
					first = false;
					result += shouldEscape ? encodeURIComponent(key).replace(/!/g, "%21") : notReallyPercentEncode(key);
					result += varSpec.suffices['*'] ? '=' : ",";
					result += shouldEscape ? encodeURIComponent(value[key]).replace(/!/g, "%21") : notReallyPercentEncode(value[key]);
				}
			} else {
				if (showVariables) {
					result += varSpec.name;
					if (!trimEmptyString || value !== "") {
						result += "=";
					}
				}
				if (varSpec.truncate != null) {
					value = value.substring(0, varSpec.truncate);
				}
				result += shouldEscape ? encodeURIComponent(value).replace(/!/g, "%21"): notReallyPercentEncode(value);
			}
		}
		return result;
	};
	subFunction.varNames = varNames;
	return {
		prefix: prefix,
		substitution: subFunction
	};
}

function UriTemplate(template) {
	if (!(this instanceof UriTemplate)) {
		return new UriTemplate(template);
	}
	var parts = template.split("{");
	var textParts = [parts.shift()];
	var prefixes = [];
	var substitutions = [];
	var varNames = [];
	while (parts.length > 0) {
		var part = parts.shift();
		var spec = part.split("}")[0];
		var remainder = part.substring(spec.length + 1);
		var funcs = uriTemplateSubstitution(spec);
		substitutions.push(funcs.substitution);
		prefixes.push(funcs.prefix);
		textParts.push(remainder);
		varNames = varNames.concat(funcs.substitution.varNames);
	}
	this.fill = function (valueFunction) {
		var result = textParts[0];
		for (var i = 0; i < substitutions.length; i++) {
			var substitution = substitutions[i];
			result += substitution(valueFunction);
			result += textParts[i + 1];
		}
		return result;
	};
	this.varNames = varNames;
	this.template = template;
}
UriTemplate.prototype = {
	toString: function () {
		return this.template;
	},
	fillFromObject: function (obj) {
		return this.fill(function (varName) {
			return obj[varName];
		});
	}
};
var ValidatorContext = function ValidatorContext(parent, collectMultiple, errorMessages, checkRecursive, trackUnknownProperties) {
	this.missing = [];
	this.missingMap = {};
	this.formatValidators = parent ? Object.create(parent.formatValidators) : {};
	this.schemas = parent ? Object.create(parent.schemas) : {};
	this.collectMultiple = collectMultiple;
	this.errors = [];
	this.handleError = collectMultiple ? this.collectError : this.returnError;
	if (checkRecursive) {
		this.checkRecursive = true;
		this.scanned = [];
		this.scannedFrozen = [];
		this.scannedFrozenSchemas = [];
		this.scannedFrozenValidationErrors = [];
		this.validatedSchemasKey = 'tv4_validation_id';
		this.validationErrorsKey = 'tv4_validation_errors_id';
	}
	if (trackUnknownProperties) {
		this.trackUnknownProperties = true;
		this.knownPropertyPaths = {};
		this.unknownPropertyPaths = {};
	}
	this.errorMessages = errorMessages;
	this.definedKeywords = {};
	if (parent) {
		for (var key in parent.definedKeywords) {
			this.definedKeywords[key] = parent.definedKeywords[key].slice(0);
		}
	}
};
ValidatorContext.prototype.defineKeyword = function (keyword, keywordFunction) {
	this.definedKeywords[keyword] = this.definedKeywords[keyword] || [];
	this.definedKeywords[keyword].push(keywordFunction);
};
ValidatorContext.prototype.createError = function (code, messageParams, dataPath, schemaPath, subErrors) {
	var messageTemplate = this.errorMessages[code] || ErrorMessagesDefault[code];
	if (typeof messageTemplate !== 'string') {
		return new ValidationError(code, "Unknown error code " + code + ": " + JSON.stringify(messageParams), messageParams, dataPath, schemaPath, subErrors);
	}
	// Adapted from Crockford's supplant()
	var message = messageTemplate.replace(/\{([^{}]*)\}/g, function (whole, varName) {
		var subValue = messageParams[varName];
		return typeof subValue === 'string' || typeof subValue === 'number' ? subValue : whole;
	});
	return new ValidationError(code, message, messageParams, dataPath, schemaPath, subErrors);
};
ValidatorContext.prototype.returnError = function (error) {
	return error;
};
ValidatorContext.prototype.collectError = function (error) {
	if (error) {
		this.errors.push(error);
	}
	return null;
};
ValidatorContext.prototype.prefixErrors = function (startIndex, dataPath, schemaPath) {
	for (var i = startIndex; i < this.errors.length; i++) {
		this.errors[i] = this.errors[i].prefixWith(dataPath, schemaPath);
	}
	return this;
};
ValidatorContext.prototype.banUnknownProperties = function () {
	for (var unknownPath in this.unknownPropertyPaths) {
		var error = this.createError(ErrorCodes.UNKNOWN_PROPERTY, {path: unknownPath}, unknownPath, "");
		var result = this.handleError(error);
		if (result) {
			return result;
		}
	}
	return null;
};

ValidatorContext.prototype.addFormat = function (format, validator) {
	if (typeof format === 'object') {
		for (var key in format) {
			this.addFormat(key, format[key]);
		}
		return this;
	}
	this.formatValidators[format] = validator;
};
ValidatorContext.prototype.resolveRefs = function (schema, urlHistory) {
	if (schema['$ref'] !== undefined) {
		urlHistory = urlHistory || {};
		if (urlHistory[schema['$ref']]) {
			return this.createError(ErrorCodes.CIRCULAR_REFERENCE, {urls: Object.keys(urlHistory).join(', ')}, '', '');
		}
		urlHistory[schema['$ref']] = true;
		schema = this.getSchema(schema['$ref'], urlHistory);
	}
	return schema;
};
ValidatorContext.prototype.getSchema = function (url, urlHistory) {
	var schema;
	if (this.schemas[url] !== undefined) {
		schema = this.schemas[url];
		return this.resolveRefs(schema, urlHistory);
	}
	var baseUrl = url;
	var fragment = "";
	if (url.indexOf('#') !== -1) {
		fragment = url.substring(url.indexOf("#") + 1);
		baseUrl = url.substring(0, url.indexOf("#"));
	}
	if (typeof this.schemas[baseUrl] === 'object') {
		schema = this.schemas[baseUrl];
		var pointerPath = decodeURIComponent(fragment);
		if (pointerPath === "") {
			return this.resolveRefs(schema, urlHistory);
		} else if (pointerPath.charAt(0) !== "/") {
			return undefined;
		}
		var parts = pointerPath.split("/").slice(1);
		for (var i = 0; i < parts.length; i++) {
			var component = parts[i].replace(/~1/g, "/").replace(/~0/g, "~");
			if (schema[component] === undefined) {
				schema = undefined;
				break;
			}
			schema = schema[component];
		}
		if (schema !== undefined) {
			return this.resolveRefs(schema, urlHistory);
		}
	}
	if (this.missing[baseUrl] === undefined) {
		this.missing.push(baseUrl);
		this.missing[baseUrl] = baseUrl;
		this.missingMap[baseUrl] = baseUrl;
	}
};
ValidatorContext.prototype.searchSchemas = function (schema, url) {
	if (schema && typeof schema === "object") {
		if (typeof schema.id === "string") {
			if (isTrustedUrl(url, schema.id)) {
				if (this.schemas[schema.id] === undefined) {
					this.schemas[schema.id] = schema;
				}
			}
		}
		for (var key in schema) {
			if (key !== "enum") {
				if (typeof schema[key] === "object") {
					this.searchSchemas(schema[key], url);
				} else if (key === "$ref") {
					var uri = getDocumentUri(schema[key]);
					if (uri && this.schemas[uri] === undefined && this.missingMap[uri] === undefined) {
						this.missingMap[uri] = uri;
					}
				}
			}
		}
	}
};
ValidatorContext.prototype.addSchema = function (url, schema) {
	//overload
	if (typeof url !== 'string' || typeof schema === 'undefined') {
		if (typeof url === 'object' && typeof url.id === 'string') {
			schema = url;
			url = schema.id;
		}
		else {
			return;
		}
	}
	if (url === getDocumentUri(url) + "#") {
		// Remove empty fragment
		url = getDocumentUri(url);
	}
	this.schemas[url] = schema;
	delete this.missingMap[url];
	normSchema(schema, url);
	this.searchSchemas(schema, url);
};

ValidatorContext.prototype.getSchemaMap = function () {
	var map = {};
	for (var key in this.schemas) {
		map[key] = this.schemas[key];
	}
	return map;
};

ValidatorContext.prototype.getSchemaUris = function (filterRegExp) {
	var list = [];
	for (var key in this.schemas) {
		if (!filterRegExp || filterRegExp.test(key)) {
			list.push(key);
		}
	}
	return list;
};

ValidatorContext.prototype.getMissingUris = function (filterRegExp) {
	var list = [];
	for (var key in this.missingMap) {
		if (!filterRegExp || filterRegExp.test(key)) {
			list.push(key);
		}
	}
	return list;
};

ValidatorContext.prototype.dropSchemas = function () {
	this.schemas = {};
	this.reset();
};
ValidatorContext.prototype.reset = function () {
	this.missing = [];
	this.missingMap = {};
	this.errors = [];
};

ValidatorContext.prototype.validateAll = function (data, schema, dataPathParts, schemaPathParts, dataPointerPath) {
	var topLevel;
	schema = this.resolveRefs(schema);
	if (!schema) {
		return null;
	} else if (schema instanceof ValidationError) {
		this.errors.push(schema);
		return schema;
	}

	var startErrorCount = this.errors.length;
	var frozenIndex, scannedFrozenSchemaIndex = null, scannedSchemasIndex = null;
	if (this.checkRecursive && data && typeof data === 'object') {
		topLevel = !this.scanned.length;
		if (data[this.validatedSchemasKey]) {
			var schemaIndex = data[this.validatedSchemasKey].indexOf(schema);
			if (schemaIndex !== -1) {
				this.errors = this.errors.concat(data[this.validationErrorsKey][schemaIndex]);
				return null;
			}
		}
		if (Object.isFrozen(data)) {
			frozenIndex = this.scannedFrozen.indexOf(data);
			if (frozenIndex !== -1) {
				var frozenSchemaIndex = this.scannedFrozenSchemas[frozenIndex].indexOf(schema);
				if (frozenSchemaIndex !== -1) {
					this.errors = this.errors.concat(this.scannedFrozenValidationErrors[frozenIndex][frozenSchemaIndex]);
					return null;
				}
			}
		}
		this.scanned.push(data);
		if (Object.isFrozen(data)) {
			if (frozenIndex === -1) {
				frozenIndex = this.scannedFrozen.length;
				this.scannedFrozen.push(data);
				this.scannedFrozenSchemas.push([]);
			}
			scannedFrozenSchemaIndex = this.scannedFrozenSchemas[frozenIndex].length;
			this.scannedFrozenSchemas[frozenIndex][scannedFrozenSchemaIndex] = schema;
			this.scannedFrozenValidationErrors[frozenIndex][scannedFrozenSchemaIndex] = [];
		} else {
			if (!data[this.validatedSchemasKey]) {
				try {
					Object.defineProperty(data, this.validatedSchemasKey, {
						value: [],
						configurable: true
					});
					Object.defineProperty(data, this.validationErrorsKey, {
						value: [],
						configurable: true
					});
				} catch (e) {
					//IE 7/8 workaround
					data[this.validatedSchemasKey] = [];
					data[this.validationErrorsKey] = [];
				}
			}
			scannedSchemasIndex = data[this.validatedSchemasKey].length;
			data[this.validatedSchemasKey][scannedSchemasIndex] = schema;
			data[this.validationErrorsKey][scannedSchemasIndex] = [];
		}
	}

	var errorCount = this.errors.length;
	var error = this.validateBasic(data, schema, dataPointerPath)
		|| this.validateNumeric(data, schema, dataPointerPath)
		|| this.validateString(data, schema, dataPointerPath)
		|| this.validateArray(data, schema, dataPointerPath)
		|| this.validateObject(data, schema, dataPointerPath)
		|| this.validateCombinations(data, schema, dataPointerPath)
		|| this.validateHypermedia(data, schema, dataPointerPath)
		|| this.validateFormat(data, schema, dataPointerPath)
		|| this.validateDefinedKeywords(data, schema, dataPointerPath)
		|| null;

	if (topLevel) {
		while (this.scanned.length) {
			var item = this.scanned.pop();
			delete item[this.validatedSchemasKey];
		}
		this.scannedFrozen = [];
		this.scannedFrozenSchemas = [];
	}

	if (error || errorCount !== this.errors.length) {
		while ((dataPathParts && dataPathParts.length) || (schemaPathParts && schemaPathParts.length)) {
			var dataPart = (dataPathParts && dataPathParts.length) ? "" + dataPathParts.pop() : null;
			var schemaPart = (schemaPathParts && schemaPathParts.length) ? "" + schemaPathParts.pop() : null;
			if (error) {
				error = error.prefixWith(dataPart, schemaPart);
			}
			this.prefixErrors(errorCount, dataPart, schemaPart);
		}
	}

	if (scannedFrozenSchemaIndex !== null) {
		this.scannedFrozenValidationErrors[frozenIndex][scannedFrozenSchemaIndex] = this.errors.slice(startErrorCount);
	} else if (scannedSchemasIndex !== null) {
		data[this.validationErrorsKey][scannedSchemasIndex] = this.errors.slice(startErrorCount);
	}

	return this.handleError(error);
};
ValidatorContext.prototype.validateFormat = function (data, schema) {
	if (typeof schema.format !== 'string' || !this.formatValidators[schema.format]) {
		return null;
	}
	var errorMessage = this.formatValidators[schema.format].call(null, data, schema);
	if (typeof errorMessage === 'string' || typeof errorMessage === 'number') {
		return this.createError(ErrorCodes.FORMAT_CUSTOM, {message: errorMessage}).prefixWith(null, "format");
	} else if (errorMessage && typeof errorMessage === 'object') {
		return this.createError(ErrorCodes.FORMAT_CUSTOM, {message: errorMessage.message || "?"}, errorMessage.dataPath || null, errorMessage.schemaPath || "/format");
	}
	return null;
};
ValidatorContext.prototype.validateDefinedKeywords = function (data, schema) {
	for (var key in this.definedKeywords) {
		if (typeof schema[key] === 'undefined') {
			continue;
		}
		var validationFunctions = this.definedKeywords[key];
		for (var i = 0; i < validationFunctions.length; i++) {
			var func = validationFunctions[i];
			var result = func(data, schema[key], schema);
			if (typeof result === 'string' || typeof result === 'number') {
				return this.createError(ErrorCodes.KEYWORD_CUSTOM, {key: key, message: result}).prefixWith(null, "format");
			} else if (result && typeof result === 'object') {
				var code = result.code || ErrorCodes.KEYWORD_CUSTOM;
				if (typeof code === 'string') {
					if (!ErrorCodes[code]) {
						throw new Error('Undefined error code (use defineError): ' + code);
					}
					code = ErrorCodes[code];
				}
				var messageParams = (typeof result.message === 'object') ? result.message : {key: key, message: result.message || "?"};
				var schemaPath = result.schemaPath ||( "/" + key.replace(/~/g, '~0').replace(/\//g, '~1'));
				return this.createError(code, messageParams, result.dataPath || null, schemaPath);
			}
		}
	}
	return null;
};

function recursiveCompare(A, B) {
	if (A === B) {
		return true;
	}
	if (typeof A === "object" && typeof B === "object") {
		if (Array.isArray(A) !== Array.isArray(B)) {
			return false;
		} else if (Array.isArray(A)) {
			if (A.length !== B.length) {
				return false;
			}
			for (var i = 0; i < A.length; i++) {
				if (!recursiveCompare(A[i], B[i])) {
					return false;
				}
			}
		} else {
			var key;
			for (key in A) {
				if (B[key] === undefined && A[key] !== undefined) {
					return false;
				}
			}
			for (key in B) {
				if (A[key] === undefined && B[key] !== undefined) {
					return false;
				}
			}
			for (key in A) {
				if (!recursiveCompare(A[key], B[key])) {
					return false;
				}
			}
		}
		return true;
	}
	return false;
}

ValidatorContext.prototype.validateBasic = function validateBasic(data, schema, dataPointerPath) {
	var error;
	if (error = this.validateType(data, schema, dataPointerPath)) {
		return error.prefixWith(null, "type");
	}
	if (error = this.validateEnum(data, schema, dataPointerPath)) {
		return error.prefixWith(null, "type");
	}
	return null;
};

ValidatorContext.prototype.validateType = function validateType(data, schema) {
	if (schema.type === undefined) {
		return null;
	}
	var dataType = typeof data;
	if (data === null) {
		dataType = "null";
	} else if (Array.isArray(data)) {
		dataType = "array";
	}
	var allowedTypes = schema.type;
	if (typeof allowedTypes !== "object") {
		allowedTypes = [allowedTypes];
	}

	for (var i = 0; i < allowedTypes.length; i++) {
		var type = allowedTypes[i];
		if (type === dataType || (type === "integer" && dataType === "number" && (data % 1 === 0))) {
			return null;
		}
	}
	return this.createError(ErrorCodes.INVALID_TYPE, {type: dataType, expected: allowedTypes.join("/")});
};

ValidatorContext.prototype.validateEnum = function validateEnum(data, schema) {
	if (schema["enum"] === undefined) {
		return null;
	}
	for (var i = 0; i < schema["enum"].length; i++) {
		var enumVal = schema["enum"][i];
		if (recursiveCompare(data, enumVal)) {
			return null;
		}
	}
	return this.createError(ErrorCodes.ENUM_MISMATCH, {value: (typeof JSON !== 'undefined') ? JSON.stringify(data) : data});
};

ValidatorContext.prototype.validateNumeric = function validateNumeric(data, schema, dataPointerPath) {
	return this.validateMultipleOf(data, schema, dataPointerPath)
		|| this.validateMinMax(data, schema, dataPointerPath)
		|| this.validateNaN(data, schema, dataPointerPath)
		|| null;
};

ValidatorContext.prototype.validateMultipleOf = function validateMultipleOf(data, schema) {
	var multipleOf = schema.multipleOf || schema.divisibleBy;
	if (multipleOf === undefined) {
		return null;
	}
	if (typeof data === "number") {
		if (data % multipleOf !== 0) {
			return this.createError(ErrorCodes.NUMBER_MULTIPLE_OF, {value: data, multipleOf: multipleOf});
		}
	}
	return null;
};

ValidatorContext.prototype.validateMinMax = function validateMinMax(data, schema) {
	if (typeof data !== "number") {
		return null;
	}
	if (schema.minimum !== undefined) {
		if (data < schema.minimum) {
			return this.createError(ErrorCodes.NUMBER_MINIMUM, {value: data, minimum: schema.minimum}).prefixWith(null, "minimum");
		}
		if (schema.exclusiveMinimum && data === schema.minimum) {
			return this.createError(ErrorCodes.NUMBER_MINIMUM_EXCLUSIVE, {value: data, minimum: schema.minimum}).prefixWith(null, "exclusiveMinimum");
		}
	}
	if (schema.maximum !== undefined) {
		if (data > schema.maximum) {
			return this.createError(ErrorCodes.NUMBER_MAXIMUM, {value: data, maximum: schema.maximum}).prefixWith(null, "maximum");
		}
		if (schema.exclusiveMaximum && data === schema.maximum) {
			return this.createError(ErrorCodes.NUMBER_MAXIMUM_EXCLUSIVE, {value: data, maximum: schema.maximum}).prefixWith(null, "exclusiveMaximum");
		}
	}
	return null;
};

ValidatorContext.prototype.validateNaN = function validateNaN(data) {
	if (typeof data !== "number") {
		return null;
	}
	if (isNaN(data) === true || data === Infinity || data === -Infinity) {
		return this.createError(ErrorCodes.NUMBER_NOT_A_NUMBER, {value: data}).prefixWith(null, "type");
	}
	return null;
};

ValidatorContext.prototype.validateString = function validateString(data, schema, dataPointerPath) {
	return this.validateStringLength(data, schema, dataPointerPath)
		|| this.validateStringPattern(data, schema, dataPointerPath)
		|| null;
};

ValidatorContext.prototype.validateStringLength = function validateStringLength(data, schema) {
	if (typeof data !== "string") {
		return null;
	}
	if (schema.minLength !== undefined) {
		if (data.length < schema.minLength) {
			return this.createError(ErrorCodes.STRING_LENGTH_SHORT, {length: data.length, minimum: schema.minLength}).prefixWith(null, "minLength");
		}
	}
	if (schema.maxLength !== undefined) {
		if (data.length > schema.maxLength) {
			return this.createError(ErrorCodes.STRING_LENGTH_LONG, {length: data.length, maximum: schema.maxLength}).prefixWith(null, "maxLength");
		}
	}
	return null;
};

ValidatorContext.prototype.validateStringPattern = function validateStringPattern(data, schema) {
	if (typeof data !== "string" || schema.pattern === undefined) {
		return null;
	}
	var regexp = new RegExp(schema.pattern);
	if (!regexp.test(data)) {
		return this.createError(ErrorCodes.STRING_PATTERN, {pattern: schema.pattern}).prefixWith(null, "pattern");
	}
	return null;
};
ValidatorContext.prototype.validateArray = function validateArray(data, schema, dataPointerPath) {
	if (!Array.isArray(data)) {
		return null;
	}
	return this.validateArrayLength(data, schema, dataPointerPath)
		|| this.validateArrayUniqueItems(data, schema, dataPointerPath)
		|| this.validateArrayItems(data, schema, dataPointerPath)
		|| null;
};

ValidatorContext.prototype.validateArrayLength = function validateArrayLength(data, schema) {
	var error;
	if (schema.minItems !== undefined) {
		if (data.length < schema.minItems) {
			error = (this.createError(ErrorCodes.ARRAY_LENGTH_SHORT, {length: data.length, minimum: schema.minItems})).prefixWith(null, "minItems");
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	if (schema.maxItems !== undefined) {
		if (data.length > schema.maxItems) {
			error = (this.createError(ErrorCodes.ARRAY_LENGTH_LONG, {length: data.length, maximum: schema.maxItems})).prefixWith(null, "maxItems");
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateArrayUniqueItems = function validateArrayUniqueItems(data, schema) {
	if (schema.uniqueItems) {
		for (var i = 0; i < data.length; i++) {
			for (var j = i + 1; j < data.length; j++) {
				if (recursiveCompare(data[i], data[j])) {
					var error = (this.createError(ErrorCodes.ARRAY_UNIQUE, {match1: i, match2: j})).prefixWith(null, "uniqueItems");
					if (this.handleError(error)) {
						return error;
					}
				}
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateArrayItems = function validateArrayItems(data, schema, dataPointerPath) {
	if (schema.items === undefined) {
		return null;
	}
	var error, i;
	if (Array.isArray(schema.items)) {
		for (i = 0; i < data.length; i++) {
			if (i < schema.items.length) {
				if (error = this.validateAll(data[i], schema.items[i], [i], ["items", i], dataPointerPath + "/" + i)) {
					return error;
				}
			} else if (schema.additionalItems !== undefined) {
				if (typeof schema.additionalItems === "boolean") {
					if (!schema.additionalItems) {
						error = (this.createError(ErrorCodes.ARRAY_ADDITIONAL_ITEMS, {})).prefixWith("" + i, "additionalItems");
						if (this.handleError(error)) {
							return error;
						}
					}
				} else if (error = this.validateAll(data[i], schema.additionalItems, [i], ["additionalItems"], dataPointerPath + "/" + i)) {
					return error;
				}
			}
		}
	} else {
		for (i = 0; i < data.length; i++) {
			if (error = this.validateAll(data[i], schema.items, [i], ["items"], dataPointerPath + "/" + i)) {
				return error;
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateObject = function validateObject(data, schema, dataPointerPath) {
	if (typeof data !== "object" || data === null || Array.isArray(data)) {
		return null;
	}
	return this.validateObjectMinMaxProperties(data, schema, dataPointerPath)
		|| this.validateObjectRequiredProperties(data, schema, dataPointerPath)
		|| this.validateObjectProperties(data, schema, dataPointerPath)
		|| this.validateObjectDependencies(data, schema, dataPointerPath)
		|| null;
};

ValidatorContext.prototype.validateObjectMinMaxProperties = function validateObjectMinMaxProperties(data, schema) {
	var keys = Object.keys(data);
	var error;
	if (schema.minProperties !== undefined) {
		if (keys.length < schema.minProperties) {
			error = this.createError(ErrorCodes.OBJECT_PROPERTIES_MINIMUM, {propertyCount: keys.length, minimum: schema.minProperties}).prefixWith(null, "minProperties");
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	if (schema.maxProperties !== undefined) {
		if (keys.length > schema.maxProperties) {
			error = this.createError(ErrorCodes.OBJECT_PROPERTIES_MAXIMUM, {propertyCount: keys.length, maximum: schema.maxProperties}).prefixWith(null, "maxProperties");
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateObjectRequiredProperties = function validateObjectRequiredProperties(data, schema) {
	if (schema.required !== undefined) {
		for (var i = 0; i < schema.required.length; i++) {
			var key = schema.required[i];
			if (data[key] === undefined) {
				var error = this.createError(ErrorCodes.OBJECT_REQUIRED, {key: key}).prefixWith(null, "" + i).prefixWith(null, "required");
				if (this.handleError(error)) {
					return error;
				}
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateObjectProperties = function validateObjectProperties(data, schema, dataPointerPath) {
	var error;
	for (var key in data) {
		var keyPointerPath = dataPointerPath + "/" + key.replace(/~/g, '~0').replace(/\//g, '~1');
		var foundMatch = false;
		if (schema.properties !== undefined && schema.properties[key] !== undefined) {
			foundMatch = true;
			if (error = this.validateAll(data[key], schema.properties[key], [key], ["properties", key], keyPointerPath)) {
				return error;
			}
		}
		if (schema.patternProperties !== undefined) {
			for (var patternKey in schema.patternProperties) {
				var regexp = new RegExp(patternKey);
				if (regexp.test(key)) {
					foundMatch = true;
					if (error = this.validateAll(data[key], schema.patternProperties[patternKey], [key], ["patternProperties", patternKey], keyPointerPath)) {
						return error;
					}
				}
			}
		}
		if (!foundMatch) {
			if (schema.additionalProperties !== undefined) {
				if (this.trackUnknownProperties) {
					this.knownPropertyPaths[keyPointerPath] = true;
					delete this.unknownPropertyPaths[keyPointerPath];
				}
				if (typeof schema.additionalProperties === "boolean") {
					if (!schema.additionalProperties) {
						error = this.createError(ErrorCodes.OBJECT_ADDITIONAL_PROPERTIES, {}).prefixWith(key, "additionalProperties");
						if (this.handleError(error)) {
							return error;
						}
					}
				} else {
					if (error = this.validateAll(data[key], schema.additionalProperties, [key], ["additionalProperties"], keyPointerPath)) {
						return error;
					}
				}
			} else if (this.trackUnknownProperties && !this.knownPropertyPaths[keyPointerPath]) {
				this.unknownPropertyPaths[keyPointerPath] = true;
			}
		} else if (this.trackUnknownProperties) {
			this.knownPropertyPaths[keyPointerPath] = true;
			delete this.unknownPropertyPaths[keyPointerPath];
		}
	}
	return null;
};

ValidatorContext.prototype.validateObjectDependencies = function validateObjectDependencies(data, schema, dataPointerPath) {
	var error;
	if (schema.dependencies !== undefined) {
		for (var depKey in schema.dependencies) {
			if (data[depKey] !== undefined) {
				var dep = schema.dependencies[depKey];
				if (typeof dep === "string") {
					if (data[dep] === undefined) {
						error = this.createError(ErrorCodes.OBJECT_DEPENDENCY_KEY, {key: depKey, missing: dep}).prefixWith(null, depKey).prefixWith(null, "dependencies");
						if (this.handleError(error)) {
							return error;
						}
					}
				} else if (Array.isArray(dep)) {
					for (var i = 0; i < dep.length; i++) {
						var requiredKey = dep[i];
						if (data[requiredKey] === undefined) {
							error = this.createError(ErrorCodes.OBJECT_DEPENDENCY_KEY, {key: depKey, missing: requiredKey}).prefixWith(null, "" + i).prefixWith(null, depKey).prefixWith(null, "dependencies");
							if (this.handleError(error)) {
								return error;
							}
						}
					}
				} else {
					if (error = this.validateAll(data, dep, [], ["dependencies", depKey], dataPointerPath)) {
						return error;
					}
				}
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateCombinations = function validateCombinations(data, schema, dataPointerPath) {
	return this.validateAllOf(data, schema, dataPointerPath)
		|| this.validateAnyOf(data, schema, dataPointerPath)
		|| this.validateOneOf(data, schema, dataPointerPath)
		|| this.validateNot(data, schema, dataPointerPath)
		|| null;
};

ValidatorContext.prototype.validateAllOf = function validateAllOf(data, schema, dataPointerPath) {
	if (schema.allOf === undefined) {
		return null;
	}
	var error;
	for (var i = 0; i < schema.allOf.length; i++) {
		var subSchema = schema.allOf[i];
		if (error = this.validateAll(data, subSchema, [], ["allOf", i], dataPointerPath)) {
			return error;
		}
	}
	return null;
};

ValidatorContext.prototype.validateAnyOf = function validateAnyOf(data, schema, dataPointerPath) {
	if (schema.anyOf === undefined) {
		return null;
	}
	var errors = [];
	var startErrorCount = this.errors.length;
	var oldUnknownPropertyPaths, oldKnownPropertyPaths;
	if (this.trackUnknownProperties) {
		oldUnknownPropertyPaths = this.unknownPropertyPaths;
		oldKnownPropertyPaths = this.knownPropertyPaths;
	}
	var errorAtEnd = true;
	for (var i = 0; i < schema.anyOf.length; i++) {
		if (this.trackUnknownProperties) {
			this.unknownPropertyPaths = {};
			this.knownPropertyPaths = {};
		}
		var subSchema = schema.anyOf[i];

		var errorCount = this.errors.length;
		var error = this.validateAll(data, subSchema, [], ["anyOf", i], dataPointerPath);

		if (error === null && errorCount === this.errors.length) {
			this.errors = this.errors.slice(0, startErrorCount);

			if (this.trackUnknownProperties) {
				for (var knownKey in this.knownPropertyPaths) {
					oldKnownPropertyPaths[knownKey] = true;
					delete oldUnknownPropertyPaths[knownKey];
				}
				for (var unknownKey in this.unknownPropertyPaths) {
					if (!oldKnownPropertyPaths[unknownKey]) {
						oldUnknownPropertyPaths[unknownKey] = true;
					}
				}
				// We need to continue looping so we catch all the property definitions, but we don't want to return an error
				errorAtEnd = false;
				continue;
			}

			return null;
		}
		if (error) {
			errors.push(error.prefixWith(null, "" + i).prefixWith(null, "anyOf"));
		}
	}
	if (this.trackUnknownProperties) {
		this.unknownPropertyPaths = oldUnknownPropertyPaths;
		this.knownPropertyPaths = oldKnownPropertyPaths;
	}
	if (errorAtEnd) {
		errors = errors.concat(this.errors.slice(startErrorCount));
		this.errors = this.errors.slice(0, startErrorCount);
		return this.createError(ErrorCodes.ANY_OF_MISSING, {}, "", "/anyOf", errors);
	}
};

ValidatorContext.prototype.validateOneOf = function validateOneOf(data, schema, dataPointerPath) {
	if (schema.oneOf === undefined) {
		return null;
	}
	var validIndex = null;
	var errors = [];
	var startErrorCount = this.errors.length;
	var oldUnknownPropertyPaths, oldKnownPropertyPaths;
	if (this.trackUnknownProperties) {
		oldUnknownPropertyPaths = this.unknownPropertyPaths;
		oldKnownPropertyPaths = this.knownPropertyPaths;
	}
	for (var i = 0; i < schema.oneOf.length; i++) {
		if (this.trackUnknownProperties) {
			this.unknownPropertyPaths = {};
			this.knownPropertyPaths = {};
		}
		var subSchema = schema.oneOf[i];

		var errorCount = this.errors.length;
		var error = this.validateAll(data, subSchema, [], ["oneOf", i], dataPointerPath);

		if (error === null && errorCount === this.errors.length) {
			if (validIndex === null) {
				validIndex = i;
			} else {
				this.errors = this.errors.slice(0, startErrorCount);
				return this.createError(ErrorCodes.ONE_OF_MULTIPLE, {index1: validIndex, index2: i}, "", "/oneOf");
			}
			if (this.trackUnknownProperties) {
				for (var knownKey in this.knownPropertyPaths) {
					oldKnownPropertyPaths[knownKey] = true;
					delete oldUnknownPropertyPaths[knownKey];
				}
				for (var unknownKey in this.unknownPropertyPaths) {
					if (!oldKnownPropertyPaths[unknownKey]) {
						oldUnknownPropertyPaths[unknownKey] = true;
					}
				}
			}
		} else if (error) {
			errors.push(error);
		}
	}
	if (this.trackUnknownProperties) {
		this.unknownPropertyPaths = oldUnknownPropertyPaths;
		this.knownPropertyPaths = oldKnownPropertyPaths;
	}
	if (validIndex === null) {
		errors = errors.concat(this.errors.slice(startErrorCount));
		this.errors = this.errors.slice(0, startErrorCount);
		return this.createError(ErrorCodes.ONE_OF_MISSING, {}, "", "/oneOf", errors);
	} else {
		this.errors = this.errors.slice(0, startErrorCount);
	}
	return null;
};

ValidatorContext.prototype.validateNot = function validateNot(data, schema, dataPointerPath) {
	if (schema.not === undefined) {
		return null;
	}
	var oldErrorCount = this.errors.length;
	var oldUnknownPropertyPaths, oldKnownPropertyPaths;
	if (this.trackUnknownProperties) {
		oldUnknownPropertyPaths = this.unknownPropertyPaths;
		oldKnownPropertyPaths = this.knownPropertyPaths;
		this.unknownPropertyPaths = {};
		this.knownPropertyPaths = {};
	}
	var error = this.validateAll(data, schema.not, null, null, dataPointerPath);
	var notErrors = this.errors.slice(oldErrorCount);
	this.errors = this.errors.slice(0, oldErrorCount);
	if (this.trackUnknownProperties) {
		this.unknownPropertyPaths = oldUnknownPropertyPaths;
		this.knownPropertyPaths = oldKnownPropertyPaths;
	}
	if (error === null && notErrors.length === 0) {
		return this.createError(ErrorCodes.NOT_PASSED, {}, "", "/not");
	}
	return null;
};

ValidatorContext.prototype.validateHypermedia = function validateCombinations(data, schema, dataPointerPath) {
	if (!schema.links) {
		return null;
	}
	var error;
	for (var i = 0; i < schema.links.length; i++) {
		var ldo = schema.links[i];
		if (ldo.rel === "describedby") {
			var template = new UriTemplate(ldo.href);
			var allPresent = true;
			for (var j = 0; j < template.varNames.length; j++) {
				if (!(template.varNames[j] in data)) {
					allPresent = false;
					break;
				}
			}
			if (allPresent) {
				var schemaUrl = template.fillFromObject(data);
				var subSchema = {"$ref": schemaUrl};
				if (error = this.validateAll(data, subSchema, [], ["links", i], dataPointerPath)) {
					return error;
				}
			}
		}
	}
};

// parseURI() and resolveUrl() are from https://gist.github.com/1088850
//   -  released as public domain by author ("Yaffle") - see comments on gist

function parseURI(url) {
	var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
	// authority = '//' + user + ':' + pass '@' + hostname + ':' port
	return (m ? {
		href     : m[0] || '',
		protocol : m[1] || '',
		authority: m[2] || '',
		host     : m[3] || '',
		hostname : m[4] || '',
		port     : m[5] || '',
		pathname : m[6] || '',
		search   : m[7] || '',
		hash     : m[8] || ''
	} : null);
}

function resolveUrl(base, href) {// RFC 3986

	function removeDotSegments(input) {
		var output = [];
		input.replace(/^(\.\.?(\/|$))+/, '')
			.replace(/\/(\.(\/|$))+/g, '/')
			.replace(/\/\.\.$/, '/../')
			.replace(/\/?[^\/]*/g, function (p) {
				if (p === '/..') {
					output.pop();
				} else {
					output.push(p);
				}
		});
		return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
	}

	href = parseURI(href || '');
	base = parseURI(base || '');

	return !href || !base ? null : (href.protocol || base.protocol) +
		(href.protocol || href.authority ? href.authority : base.authority) +
		removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
		(href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
		href.hash;
}

function getDocumentUri(uri) {
	return uri.split('#')[0];
}
function normSchema(schema, baseUri) {
	if (schema && typeof schema === "object") {
		if (baseUri === undefined) {
			baseUri = schema.id;
		} else if (typeof schema.id === "string") {
			baseUri = resolveUrl(baseUri, schema.id);
			schema.id = baseUri;
		}
		if (Array.isArray(schema)) {
			for (var i = 0; i < schema.length; i++) {
				normSchema(schema[i], baseUri);
			}
		} else {
			if (typeof schema['$ref'] === "string") {
				schema['$ref'] = resolveUrl(baseUri, schema['$ref']);
			}
			for (var key in schema) {
				if (key !== "enum") {
					normSchema(schema[key], baseUri);
				}
			}
		}
	}
}

var ErrorCodes = {
	INVALID_TYPE: 0,
	ENUM_MISMATCH: 1,
	ANY_OF_MISSING: 10,
	ONE_OF_MISSING: 11,
	ONE_OF_MULTIPLE: 12,
	NOT_PASSED: 13,
	// Numeric errors
	NUMBER_MULTIPLE_OF: 100,
	NUMBER_MINIMUM: 101,
	NUMBER_MINIMUM_EXCLUSIVE: 102,
	NUMBER_MAXIMUM: 103,
	NUMBER_MAXIMUM_EXCLUSIVE: 104,
	NUMBER_NOT_A_NUMBER: 105,
	// String errors
	STRING_LENGTH_SHORT: 200,
	STRING_LENGTH_LONG: 201,
	STRING_PATTERN: 202,
	// Object errors
	OBJECT_PROPERTIES_MINIMUM: 300,
	OBJECT_PROPERTIES_MAXIMUM: 301,
	OBJECT_REQUIRED: 302,
	OBJECT_ADDITIONAL_PROPERTIES: 303,
	OBJECT_DEPENDENCY_KEY: 304,
	// Array errors
	ARRAY_LENGTH_SHORT: 400,
	ARRAY_LENGTH_LONG: 401,
	ARRAY_UNIQUE: 402,
	ARRAY_ADDITIONAL_ITEMS: 403,
	// Custom/user-defined errors
	FORMAT_CUSTOM: 500,
	KEYWORD_CUSTOM: 501,
	// Schema structure
	CIRCULAR_REFERENCE: 600,
	// Non-standard validation options
	UNKNOWN_PROPERTY: 1000
};
var ErrorCodeLookup = {};
for (var key in ErrorCodes) {
	ErrorCodeLookup[ErrorCodes[key]] = key;
}
var ErrorMessagesDefault = {
	INVALID_TYPE: "Invalid type: {type} (expected {expected})",
	ENUM_MISMATCH: "No enum match for: {value}",
	ANY_OF_MISSING: "Data does not match any schemas from \"anyOf\"",
	ONE_OF_MISSING: "Data does not match any schemas from \"oneOf\"",
	ONE_OF_MULTIPLE: "Data is valid against more than one schema from \"oneOf\": indices {index1} and {index2}",
	NOT_PASSED: "Data matches schema from \"not\"",
	// Numeric errors
	NUMBER_MULTIPLE_OF: "Value {value} is not a multiple of {multipleOf}",
	NUMBER_MINIMUM: "Value {value} is less than minimum {minimum}",
	NUMBER_MINIMUM_EXCLUSIVE: "Value {value} is equal to exclusive minimum {minimum}",
	NUMBER_MAXIMUM: "Value {value} is greater than maximum {maximum}",
	NUMBER_MAXIMUM_EXCLUSIVE: "Value {value} is equal to exclusive maximum {maximum}",
	NUMBER_NOT_A_NUMBER: "Value {value} is not a valid number",
	// String errors
	STRING_LENGTH_SHORT: "String is too short ({length} chars), minimum {minimum}",
	STRING_LENGTH_LONG: "String is too long ({length} chars), maximum {maximum}",
	STRING_PATTERN: "String does not match pattern: {pattern}",
	// Object errors
	OBJECT_PROPERTIES_MINIMUM: "Too few properties defined ({propertyCount}), minimum {minimum}",
	OBJECT_PROPERTIES_MAXIMUM: "Too many properties defined ({propertyCount}), maximum {maximum}",
	OBJECT_REQUIRED: "Missing required property: {key}",
	OBJECT_ADDITIONAL_PROPERTIES: "Additional properties not allowed",
	OBJECT_DEPENDENCY_KEY: "Dependency failed - key must exist: {missing} (due to key: {key})",
	// Array errors
	ARRAY_LENGTH_SHORT: "Array is too short ({length}), minimum {minimum}",
	ARRAY_LENGTH_LONG: "Array is too long ({length}), maximum {maximum}",
	ARRAY_UNIQUE: "Array items are not unique (indices {match1} and {match2})",
	ARRAY_ADDITIONAL_ITEMS: "Additional items not allowed",
	// Format errors
	FORMAT_CUSTOM: "Format validation failed ({message})",
	KEYWORD_CUSTOM: "Keyword failed: {key} ({message})",
	// Schema structure
	CIRCULAR_REFERENCE: "Circular $refs: {urls}",
	// Non-standard validation options
	UNKNOWN_PROPERTY: "Unknown property (not in schema)"
};

function ValidationError(code, message, params, dataPath, schemaPath, subErrors) {
	Error.call(this);
	if (code === undefined) {
		throw new Error ("No code supplied for error: "+ message);
	}
	this.message = message;
	this.params = params;
	this.code = code;
	this.dataPath = dataPath || "";
	this.schemaPath = schemaPath || "";
	this.subErrors = subErrors || null;

	var err = new Error(this.message);
	this.stack = err.stack || err.stacktrace;
	if (!this.stack) {
		try {
			throw err;
		}
		catch(err) {
			this.stack = err.stack || err.stacktrace;
		}
	}
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;
ValidationError.prototype.name = 'ValidationError';

ValidationError.prototype.prefixWith = function (dataPrefix, schemaPrefix) {
	if (dataPrefix !== null) {
		dataPrefix = dataPrefix.replace(/~/g, "~0").replace(/\//g, "~1");
		this.dataPath = "/" + dataPrefix + this.dataPath;
	}
	if (schemaPrefix !== null) {
		schemaPrefix = schemaPrefix.replace(/~/g, "~0").replace(/\//g, "~1");
		this.schemaPath = "/" + schemaPrefix + this.schemaPath;
	}
	if (this.subErrors !== null) {
		for (var i = 0; i < this.subErrors.length; i++) {
			this.subErrors[i].prefixWith(dataPrefix, schemaPrefix);
		}
	}
	return this;
};

function isTrustedUrl(baseUrl, testUrl) {
	if(testUrl.substring(0, baseUrl.length) === baseUrl){
		var remainder = testUrl.substring(baseUrl.length);
		if ((testUrl.length > 0 && testUrl.charAt(baseUrl.length - 1) === "/")
			|| remainder.charAt(0) === "#"
			|| remainder.charAt(0) === "?") {
			return true;
		}
	}
	return false;
}

var languages = {};
function createApi(language) {
	var globalContext = new ValidatorContext();
	var currentLanguage = language || 'en';
	var api = {
		addFormat: function () {
			globalContext.addFormat.apply(globalContext, arguments);
		},
		language: function (code) {
			if (!code) {
				return currentLanguage;
			}
			if (!languages[code]) {
				code = code.split('-')[0]; // fall back to base language
			}
			if (languages[code]) {
				currentLanguage = code;
				return code; // so you can tell if fall-back has happened
			}
			return false;
		},
		addLanguage: function (code, messageMap) {
			var key;
			for (key in ErrorCodes) {
				if (messageMap[key] && !messageMap[ErrorCodes[key]]) {
					messageMap[ErrorCodes[key]] = messageMap[key];
				}
			}
			var rootCode = code.split('-')[0];
			if (!languages[rootCode]) { // use for base language if not yet defined
				languages[code] = messageMap;
				languages[rootCode] = messageMap;
			} else {
				languages[code] = Object.create(languages[rootCode]);
				for (key in messageMap) {
					if (typeof languages[rootCode][key] === 'undefined') {
						languages[rootCode][key] = messageMap[key];
					}
					languages[code][key] = messageMap[key];
				}
			}
			return this;
		},
		freshApi: function (language) {
			var result = createApi();
			if (language) {
				result.language(language);
			}
			return result;
		},
		validate: function (data, schema, checkRecursive, banUnknownProperties) {
			var context = new ValidatorContext(globalContext, false, languages[currentLanguage], checkRecursive, banUnknownProperties);
			if (typeof schema === "string") {
				schema = {"$ref": schema};
			}
			context.addSchema("", schema);
			var error = context.validateAll(data, schema, null, null, "");
			if (!error && banUnknownProperties) {
				error = context.banUnknownProperties();
			}
			this.error = error;
			this.missing = context.missing;
			this.valid = (error === null);
			return this.valid;
		},
		validateResult: function () {
			var result = {};
			this.validate.apply(result, arguments);
			return result;
		},
		validateMultiple: function (data, schema, checkRecursive, banUnknownProperties) {
			var context = new ValidatorContext(globalContext, true, languages[currentLanguage], checkRecursive, banUnknownProperties);
			if (typeof schema === "string") {
				schema = {"$ref": schema};
			}
			context.addSchema("", schema);
			context.validateAll(data, schema, null, null, "");
			if (banUnknownProperties) {
				context.banUnknownProperties();
			}
			var result = {};
			result.errors = context.errors;
			result.missing = context.missing;
			result.valid = (result.errors.length === 0);
			return result;
		},
		addSchema: function () {
			return globalContext.addSchema.apply(globalContext, arguments);
		},
		getSchema: function () {
			return globalContext.getSchema.apply(globalContext, arguments);
		},
		getSchemaMap: function () {
			return globalContext.getSchemaMap.apply(globalContext, arguments);
		},
		getSchemaUris: function () {
			return globalContext.getSchemaUris.apply(globalContext, arguments);
		},
		getMissingUris: function () {
			return globalContext.getMissingUris.apply(globalContext, arguments);
		},
		dropSchemas: function () {
			globalContext.dropSchemas.apply(globalContext, arguments);
		},
		defineKeyword: function () {
			globalContext.defineKeyword.apply(globalContext, arguments);
		},
		defineError: function (codeName, codeNumber, defaultMessage) {
			if (typeof codeName !== 'string' || !/^[A-Z]+(_[A-Z]+)*$/.test(codeName)) {
				throw new Error('Code name must be a string in UPPER_CASE_WITH_UNDERSCORES');
			}
			if (typeof codeNumber !== 'number' || codeNumber%1 !== 0 || codeNumber < 10000) {
				throw new Error('Code number must be an integer > 10000');
			}
			if (typeof ErrorCodes[codeName] !== 'undefined') {
				throw new Error('Error already defined: ' + codeName + ' as ' + ErrorCodes[codeName]);
			}
			if (typeof ErrorCodeLookup[codeNumber] !== 'undefined') {
				throw new Error('Error code already used: ' + ErrorCodeLookup[codeNumber] + ' as ' + codeNumber);
			}
			ErrorCodes[codeName] = codeNumber;
			ErrorCodeLookup[codeNumber] = codeName;
			ErrorMessagesDefault[codeName] = ErrorMessagesDefault[codeNumber] = defaultMessage;
			for (var langCode in languages) {
				var language = languages[langCode];
				if (language[codeName]) {
					language[codeNumber] = language[codeNumber] || language[codeName];
				}
			}
		},
		reset: function () {
			globalContext.reset();
			this.error = null;
			this.missing = [];
			this.valid = true;
		},
		missing: [],
		error: null,
		valid: true,
		normSchema: normSchema,
		resolveUrl: resolveUrl,
		getDocumentUri: getDocumentUri,
		errorCodes: ErrorCodes
	};
	return api;
}

var tv4 = createApi();
tv4.addLanguage('en-gb', ErrorMessagesDefault);

//legacy property
tv4.tv4 = tv4;

return tv4; // used by _header.js to globalise.

}));
},{}],"/Users/Jimmy/code/hull/components/kwiz/node_modules/underscore/underscore.js":[function(require,module,exports){
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],"/Users/Jimmy/code/hull/components/kwiz/src/javascript/engine.js":[function(require,module,exports){
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
  this._compileTranslations();

  Hull.on('hull.auth.logout', this.reset.bind(this));

  window.addEventListener('message', function(e) {
    var message = e.data;
    if (message && message.event === 'ship.update') {
      this._settings = message.ship.settings;

      this._translations = message.ship.translations;
      this._compileTranslations();

      this._emitChange();
    }
  }.bind(this), false);
}

Engine.prototype = {
  _compileTranslations: function() {
    this._compiledTranslations = _.reduce(T, function(m, v, k) {
      m[k] = mf.compile(v);
      return m;
    }, {}, this);
  },

  _getTranslations: function() {
    this._compiledTranslations['result']
  },

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

  translate: function(key, data) {
    var t = this._compiledTranslations[key]
    return t ? t(data || {}) : 'Missing translation ' + key;
  },

  _setInitialState: function(user, ship) {
    this._ship = ship;
    this._user = user;
    this._quiz = this._ship.resources.quiz;
    this._form = this._ship.resources.form;
    this._badge = this._user && this._ship.resources.quiz.badg;
    this._settings = ship.settings;
    this._translations = ship.translations;
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


},{"messageformat":"/Users/Jimmy/code/hull/components/kwiz/node_modules/messageformat/messageformat.js","underscore":"/Users/Jimmy/code/hull/components/kwiz/node_modules/underscore/underscore.js"}],"/Users/Jimmy/code/hull/components/kwiz/src/javascript/schema-form/foundation-decorator-datepicker.js":[function(require,module,exports){
angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var datepicker = function(name, schema, options) {
      if (schema.type === 'string' && (schema.format === 'date' || schema.format === 'date-time')) {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'datepicker';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(datepicker);

    //Add to the Foundation directive
    schemaFormDecoratorsProvider.addMapping(
      'foundationDecorator',
      'datepicker',
      'directives/decorators/foundation/datepicker.html'
    );
    schemaFormDecoratorsProvider.createDirective(
      'datepicker',
      'directives/decorators/foundation/datepicker.html'
    );
  }
]);

},{}],"/Users/Jimmy/code/hull/components/kwiz/src/javascript/schema-form/foundation-decorator.js":[function(require,module,exports){
require('./foundation-decorator-datepicker');
angular.module('schemaForm').config(['schemaFormDecoratorsProvider', function(decoratorsProvider) {
  var base = 'directives/decorators/foundation/';

  decoratorsProvider.createDecorator('foundationDecorator', {
    textarea: base + 'textarea.html',
    fieldset: base + 'fieldset.html',
    array: base + 'array.html',
    tabarray: base + 'tabarray.html',
    tabs: base + 'tabs.html',
    section: base + 'section.html',
    conditional: base + 'section.html',
    actions: base + 'actions.html',
    datepicker: base + 'datepicker.html',
    select: base + 'select.html',
    checkbox: base + 'checkbox.html',
    checkboxes: base + 'checkboxes.html',
    number: base + 'default.html',
    password: base + 'default.html',
    submit: base + 'submit.html',
    button: base + 'submit.html',
    radios: base + 'radios.html',
    'radios-inline': base + 'radios-inline.html',
    radiobuttons: base + 'radio-buttons.html',
    help: base + 'help.html',
    'default': base + 'default.html'
  }, [
    function(form) {
      if (form.readonly && form.key && form.type !== 'fieldset') {
        return base + 'readonly.html';
      }
    }
  ], { className: "row" });

  //manual use directives
  decoratorsProvider.createDirectives({
    textarea: base + 'textarea.html',
    select: base + 'select.html',
    checkbox: base + 'checkbox.html',
    checkboxes: base + 'checkboxes.html',
    number: base + 'default.html',
    submit: base + 'submit.html',
    button: base + 'submit.html',
    text: base + 'default.html',
    date: base + 'default.html',
    password: base + 'default.html',
    datepicker: base + 'datepicker.html',
    input: base + 'default.html',
    radios: base + 'radios.html',
    'radios-inline': base + 'radios-inline.html',
    radiobuttons: base + 'radio-buttons.html',
  });

}]).directive('sfFieldset', function() {
  return {
    transclude: true,
    scope: true,
    templateUrl: 'directives/decorators/foundation/fieldset-trcl.html',
    link: function(scope, element, attrs) {
      scope.title = scope.$eval(attrs.title);
    }
  };
});

},{"./foundation-decorator-datepicker":"/Users/Jimmy/code/hull/components/kwiz/src/javascript/schema-form/foundation-decorator-datepicker.js"}]},{},["./src/javascript/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvamF2YXNjcmlwdC9hcHAuanMiLCJub2RlX21vZHVsZXMvYW5ndWxhci1kYXRlcGlja2VyL2J1aWxkL2FuZ3VsYXItZGF0ZXBpY2tlci5qcyIsIm5vZGVfbW9kdWxlcy9hbmd1bGFyLXNjaGVtYS1mb3JtL2Rpc3Qvc2NoZW1hLWZvcm0uanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvbWVzc2FnZWZvcm1hdC9tZXNzYWdlZm9ybWF0LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdHBhdGgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb2JqZWN0cGF0aC9saWIvT2JqZWN0UGF0aC5qcyIsIm5vZGVfbW9kdWxlcy90djQvdHY0LmpzIiwibm9kZV9tb2R1bGVzL3VuZGVyc2NvcmUvdW5kZXJzY29yZS5qcyIsInNyYy9qYXZhc2NyaXB0L2VuZ2luZS5qcyIsInNyYy9qYXZhc2NyaXB0L3NjaGVtYS1mb3JtL2ZvdW5kYXRpb24tZGVjb3JhdG9yLWRhdGVwaWNrZXIuanMiLCJzcmMvamF2YXNjcmlwdC9zY2hlbWEtZm9ybS9mb3VuZGF0aW9uLWRlY29yYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Q0Q0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcDdDQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDamxEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdjRDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcblxuZnVuY3Rpb24gZ2V0QXV0aGVudGljYXRpb25TZXJ2aWNlcygpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKEh1bGwuY29uZmlnKCdzZXJ2aWNlcycpLmF1dGggfHwge30pLmZpbHRlcihmdW5jdGlvbihzKSB7XG4gICAgcmV0dXJuIHMgIT09ICdodWxsJztcbiAgfSk7XG59XG5cbnZhciBFbmdpbmUgPSByZXF1aXJlKCcuL2VuZ2luZScpO1xuXG53aW5kb3cudHY0ID0gcmVxdWlyZSgndHY0Jyk7XG52YXIgT2JqZWN0UGF0aCA9IHJlcXVpcmUoJ29iamVjdHBhdGgnKTtcbnRyeSB7XG4gIGFuZ3VsYXIubW9kdWxlKCdPYmplY3RQYXRoJywgW10pLnByb3ZpZGVyKCdPYmplY3RQYXRoJywgZnVuY3Rpb24oKXtcbiAgICB0aGlzLnBhcnNlID0gT2JqZWN0UGF0aC5wYXJzZTtcbiAgICB0aGlzLnN0cmluZ2lmeSA9IE9iamVjdFBhdGguc3RyaW5naWZ5O1xuICAgIHRoaXMubm9ybWFsaXplID0gT2JqZWN0UGF0aC5ub3JtYWxpemU7XG4gICAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBPYmplY3RQYXRoO1xuICAgIH07XG4gIH0pO1xufSBjYXRjaChlKSB7fVxucmVxdWlyZSgnYW5ndWxhci1zY2hlbWEtZm9ybS9kaXN0L3NjaGVtYS1mb3JtJyk7XG5yZXF1aXJlKCcuL3NjaGVtYS1mb3JtL2ZvdW5kYXRpb24tZGVjb3JhdG9yJyk7XG5yZXF1aXJlKCcuL3NjaGVtYS1mb3JtL2ZvdW5kYXRpb24tZGVjb3JhdG9yLWRhdGVwaWNrZXInKTtcbnJlcXVpcmUoJ2FuZ3VsYXItZGF0ZXBpY2tlci9idWlsZC9hbmd1bGFyLWRhdGVwaWNrZXInKTtcblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdodWxsLXF1aXonLCBbJ3NjaGVtYUZvcm0nXSlcblxuLmNvbnRyb2xsZXIoJ1F1aXpDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJGVuZ2luZScsIGZ1bmN0aW9uKCRzY29wZSwgJGVuZ2luZSkge1xuICAkc2NvcGUuYXV0aGVudGljYXRpb25TZXJ2aWNlcyA9IGdldEF1dGhlbnRpY2F0aW9uU2VydmljZXMoKTtcblxuICAkc2NvcGUuc3RhdGUgPSAkZW5naW5lLmdldFN0YXRlKCk7XG4gICRlbmdpbmUuYWRkQ2hhbmdlTGlzdGVuZXIoZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAkc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgJHNjb3BlLnN0YXRlID0gc3RhdGU7XG4gICAgfSk7XG4gIH0pO1xuXG4gICRzY29wZS5wbGF5ID0gJGVuZ2luZS5wbGF5LmJpbmQoJGVuZ2luZSk7XG4gICRzY29wZS5zZWxlY3RRdWVzdGlvbiA9ICRlbmdpbmUuc2VsZWN0UXVlc3Rpb24uYmluZCgkZW5naW5lKTtcbiAgJHNjb3BlLnNlbGVjdEFuc3dlciA9ICRlbmdpbmUuc2VsZWN0QW5zd2VyLmJpbmQoJGVuZ2luZSk7XG4gICRzY29wZS5maW5pc2hRdWl6ID0gJGVuZ2luZS5maW5pc2hRdWl6LmJpbmQoJGVuZ2luZSk7XG4gICRzY29wZS5yZXNldCA9ICRlbmdpbmUucmVzZXQuYmluZCgkZW5naW5lKTtcbiAgJHNjb3BlLnRyYW5zbGF0ZSA9ICRlbmdpbmUudHJhbnNsYXRlLmJpbmQoJGVuZ2luZSk7XG5cbiAgJHNjb3BlLmZvcm0gPSBbICcqJywgeyB0eXBlOiAnc3VibWl0JywgdGl0bGU6ICRlbmdpbmUudHJhbnNsYXRlKCdzYXZlX3Byb2ZpbGVfYnV0dG9uJykgfSBdO1xuICAkc2NvcGUuZm9ybURhdGEgPSBfLnJlZHVjZSgkc2NvcGUuc3RhdGUuZm9ybS5maWVsZHNfbGlzdCwgZnVuY3Rpb24obSwgZmllbGQpIHtcbiAgICBtW2ZpZWxkLm5hbWVdID0gZmllbGQudmFsdWU7XG4gICAgcmV0dXJuIG07XG4gIH0sIHt9KTtcblxuICAkc2NvcGUuc3VibWl0Rm9ybSA9IGZ1bmN0aW9uKGZvcm0pIHtcbiAgICAkc2NvcGUuJGJyb2FkY2FzdCgnc2NoZW1hRm9ybVZhbGlkYXRlJyk7XG5cbiAgICBpZiAoZm9ybS4kdmFsaWQpIHtcbiAgICAgICRlbmdpbmUuc3VibWl0Rm9ybSgkc2NvcGUuZm9ybURhdGEpO1xuICAgIH1cbiAgfTtcbn1dKVxuXG4uZGlyZWN0aXZlKCdjb3VudGRvd24nLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICB2YWx1ZTogJz0nLFxuICAgICAgbWF4OiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiAnZGlyZWN0aXZlcy9jb3VudGRvd24uaHRtbCcsXG4gICAgY29udHJvbGxlcjogWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICRzY29wZS5nZXRXaWR0aCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gMTAwICogKCRzY29wZS52YWx1ZSAvICRzY29wZS5tYXgpO1xuICAgICAgfVxuICAgIH1dXG4gIH07XG59KVxuXG4uZmlsdGVyKCdvcGFjaXR5JywgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xvciwgYWxwaGEpIHtcbiAgICB2YXIgaCA9IGNvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgaCA9IGgubWF0Y2gobmV3IFJlZ0V4cCgnKC57JyArIGgubGVuZ3RoIC8gMyArICd9KScsICdnJykpO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGgubGVuZ3RoOyBpKyspXG4gICAgaFtpXSA9IHBhcnNlSW50KGhbaV0ubGVuZ3RoID09PSAxID8gaFtpXStoW2ldIDogaFtpXSwgMTYpO1xuXG4gICAgaWYgKHR5cGVvZiBhbHBoYSAhPSAndW5kZWZpbmVkJykgeyBoLnB1c2goYWxwaGEpOyB9XG5cbiAgICByZXR1cm4gJ3JnYmEoJyArIGguam9pbignLCcpICsgJyknO1xuICB9O1xufSlcblxuSHVsbC5yZWFkeShmdW5jdGlvbihfLCB1c2VyLCBzaGlwKSB7XG4gIHZhciBlID0gbmV3IEVuZ2luZSh1c2VyLCBzaGlwKTtcbiAgYXBwLnZhbHVlKCckZW5naW5lJywgZSk7XG5cbiAgd2luZG93LkVOR0lORSA9IGU7XG5cbiAgYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQsIFsnaHVsbC1xdWl6J10pO1xufSk7XG5cbiIsIi8qIVxuICogcGlja2FkYXRlLmpzIHYzLjQuMCwgMjAxNC8wMi8xNVxuICogQnkgQW1zdWwsIGh0dHA6Ly9hbXN1bC5jYVxuICogSG9zdGVkIG9uIGh0dHA6Ly9hbXN1bC5naXRodWIuaW8vcGlja2FkYXRlLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVRcbiAqL1xuIWZ1bmN0aW9uKGEpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJwaWNrZXJcIixbXCJhbmd1bGFyXCJdLGEpOnRoaXMuUGlja2VyPWEoYW5ndWxhcil9KGZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSxkLGUsZyl7ZnVuY3Rpb24gaCgpe3JldHVybiBiLl8ubm9kZShcImRpdlwiLGIuXy5ub2RlKFwiZGl2XCIsYi5fLm5vZGUoXCJkaXZcIixiLl8ubm9kZShcImRpdlwiLHIuY29tcG9uZW50Lm5vZGVzKG8ub3Blbiksbi5ib3gpLG4ud3JhcCksbi5mcmFtZSksbi5ob2xkZXIpfWZ1bmN0aW9uIGkoKXtwLmRhdGEoZCxyKSxwLmFkZENsYXNzKG4uaW5wdXQpLHBbMF0udmFsdWU9cC5hdHRyKFwiZGF0YS12YWx1ZVwiKT9yLmdldChcInNlbGVjdFwiLG0uZm9ybWF0KTphLnZhbHVlLGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI1wiK28uaWQpKS5vbihcImZvY3VzXCIsbCksYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjXCIrby5pZCkpLm9uKFwiY2xpY2tcIixsKSxtLmVkaXRhYmxlfHxhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNcIitvLmlkKSkub24oXCJrZXlkb3duXCIsZnVuY3Rpb24oYSl7dmFyIGI9YS5rZXlDb2RlLGM9L14oOHw0NikkLy50ZXN0KGIpO3JldHVybiAyNz09Yj8oci5jbG9zZSgpLCExKTp2b2lkKCgzMj09Ynx8Y3x8IW8ub3BlbiYmci5jb21wb25lbnQua2V5W2JdKSYmKGEucHJldmVudERlZmF1bHQoKSxhLnN0b3BQcm9wYWdhdGlvbigpLGM/ci5jbGVhcigpLmNsb3NlKCk6ci5vcGVuKCkpKX0pLGMoYSx7aGFzcG9wdXA6ITAsZXhwYW5kZWQ6ITEscmVhZG9ubHk6ITEsb3duczphLmlkK1wiX3Jvb3RcIisoci5faGlkZGVuP1wiIFwiK3IuX2hpZGRlbi5pZDpcIlwiKX0pfWZ1bmN0aW9uIGooKXtmdW5jdGlvbiBkKCl7YW5ndWxhci5lbGVtZW50KHIuJHJvb3RbMF0ucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXBpY2tdLCBbZGF0YS1uYXZdLCBbZGF0YS1jbGVhcl1cIikpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe3ZhciBjPWFuZ3VsYXIuZWxlbWVudCh0aGlzKSxlPWMuaGFzQ2xhc3Mobi5uYXZEaXNhYmxlZCl8fGMuaGFzQ2xhc3Mobi5kaXNhYmxlZCksZj1kb2N1bWVudC5hY3RpdmVFbGVtZW50O2Y9ZiYmKGYudHlwZXx8Zi5ocmVmKSYmZiwoZXx8ZiYmIXIuJHJvb3RbMF0uY29udGFpbnMoZikpJiZhLmZvY3VzKCksYy5hdHRyKFwiZGF0YS1uYXZcIikmJiFlPyhyLnNldChcImhpZ2hsaWdodFwiLHIuY29tcG9uZW50Lml0ZW0uaGlnaGxpZ2h0LHtuYXY6cGFyc2VJbnQoYy5hdHRyKFwiZGF0YS1uYXZcIikpfSksZCgpKTpiLl8uaXNJbnRlZ2VyKHBhcnNlSW50KGMuYXR0cihcImRhdGEtcGlja1wiKSkpJiYhZT8oci5zZXQoXCJzZWxlY3RcIixwYXJzZUludChjLmF0dHIoXCJkYXRhLXBpY2tcIikpKS5jbG9zZSghMCksZCgpKTpjLmF0dHIoXCJkYXRhLWNsZWFyXCIpJiYoci5jbGVhcigpLmNsb3NlKCEwKSxkKCkpfSl9ci4kcm9vdC5vbihcImZvY3VzaW5cIixmdW5jdGlvbihhKXtyLiRyb290LnJlbW92ZUNsYXNzKG4uZm9jdXNlZCksYyhyLiRyb290WzBdLFwic2VsZWN0ZWRcIiwhMSksYS5zdG9wUHJvcGFnYXRpb24oKX0pLHIuJHJvb3Qub24oXCJtb3VzZWRvd24gY2xpY2tcIixmdW5jdGlvbihiKXt2YXIgYz1iLnRhcmdldDtjIT1yLiRyb290LmNoaWxkcmVuKClbMF0mJihiLnN0b3BQcm9wYWdhdGlvbigpLFwibW91c2Vkb3duXCI9PWIudHlwZSYmXCJpbnB1dFwiIT09YW5ndWxhci5lbGVtZW50KGMpWzBdLnRhZ05hbWUmJlwiT1BUSU9OXCIhPWMubm9kZU5hbWUmJihiLnByZXZlbnREZWZhdWx0KCksYS5mb2N1cygpKSl9KSxkKCksYyhyLiRyb290WzBdLFwiaGlkZGVuXCIsITApfWZ1bmN0aW9uIGsoKXt2YXIgYj1bXCJzdHJpbmdcIj09dHlwZW9mIG0uaGlkZGVuUHJlZml4P20uaGlkZGVuUHJlZml4OlwiXCIsXCJzdHJpbmdcIj09dHlwZW9mIG0uaGlkZGVuU3VmZml4P20uaGlkZGVuU3VmZml4OlwiX3N1Ym1pdFwiXTtyLl9oaWRkZW49YW5ndWxhci5lbGVtZW50KCc8aW5wdXQgdHlwZT1oaWRkZW4gbmFtZT1cIicrYlswXSthLm5hbWUrYlsxXSsnXCJpZD1cIicrYlswXSthLmlkK2JbMV0rJ1wiJysocC5hdHRyKFwiZGF0YS12YWx1ZVwiKXx8YS52YWx1ZT8nIHZhbHVlPVwiJytyLmdldChcInNlbGVjdFwiLG0uZm9ybWF0U3VibWl0KSsnXCInOlwiXCIpK1wiPlwiKVswXSxwLm9uKFwiY2hhbmdlLlwiK28uaWQsZnVuY3Rpb24oKXtyLl9oaWRkZW4udmFsdWU9YS52YWx1ZT9yLmdldChcInNlbGVjdFwiLG0uZm9ybWF0U3VibWl0KTpcIlwifSkuYWZ0ZXIoci5faGlkZGVuKX1mdW5jdGlvbiBsKGEpe2Euc3RvcFByb3BhZ2F0aW9uKCksXCJmb2N1c1wiPT1hLnR5cGUmJihyLiRyb290LmFkZENsYXNzKG4uZm9jdXNlZCksYyhyLiRyb290WzBdLFwic2VsZWN0ZWRcIiwhMCkpLHIub3BlbigpfWlmKCFhKXJldHVybiBiO3ZhciBtO2U/KG09ZS5kZWZhdWx0cyxhbmd1bGFyLmV4dGVuZChtLGcpKTptPWd8fHt9O3ZhciBuPWIua2xhc3NlcygpO2FuZ3VsYXIuZXh0ZW5kKG4sbS5rbGFzcyk7dmFyIG89e2lkOmEuaWR8fFwiUFwiK01hdGguYWJzKH5+KE1hdGgucmFuZG9tKCkqbmV3IERhdGUpKX0scD1hbmd1bGFyLmVsZW1lbnQoYSkscT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnN0YXJ0KCl9LHI9cS5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOnEsJG5vZGU6cCxzdGFydDpmdW5jdGlvbigpe3JldHVybiBvJiZvLnN0YXJ0P3I6KG8ubWV0aG9kcz17fSxvLnN0YXJ0PSEwLG8ub3Blbj0hMSxvLnR5cGU9YS50eXBlLGEuYXV0b2ZvY3VzPWE9PWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQsYS50eXBlPVwidGV4dFwiLGEucmVhZE9ubHk9IW0uZWRpdGFibGUsYS5pZD1hLmlkfHxvLmlkLHIuY29tcG9uZW50PW5ldyBlKHIsbSksci4kcm9vdD1hbmd1bGFyLmVsZW1lbnQoYi5fLm5vZGUoXCJkaXZcIixoKCksbi5waWNrZXIsJ2lkPVwiJythLmlkKydfcm9vdFwiJykpLGooKSxtLmZvcm1hdFN1Ym1pdCYmaygpLGkoKSxtLmNvbnRhaW5lcj9hbmd1bGFyLmVsZW1lbnQobS5jb250YWluZXIpLmFwcGVuZChyLiRyb290KTpwLmFmdGVyKHIuJHJvb3QpLHIub24oe3N0YXJ0OnIuY29tcG9uZW50Lm9uU3RhcnQscmVuZGVyOnIuY29tcG9uZW50Lm9uUmVuZGVyLHN0b3A6ci5jb21wb25lbnQub25TdG9wLG9wZW46ci5jb21wb25lbnQub25PcGVuLGNsb3NlOnIuY29tcG9uZW50Lm9uQ2xvc2Usc2V0OnIuY29tcG9uZW50Lm9uU2V0fSkub24oe3N0YXJ0Om0ub25TdGFydCxyZW5kZXI6bS5vblJlbmRlcixzdG9wOm0ub25TdG9wLG9wZW46bS5vbk9wZW4sY2xvc2U6bS5vbkNsb3NlLHNldDptLm9uU2V0fSksYS5hdXRvZm9jdXMmJnIub3BlbigpLHIudHJpZ2dlcihcInN0YXJ0XCIpLnRyaWdnZXIoXCJyZW5kZXJcIikpfSxyZW5kZXI6ZnVuY3Rpb24oYSl7cmV0dXJuIGE/ci4kcm9vdC5odG1sKGgoKSk6YW5ndWxhci5lbGVtZW50KHIuJHJvb3RbMF0ucXVlcnlTZWxlY3RvckFsbChcIi5cIituLmJveCkpLmh0bWwoci5jb21wb25lbnQubm9kZXMoby5vcGVuKSksci50cmlnZ2VyKFwicmVuZGVyXCIpfSxzdG9wOmZ1bmN0aW9uKCl7cmV0dXJuIG8uc3RhcnQ/KHIuY2xvc2UoKSxyLl9oaWRkZW4mJnIuX2hpZGRlbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHIuX2hpZGRlbiksci4kcm9vdC5yZW1vdmUoKSxwLnJlbW92ZUNsYXNzKG4uaW5wdXQpLnJlbW92ZURhdGEoZCksc2V0VGltZW91dChmdW5jdGlvbigpe3Aub2ZmKFwiLlwiK28uaWQpfSwwKSxhLnR5cGU9by50eXBlLGEucmVhZE9ubHk9ITEsci50cmlnZ2VyKFwic3RvcFwiKSxvLm1ldGhvZHM9e30sby5zdGFydD0hMSxyKTpyfSxvcGVuOmZ1bmN0aW9uKGQpe3JldHVybiBvLm9wZW4/cjoocC5hZGRDbGFzcyhuLmFjdGl2ZSksYyhhLFwiZXhwYW5kZWRcIiwhMCksci4kcm9vdC5hZGRDbGFzcyhuLm9wZW5lZCksYyhyLiRyb290WzBdLFwiaGlkZGVuXCIsITEpLGQhPT0hMSYmKG8ub3Blbj0hMCxwLnRyaWdnZXJIYW5kbGVyKFwiZm9jdXNcIiksYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjXCIrby5pZCkpLm9uKFwiY2xpY2sgZm9jdXNpblwiLGZ1bmN0aW9uKGIpe3ZhciBjPWIudGFyZ2V0O2MhPWEmJmMhPWRvY3VtZW50JiYzIT1iLndoaWNoJiZyLmNsb3NlKGM9PT1yLiRyb290LmNoaWxkcmVuKClbMF0pfSksYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjXCIrby5pZCkpLm9uKFwia2V5ZG93blwiLGZ1bmN0aW9uKGMpe3ZhciBkPWMua2V5Q29kZSxlPXIuY29tcG9uZW50LmtleVtkXSxmPWMudGFyZ2V0OzI3PT1kP3IuY2xvc2UoITApOmYhPWF8fCFlJiYxMyE9ZD9yLiRyb290WzBdLmNvbnRhaW5zKGYpJiYxMz09ZCYmKGMucHJldmVudERlZmF1bHQoKSxmLmNsaWNrKCkpOihjLnByZXZlbnREZWZhdWx0KCksZT9iLl8udHJpZ2dlcihyLmNvbXBvbmVudC5rZXkuZ28scixbYi5fLnRyaWdnZXIoZSldKTphbmd1bGFyLmVsZW1lbnQoci4kcm9vdFswXS5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK24uaGlnaGxpZ2h0ZWQpKS5oYXNDbGFzcyhuLmRpc2FibGVkKXx8ci5zZXQoXCJzZWxlY3RcIixyLmNvbXBvbmVudC5pdGVtLmhpZ2hsaWdodCkuY2xvc2UoKSl9KSksci50cmlnZ2VyKFwib3BlblwiKSl9LGNsb3NlOmZ1bmN0aW9uKGIpe3JldHVybiBiJiYocC5vZmYoXCJmb2N1cy5cIitvLmlkKSxwLnRyaWdnZXJIYW5kbGVyKFwiZm9jdXNcIiksc2V0VGltZW91dChmdW5jdGlvbigpe2FuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI1wiK28uaWQpKS5vbihcImZvY3VzXCIsbCl9LDApKSxwLnJlbW92ZUNsYXNzKG4uYWN0aXZlKSxjKGEsXCJleHBhbmRlZFwiLCExKSxyLiRyb290LnJlbW92ZUNsYXNzKG4ub3BlbmVkK1wiIFwiK24uZm9jdXNlZCksYyhyLiRyb290WzBdLFwiaGlkZGVuXCIsITApLGMoci4kcm9vdFswXSxcInNlbGVjdGVkXCIsITEpLG8ub3Blbj8oc2V0VGltZW91dChmdW5jdGlvbigpe28ub3Blbj0hMX0sMWUzKSxmLm9mZihcIi5cIitvLmlkKSxyLnRyaWdnZXIoXCJjbG9zZVwiKSk6cn0sY2xlYXI6ZnVuY3Rpb24oKXtyZXR1cm4gci5zZXQoXCJjbGVhclwiKX0sc2V0OmZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlLGY9YW5ndWxhci5pc09iamVjdChhKSxnPWY/YTp7fTtpZihjPWYmJmFuZ3VsYXIuaXNPYmplY3QoYik/YjpjfHx7fSxhKXtmfHwoZ1thXT1iKTtmb3IoZCBpbiBnKWU9Z1tkXSxkIGluIHIuY29tcG9uZW50Lml0ZW0mJnIuY29tcG9uZW50LnNldChkLGUsYyksKFwic2VsZWN0XCI9PWR8fFwiY2xlYXJcIj09ZCkmJihwWzBdLnZhbHVlPVwiY2xlYXJcIj09ZD9cIlwiOnIuZ2V0KGQsbS5mb3JtYXQpLHAudHJpZ2dlckhhbmRsZXIoXCJjaGFuZ2VcIikpO3IucmVuZGVyKCl9cmV0dXJuIGMubXV0ZWQ/cjpyLnRyaWdnZXIoXCJzZXRcIixnKX0sZ2V0OmZ1bmN0aW9uKGMsZCl7cmV0dXJuIGM9Y3x8XCJ2YWx1ZVwiLG51bGwhPW9bY10/b1tjXTpcInZhbHVlXCI9PWM/YS52YWx1ZTpjIGluIHIuY29tcG9uZW50Lml0ZW0/XCJzdHJpbmdcIj09dHlwZW9mIGQ/Yi5fLnRyaWdnZXIoci5jb21wb25lbnQuZm9ybWF0cy50b1N0cmluZyxyLmNvbXBvbmVudCxbZCxyLmNvbXBvbmVudC5nZXQoYyldKTpyLmNvbXBvbmVudC5nZXQoYyk6dm9pZCAwfSxvbjpmdW5jdGlvbihhLGIpe3ZhciBjLGQsZT1hbmd1bGFyLmlzT2JqZWN0KGEpLGY9ZT9hOnt9O2lmKGEpe2V8fChmW2FdPWIpO2ZvcihjIGluIGYpZD1mW2NdLG8ubWV0aG9kc1tjXT1vLm1ldGhvZHNbY118fFtdLG8ubWV0aG9kc1tjXS5wdXNoKGQpfXJldHVybiByfSxvZmY6ZnVuY3Rpb24oKXt2YXIgYSxiLGM9YXJndW1lbnRzO2ZvcihhPTAsbmFtZXNDb3VudD1jLmxlbmd0aDtuYW1lc0NvdW50PmE7YSs9MSliPWNbYV0sYiBpbiBvLm1ldGhvZHMmJmRlbGV0ZSBvLm1ldGhvZHNbYl07cmV0dXJuIHJ9LHRyaWdnZXI6ZnVuY3Rpb24oYSxjKXt2YXIgZD1vLm1ldGhvZHNbYV07cmV0dXJuIGQmJmQubWFwKGZ1bmN0aW9uKGEpe2IuXy50cmlnZ2VyKGEscixbY10pfSkscn19O3JldHVybiBuZXcgcX1mdW5jdGlvbiBjKGEsYixjKXtpZihhbmd1bGFyLmlzT2JqZWN0KGIpKWZvcih2YXIgZSBpbiBiKWQoYSxlLGJbZV0pO2Vsc2UgZChhLGIsYyl9ZnVuY3Rpb24gZChhLGIsYyl7YW5ndWxhci5lbGVtZW50KGEpLmF0dHIoKFwicm9sZVwiPT1iP1wiXCI6XCJhcmlhLVwiKStiLGMpfWZ1bmN0aW9uIGUoYSxiKXthbmd1bGFyLmlzT2JqZWN0KGEpfHwoYT17YXR0cmlidXRlOmJ9KSxiPVwiXCI7Zm9yKHZhciBjIGluIGEpe3ZhciBkPShcInJvbGVcIj09Yz9cIlwiOlwiYXJpYS1cIikrYyxlPWFbY107Yis9bnVsbD09ZT9cIlwiOmQrJz1cIicrYVtjXSsnXCInfXJldHVybiBifXZhciBmPWFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCk7cmV0dXJuIGIua2xhc3Nlcz1mdW5jdGlvbihhKXtyZXR1cm4gYT1hfHxcInBpY2tlclwiLHtwaWNrZXI6YSxvcGVuZWQ6YStcIi0tb3BlbmVkXCIsZm9jdXNlZDphK1wiLS1mb2N1c2VkXCIsaW5wdXQ6YStcIl9faW5wdXRcIixhY3RpdmU6YStcIl9faW5wdXQtLWFjdGl2ZVwiLGhvbGRlcjphK1wiX19ob2xkZXJcIixmcmFtZTphK1wiX19mcmFtZVwiLHdyYXA6YStcIl9fd3JhcFwiLGJveDphK1wiX19ib3hcIn19LGIuXz17Z3JvdXA6ZnVuY3Rpb24oYSl7Zm9yKHZhciBjLGQ9XCJcIixlPWIuXy50cmlnZ2VyKGEubWluLGEpO2U8PWIuXy50cmlnZ2VyKGEubWF4LGEsW2VdKTtlKz1hLmkpYz1iLl8udHJpZ2dlcihhLml0ZW0sYSxbZV0pLGQrPWIuXy5ub2RlKGEubm9kZSxjWzBdLGNbMV0sY1syXSk7cmV0dXJuIGR9LG5vZGU6ZnVuY3Rpb24oYixjLGQsZSl7cmV0dXJuIGM/KGM9YS5pc0FycmF5KGMpP2Muam9pbihcIlwiKTpjLGQ9ZD8nIGNsYXNzPVwiJytkKydcIic6XCJcIixlPWU/XCIgXCIrZTpcIlwiLFwiPFwiK2IrZCtlK1wiPlwiK2MrXCI8L1wiK2IrXCI+XCIpOlwiXCJ9LGxlYWQ6ZnVuY3Rpb24oYSl7cmV0dXJuKDEwPmE/XCIwXCI6XCJcIikrYX0sdHJpZ2dlcjpmdW5jdGlvbihhLGIsYyl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgYT9hLmFwcGx5KGIsY3x8W10pOmF9LGRpZ2l0czpmdW5jdGlvbihhKXtyZXR1cm4vXFxkLy50ZXN0KGFbMV0pPzI6MX0saXNEYXRlOmZ1bmN0aW9uKGEpe3JldHVybnt9LnRvU3RyaW5nLmNhbGwoYSkuaW5kZXhPZihcIkRhdGVcIik+LTEmJnRoaXMuaXNJbnRlZ2VyKGEuZ2V0RGF0ZSgpKX0saXNJbnRlZ2VyOmZ1bmN0aW9uKGEpe3JldHVybnt9LnRvU3RyaW5nLmNhbGwoYSkuaW5kZXhPZihcIk51bWJlclwiKT4tMSYmYSUxPT09MH0sYXJpYUF0dHI6ZX0sYi5leHRlbmQ9ZnVuY3Rpb24oYSxjKXthbmd1bGFyLmVsZW1lbnQucHJvdG90eXBlW2FdPWZ1bmN0aW9uKGQsZSl7dmFyIGY9dGhpcy5kYXRhKGEpO2lmKFwicGlja2VyXCI9PWQpcmV0dXJuIGY7aWYoZiYmXCJzdHJpbmdcIj09dHlwZW9mIGQpcmV0dXJuIGIuXy50cmlnZ2VyKGZbZF0sZixbZV0pLHRoaXM7Zm9yKHZhciBnPTA7Zzx0aGlzLmxlbmd0aDtnKyspe3ZhciBoPWFuZ3VsYXIuZWxlbWVudCh0aGlzW2ddKTtoLmRhdGEoYSl8fG5ldyBiKGhbMF0sYSxjLGQpfX0sYW5ndWxhci5lbGVtZW50LnByb3RvdHlwZVthXS5kZWZhdWx0cz1jLmRlZmF1bHRzfSxifSk7XG4vKiFcbiAqIERhdGUgcGlja2VyIGZvciBwaWNrYWRhdGUuanMgdjMuNC4wXG4gKiBodHRwOi8vYW1zdWwuZ2l0aHViLmlvL3BpY2thZGF0ZS5qcy9kYXRlLmh0bVxuICovXG4hZnVuY3Rpb24oYSl7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJwaWNrZXJcIixcImFuZ3VsYXJcIl0sYSk6YShQaWNrZXIsYW5ndWxhcil9KGZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gYyhhLGMpe3ZhciBkPXRoaXMsZT1hLiRub2RlWzBdLnZhbHVlLGY9YS4kbm9kZS5hdHRyKFwiZGF0YS12YWx1ZVwiKSxnPWZ8fGUsaD1mP2MuZm9ybWF0U3VibWl0OmMuZm9ybWF0LGk9ZnVuY3Rpb24oKXtyZXR1cm5cInJ0bFwiPT09Z2V0Q29tcHV0ZWRTdHlsZShhLiRyb290WzBdKS5kaXJlY3Rpb259O2Quc2V0dGluZ3M9YyxkLiRub2RlPWEuJG5vZGUsZC5xdWV1ZT17bWluOlwibWVhc3VyZSBjcmVhdGVcIixtYXg6XCJtZWFzdXJlIGNyZWF0ZVwiLG5vdzpcIm5vdyBjcmVhdGVcIixzZWxlY3Q6XCJwYXJzZSBjcmVhdGUgdmFsaWRhdGVcIixoaWdobGlnaHQ6XCJwYXJzZSBuYXZpZ2F0ZSBjcmVhdGUgdmFsaWRhdGVcIix2aWV3OlwicGFyc2UgY3JlYXRlIHZhbGlkYXRlIHZpZXdzZXRcIixkaXNhYmxlOlwiZGVhY3RpdmF0ZVwiLGVuYWJsZTpcImFjdGl2YXRlXCJ9LGQuaXRlbT17fSxkLml0ZW0uZGlzYWJsZT0oYy5kaXNhYmxlfHxbXSkuc2xpY2UoMCksZC5pdGVtLmVuYWJsZT0tZnVuY3Rpb24oYSl7cmV0dXJuIGFbMF09PT0hMD9hLnNoaWZ0KCk6LTF9KGQuaXRlbS5kaXNhYmxlKSxkLnNldChcIm1pblwiLGMubWluKS5zZXQoXCJtYXhcIixjLm1heCkuc2V0KFwibm93XCIpLGc/ZC5zZXQoXCJzZWxlY3RcIixnLHtmb3JtYXQ6aCxmcm9tVmFsdWU6ISFlfSk6ZC5zZXQoXCJzZWxlY3RcIixudWxsKS5zZXQoXCJoaWdobGlnaHRcIixkLml0ZW0ubm93KSxkLmtleT17NDA6NywzODotNywzOTpmdW5jdGlvbigpe3JldHVybiBpKCk/LTE6MX0sMzc6ZnVuY3Rpb24oKXtyZXR1cm4gaSgpPzE6LTF9LGdvOmZ1bmN0aW9uKGEpe3ZhciBiPWQuaXRlbS5oaWdobGlnaHQsYz1uZXcgRGF0ZShiLnllYXIsYi5tb250aCxiLmRhdGUrYSk7ZC5zZXQoXCJoaWdobGlnaHRcIixbYy5nZXRGdWxsWWVhcigpLGMuZ2V0TW9udGgoKSxjLmdldERhdGUoKV0se2ludGVydmFsOmF9KSx0aGlzLnJlbmRlcigpfX0sYS5vbihcInJlbmRlclwiLGZ1bmN0aW9uKCl7Yi5lbGVtZW50KGEuJHJvb3RbMF0ucXVlcnlTZWxlY3RvckFsbChcIi5cIitjLmtsYXNzLnNlbGVjdE1vbnRoKSkub24oXCJjaGFuZ2VcIixmdW5jdGlvbigpe3ZhciBkPXRoaXMudmFsdWU7ZCYmKGEuc2V0KFwiaGlnaGxpZ2h0XCIsW2EuZ2V0KFwidmlld1wiKS55ZWFyLGQsYS5nZXQoXCJoaWdobGlnaHRcIikuZGF0ZV0pLGIuZWxlbWVudChhLiRyb290WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrYy5rbGFzcy5zZWxlY3RNb250aCkpLnRyaWdnZXJIYW5kbGVyKFwiZm9jdXNcIikpfSksYi5lbGVtZW50KGEuJHJvb3RbMF0ucXVlcnlTZWxlY3RvckFsbChcIi5cIitjLmtsYXNzLnNlbGVjdFllYXIpKS5vbihcImNoYW5nZVwiLGZ1bmN0aW9uKCl7dmFyIGQ9dGhpcy52YWx1ZTtkJiYoYS5zZXQoXCJoaWdobGlnaHRcIixbZCxhLmdldChcInZpZXdcIikubW9udGgsYS5nZXQoXCJoaWdobGlnaHRcIikuZGF0ZV0pLGIuZWxlbWVudChhLiRyb290WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrYy5rbGFzcy5zZWxlY3RZZWFyKSkudHJpZ2dlckhhbmRsZXIoXCJmb2N1c1wiKSl9KX0pLm9uKFwib3BlblwiLGZ1bmN0aW9uKCl7Yi5lbGVtZW50KGEuJHJvb3RbMF0ucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvbiwgc2VsZWN0XCIpKS5hdHRyKFwiZGlzYWJsZWRcIiwhMSl9KS5vbihcImNsb3NlXCIsZnVuY3Rpb24oKXtiLmVsZW1lbnQoYS4kcm9vdFswXS5xdWVyeVNlbGVjdG9yQWxsKFwiYnV0dG9uLCBzZWxlY3RcIikpLmF0dHIoXCJkaXNhYmxlZFwiLCEwKX0pfXZhciBkPTcsZT02LGY9YS5fO2MucHJvdG90eXBlLnNldD1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9dGhpcyxlPWQuaXRlbTtyZXR1cm4gbnVsbD09PWI/KGVbYV09YixkKTooZVtcImVuYWJsZVwiPT1hP1wiZGlzYWJsZVwiOlwiZmxpcFwiPT1hP1wiZW5hYmxlXCI6YV09ZC5xdWV1ZVthXS5zcGxpdChcIiBcIikubWFwKGZ1bmN0aW9uKGUpe3JldHVybiBiPWRbZV0oYSxiLGMpfSkucG9wKCksXCJzZWxlY3RcIj09YT9kLnNldChcImhpZ2hsaWdodFwiLGUuc2VsZWN0LGMpOlwiaGlnaGxpZ2h0XCI9PWE/ZC5zZXQoXCJ2aWV3XCIsZS5oaWdobGlnaHQsYyk6YS5tYXRjaCgvXihmbGlwfG1pbnxtYXh8ZGlzYWJsZXxlbmFibGUpJC8pJiYoZS5zZWxlY3QmJmQuZGlzYWJsZWQoZS5zZWxlY3QpJiZkLnNldChcInNlbGVjdFwiLGUuc2VsZWN0LGMpLGUuaGlnaGxpZ2h0JiZkLmRpc2FibGVkKGUuaGlnaGxpZ2h0KSYmZC5zZXQoXCJoaWdobGlnaHRcIixlLmhpZ2hsaWdodCxjKSksZCl9LGMucHJvdG90eXBlLmdldD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5pdGVtW2FdfSxjLnByb3RvdHlwZS5jcmVhdGU9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlLGc9dGhpcztyZXR1cm4gYz12b2lkIDA9PT1jP2E6YyxjPT0tMS8wfHwxLzA9PWM/ZT1jOmIuaXNPYmplY3QoYykmJmYuaXNJbnRlZ2VyKGMucGljayk/Yz1jLm9iajpiLmlzQXJyYXkoYyk/KGM9bmV3IERhdGUoY1swXSxjWzFdLGNbMl0pLGM9Zi5pc0RhdGUoYyk/YzpnLmNyZWF0ZSgpLm9iaik6Yz1mLmlzSW50ZWdlcihjKXx8Zi5pc0RhdGUoYyk/Zy5ub3JtYWxpemUobmV3IERhdGUoYyksZCk6Zy5ub3coYSxjLGQpLHt5ZWFyOmV8fGMuZ2V0RnVsbFllYXIoKSxtb250aDplfHxjLmdldE1vbnRoKCksZGF0ZTplfHxjLmdldERhdGUoKSxkYXk6ZXx8Yy5nZXREYXkoKSxvYmo6ZXx8YyxwaWNrOmV8fGMuZ2V0VGltZSgpfX0sYy5wcm90b3R5cGUuY3JlYXRlUmFuZ2U9ZnVuY3Rpb24oYSxjKXt2YXIgZD10aGlzLGU9ZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT0hMHx8Yi5pc0FycmF5KGEpfHxmLmlzRGF0ZShhKT9kLmNyZWF0ZShhKTphfTtyZXR1cm4gZi5pc0ludGVnZXIoYSl8fChhPWUoYSkpLGYuaXNJbnRlZ2VyKGMpfHwoYz1lKGMpKSxmLmlzSW50ZWdlcihhKSYmYi5pc09iamVjdChjKT9hPVtjLnllYXIsYy5tb250aCxjLmRhdGUrYV06Zi5pc0ludGVnZXIoYykmJmIuaXNPYmplY3QoYSkmJihjPVthLnllYXIsYS5tb250aCxhLmRhdGUrY10pLHtmcm9tOmUoYSksdG86ZShjKX19LGMucHJvdG90eXBlLndpdGhpblJhbmdlPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGE9dGhpcy5jcmVhdGVSYW5nZShhLmZyb20sYS50byksYi5waWNrPj1hLmZyb20ucGljayYmYi5waWNrPD1hLnRvLnBpY2t9LGMucHJvdG90eXBlLm92ZXJsYXBSYW5nZXM9ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzO3JldHVybiBhPWMuY3JlYXRlUmFuZ2UoYS5mcm9tLGEudG8pLGI9Yy5jcmVhdGVSYW5nZShiLmZyb20sYi50byksYy53aXRoaW5SYW5nZShhLGIuZnJvbSl8fGMud2l0aGluUmFuZ2UoYSxiLnRvKXx8Yy53aXRoaW5SYW5nZShiLGEuZnJvbSl8fGMud2l0aGluUmFuZ2UoYixhLnRvKX0sYy5wcm90b3R5cGUubm93PWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gYj1uZXcgRGF0ZSxjJiZjLnJlbCYmYi5zZXREYXRlKGIuZ2V0RGF0ZSgpK2MucmVsKSx0aGlzLm5vcm1hbGl6ZShiLGMpfSxjLnByb3RvdHlwZS5uYXZpZ2F0ZT1mdW5jdGlvbihhLGMsZCl7dmFyIGUsZixnLGgsaT1iLmlzQXJyYXkoYyksaj1iLmlzT2JqZWN0KGMpLGs9dGhpcy5pdGVtLnZpZXc7aWYoaXx8ail7Zm9yKGo/KGY9Yy55ZWFyLGc9Yy5tb250aCxoPWMuZGF0ZSk6KGY9K2NbMF0sZz0rY1sxXSxoPStjWzJdKSxkJiZkLm5hdiYmayYmay5tb250aCE9PWcmJihmPWsueWVhcixnPWsubW9udGgpLGU9bmV3IERhdGUoZixnKyhkJiZkLm5hdj9kLm5hdjowKSwxKSxmPWUuZ2V0RnVsbFllYXIoKSxnPWUuZ2V0TW9udGgoKTtuZXcgRGF0ZShmLGcsaCkuZ2V0TW9udGgoKSE9PWc7KWgtPTE7Yz1bZixnLGhdfXJldHVybiBjfSxjLnByb3RvdHlwZS5ub3JtYWxpemU9ZnVuY3Rpb24oYSl7cmV0dXJuIGEuc2V0SG91cnMoMCwwLDAsMCksYX0sYy5wcm90b3R5cGUubWVhc3VyZT1mdW5jdGlvbihhLGIpe3ZhciBjPXRoaXM7cmV0dXJuIGI/Zi5pc0ludGVnZXIoYikmJihiPWMubm93KGEsYix7cmVsOmJ9KSk6Yj1cIm1pblwiPT1hPy0xLzA6MS8wLGJ9LGMucHJvdG90eXBlLnZpZXdzZXQ9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5jcmVhdGUoW2IueWVhcixiLm1vbnRoLDFdKX0sYy5wcm90b3R5cGUudmFsaWRhdGU9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlLGcsaCxpLGo9dGhpcyxrPWMsbD1kJiZkLmludGVydmFsP2QuaW50ZXJ2YWw6MSxtPS0xPT09ai5pdGVtLmVuYWJsZSxuPWouaXRlbS5taW4sbz1qLml0ZW0ubWF4LHA9bSYmai5pdGVtLmRpc2FibGUuZmlsdGVyKGZ1bmN0aW9uKGEpe2lmKGIuaXNBcnJheShhKSl7dmFyIGQ9ai5jcmVhdGUoYSkucGljaztkPGMucGljaz9lPSEwOmQ+Yy5waWNrJiYoZz0hMCl9cmV0dXJuIGYuaXNJbnRlZ2VyKGEpfSkubGVuZ3RoO2lmKCghZHx8IWQubmF2KSYmKCFtJiZqLmRpc2FibGVkKGMpfHxtJiZqLmRpc2FibGVkKGMpJiYocHx8ZXx8Zyl8fCFtJiYoYy5waWNrPD1uLnBpY2t8fGMucGljaz49by5waWNrKSkpZm9yKG0mJiFwJiYoIWcmJmw+MHx8IWUmJjA+bCkmJihsKj0tMSk7ai5kaXNhYmxlZChjKSYmKE1hdGguYWJzKGwpPjEmJihjLm1vbnRoPGsubW9udGh8fGMubW9udGg+ay5tb250aCkmJihjPWssbD1sPjA/MTotMSksYy5waWNrPD1uLnBpY2s/KGg9ITAsbD0xLGM9ai5jcmVhdGUoW24ueWVhcixuLm1vbnRoLG4uZGF0ZS0xXSkpOmMucGljaz49by5waWNrJiYoaT0hMCxsPS0xLGM9ai5jcmVhdGUoW28ueWVhcixvLm1vbnRoLG8uZGF0ZSsxXSkpLCFofHwhaSk7KWM9ai5jcmVhdGUoW2MueWVhcixjLm1vbnRoLGMuZGF0ZStsXSk7cmV0dXJuIGN9LGMucHJvdG90eXBlLmRpc2FibGVkPWZ1bmN0aW9uKGEpe3ZhciBjPXRoaXMsZD1jLml0ZW0uZGlzYWJsZS5maWx0ZXIoZnVuY3Rpb24oZCl7cmV0dXJuIGYuaXNJbnRlZ2VyKGQpP2EuZGF5PT09KGMuc2V0dGluZ3MuZmlyc3REYXk/ZDpkLTEpJTc6Yi5pc0FycmF5KGQpfHxmLmlzRGF0ZShkKT9hLnBpY2s9PT1jLmNyZWF0ZShkKS5waWNrOmIuaXNPYmplY3QoZCk/Yy53aXRoaW5SYW5nZShkLGEpOnZvaWQgMH0pO3JldHVybiBkPWQubGVuZ3RoJiYhZC5maWx0ZXIoZnVuY3Rpb24oYSl7cmV0dXJuIGIuaXNBcnJheShhKSYmXCJpbnZlcnRlZFwiPT1hWzNdfHxiLmlzT2JqZWN0KGEpJiZhLmludmVydGVkfSkubGVuZ3RoLC0xPT09Yy5pdGVtLmVuYWJsZT8hZDpkfHxhLnBpY2s8Yy5pdGVtLm1pbi5waWNrfHxhLnBpY2s+Yy5pdGVtLm1heC5waWNrfSxjLnByb3RvdHlwZS5wYXJzZT1mdW5jdGlvbihhLGMsZCl7dmFyIGUsZz10aGlzLGg9e307cmV0dXJuIWN8fGYuaXNJbnRlZ2VyKGMpfHxiLmlzQXJyYXkoYyl8fGYuaXNEYXRlKGMpfHxiLmlzT2JqZWN0KGMpJiZmLmlzSW50ZWdlcihjLnBpY2spP2M6KGQmJmQuZm9ybWF0fHwoZD1kfHx7fSxkLmZvcm1hdD1nLnNldHRpbmdzLmZvcm1hdCksZT1cInN0cmluZ1wiIT10eXBlb2YgY3x8ZC5mcm9tVmFsdWU/MDoxLGcuZm9ybWF0cy50b0FycmF5KGQuZm9ybWF0KS5tYXAoZnVuY3Rpb24oYSl7dmFyIGI9Zy5mb3JtYXRzW2FdLGQ9Yj9mLnRyaWdnZXIoYixnLFtjLGhdKTphLnJlcGxhY2UoL14hLyxcIlwiKS5sZW5ndGg7YiYmKGhbYV09Yy5zdWJzdHIoMCxkKSksYz1jLnN1YnN0cihkKX0pLFtoLnl5eXl8fGgueXksKyhoLm1tfHxoLm0pLWUsaC5kZHx8aC5kXSl9LGMucHJvdG90eXBlLmZvcm1hdHM9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGEsYixjKXt2YXIgZD1hLm1hdGNoKC9cXHcrLylbMF07cmV0dXJuIGMubW18fGMubXx8KGMubT1iLmluZGV4T2YoZCkpLGQubGVuZ3RofWZ1bmN0aW9uIGIoYSl7cmV0dXJuIGEubWF0Y2goL1xcdysvKVswXS5sZW5ndGh9cmV0dXJue2Q6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYT9mLmRpZ2l0cyhhKTpiLmRhdGV9LGRkOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGE/MjpmLmxlYWQoYi5kYXRlKX0sZGRkOmZ1bmN0aW9uKGEsYyl7cmV0dXJuIGE/YihhKTp0aGlzLnNldHRpbmdzLndlZWtkYXlzU2hvcnRbYy5kYXldfSxkZGRkOmZ1bmN0aW9uKGEsYyl7cmV0dXJuIGE/YihhKTp0aGlzLnNldHRpbmdzLndlZWtkYXlzRnVsbFtjLmRheV19LG06ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYT9mLmRpZ2l0cyhhKTpiLm1vbnRoKzF9LG1tOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGE/MjpmLmxlYWQoYi5tb250aCsxKX0sbW1tOmZ1bmN0aW9uKGIsYyl7dmFyIGQ9dGhpcy5zZXR0aW5ncy5tb250aHNTaG9ydDtyZXR1cm4gYj9hKGIsZCxjKTpkW2MubW9udGhdfSxtbW1tOmZ1bmN0aW9uKGIsYyl7dmFyIGQ9dGhpcy5zZXR0aW5ncy5tb250aHNGdWxsO3JldHVybiBiP2EoYixkLGMpOmRbYy5tb250aF19LHl5OmZ1bmN0aW9uKGEsYil7cmV0dXJuIGE/MjooXCJcIitiLnllYXIpLnNsaWNlKDIpfSx5eXl5OmZ1bmN0aW9uKGEsYil7cmV0dXJuIGE/NDpiLnllYXJ9LHRvQXJyYXk6ZnVuY3Rpb24oYSl7cmV0dXJuIGEuc3BsaXQoLyhkezEsNH18bXsxLDR9fHl7NH18eXl8IS4pL2cpfSx0b1N0cmluZzpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXM7cmV0dXJuIGMuZm9ybWF0cy50b0FycmF5KGEpLm1hcChmdW5jdGlvbihhKXtyZXR1cm4gZi50cmlnZ2VyKGMuZm9ybWF0c1thXSxjLFswLGJdKXx8YS5yZXBsYWNlKC9eIS8sXCJcIil9KS5qb2luKFwiXCIpfX19KCksYy5wcm90b3R5cGUuaXNEYXRlRXhhY3Q9ZnVuY3Rpb24oYSxjKXt2YXIgZD10aGlzO3JldHVybiBmLmlzSW50ZWdlcihhKSYmZi5pc0ludGVnZXIoYyl8fFwiYm9vbGVhblwiPT10eXBlb2YgYSYmXCJib29sZWFuXCI9PXR5cGVvZiBjP2E9PT1jOihmLmlzRGF0ZShhKXx8Yi5pc0FycmF5KGEpKSYmKGYuaXNEYXRlKGMpfHxiLmlzQXJyYXkoYykpP2QuY3JlYXRlKGEpLnBpY2s9PT1kLmNyZWF0ZShjKS5waWNrOmIuaXNPYmplY3QoYSkmJmIuaXNPYmplY3QoYyk/ZC5pc0RhdGVFeGFjdChhLmZyb20sYy5mcm9tKSYmZC5pc0RhdGVFeGFjdChhLnRvLGMudG8pOiExfSxjLnByb3RvdHlwZS5pc0RhdGVPdmVybGFwPWZ1bmN0aW9uKGEsYyl7dmFyIGQ9dGhpcztyZXR1cm4gZi5pc0ludGVnZXIoYSkmJihmLmlzRGF0ZShjKXx8Yi5pc0FycmF5KGMpKT9hPT09ZC5jcmVhdGUoYykuZGF5KzE6Zi5pc0ludGVnZXIoYykmJihmLmlzRGF0ZShhKXx8Yi5pc0FycmF5KGEpKT9jPT09ZC5jcmVhdGUoYSkuZGF5KzE6Yi5pc09iamVjdChhKSYmYi5pc09iamVjdChjKT9kLm92ZXJsYXBSYW5nZXMoYSxjKTohMX0sYy5wcm90b3R5cGUuZmxpcEVuYWJsZT1mdW5jdGlvbihhKXt2YXIgYj10aGlzLml0ZW07Yi5lbmFibGU9YXx8KC0xPT1iLmVuYWJsZT8xOi0xKX0sYy5wcm90b3R5cGUuZGVhY3RpdmF0ZT1mdW5jdGlvbihhLGMpe3ZhciBkPXRoaXMsZT1kLml0ZW0uZGlzYWJsZS5zbGljZSgwKTtyZXR1cm5cImZsaXBcIj09Yz9kLmZsaXBFbmFibGUoKTpjPT09ITE/KGQuZmxpcEVuYWJsZSgxKSxlPVtdKTpjPT09ITA/KGQuZmxpcEVuYWJsZSgtMSksZT1bXSk6Yy5tYXAoZnVuY3Rpb24oYSl7Zm9yKHZhciBjLGc9MDtnPGUubGVuZ3RoO2crPTEpaWYoZC5pc0RhdGVFeGFjdChhLGVbZ10pKXtjPSEwO2JyZWFrfWN8fChmLmlzSW50ZWdlcihhKXx8Zi5pc0RhdGUoYSl8fGIuaXNBcnJheShhKXx8Yi5pc09iamVjdChhKSYmYS5mcm9tJiZhLnRvKSYmZS5wdXNoKGEpfSksZX0sYy5wcm90b3R5cGUuYWN0aXZhdGU9ZnVuY3Rpb24oYSxjKXt2YXIgZD10aGlzLGU9ZC5pdGVtLmRpc2FibGUsZz1lLmxlbmd0aDtyZXR1cm5cImZsaXBcIj09Yz9kLmZsaXBFbmFibGUoKTpjPT09ITA/KGQuZmxpcEVuYWJsZSgxKSxlPVtdKTpjPT09ITE/KGQuZmxpcEVuYWJsZSgtMSksZT1bXSk6Yy5tYXAoZnVuY3Rpb24oYSl7dmFyIGMsaCxpLGo7Zm9yKGk9MDtnPmk7aSs9MSl7aWYoaD1lW2ldLGQuaXNEYXRlRXhhY3QoaCxhKSl7Yz1lW2ldPW51bGwsaj0hMDticmVha31pZihkLmlzRGF0ZU92ZXJsYXAoaCxhKSl7Yi5pc09iamVjdChhKT8oYS5pbnZlcnRlZD0hMCxjPWEpOmIuaXNBcnJheShhKT8oYz1hLGNbM118fGMucHVzaChcImludmVydGVkXCIpKTpmLmlzRGF0ZShhKSYmKGM9W2EuZ2V0RnVsbFllYXIoKSxhLmdldE1vbnRoKCksYS5nZXREYXRlKCksXCJpbnZlcnRlZFwiXSk7YnJlYWt9fWlmKGMpZm9yKGk9MDtnPmk7aSs9MSlpZihkLmlzRGF0ZUV4YWN0KGVbaV0sYSkpe2VbaV09bnVsbDticmVha31pZihqKWZvcihpPTA7Zz5pO2krPTEpaWYoZC5pc0RhdGVPdmVybGFwKGVbaV0sYSkpe2VbaV09bnVsbDticmVha31jJiZlLnB1c2goYyl9KSxlLmZpbHRlcihmdW5jdGlvbihhKXtyZXR1cm4gbnVsbCE9YX0pfSxjLnByb3RvdHlwZS5ub2Rlcz1mdW5jdGlvbihhKXt2YXIgYj10aGlzLGM9Yi5zZXR0aW5ncyxnPWIuaXRlbSxoPWcubm93LGk9Zy5zZWxlY3Qsaj1nLmhpZ2hsaWdodCxrPWcudmlldyxsPWcuZGlzYWJsZSxtPWcubWluLG49Zy5tYXgsbz1mdW5jdGlvbihhKXtyZXR1cm4gYy5maXJzdERheSYmYS5wdXNoKGEuc2hpZnQoKSksZi5ub2RlKFwidGhlYWRcIixmLm5vZGUoXCJ0clwiLGYuZ3JvdXAoe21pbjowLG1heDpkLTEsaToxLG5vZGU6XCJ0aFwiLGl0ZW06ZnVuY3Rpb24oYil7cmV0dXJuW2FbYl0sYy5rbGFzcy53ZWVrZGF5c119fSkpKX0oKGMuc2hvd1dlZWtkYXlzRnVsbD9jLndlZWtkYXlzRnVsbDpjLndlZWtkYXlzU2hvcnQpLnNsaWNlKDApKSxwPWZ1bmN0aW9uKGEpe3JldHVybiBmLm5vZGUoXCJkaXZcIixcIiBcIixjLmtsYXNzW1wibmF2XCIrKGE/XCJOZXh0XCI6XCJQcmV2XCIpXSsoYSYmay55ZWFyPj1uLnllYXImJmsubW9udGg+PW4ubW9udGh8fCFhJiZrLnllYXI8PW0ueWVhciYmay5tb250aDw9bS5tb250aD9cIiBcIitjLmtsYXNzLm5hdkRpc2FibGVkOlwiXCIpLFwiZGF0YS1uYXY9XCIrKGF8fC0xKSl9LHE9ZnVuY3Rpb24oYil7cmV0dXJuIGMuc2VsZWN0TW9udGhzP2Yubm9kZShcInNlbGVjdFwiLGYuZ3JvdXAoe21pbjowLG1heDoxMSxpOjEsbm9kZTpcIm9wdGlvblwiLGl0ZW06ZnVuY3Rpb24oYSl7cmV0dXJuW2JbYV0sMCxcInZhbHVlPVwiK2ErKGsubW9udGg9PWE/XCIgc2VsZWN0ZWRcIjpcIlwiKSsoay55ZWFyPT1tLnllYXImJmE8bS5tb250aHx8ay55ZWFyPT1uLnllYXImJmE+bi5tb250aD9cIiBkaXNhYmxlZFwiOlwiXCIpXX19KSxjLmtsYXNzLnNlbGVjdE1vbnRoLGE/XCJcIjpcImRpc2FibGVkXCIpOmYubm9kZShcImRpdlwiLGJbay5tb250aF0sYy5rbGFzcy5tb250aCl9LHI9ZnVuY3Rpb24oKXt2YXIgYj1rLnllYXIsZD1jLnNlbGVjdFllYXJzPT09ITA/NTp+fihjLnNlbGVjdFllYXJzLzIpO2lmKGQpe3ZhciBlPW0ueWVhcixnPW4ueWVhcixoPWItZCxpPWIrZDtpZihlPmgmJihpKz1lLWgsaD1lKSxpPmcpe3ZhciBqPWgtZSxsPWktZztoLT1qPmw/bDpqLGk9Z31yZXR1cm4gZi5ub2RlKFwic2VsZWN0XCIsZi5ncm91cCh7bWluOmgsbWF4OmksaToxLG5vZGU6XCJvcHRpb25cIixpdGVtOmZ1bmN0aW9uKGEpe3JldHVyblthLDAsXCJ2YWx1ZT1cIithKyhiPT1hP1wiIHNlbGVjdGVkXCI6XCJcIildfX0pLGMua2xhc3Muc2VsZWN0WWVhcixhP1wiXCI6XCJkaXNhYmxlZFwiKX1yZXR1cm4gZi5ub2RlKFwiZGl2XCIsYixjLmtsYXNzLnllYXIpfTtyZXR1cm4gZi5ub2RlKFwiZGl2XCIscCgpK3AoMSkrcShjLnNob3dNb250aHNTaG9ydD9jLm1vbnRoc1Nob3J0OmMubW9udGhzRnVsbCkrcigpLGMua2xhc3MuaGVhZGVyKStmLm5vZGUoXCJ0YWJsZVwiLG8rZi5ub2RlKFwidGJvZHlcIixmLmdyb3VwKHttaW46MCxtYXg6ZS0xLGk6MSxub2RlOlwidHJcIixpdGVtOmZ1bmN0aW9uKGEpe3ZhciBlPWMuZmlyc3REYXkmJjA9PT1iLmNyZWF0ZShbay55ZWFyLGsubW9udGgsMV0pLmRheT8tNzowO3JldHVybltmLmdyb3VwKHttaW46ZCphLWsuZGF5K2UrMSxtYXg6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5taW4rZC0xfSxpOjEsbm9kZTpcInRkXCIsaXRlbTpmdW5jdGlvbihhKXthPWIuY3JlYXRlKFtrLnllYXIsay5tb250aCxhKyhjLmZpcnN0RGF5PzE6MCldKTt2YXIgZD1pJiZpLnBpY2s9PWEucGljayxlPWomJmoucGljaz09YS5waWNrLGc9bCYmYi5kaXNhYmxlZChhKXx8YS5waWNrPG0ucGlja3x8YS5waWNrPm4ucGljaztyZXR1cm5bZi5ub2RlKFwiZGl2XCIsYS5kYXRlLGZ1bmN0aW9uKGIpe3JldHVybiBiLnB1c2goay5tb250aD09YS5tb250aD9jLmtsYXNzLmluZm9jdXM6Yy5rbGFzcy5vdXRmb2N1cyksaC5waWNrPT1hLnBpY2smJmIucHVzaChjLmtsYXNzLm5vdyksZCYmYi5wdXNoKGMua2xhc3Muc2VsZWN0ZWQpLGUmJmIucHVzaChjLmtsYXNzLmhpZ2hsaWdodGVkKSxnJiZiLnB1c2goYy5rbGFzcy5kaXNhYmxlZCksYi5qb2luKFwiIFwiKX0oW2Mua2xhc3MuZGF5XSksXCJkYXRhLXBpY2s9XCIrYS5waWNrK1wiIFwiK2YuYXJpYUF0dHIoe3JvbGU6XCJidXR0b25cIixjb250cm9sczpiLiRub2RlWzBdLmlkLGNoZWNrZWQ6ZCYmYi4kbm9kZVswXS52YWx1ZT09PWYudHJpZ2dlcihiLmZvcm1hdHMudG9TdHJpbmcsYixbYy5mb3JtYXQsYV0pPyEwOm51bGwsYWN0aXZlZGVzY2VuZGFudDplPyEwOm51bGwsZGlzYWJsZWQ6Zz8hMDpudWxsfSkpXX19KV19fSkpLGMua2xhc3MudGFibGUpK2Yubm9kZShcImRpdlwiLGYubm9kZShcImJ1dHRvblwiLGMudG9kYXksYy5rbGFzcy5idXR0b25Ub2RheSxcInR5cGU9YnV0dG9uIGRhdGEtcGljaz1cIitoLnBpY2srKGE/XCJcIjpcIiBkaXNhYmxlZFwiKSkrZi5ub2RlKFwiYnV0dG9uXCIsYy5jbGVhcixjLmtsYXNzLmJ1dHRvbkNsZWFyLFwidHlwZT1idXR0b24gZGF0YS1jbGVhcj0xXCIrKGE/XCJcIjpcIiBkaXNhYmxlZFwiKSksYy5rbGFzcy5mb290ZXIpfSxjLmRlZmF1bHRzPWZ1bmN0aW9uKGEpe3JldHVybnttb250aHNGdWxsOltcIkphbnVhcnlcIixcIkZlYnJ1YXJ5XCIsXCJNYXJjaFwiLFwiQXByaWxcIixcIk1heVwiLFwiSnVuZVwiLFwiSnVseVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9jdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSxtb250aHNTaG9ydDpbXCJKYW5cIixcIkZlYlwiLFwiTWFyXCIsXCJBcHJcIixcIk1heVwiLFwiSnVuXCIsXCJKdWxcIixcIkF1Z1wiLFwiU2VwXCIsXCJPY3RcIixcIk5vdlwiLFwiRGVjXCJdLHdlZWtkYXlzRnVsbDpbXCJTdW5kYXlcIixcIk1vbmRheVwiLFwiVHVlc2RheVwiLFwiV2VkbmVzZGF5XCIsXCJUaHVyc2RheVwiLFwiRnJpZGF5XCIsXCJTYXR1cmRheVwiXSx3ZWVrZGF5c1Nob3J0OltcIlN1blwiLFwiTW9uXCIsXCJUdWVcIixcIldlZFwiLFwiVGh1XCIsXCJGcmlcIixcIlNhdFwiXSx0b2RheTpcIlRvZGF5XCIsY2xlYXI6XCJDbGVhclwiLGZvcm1hdDpcImQgbW1tbSwgeXl5eVwiLGtsYXNzOnt0YWJsZTphK1widGFibGVcIixoZWFkZXI6YStcImhlYWRlclwiLG5hdlByZXY6YStcIm5hdi0tcHJldlwiLG5hdk5leHQ6YStcIm5hdi0tbmV4dFwiLG5hdkRpc2FibGVkOmErXCJuYXYtLWRpc2FibGVkXCIsbW9udGg6YStcIm1vbnRoXCIseWVhcjphK1wieWVhclwiLHNlbGVjdE1vbnRoOmErXCJzZWxlY3QtLW1vbnRoXCIsc2VsZWN0WWVhcjphK1wic2VsZWN0LS15ZWFyXCIsd2Vla2RheXM6YStcIndlZWtkYXlcIixkYXk6YStcImRheVwiLGRpc2FibGVkOmErXCJkYXktLWRpc2FibGVkXCIsc2VsZWN0ZWQ6YStcImRheS0tc2VsZWN0ZWRcIixoaWdobGlnaHRlZDphK1wiZGF5LS1oaWdobGlnaHRlZFwiLG5vdzphK1wiZGF5LS10b2RheVwiLGluZm9jdXM6YStcImRheS0taW5mb2N1c1wiLG91dGZvY3VzOmErXCJkYXktLW91dGZvY3VzXCIsZm9vdGVyOmErXCJmb290ZXJcIixidXR0b25DbGVhcjphK1wiYnV0dG9uLS1jbGVhclwiLGJ1dHRvblRvZGF5OmErXCJidXR0b24tLXRvZGF5XCJ9fX0oYS5rbGFzc2VzKCkucGlja2VyK1wiX19cIiksYS5leHRlbmQoXCJwaWNrYWRhdGVcIixjKX0pO1xuLyohXG4gKiBUaW1lIHBpY2tlciBmb3IgcGlja2FkYXRlLmpzIHYzLjQuMFxuICogaHR0cDovL2Ftc3VsLmdpdGh1Yi5pby9waWNrYWRhdGUuanMvdGltZS5odG1cbiAqL1xuIWZ1bmN0aW9uKGEpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wicGlja2VyXCIsXCJhbmd1bGFyXCJdLGEpOmEoUGlja2VyLGFuZ3VsYXIpfShmdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGMoYSxiKXt2YXIgYz10aGlzLGQ9YS4kbm9kZVswXS52YWx1ZSxlPWEuJG5vZGUuZGF0YShcInZhbHVlXCIpLGY9ZXx8ZCxnPWU/Yi5mb3JtYXRTdWJtaXQ6Yi5mb3JtYXQ7Yy5zZXR0aW5ncz1iLGMuJG5vZGU9YS4kbm9kZSxjLnF1ZXVlPXtpbnRlcnZhbDpcImlcIixtaW46XCJtZWFzdXJlIGNyZWF0ZVwiLG1heDpcIm1lYXN1cmUgY3JlYXRlXCIsbm93Olwibm93IGNyZWF0ZVwiLHNlbGVjdDpcInBhcnNlIGNyZWF0ZSB2YWxpZGF0ZVwiLGhpZ2hsaWdodDpcInBhcnNlIGNyZWF0ZSB2YWxpZGF0ZVwiLHZpZXc6XCJwYXJzZSBjcmVhdGUgdmFsaWRhdGVcIixkaXNhYmxlOlwiZGVhY3RpdmF0ZVwiLGVuYWJsZTpcImFjdGl2YXRlXCJ9LGMuaXRlbT17fSxjLml0ZW0uaW50ZXJ2YWw9Yi5pbnRlcnZhbHx8MzAsYy5pdGVtLmRpc2FibGU9KGIuZGlzYWJsZXx8W10pLnNsaWNlKDApLGMuaXRlbS5lbmFibGU9LWZ1bmN0aW9uKGEpe3JldHVybiBhWzBdPT09ITA/YS5zaGlmdCgpOi0xfShjLml0ZW0uZGlzYWJsZSksYy5zZXQoXCJtaW5cIixiLm1pbikuc2V0KFwibWF4XCIsYi5tYXgpLnNldChcIm5vd1wiKSxmP2Muc2V0KFwic2VsZWN0XCIsZix7Zm9ybWF0OmcsZnJvbVZhbHVlOiEhZH0pOmMuc2V0KFwic2VsZWN0XCIsbnVsbCkuc2V0KFwiaGlnaGxpZ2h0XCIsYy5pdGVtLm5vdyksYy5rZXk9ezQwOjEsMzg6LTEsMzk6MSwzNzotMSxnbzpmdW5jdGlvbihhKXtjLnNldChcImhpZ2hsaWdodFwiLGMuaXRlbS5oaWdobGlnaHQucGljaythKmMuaXRlbS5pbnRlcnZhbCx7aW50ZXJ2YWw6YSpjLml0ZW0uaW50ZXJ2YWx9KSx0aGlzLnJlbmRlcigpfX0sYS5vbihcInJlbmRlclwiLGZ1bmN0aW9uKCl7dmFyIGM9YS4kcm9vdC5jaGlsZHJlbigpLGQ9Yy5maW5kKFwiLlwiK2Iua2xhc3Mudmlld3NldCk7ZC5sZW5ndGgmJihjWzBdLnNjcm9sbFRvcD1+fmQucG9zaXRpb24oKS50b3AtMipkWzBdLmNsaWVudEhlaWdodCl9KS5vbihcIm9wZW5cIixmdW5jdGlvbigpe2EuJHJvb3QuZmluZChcImJ1dHRvblwiKS5hdHRyKFwiZGlzYWJsZVwiLCExKX0pLm9uKFwiY2xvc2VcIixmdW5jdGlvbigpe2EuJHJvb3QuZmluZChcImJ1dHRvblwiKS5hdHRyKFwiZGlzYWJsZVwiLCEwKX0pfXZhciBkPTI0LGU9NjAsZj0xMixnPWQqZSxoPWEuXztjLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXMsZT1kLml0ZW07cmV0dXJuIG51bGw9PT1iPyhlW2FdPWIsZCk6KGVbXCJlbmFibGVcIj09YT9cImRpc2FibGVcIjpcImZsaXBcIj09YT9cImVuYWJsZVwiOmFdPWQucXVldWVbYV0uc3BsaXQoXCIgXCIpLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gYj1kW2VdKGEsYixjKX0pLnBvcCgpLFwic2VsZWN0XCI9PWE/ZC5zZXQoXCJoaWdobGlnaHRcIixlLnNlbGVjdCxjKTpcImhpZ2hsaWdodFwiPT1hP2Quc2V0KFwidmlld1wiLGUuaGlnaGxpZ2h0LGMpOlwiaW50ZXJ2YWxcIj09YT9kLnNldChcIm1pblwiLGUubWluLGMpLnNldChcIm1heFwiLGUubWF4LGMpOmEubWF0Y2goL14oZmxpcHxtaW58bWF4fGRpc2FibGV8ZW5hYmxlKSQvKSYmKFwibWluXCI9PWEmJmQuc2V0KFwibWF4XCIsZS5tYXgsYyksZS5zZWxlY3QmJmQuZGlzYWJsZWQoZS5zZWxlY3QpJiZkLnNldChcInNlbGVjdFwiLGUuc2VsZWN0LGMpLGUuaGlnaGxpZ2h0JiZkLmRpc2FibGVkKGUuaGlnaGxpZ2h0KSYmZC5zZXQoXCJoaWdobGlnaHRcIixlLmhpZ2hsaWdodCxjKSksZCl9LGMucHJvdG90eXBlLmdldD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5pdGVtW2FdfSxjLnByb3RvdHlwZS5jcmVhdGU9ZnVuY3Rpb24oYSxjLGYpe3ZhciBpPXRoaXM7cmV0dXJuIGM9dm9pZCAwPT09Yz9hOmMsaC5pc0RhdGUoYykmJihjPVtjLmdldEhvdXJzKCksYy5nZXRNaW51dGVzKCldKSxiLmlzT2JqZWN0KGMpJiZoLmlzSW50ZWdlcihjLnBpY2spP2M9Yy5waWNrOmIuaXNBcnJheShjKT9jPStjWzBdKmUrICtjWzFdOmguaXNJbnRlZ2VyKGMpfHwoYz1pLm5vdyhhLGMsZikpLFwibWF4XCI9PWEmJmM8aS5pdGVtLm1pbi5waWNrJiYoYys9ZyksXCJtaW5cIiE9YSYmXCJtYXhcIiE9YSYmKGMtaS5pdGVtLm1pbi5waWNrKSVpLml0ZW0uaW50ZXJ2YWwhPT0wJiYoYys9aS5pdGVtLmludGVydmFsKSxjPWkubm9ybWFsaXplKGEsYyxmKSx7aG91cjp+fihkK2MvZSklZCxtaW5zOihlK2MlZSklZSx0aW1lOihnK2MpJWcscGljazpjfX0sYy5wcm90b3R5cGUuY3JlYXRlUmFuZ2U9ZnVuY3Rpb24oYSxjKXt2YXIgZD10aGlzLGU9ZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT0hMHx8Yi5pc0FycmF5KGEpfHxoLmlzRGF0ZShhKT9kLmNyZWF0ZShhKTphfTtyZXR1cm4gaC5pc0ludGVnZXIoYSl8fChhPWUoYSkpLGguaXNJbnRlZ2VyKGMpfHwoYz1lKGMpKSxoLmlzSW50ZWdlcihhKSYmYi5pc09iamVjdChjKT9hPVtjLmhvdXIsYy5taW5zK2EqZC5zZXR0aW5ncy5pbnRlcnZhbF06aC5pc0ludGVnZXIoYykmJmIuaXNPYmplY3QoYSkmJihjPVthLmhvdXIsYS5taW5zK2MqZC5zZXR0aW5ncy5pbnRlcnZhbF0pLHtmcm9tOmUoYSksdG86ZShjKX19LGMucHJvdG90eXBlLndpdGhpblJhbmdlPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGE9dGhpcy5jcmVhdGVSYW5nZShhLmZyb20sYS50byksYi5waWNrPj1hLmZyb20ucGljayYmYi5waWNrPD1hLnRvLnBpY2t9LGMucHJvdG90eXBlLm92ZXJsYXBSYW5nZXM9ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzO3JldHVybiBhPWMuY3JlYXRlUmFuZ2UoYS5mcm9tLGEudG8pLGI9Yy5jcmVhdGVSYW5nZShiLmZyb20sYi50byksYy53aXRoaW5SYW5nZShhLGIuZnJvbSl8fGMud2l0aGluUmFuZ2UoYSxiLnRvKXx8Yy53aXRoaW5SYW5nZShiLGEuZnJvbSl8fGMud2l0aGluUmFuZ2UoYixhLnRvKX0sYy5wcm90b3R5cGUubm93PWZ1bmN0aW9uKGEsYil7dmFyIGMsZD10aGlzLml0ZW0uaW50ZXJ2YWwsZj1uZXcgRGF0ZSxnPWYuZ2V0SG91cnMoKSplK2YuZ2V0TWludXRlcygpLGk9aC5pc0ludGVnZXIoYik7cmV0dXJuIGctPWclZCxjPTA+YiYmLWQ+PWQqYitnLGcrPVwibWluXCI9PWEmJmM/MDpkLGkmJihnKz1kKihjJiZcIm1heFwiIT1hP2IrMTpiKSksZ30sYy5wcm90b3R5cGUubm9ybWFsaXplPWZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5pdGVtLmludGVydmFsLGQ9dGhpcy5pdGVtLm1pbiYmdGhpcy5pdGVtLm1pbi5waWNrfHwwO3JldHVybiBiLT1cIm1pblwiPT1hPzA6KGItZCklY30sYy5wcm90b3R5cGUubWVhc3VyZT1mdW5jdGlvbihhLGMsZil7dmFyIGc9dGhpcztyZXR1cm4gYz9jPT09ITB8fGguaXNJbnRlZ2VyKGMpP2M9Zy5ub3coYSxjLGYpOmIuaXNPYmplY3QoYykmJmguaXNJbnRlZ2VyKGMucGljaykmJihjPWcubm9ybWFsaXplKGEsYy5waWNrLGYpKTpjPVwibWluXCI9PWE/WzAsMF06W2QtMSxlLTFdLGN9LGMucHJvdG90eXBlLnZhbGlkYXRlPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD10aGlzLGU9YyYmYy5pbnRlcnZhbD9jLmludGVydmFsOmQuaXRlbS5pbnRlcnZhbDtyZXR1cm4gZC5kaXNhYmxlZChiKSYmKGI9ZC5zaGlmdChiLGUpKSxiPWQuc2NvcGUoYiksZC5kaXNhYmxlZChiKSYmKGI9ZC5zaGlmdChiLC0xKmUpKSxifSxjLnByb3RvdHlwZS5kaXNhYmxlZD1mdW5jdGlvbihhKXt2YXIgYz10aGlzLGQ9Yy5pdGVtLmRpc2FibGUuZmlsdGVyKGZ1bmN0aW9uKGQpe3JldHVybiBoLmlzSW50ZWdlcihkKT9hLmhvdXI9PWQ6Yi5pc0FycmF5KGQpfHxoLmlzRGF0ZShkKT9hLnBpY2s9PWMuY3JlYXRlKGQpLnBpY2s6Yi5pc09iamVjdChkKT9jLndpdGhpblJhbmdlKGQsYSk6dm9pZCAwfSk7cmV0dXJuIGQ9ZC5sZW5ndGgmJiFkLmZpbHRlcihmdW5jdGlvbihhKXtyZXR1cm4gYi5pc0FycmF5KGEpJiZcImludmVydGVkXCI9PWFbMl18fGIuaXNPYmplY3QoYSkmJmEuaW52ZXJ0ZWR9KS5sZW5ndGgsLTE9PT1jLml0ZW0uZW5hYmxlPyFkOmR8fGEucGljazxjLml0ZW0ubWluLnBpY2t8fGEucGljaz5jLml0ZW0ubWF4LnBpY2t9LGMucHJvdG90eXBlLnNoaWZ0PWZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcyxkPWMuaXRlbS5taW4ucGljayxlPWMuaXRlbS5tYXgucGljaztmb3IoYj1ifHxjLml0ZW0uaW50ZXJ2YWw7Yy5kaXNhYmxlZChhKSYmKGE9Yy5jcmVhdGUoYS5waWNrKz1iKSwhKGEucGljazw9ZHx8YS5waWNrPj1lKSk7KTtyZXR1cm4gYX0sYy5wcm90b3R5cGUuc2NvcGU9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5pdGVtLm1pbi5waWNrLGM9dGhpcy5pdGVtLm1heC5waWNrO3JldHVybiB0aGlzLmNyZWF0ZShhLnBpY2s+Yz9jOmEucGljazxiP2I6YSl9LGMucHJvdG90eXBlLnBhcnNlPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZixnLGksaixrLGw9dGhpcyxtPXt9O2lmKCFjfHxoLmlzSW50ZWdlcihjKXx8Yi5pc0FycmF5KGMpfHxoLmlzRGF0ZShjKXx8Yi5pc09iamVjdChjKSYmaC5pc0ludGVnZXIoYy5waWNrKSlyZXR1cm4gYztkJiZkLmZvcm1hdHx8KGQ9ZHx8e30sZC5mb3JtYXQ9bC5zZXR0aW5ncy5mb3JtYXQpLGwuZm9ybWF0cy50b0FycmF5KGQuZm9ybWF0KS5tYXAoZnVuY3Rpb24oYSl7dmFyIGIsZD1sLmZvcm1hdHNbYV0sZT1kP2gudHJpZ2dlcihkLGwsW2MsbV0pOmEucmVwbGFjZSgvXiEvLFwiXCIpLmxlbmd0aDtkJiYoYj1jLnN1YnN0cigwLGUpLG1bYV09Yi5tYXRjaCgvXlxcZCskLyk/K2I6YiksYz1jLnN1YnN0cihlKX0pO2ZvcihqIGluIG0paz1tW2pdLGguaXNJbnRlZ2VyKGspP2oubWF0Y2goL14oaHxoaCkkL2kpPyhmPWssKFwiaFwiPT1qfHxcImhoXCI9PWopJiYoZiU9MTIpKTpcImlcIj09aiYmKGc9ayk6ai5tYXRjaCgvXmEkL2kpJiZrLm1hdGNoKC9ecC9pKSYmKFwiaFwiaW4gbXx8XCJoaFwiaW4gbSkmJihpPSEwKTtyZXR1cm4oaT9mKzEyOmYpKmUrZ30sYy5wcm90b3R5cGUuZm9ybWF0cz17aDpmdW5jdGlvbihhLGIpe3JldHVybiBhP2guZGlnaXRzKGEpOmIuaG91ciVmfHxmfSxoaDpmdW5jdGlvbihhLGIpe3JldHVybiBhPzI6aC5sZWFkKGIuaG91ciVmfHxmKX0sSDpmdW5jdGlvbihhLGIpe3JldHVybiBhP2guZGlnaXRzKGEpOlwiXCIrYi5ob3VyJTI0fSxISDpmdW5jdGlvbihhLGIpe3JldHVybiBhP2guZGlnaXRzKGEpOmgubGVhZChiLmhvdXIlMjQpfSxpOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGE/MjpoLmxlYWQoYi5taW5zKX0sYTpmdW5jdGlvbihhLGIpe3JldHVybiBhPzQ6Zy8yPmIudGltZSVnP1wiYS5tLlwiOlwicC5tLlwifSxBOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGE/MjpnLzI+Yi50aW1lJWc/XCJBTVwiOlwiUE1cIn0sdG9BcnJheTpmdW5jdGlvbihhKXtyZXR1cm4gYS5zcGxpdCgvKGh7MSwyfXxIezEsMn18aXxhfEF8IS4pL2cpfSx0b1N0cmluZzpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXM7cmV0dXJuIGMuZm9ybWF0cy50b0FycmF5KGEpLm1hcChmdW5jdGlvbihhKXtyZXR1cm4gaC50cmlnZ2VyKGMuZm9ybWF0c1thXSxjLFswLGJdKXx8YS5yZXBsYWNlKC9eIS8sXCJcIil9KS5qb2luKFwiXCIpfX0sYy5wcm90b3R5cGUuaXNUaW1lRXhhY3Q9ZnVuY3Rpb24oYSxjKXt2YXIgZD10aGlzO3JldHVybiBoLmlzSW50ZWdlcihhKSYmaC5pc0ludGVnZXIoYyl8fFwiYm9vbGVhblwiPT10eXBlb2YgYSYmXCJib29sZWFuXCI9PXR5cGVvZiBjP2E9PT1jOihoLmlzRGF0ZShhKXx8Yi5pc0FycmF5KGEpKSYmKGguaXNEYXRlKGMpfHxiLmlzQXJyYXkoYykpP2QuY3JlYXRlKGEpLnBpY2s9PT1kLmNyZWF0ZShjKS5waWNrOmIuaXNPYmplY3QoYSkmJmIuaXNPYmplY3QoYyk/ZC5pc1RpbWVFeGFjdChhLmZyb20sYy5mcm9tKSYmZC5pc1RpbWVFeGFjdChhLnRvLGMudG8pOiExfSxjLnByb3RvdHlwZS5pc1RpbWVPdmVybGFwPWZ1bmN0aW9uKGEsYyl7dmFyIGQ9dGhpcztyZXR1cm4gaC5pc0ludGVnZXIoYSkmJihoLmlzRGF0ZShjKXx8Yi5pc0FycmF5KGMpKT9hPT09ZC5jcmVhdGUoYykuaG91cjpoLmlzSW50ZWdlcihjKSYmKGguaXNEYXRlKGEpfHxiLmlzQXJyYXkoYSkpP2M9PT1kLmNyZWF0ZShhKS5ob3VyOmIuaXNPYmplY3QoYSkmJmIuaXNPYmplY3QoYyk/ZC5vdmVybGFwUmFuZ2VzKGEsYyk6ITF9LGMucHJvdG90eXBlLmZsaXBFbmFibGU9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5pdGVtO2IuZW5hYmxlPWF8fCgtMT09Yi5lbmFibGU/MTotMSl9LGMucHJvdG90eXBlLmRlYWN0aXZhdGU9ZnVuY3Rpb24oYSxjKXt2YXIgZD10aGlzLGU9ZC5pdGVtLmRpc2FibGUuc2xpY2UoMCk7cmV0dXJuXCJmbGlwXCI9PWM/ZC5mbGlwRW5hYmxlKCk6Yz09PSExPyhkLmZsaXBFbmFibGUoMSksZT1bXSk6Yz09PSEwPyhkLmZsaXBFbmFibGUoLTEpLGU9W10pOmMubWFwKGZ1bmN0aW9uKGEpe2Zvcih2YXIgYyxmPTA7ZjxlLmxlbmd0aDtmKz0xKWlmKGQuaXNUaW1lRXhhY3QoYSxlW2ZdKSl7Yz0hMDticmVha31jfHwoaC5pc0ludGVnZXIoYSl8fGguaXNEYXRlKGEpfHxiLmlzQXJyYXkoYSl8fGIuaXNPYmplY3QoYSkmJmEuZnJvbSYmYS50bykmJmUucHVzaChhKX0pLGV9LGMucHJvdG90eXBlLmFjdGl2YXRlPWZ1bmN0aW9uKGEsYyl7dmFyIGQ9dGhpcyxlPWQuaXRlbS5kaXNhYmxlLGY9ZS5sZW5ndGg7cmV0dXJuXCJmbGlwXCI9PWM/ZC5mbGlwRW5hYmxlKCk6Yz09PSEwPyhkLmZsaXBFbmFibGUoMSksZT1bXSk6Yz09PSExPyhkLmZsaXBFbmFibGUoLTEpLGU9W10pOmMubWFwKGZ1bmN0aW9uKGEpe3ZhciBjLGcsaSxqO2ZvcihpPTA7Zj5pO2krPTEpe2lmKGc9ZVtpXSxkLmlzVGltZUV4YWN0KGcsYSkpe2M9ZVtpXT1udWxsLGo9ITA7YnJlYWt9aWYoZC5pc1RpbWVPdmVybGFwKGcsYSkpe2IuaXNPYmplY3QoYSk/KGEuaW52ZXJ0ZWQ9ITAsYz1hKTpiLmlzQXJyYXkoYSk/KGM9YSxjWzJdfHxjLnB1c2goXCJpbnZlcnRlZFwiKSk6aC5pc0RhdGUoYSkmJihjPVthLmdldEZ1bGxZZWFyKCksYS5nZXRNb250aCgpLGEuZ2V0RGF0ZSgpLFwiaW52ZXJ0ZWRcIl0pO2JyZWFrfX1pZihjKWZvcihpPTA7Zj5pO2krPTEpaWYoZC5pc1RpbWVFeGFjdChlW2ldLGEpKXtlW2ldPW51bGw7YnJlYWt9aWYoailmb3IoaT0wO2Y+aTtpKz0xKWlmKGQuaXNUaW1lT3ZlcmxhcChlW2ldLGEpKXtlW2ldPW51bGw7YnJlYWt9YyYmZS5wdXNoKGMpfSksZS5maWx0ZXIoZnVuY3Rpb24oYSl7cmV0dXJuIG51bGwhPWF9KX0sYy5wcm90b3R5cGUuaT1mdW5jdGlvbihhLGIpe3JldHVybiBoLmlzSW50ZWdlcihiKSYmYj4wP2I6dGhpcy5pdGVtLmludGVydmFsfSxjLnByb3RvdHlwZS5ub2Rlcz1mdW5jdGlvbihhKXt2YXIgYj10aGlzLGM9Yi5zZXR0aW5ncyxkPWIuaXRlbS5zZWxlY3QsZT1iLml0ZW0uaGlnaGxpZ2h0LGY9Yi5pdGVtLnZpZXcsZz1iLml0ZW0uZGlzYWJsZTtyZXR1cm4gaC5ub2RlKFwidWxcIixoLmdyb3VwKHttaW46Yi5pdGVtLm1pbi5waWNrLG1heDpiLml0ZW0ubWF4LnBpY2ssaTpiLml0ZW0uaW50ZXJ2YWwsbm9kZTpcImxpXCIsaXRlbTpmdW5jdGlvbihhKXthPWIuY3JlYXRlKGEpO3ZhciBpPWEucGljayxqPWQmJmQucGljaz09aSxrPWUmJmUucGljaz09aSxsPWcmJmIuZGlzYWJsZWQoYSk7cmV0dXJuW2gudHJpZ2dlcihiLmZvcm1hdHMudG9TdHJpbmcsYixbaC50cmlnZ2VyKGMuZm9ybWF0TGFiZWwsYixbYV0pfHxjLmZvcm1hdCxhXSksZnVuY3Rpb24oYSl7cmV0dXJuIGomJmEucHVzaChjLmtsYXNzLnNlbGVjdGVkKSxrJiZhLnB1c2goYy5rbGFzcy5oaWdobGlnaHRlZCksZiYmZi5waWNrPT1pJiZhLnB1c2goYy5rbGFzcy52aWV3c2V0KSxsJiZhLnB1c2goYy5rbGFzcy5kaXNhYmxlZCksYS5qb2luKFwiIFwiKX0oW2Mua2xhc3MubGlzdEl0ZW1dKSxcImRhdGEtcGljaz1cIithLnBpY2srXCIgXCIraC5hcmlhQXR0cih7cm9sZTpcImJ1dHRvblwiLGNvbnRyb2xzOmIuJG5vZGVbMF0uaWQsY2hlY2tlZDpqJiZiLiRub2RlLnZhbCgpPT09aC50cmlnZ2VyKGIuZm9ybWF0cy50b1N0cmluZyxiLFtjLmZvcm1hdCxhXSk/ITA6bnVsbCxhY3RpdmVkZXNjZW5kYW50Oms/ITA6bnVsbCxkaXNhYmxlZDpsPyEwOm51bGx9KV19fSkraC5ub2RlKFwibGlcIixoLm5vZGUoXCJidXR0b25cIixjLmNsZWFyLGMua2xhc3MuYnV0dG9uQ2xlYXIsXCJ0eXBlPWJ1dHRvbiBkYXRhLWNsZWFyPTFcIisoYT9cIlwiOlwiIGRpc2FibGVcIikpKSxjLmtsYXNzLmxpc3QpfSxjLmRlZmF1bHRzPWZ1bmN0aW9uKGEpe3JldHVybntjbGVhcjpcIkNsZWFyXCIsZm9ybWF0OlwiaDppIEFcIixpbnRlcnZhbDozMCxrbGFzczp7cGlja2VyOmErXCIgXCIrYStcIi0tdGltZVwiLGhvbGRlcjphK1wiX19ob2xkZXJcIixsaXN0OmErXCJfX2xpc3RcIixsaXN0SXRlbTphK1wiX19saXN0LWl0ZW1cIixkaXNhYmxlZDphK1wiX19saXN0LWl0ZW0tLWRpc2FibGVkXCIsc2VsZWN0ZWQ6YStcIl9fbGlzdC1pdGVtLS1zZWxlY3RlZFwiLGhpZ2hsaWdodGVkOmErXCJfX2xpc3QtaXRlbS0taGlnaGxpZ2h0ZWRcIix2aWV3c2V0OmErXCJfX2xpc3QtaXRlbS0tdmlld3NldFwiLG5vdzphK1wiX19saXN0LWl0ZW0tLW5vd1wiLGJ1dHRvbkNsZWFyOmErXCJfX2J1dHRvbi0tY2xlYXJcIn19fShhLmtsYXNzZXMoKS5waWNrZXIpLGEuZXh0ZW5kKFwicGlja2F0aW1lXCIsYyl9KTtcbi8qIVxuICogTGVnYWN5IGJyb3dzZXIgc3VwcG9ydFxuICovXG5bXS5tYXB8fChBcnJheS5wcm90b3R5cGUubWFwPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPXRoaXMsZD1jLmxlbmd0aCxlPW5ldyBBcnJheShkKSxmPTA7ZD5mO2YrKylmIGluIGMmJihlW2ZdPWEuY2FsbChiLGNbZl0sZixjKSk7cmV0dXJuIGV9KSxbXS5maWx0ZXJ8fChBcnJheS5wcm90b3R5cGUuZmlsdGVyPWZ1bmN0aW9uKGEpe2lmKG51bGw9PXRoaXMpdGhyb3cgbmV3IFR5cGVFcnJvcjt2YXIgYj1PYmplY3QodGhpcyksYz1iLmxlbmd0aD4+PjA7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgYSl0aHJvdyBuZXcgVHlwZUVycm9yO2Zvcih2YXIgZD1bXSxlPWFyZ3VtZW50c1sxXSxmPTA7Yz5mO2YrKylpZihmIGluIGIpe3ZhciBnPWJbZl07YS5jYWxsKGUsZyxmLGIpJiZkLnB1c2goZyl9cmV0dXJuIGR9KSxbXS5pbmRleE9mfHwoQXJyYXkucHJvdG90eXBlLmluZGV4T2Y9ZnVuY3Rpb24oYSl7aWYobnVsbD09dGhpcyl0aHJvdyBuZXcgVHlwZUVycm9yO3ZhciBiPU9iamVjdCh0aGlzKSxjPWIubGVuZ3RoPj4+MDtpZigwPT09YylyZXR1cm4tMTt2YXIgZD0wO2lmKGFyZ3VtZW50cy5sZW5ndGg+MSYmKGQ9TnVtYmVyKGFyZ3VtZW50c1sxXSksZCE9ZD9kPTA6MCE9PWQmJjEvMCE9ZCYmZCE9LTEvMCYmKGQ9KGQ+MHx8LTEpKk1hdGguZmxvb3IoTWF0aC5hYnMoZCkpKSksZD49YylyZXR1cm4tMTtmb3IodmFyIGU9ZD49MD9kOk1hdGgubWF4KGMtTWF0aC5hYnMoZCksMCk7Yz5lO2UrKylpZihlIGluIGImJmJbZV09PT1hKXJldHVybiBlO3JldHVybi0xfSk7LyohXG4gKiBDcm9zcy1Ccm93c2VyIFNwbGl0IDEuMS4xXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDEyIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPlxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuICogaHR0cDovL2Jsb2cuc3RldmVubGV2aXRoYW4uY29tL2FyY2hpdmVzL2Nyb3NzLWJyb3dzZXItc3BsaXRcbiAqL1xudmFyIG5hdGl2ZVNwbGl0PVN0cmluZy5wcm90b3R5cGUuc3BsaXQsY29tcGxpYW50RXhlY05wY2c9dm9pZCAwPT09LygpPz8vLmV4ZWMoXCJcIilbMV07U3RyaW5nLnByb3RvdHlwZS5zcGxpdD1mdW5jdGlvbihhLGIpe3ZhciBjPXRoaXM7aWYoXCJbb2JqZWN0IFJlZ0V4cF1cIiE9PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKSlyZXR1cm4gbmF0aXZlU3BsaXQuY2FsbChjLGEsYik7dmFyIGQsZSxmLGcsaD1bXSxpPShhLmlnbm9yZUNhc2U/XCJpXCI6XCJcIikrKGEubXVsdGlsaW5lP1wibVwiOlwiXCIpKyhhLmV4dGVuZGVkP1wieFwiOlwiXCIpKyhhLnN0aWNreT9cInlcIjpcIlwiKSxqPTA7Zm9yKGE9bmV3IFJlZ0V4cChhLnNvdXJjZSxpK1wiZ1wiKSxjKz1cIlwiLGNvbXBsaWFudEV4ZWNOcGNnfHwoZD1uZXcgUmVnRXhwKFwiXlwiK2Euc291cmNlK1wiJCg/IVxcXFxzKVwiLGkpKSxiPXZvaWQgMD09PWI/LTE+Pj4wOmI+Pj4wOyhlPWEuZXhlYyhjKSkmJihmPWUuaW5kZXgrZVswXS5sZW5ndGgsIShmPmomJihoLnB1c2goYy5zbGljZShqLGUuaW5kZXgpKSwhY29tcGxpYW50RXhlY05wY2cmJmUubGVuZ3RoPjEmJmVbMF0ucmVwbGFjZShkLGZ1bmN0aW9uKCl7Zm9yKHZhciBhPTE7YTxhcmd1bWVudHMubGVuZ3RoLTI7YSsrKXZvaWQgMD09PWFyZ3VtZW50c1thXSYmKGVbYV09dm9pZCAwKX0pLGUubGVuZ3RoPjEmJmUuaW5kZXg8Yy5sZW5ndGgmJkFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGgsZS5zbGljZSgxKSksZz1lWzBdLmxlbmd0aCxqPWYsaC5sZW5ndGg+PWIpKSk7KWEubGFzdEluZGV4PT09ZS5pbmRleCYmYS5sYXN0SW5kZXgrKztyZXR1cm4gaj09PWMubGVuZ3RoPyhnfHwhYS50ZXN0KFwiXCIpKSYmaC5wdXNoKFwiXCIpOmgucHVzaChjLnNsaWNlKGopKSxoLmxlbmd0aD5iP2guc2xpY2UoMCxiKTpofTtcbmFuZ3VsYXIubW9kdWxlKFwiYW5ndWxhci1kYXRlcGlja2VyXCIsW10pLmRpcmVjdGl2ZShcInBpY2tBRGF0ZVwiLGZ1bmN0aW9uKCl7cmV0dXJue3Jlc3RyaWN0OlwiQVwiLHNjb3BlOntwaWNrQURhdGU6XCI9XCIscGlja0FEYXRlT3B0aW9uczpcIj1cIn0sbGluazpmdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGMoYyl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZiYmZi5hcHBseSh0aGlzLGFyZ3VtZW50cyksIWEuJCRwaGFzZSYmIWEuJHJvb3QuJCRwaGFzZSl7dmFyIGQ9Yi5waWNrYWRhdGUoXCJwaWNrZXJcIikuZ2V0KFwic2VsZWN0XCIpO2EuJGFwcGx5KGZ1bmN0aW9uKCl7cmV0dXJuIGMuaGFzT3duUHJvcGVydHkoXCJjbGVhclwiKT92b2lkKGEucGlja0FEYXRlPW51bGwpOihhLnBpY2tBRGF0ZSYmXCJzdHJpbmdcIiE9dHlwZW9mIGEucGlja0FEYXRlfHwoYS5waWNrQURhdGU9bmV3IERhdGUoMCkpLGEucGlja0FEYXRlLnNldFllYXIoZC5vYmouZ2V0WWVhcigpKzE5MDApLGEucGlja0FEYXRlLnNldE1vbnRoKGQub2JqLmdldE1vbnRoKCkpLHZvaWQgYS5waWNrQURhdGUuc2V0RGF0ZShkLm9iai5nZXREYXRlKCkpKX0pfX1mdW5jdGlvbiBkKCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZyYmZy5hcHBseSh0aGlzLGFyZ3VtZW50cyksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGNvcmRvdmEmJmNvcmRvdmEucGx1Z2lucyYmY29yZG92YS5wbHVnaW5zLktleWJvYXJkKXt2YXIgYT1mdW5jdGlvbigpe2NvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5jbG9zZSgpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibmF0aXZlLmtleWJvYXJkc2hvd1wiLHRoaXMpfTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm5hdGl2ZS5rZXlib2FyZHNob3dcIixhKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJuYXRpdmUua2V5Ym9hcmRzaG93XCIsYSl9LDUwMCl9fXZhciBlPWEucGlja0FEYXRlT3B0aW9uc3x8e30sZj1lLm9uU2V0LGc9ZS5vbkNsb3NlO2IucGlja2FkYXRlKGFuZ3VsYXIuZXh0ZW5kKGUse29uU2V0OmMsb25DbG9zZTpkLGNvbnRhaW5lcjpkb2N1bWVudC5ib2R5fSkpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXthLnBpY2tBRGF0ZSYmYi5waWNrYWRhdGUoXCJwaWNrZXJcIikuc2V0KFwic2VsZWN0XCIsYS5waWNrQURhdGUpfSwxZTMpfX19KS5kaXJlY3RpdmUoXCJwaWNrQVRpbWVcIixmdW5jdGlvbigpe3JldHVybntyZXN0cmljdDpcIkFcIixzY29wZTp7cGlja0FUaW1lOlwiPVwiLHBpY2tBVGltZU9wdGlvbnM6XCI9XCJ9LGxpbms6ZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBjKGMpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGYmJmYuYXBwbHkodGhpcyxhcmd1bWVudHMpLCFhLiQkcGhhc2UmJiFhLiRyb290LiQkcGhhc2Upe3ZhciBkPWIucGlja2F0aW1lKFwicGlja2VyXCIpLmdldChcInNlbGVjdFwiKTthLiRhcHBseShmdW5jdGlvbigpe3JldHVybiBjLmhhc093blByb3BlcnR5KFwiY2xlYXJcIik/dm9pZChhLnBpY2tBVGltZT1udWxsKTooYS5waWNrQVRpbWUmJlwic3RyaW5nXCIhPXR5cGVvZiBhLnBpY2tBVGltZXx8KGEucGlja0FUaW1lPW5ldyBEYXRlKSxhLnBpY2tBVGltZS5zZXRIb3VycyhkLmhvdXIpLGEucGlja0FUaW1lLnNldE1pbnV0ZXMoZC5taW5zKSxhLnBpY2tBVGltZS5zZXRTZWNvbmRzKDApLHZvaWQgYS5waWNrQVRpbWUuc2V0TWlsbGlzZWNvbmRzKDApKX0pfX1mdW5jdGlvbiBkKCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZyYmZy5hcHBseSh0aGlzLGFyZ3VtZW50cyksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGNvcmRvdmEmJmNvcmRvdmEucGx1Z2lucyYmY29yZG92YS5wbHVnaW5zLktleWJvYXJkKXt2YXIgYT1mdW5jdGlvbigpe2NvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5jbG9zZSgpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibmF0aXZlLmtleWJvYXJkc2hvd1wiLHRoaXMpfTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm5hdGl2ZS5rZXlib2FyZHNob3dcIixhKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJuYXRpdmUua2V5Ym9hcmRzaG93XCIsYSl9LDUwMCl9fXZhciBlPWEucGlja0FUaW1lT3B0aW9uc3x8e30sZj1lLm9uU2V0LGc9ZS5vbkNsb3NlO2IucGlja2F0aW1lKGFuZ3VsYXIuZXh0ZW5kKGUse29uU2V0OmMsb25DbG9zZTpkLGNvbnRhaW5lcjpkb2N1bWVudC5ib2R5fSkpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXthLnBpY2tBVGltZSYmYi5waWNrYXRpbWUoXCJwaWNrZXJcIikuc2V0KFwic2VsZWN0XCIsYS5waWNrQVRpbWUpfSwxZTMpfX19KTsiLCIvLyBEZXBzIGlzIHNvcnQgb2YgYSBwcm9ibGVtIGZvciB1cywgbWF5YmUgaW4gdGhlIGZ1dHVyZSB3ZSB3aWxsIGFzayB0aGUgdXNlciB0byBkZXBlbmRcbi8vIG9uIG1vZHVsZXMgZm9yIGFkZC1vbnNcblxudmFyIGRlcHMgPSBbJ09iamVjdFBhdGgnXTtcbnRyeSB7XG4gIC8vVGhpcyB0aHJvd3MgYW4gZXhwZWN0aW9uIGlmIG1vZHVsZSBkb2VzIG5vdCBleGlzdC5cbiAgYW5ndWxhci5tb2R1bGUoJ25nU2FuaXRpemUnKTtcbiAgZGVwcy5wdXNoKCduZ1Nhbml0aXplJyk7XG59IGNhdGNoIChlKSB7fVxuXG50cnkge1xuICAvL1RoaXMgdGhyb3dzIGFuIGV4cGVjdGlvbiBpZiBtb2R1bGUgZG9lcyBub3QgZXhpc3QuXG4gIGFuZ3VsYXIubW9kdWxlKCd1aS5zb3J0YWJsZScpO1xuICBkZXBzLnB1c2goJ3VpLnNvcnRhYmxlJyk7XG59IGNhdGNoIChlKSB7fVxuXG50cnkge1xuICAvL1RoaXMgdGhyb3dzIGFuIGV4cGVjdGlvbiBpZiBtb2R1bGUgZG9lcyBub3QgZXhpc3QuXG4gIGFuZ3VsYXIubW9kdWxlKCdhbmd1bGFyU3BlY3RydW1Db2xvcnBpY2tlcicpO1xuICBkZXBzLnB1c2goJ2FuZ3VsYXJTcGVjdHJ1bUNvbG9ycGlja2VyJyk7XG59IGNhdGNoIChlKSB7fVxuXG5hbmd1bGFyLm1vZHVsZSgnc2NoZW1hRm9ybScsIGRlcHMpO1xuXG5hbmd1bGFyLm1vZHVsZSgnc2NoZW1hRm9ybScpLnByb3ZpZGVyKCdzZlBhdGgnLFxuWydPYmplY3RQYXRoUHJvdmlkZXInLCBmdW5jdGlvbihPYmplY3RQYXRoUHJvdmlkZXIpIHtcbiAgdmFyIE9iamVjdFBhdGggPSB7cGFyc2U6IE9iamVjdFBhdGhQcm92aWRlci5wYXJzZX07XG5cbiAgLy8gaWYgd2UncmUgb24gQW5ndWxhciAxLjIueCwgd2UgbmVlZCB0byBjb250aW51ZSB1c2luZyBkb3Qgbm90YXRpb25cbiAgaWYgKGFuZ3VsYXIudmVyc2lvbi5tYWpvciA9PT0gMSAmJiBhbmd1bGFyLnZlcnNpb24ubWlub3IgPCAzKSB7XG4gICAgT2JqZWN0UGF0aC5zdHJpbmdpZnkgPSBmdW5jdGlvbihhcnIpIHtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGFycikgPyBhcnIuam9pbignLicpIDogYXJyLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBPYmplY3RQYXRoLnN0cmluZ2lmeSA9IE9iamVjdFBhdGhQcm92aWRlci5zdHJpbmdpZnk7XG4gIH1cblxuICAvLyBXZSB3YW50IHRoaXMgdG8gdXNlIHdoaWNoZXZlciBzdHJpbmdpZnkgbWV0aG9kIGlzIGRlZmluZWQgYWJvdmUsXG4gIC8vIHNvIHdlIGhhdmUgdG8gY29weSB0aGUgY29kZSBoZXJlLlxuICBPYmplY3RQYXRoLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKGRhdGEsIHF1b3RlKSB7XG4gICAgcmV0dXJuIE9iamVjdFBhdGguc3RyaW5naWZ5KEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogT2JqZWN0UGF0aC5wYXJzZShkYXRhKSwgcXVvdGUpO1xuICB9O1xuXG4gIHRoaXMucGFyc2UgPSBPYmplY3RQYXRoLnBhcnNlO1xuICB0aGlzLnN0cmluZ2lmeSA9IE9iamVjdFBhdGguc3RyaW5naWZ5O1xuICB0aGlzLm5vcm1hbGl6ZSA9IE9iamVjdFBhdGgubm9ybWFsaXplO1xuICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gT2JqZWN0UGF0aDtcbiAgfTtcbn1dKTtcblxuLyoqXG4gKiBAbmdkb2Mgc2VydmljZVxuICogQG5hbWUgc2ZTZWxlY3RcbiAqIEBraW5kIGZ1bmN0aW9uXG4gKlxuICovXG5hbmd1bGFyLm1vZHVsZSgnc2NoZW1hRm9ybScpLmZhY3RvcnkoJ3NmU2VsZWN0JywgWydzZlBhdGgnLCBmdW5jdGlvbihzZlBhdGgpIHtcbiAgdmFyIG51bVJlID0gL15cXGQrJC87XG5cbiAgLyoqXG4gICAgKiBAZGVzY3JpcHRpb25cbiAgICAqIFV0aWxpdHkgbWV0aG9kIHRvIGFjY2VzcyBkZWVwIHByb3BlcnRpZXMgd2l0aG91dFxuICAgICogdGhyb3dpbmcgZXJyb3JzIHdoZW4gdGhpbmdzIGFyZSBub3QgZGVmaW5lZC5cbiAgICAqIENhbiBhbHNvIHNldCBhIHZhbHVlIGluIGEgZGVlcCBzdHJ1Y3R1cmUsIGNyZWF0aW5nIG9iamVjdHMgd2hlbiBtaXNzaW5nXG4gICAgKiBleC5cbiAgICAqIHZhciBmb28gPSBTZWxlY3QoJ2FkZHJlc3MuY29udGFjdC5uYW1lJyxvYmopXG4gICAgKiBTZWxlY3QoJ2FkZHJlc3MuY29udGFjdC5uYW1lJyxvYmosJ0xlZXJveScpXG4gICAgKlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3Rpb24gQSBkb3QgcGF0aCB0byB0aGUgcHJvcGVydHkgeW91IHdhbnQgdG8gZ2V0L3NldFxuICAgICogQHBhcmFtIHtvYmplY3R9IG9iaiAgIChvcHRpb25hbCkgVGhlIG9iamVjdCB0byBwcm9qZWN0IG9uLCBkZWZhdWx0cyB0byAndGhpcydcbiAgICAqIEBwYXJhbSB7QW55fSAgICB2YWx1ZVRvU2V0IChvcGlvbmFsKSAgVGhlIHZhbHVlIHRvIHNldCwgaWYgcGFydHMgb2YgdGhlIHBhdGggb2ZcbiAgICAqICAgICAgICAgICAgICAgICB0aGUgcHJvamVjdGlvbiBpcyBtaXNzaW5nIGVtcHR5IG9iamVjdHMgd2lsbCBiZSBjcmVhdGVkLlxuICAgICogQHJldHVybnMge0FueXx1bmRlZmluZWR9IHJldHVybnMgdGhlIHZhbHVlIGF0IHRoZSBlbmQgb2YgdGhlIHByb2plY3Rpb24gcGF0aFxuICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBpcyBub25lLlxuICAgICovXG4gIHJldHVybiBmdW5jdGlvbihwcm9qZWN0aW9uLCBvYmosIHZhbHVlVG9TZXQpIHtcbiAgICBpZiAoIW9iaikge1xuICAgICAgb2JqID0gdGhpcztcbiAgICB9XG4gICAgLy9TdXBwb3J0IFtdIGFycmF5IHN5bnRheFxuICAgIHZhciBwYXJ0cyA9IHR5cGVvZiBwcm9qZWN0aW9uID09PSAnc3RyaW5nJyA/IHNmUGF0aC5wYXJzZShwcm9qZWN0aW9uKSA6IHByb2plY3Rpb247XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlVG9TZXQgIT09ICd1bmRlZmluZWQnICYmIHBhcnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy9zcGVjaWFsIGNhc2UsIGp1c3Qgc2V0dGluZyBvbmUgdmFyaWFibGVcbiAgICAgIG9ialtwYXJ0c1swXV0gPSB2YWx1ZVRvU2V0O1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlVG9TZXQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBvYmpbcGFydHNbMF1dID09PSAndW5kZWZpbmVkJykge1xuICAgICAgIC8vIFdlIG5lZWQgdG8gbG9vayBhaGVhZCB0byBjaGVjayBpZiBhcnJheSBpcyBhcHByb3ByaWF0ZVxuICAgICAgb2JqW3BhcnRzWzBdXSA9IHBhcnRzLmxlbmd0aCA+IDIgJiYgbnVtUmUudGVzdChwYXJ0c1sxXSkgPyBbXSA6IHt9O1xuICAgIH1cblxuICAgIHZhciB2YWx1ZSA9IG9ialtwYXJ0c1swXV07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gU3BlY2lhbCBjYXNlOiBXZSBhbGxvdyBKU09OIEZvcm0gc3ludGF4IGZvciBhcnJheXMgdXNpbmcgZW1wdHkgYnJhY2tldHNcbiAgICAgIC8vIFRoZXNlIHdpbGwgb2YgY291cnNlIG5vdCB3b3JrIGhlcmUgc28gd2UgZXhpdCBpZiB0aGV5IGFyZSBmb3VuZC5cbiAgICAgIGlmIChwYXJ0c1tpXSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWVUb1NldCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKGkgPT09IHBhcnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAvL2xhc3Qgc3RlcC4gTGV0J3Mgc2V0IHRoZSB2YWx1ZVxuICAgICAgICAgIHZhbHVlW3BhcnRzW2ldXSA9IHZhbHVlVG9TZXQ7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlVG9TZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTWFrZSBzdXJlIHRvIGNyZWF0ZSBuZXcgb2JqZWN0cyBvbiB0aGUgd2F5IGlmIHRoZXkgYXJlIG5vdCB0aGVyZS5cbiAgICAgICAgICAvLyBXZSBuZWVkIHRvIGxvb2sgYWhlYWQgdG8gY2hlY2sgaWYgYXJyYXkgaXMgYXBwcm9wcmlhdGVcbiAgICAgICAgICB2YXIgdG1wID0gdmFsdWVbcGFydHNbaV1dO1xuICAgICAgICAgIGlmICh0eXBlb2YgdG1wID09PSAndW5kZWZpbmVkJyB8fCB0bXAgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRtcCA9IG51bVJlLnRlc3QocGFydHNbaSArIDFdKSA/IFtdIDoge307XG4gICAgICAgICAgICB2YWx1ZVtwYXJ0c1tpXV0gPSB0bXA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gdG1wO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgIC8vSnVzdCBnZXQgbmV4IHZhbHVlLlxuICAgICAgICB2YWx1ZSA9IHZhbHVlW3BhcnRzW2ldXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufV0pO1xuXG5hbmd1bGFyLm1vZHVsZSgnc2NoZW1hRm9ybScpLnByb3ZpZGVyKCdzY2hlbWFGb3JtRGVjb3JhdG9ycycsXG5bJyRjb21waWxlUHJvdmlkZXInLCAnc2ZQYXRoUHJvdmlkZXInLCBmdW5jdGlvbigkY29tcGlsZVByb3ZpZGVyLCBzZlBhdGhQcm92aWRlcikge1xuICB2YXIgZGVmYXVsdERlY29yYXRvciA9ICcnO1xuICB2YXIgZGlyZWN0aXZlcyA9IHt9O1xuXG4gIHZhciB0ZW1wbGF0ZVVybCA9IGZ1bmN0aW9uKG5hbWUsIGZvcm0pIHtcbiAgICAvL3NjaGVtYURlY29yYXRvciBpcyBhbGlhcyBmb3Igd2hhdGV2ZXIgaXMgc2V0IGFzIGRlZmF1bHRcbiAgICBpZiAobmFtZSA9PT0gJ3NmRGVjb3JhdG9yJykge1xuICAgICAgbmFtZSA9IGRlZmF1bHREZWNvcmF0b3I7XG4gICAgfVxuXG4gICAgdmFyIGRpcmVjdGl2ZSA9IGRpcmVjdGl2ZXNbbmFtZV07XG5cbiAgICAvL3J1bGVzIGZpcnN0XG4gICAgdmFyIHJ1bGVzID0gZGlyZWN0aXZlLnJ1bGVzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciByZXMgPSBydWxlc1tpXShmb3JtKTtcbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL3RoZW4gY2hlY2sgbWFwcGluZ1xuICAgIGlmIChkaXJlY3RpdmUubWFwcGluZ3NbZm9ybS50eXBlXSkge1xuICAgICAgcmV0dXJuIGRpcmVjdGl2ZS5tYXBwaW5nc1tmb3JtLnR5cGVdO1xuICAgIH1cblxuICAgIC8vdHJ5IGRlZmF1bHRcbiAgICByZXR1cm4gZGlyZWN0aXZlLm1hcHBpbmdzWydkZWZhdWx0J107XG4gIH07XG5cbiAgdmFyIGNyZWF0ZURpcmVjdGl2ZSA9IGZ1bmN0aW9uKG5hbWUsIG9wdGlvbnMpIHtcbiAgICAkY29tcGlsZVByb3ZpZGVyLmRpcmVjdGl2ZShuYW1lLCBbJyRwYXJzZScsICckY29tcGlsZScsICckaHR0cCcsICckdGVtcGxhdGVDYWNoZScsXG4gICAgICBmdW5jdGlvbigkcGFyc2UsICAkY29tcGlsZSwgICRodHRwLCAgJHRlbXBsYXRlQ2FjaGUpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgICAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgICAgIHRyYW5zY2x1ZGU6IGZhbHNlLFxuICAgICAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgICAgIHJlcXVpcmU6ICc/XnNmU2NoZW1hJyxcbiAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIHNmU2NoZW1hKSB7XG4gICAgICAgICAgICAvL3JlYmluZCBvdXIgcGFydCBvZiB0aGUgZm9ybSB0byB0aGUgc2NvcGUuXG4gICAgICAgICAgICB2YXIgb25jZSA9IHNjb3BlLiR3YXRjaChhdHRycy5mb3JtLCBmdW5jdGlvbihmb3JtKSB7XG5cbiAgICAgICAgICAgICAgaWYgKGZvcm0pIHtcbiAgICAgICAgICAgICAgICBzY29wZS5mb3JtICA9IGZvcm07XG5cbiAgICAgICAgICAgICAgICAvL29rIGxldCdzIHJlcGxhY2UgdGhhdCB0ZW1wbGF0ZSFcbiAgICAgICAgICAgICAgICAvL1dlIGRvIHRoaXMgbWFudWFsbHkgc2luY2Ugd2UgbmVlZCB0byBiaW5kIG5nLW1vZGVsIHByb3Blcmx5IGFuZCBhbHNvXG4gICAgICAgICAgICAgICAgLy9mb3IgZmllbGRzZXRzIHRvIHJlY3Vyc2UgcHJvcGVybHkuXG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IHRlbXBsYXRlVXJsKG5hbWUsIGZvcm0pO1xuICAgICAgICAgICAgICAgICRodHRwLmdldCh1cmwsIHtjYWNoZTogJHRlbXBsYXRlQ2FjaGV9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGZvcm0ua2V5ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZlBhdGhQcm92aWRlci5zdHJpbmdpZnkoZm9ybS5rZXkpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKSA6ICcnO1xuICAgICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gcmVzLmRhdGEucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgL1xcJFxcJHZhbHVlXFwkXFwkL2csXG4gICAgICAgICAgICAgICAgICAgICdtb2RlbCcgKyAoa2V5WzBdICE9PSAnWycgPyAnLicgOiAnJykgKyBrZXlcbiAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgICBcdGVsZW1lbnQuYWRkQ2xhc3Mob3B0aW9ucy5jbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKHRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9uY2UoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vS2VlcCBlcnJvciBwcm9uZSBsb2dpYyBmcm9tIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgc2NvcGUuc2hvd1RpdGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzY29wZS5mb3JtICYmIHNjb3BlLmZvcm0ubm90aXRsZSAhPT0gdHJ1ZSAmJiBzY29wZS5mb3JtLnRpdGxlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUubGlzdFRvQ2hlY2tib3hWYWx1ZXMgPSBmdW5jdGlvbihsaXN0KSB7XG4gICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSB7fTtcbiAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGxpc3QsIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXNbdl0gPSB0cnVlO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLmNoZWNrYm94VmFsdWVzVG9MaXN0ID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICAgICAgICAgIHZhciBsc3QgPSBbXTtcbiAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbHVlcywgZnVuY3Rpb24odiwgaykge1xuICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICBsc3QucHVzaChrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gbHN0O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUuYnV0dG9uQ2xpY2sgPSBmdW5jdGlvbigkZXZlbnQsIGZvcm0pIHtcbiAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihmb3JtLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICAgICAgZm9ybS5vbkNsaWNrKCRldmVudCwgZm9ybSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc1N0cmluZyhmb3JtLm9uQ2xpY2spKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNmU2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAvL2V2YWx1YXRpbmcgaW4gc2NvcGUgb3V0c2lkZSBvZiBzZlNjaGVtYXMgaXNvbGF0ZWQgc2NvcGVcbiAgICAgICAgICAgICAgICAgIHNmU2NoZW1hLmV2YWxJblBhcmVudFNjb3BlKGZvcm0ub25DbGljaywgeyckZXZlbnQnOiAkZXZlbnQsIGZvcm06IGZvcm19KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgc2NvcGUuJGV2YWwoZm9ybS5vbkNsaWNrLCB7JyRldmVudCc6ICRldmVudCwgZm9ybTogZm9ybX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFdmFsdWF0ZSBhbiBleHByZXNzaW9uLCBpLmUuIHNjb3BlLiRldmFsXG4gICAgICAgICAgICAgKiBidXQgZG8gaXQgaW4gc2ZTY2hlbWFzIHBhcmVudCBzY29wZSBzZi1zY2hlbWEgZGlyZWN0aXZlIGlzIHVzZWRcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uXG4gICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gbG9jYWxzIChvcHRpb25hbClcbiAgICAgICAgICAgICAqIEByZXR1cm4ge0FueX0gdGhlIHJlc3VsdCBvZiB0aGUgZXhwcmVzc2lvblxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzY29wZS5ldmFsRXhwciA9IGZ1bmN0aW9uKGV4cHJlc3Npb24sIGxvY2Fscykge1xuICAgICAgICAgICAgICBpZiAoc2ZTY2hlbWEpIHtcbiAgICAgICAgICAgICAgICAvL2V2YWx1YXRpbmcgaW4gc2NvcGUgb3V0c2lkZSBvZiBzZlNjaGVtYXMgaXNvbGF0ZWQgc2NvcGVcbiAgICAgICAgICAgICAgICByZXR1cm4gc2ZTY2hlbWEuZXZhbEluUGFyZW50U2NvcGUoZXhwcmVzc2lvbiwgbG9jYWxzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBzY29wZS4kZXZhbChleHByZXNzaW9uLCBsb2NhbHMpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFdmFsdWF0ZSBhbiBleHByZXNzaW9uLCBpLmUuIHNjb3BlLiRldmFsXG4gICAgICAgICAgICAgKiBpbiB0aGlzIGRlY29yYXRvcnMgc2NvcGVcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uXG4gICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gbG9jYWxzIChvcHRpb25hbClcbiAgICAgICAgICAgICAqIEByZXR1cm4ge0FueX0gdGhlIHJlc3VsdCBvZiB0aGUgZXhwcmVzc2lvblxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzY29wZS5ldmFsSW5TY29wZSA9IGZ1bmN0aW9uKGV4cHJlc3Npb24sIGxvY2Fscykge1xuICAgICAgICAgICAgICBpZiAoZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzY29wZS4kZXZhbChleHByZXNzaW9uLCBsb2NhbHMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEVycm9yIG1lc3NhZ2UgaGFuZGxlclxuICAgICAgICAgICAgICogQW4gZXJyb3IgY2FuIGVpdGhlciBiZSBhIHNjaGVtYSB2YWxpZGF0aW9uIG1lc3NhZ2Ugb3IgYSBhbmd1bGFyIGpzIHZhbGlkdGlvblxuICAgICAgICAgICAgICogZXJyb3IgKGkuZS4gcmVxdWlyZWQpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHNjb3BlLmVycm9yTWVzc2FnZSA9IGZ1bmN0aW9uKHNjaGVtYUVycm9yKSB7XG4gICAgICAgICAgICAgIC8vVXNlciBoYXMgc3VwcGxpZWQgdmFsaWRhdGlvbiBtZXNzYWdlc1xuICAgICAgICAgICAgICBpZiAoc2NvcGUuZm9ybS52YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGlmIChzY2hlbWFFcnJvcikge1xuICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcoc2NvcGUuZm9ybS52YWxpZGF0aW9uTWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmZvcm0udmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBzY29wZS5mb3JtLnZhbGlkYXRpb25NZXNzYWdlW3NjaGVtYUVycm9yLmNvZGVdIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuZm9ybS52YWxpZGF0aW9uTWVzc2FnZVsnZGVmYXVsdCddO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gc2NvcGUuZm9ybS52YWxpZGF0aW9uTWVzc2FnZS5udW1iZXIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5mb3JtLnZhbGlkYXRpb25NZXNzYWdlWydkZWZhdWx0J10gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5mb3JtLnZhbGlkYXRpb25NZXNzYWdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vTm8gdXNlciBzdXBwbGllZCB2YWxpZGF0aW9uIG1lc3NhZ2UuXG4gICAgICAgICAgICAgIGlmIChzY2hlbWFFcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzY2hlbWFFcnJvci5tZXNzYWdlOyAvL3VzZSB0djQuanMgdmFsaWRhdGlvbiBtZXNzYWdlXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvL090aGVyd2lzZSB3ZSBvbmx5IGhhdmUgaW5wdXQgbnVtYmVyIG5vdCBiZWluZyBhIG51bWJlclxuICAgICAgICAgICAgICByZXR1cm4gJ05vdCBhIG51bWJlcic7XG5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIF0pO1xuICB9O1xuXG4gIHZhciBjcmVhdGVNYW51YWxEaXJlY3RpdmUgPSBmdW5jdGlvbih0eXBlLCB0ZW1wbGF0ZVVybCwgdHJhbnNjbHVkZSkge1xuICAgIHRyYW5zY2x1ZGUgPSBhbmd1bGFyLmlzRGVmaW5lZCh0cmFuc2NsdWRlKSA/IHRyYW5zY2x1ZGUgOiBmYWxzZTtcbiAgICAkY29tcGlsZVByb3ZpZGVyLmRpcmVjdGl2ZSgnc2YnICsgYW5ndWxhci51cHBlcmNhc2UodHlwZVswXSkgKyB0eXBlLnN1YnN0cigxKSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0VBQycsXG4gICAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICB0cmFuc2NsdWRlOiB0cmFuc2NsdWRlLFxuICAgICAgICB0ZW1wbGF0ZTogJzxzZi1kZWNvcmF0b3IgZm9ybT1cImZvcm1cIj48L3NmLWRlY29yYXRvcj4nLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgd2F0Y2hUaGlzID0ge1xuICAgICAgICAgICAgJ2l0ZW1zJzogJ2MnLFxuICAgICAgICAgICAgJ3RpdGxlTWFwJzogJ2MnLFxuICAgICAgICAgICAgJ3NjaGVtYSc6ICdjJ1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIGZvcm0gPSB7dHlwZTogdHlwZX07XG4gICAgICAgICAgdmFyIG9uY2UgPSB0cnVlO1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChhdHRycywgZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgICAgIGlmIChuYW1lWzBdICE9PSAnJCcgJiYgbmFtZS5pbmRleE9mKCduZycpICE9PSAwICYmIG5hbWUgIT09ICdzZkZpZWxkJykge1xuXG4gICAgICAgICAgICAgIHZhciB1cGRhdGVGb3JtID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHZhbCkgJiYgdmFsICE9PSBmb3JtW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICBmb3JtW25hbWVdID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgICAvL3doZW4gd2UgaGF2ZSB0eXBlLCBhbmQgaWYgc3BlY2lmaWVkIGtleSB3ZSBhcHBseSBpdCBvbiBzY29wZS5cbiAgICAgICAgICAgICAgICAgIGlmIChvbmNlICYmIGZvcm0udHlwZSAmJiAoZm9ybS5rZXkgfHwgYW5ndWxhci5pc1VuZGVmaW5lZChhdHRycy5rZXkpKSkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5mb3JtID0gZm9ybTtcbiAgICAgICAgICAgICAgICAgICAgb25jZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ21vZGVsJykge1xuICAgICAgICAgICAgICAgIC8vXCJtb2RlbFwiIGlzIGJvdW5kIHRvIHNjb3BlIHVuZGVyIHRoZSBuYW1lIFwibW9kZWxcIiBzaW5jZSB0aGlzIGlzIHdoYXQgdGhlIGRlY29yYXRvcnNcbiAgICAgICAgICAgICAgICAvL2tub3cgYW5kIGxvdmUuXG4gICAgICAgICAgICAgICAgc2NvcGUuJHdhdGNoKHZhbHVlLCBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh2YWwgJiYgc2NvcGUubW9kZWwgIT09IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5tb2RlbCA9IHZhbDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh3YXRjaFRoaXNbbmFtZV0gPT09ICdjJykge1xuICAgICAgICAgICAgICAgIC8vd2F0Y2ggY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIHNjb3BlLiR3YXRjaENvbGxlY3Rpb24odmFsdWUsIHVwZGF0ZUZvcm0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vJG9ic2VydmVcbiAgICAgICAgICAgICAgICBhdHRycy4kb2JzZXJ2ZShuYW1lLCB1cGRhdGVGb3JtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkZWNvcmF0b3IgZGlyZWN0aXZlIGFuZCBpdHMgc2libGluZyBcIm1hbnVhbFwiIHVzZSBkaXJlY3RpdmVzLlxuICAgKiBUaGUgZGlyZWN0aXZlIGNhbiBiZSB1c2VkIHRvIGNyZWF0ZSBmb3JtIGZpZWxkcyBvciBvdGhlciBmb3JtIGVudGl0aWVzLlxuICAgKiBJdCBjYW4gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIDxzY2hlbWEtZm9ybT4gZGlyZWN0aXZlIGluIHdoaWNoIGNhc2UgdGhlIGRlY29yYXRvciBpc1xuICAgKiBnaXZlbiBpdCdzIGNvbmZpZ3VyYXRpb24gdmlhIGEgdGhlIFwiZm9ybVwiIGF0dHJpYnV0ZS5cbiAgICpcbiAgICogZXguIEJhc2ljIHVzYWdlXG4gICAqICAgPHNmLWRlY29yYXRvciBmb3JtPVwibXlmb3JtXCI+PC9zZi1kZWNvcmF0b3I+XG4gICAqKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBkaXJlY3RpdmUgbmFtZSAoQ2FtZWxDYXNlZClcbiAgICogQHBhcmFtIHtPYmplY3R9IG1hcHBpbmdzLCBhbiBvYmplY3QgdGhhdCBtYXBzIFwidHlwZVwiID0+IFwidGVtcGxhdGVVcmxcIlxuICAgKiBAcGFyYW0ge0FycmF5fSAgcnVsZXMgKG9wdGlvbmFsKSBhIGxpc3Qgb2YgZnVuY3Rpb25zLCBmdW5jdGlvbihmb3JtKSB7fSwgdGhhdCBhcmUgZWFjaCB0cmllZCBpblxuICAgKiAgICAgICAgICAgICAgICAgdHVybixcbiAgICogICAgICAgICAgICAgICAgIGlmIHRoZXkgcmV0dXJuIGEgc3RyaW5nIHRoZW4gdGhhdCBpcyB1c2VkIGFzIHRoZSB0ZW1wbGF0ZVVybC4gUnVsZXMgY29tZSBiZWZvcmVcbiAgICogICAgICAgICAgICAgICAgIG1hcHBpbmdzLlxuICAgKi9cbiAgdGhpcy5jcmVhdGVEZWNvcmF0b3IgPSBmdW5jdGlvbihuYW1lLCBtYXBwaW5ncywgcnVsZXMsIG9wdGlvbnMpIHtcbiAgICBkaXJlY3RpdmVzW25hbWVdID0ge1xuICAgICAgbWFwcGluZ3M6IG1hcHBpbmdzIHx8IHt9LFxuICAgICAgcnVsZXM6ICAgIHJ1bGVzICAgIHx8IFtdXG4gICAgfTtcblxuICAgIGlmICghZGlyZWN0aXZlc1tkZWZhdWx0RGVjb3JhdG9yXSkge1xuICAgICAgZGVmYXVsdERlY29yYXRvciA9IG5hbWU7XG4gICAgfVxuICAgIGNyZWF0ZURpcmVjdGl2ZShuYW1lLCBvcHRpb25zKTtcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRpcmVjdGl2ZSBvZiBhIGRlY29yYXRvclxuICAgKiBVc2FibGUgd2hlbiB5b3Ugd2FudCB0byB1c2UgdGhlIGRlY29yYXRvcnMgd2l0aG91dCB1c2luZyA8c2NoZW1hLWZvcm0+IGRpcmVjdGl2ZS5cbiAgICogU3BlY2lmaWNhbGx5IHdoZW4geW91IG5lZWQgdG8gcmV1c2Ugc3R5bGluZy5cbiAgICpcbiAgICogZXguIGNyZWF0ZURpcmVjdGl2ZSgndGV4dCcsJy4uLicpXG4gICAqICA8c2YtdGV4dCB0aXRsZT1cImZvb2JhclwiIG1vZGVsPVwicGVyc29uXCIga2V5PVwibmFtZVwiIHNjaGVtYT1cInNjaGVtYVwiPjwvc2YtdGV4dD5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9ICB0eXBlIFRoZSB0eXBlIG9mIHRoZSBkaXJlY3RpdmUsIHJlc3VsdGluZyBkaXJlY3RpdmUgd2lsbCBoYXZlIHNmLSBwcmVmaXhlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gIHRlbXBsYXRlVXJsXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdHJhbnNjbHVkZSAob3B0aW9uYWwpIHNldHMgdHJhbnNjbHVkZSBvcHRpb24gb2YgZGlyZWN0aXZlLCBkZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIHRoaXMuY3JlYXRlRGlyZWN0aXZlID0gY3JlYXRlTWFudWFsRGlyZWN0aXZlO1xuXG4gIC8qKlxuICAgKiBTYW1lIGFzIGNyZWF0ZURpcmVjdGl2ZSwgYnV0IHRha2VzIGFuIG9iamVjdCB3aGVyZSBrZXkgaXMgJ3R5cGUnIGFuZCB2YWx1ZSBpcyAndGVtcGxhdGVVcmwnXG4gICAqIFVzZWZ1bCBmb3IgYmF0Y2hpbmcuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtYXBwaW5nc1xuICAgKi9cbiAgdGhpcy5jcmVhdGVEaXJlY3RpdmVzID0gZnVuY3Rpb24obWFwcGluZ3MpIHtcbiAgICBhbmd1bGFyLmZvckVhY2gobWFwcGluZ3MsIGZ1bmN0aW9uKHVybCwgdHlwZSkge1xuICAgICAgY3JlYXRlTWFudWFsRGlyZWN0aXZlKHR5cGUsIHVybCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldHRlciBmb3IgZGlyZWN0aXZlIG1hcHBpbmdzXG4gICAqIENhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIGEgbWFwcGluZyBvciBhZGQgYSBydWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIChvcHRpb25hbCkgZGVmYXVsdHMgdG8gZGVmYXVsdERlY29yYXRvclxuICAgKiBAcmV0dXJuIHtPYmplY3R9IHJ1bGVzIGFuZCBtYXBwaW5ncyB7IHJ1bGVzOiBbXSxtYXBwaW5nczoge319XG4gICAqL1xuICB0aGlzLmRpcmVjdGl2ZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBuYW1lID0gbmFtZSB8fCBkZWZhdWx0RGVjb3JhdG9yO1xuICAgIHJldHVybiBkaXJlY3RpdmVzW25hbWVdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgbWFwcGluZyB0byBhbiBleGlzdGluZyBkZWNvcmF0b3IuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIERlY29yYXRvciBuYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIEZvcm0gdHlwZSBmb3IgdGhlIG1hcHBpbmdcbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAgVGhlIHRlbXBsYXRlIHVybFxuICAgKi9cbiAgdGhpcy5hZGRNYXBwaW5nID0gZnVuY3Rpb24obmFtZSwgdHlwZSwgdXJsKSB7XG4gICAgaWYgKGRpcmVjdGl2ZXNbbmFtZV0pIHtcbiAgICAgIGRpcmVjdGl2ZXNbbmFtZV0ubWFwcGluZ3NbdHlwZV0gPSB1cmw7XG4gICAgfVxuICB9O1xuXG4gIC8vU2VydmljZSBpcyBqdXN0IGEgZ2V0dGVyIGZvciBkaXJlY3RpdmUgbWFwcGluZ3MgYW5kIHJ1bGVzXG4gIHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkaXJlY3RpdmU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZXNbbmFtZV07XG4gICAgICB9LFxuICAgICAgZGVmYXVsdERlY29yYXRvcjogZGVmYXVsdERlY29yYXRvclxuICAgIH07XG4gIH07XG5cbiAgLy9DcmVhdGUgYSBkZWZhdWx0IGRpcmVjdGl2ZVxuICBjcmVhdGVEaXJlY3RpdmUoJ3NmRGVjb3JhdG9yJyk7XG5cbn1dKTtcblxuLyoqXG4gKiBTY2hlbWEgZm9ybSBzZXJ2aWNlLlxuICogVGhpcyBzZXJ2aWNlIGlzIG5vdCB0aGF0IHVzZWZ1bCBvdXRzaWRlIG9mIHNjaGVtYSBmb3JtIGRpcmVjdGl2ZVxuICogYnV0IG1ha2VzIHRoZSBjb2RlIG1vcmUgdGVzdGFibGUuXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCdzY2hlbWFGb3JtJykucHJvdmlkZXIoJ3NjaGVtYUZvcm0nLFxuWydzZlBhdGhQcm92aWRlcicsIGZ1bmN0aW9uKHNmUGF0aFByb3ZpZGVyKSB7XG5cbiAgLy9DcmVhdGVzIGFuIGRlZmF1bHQgdGl0bGVNYXAgbGlzdCBmcm9tIGFuIGVudW0sIGkuZS4gYSBsaXN0IG9mIHN0cmluZ3MuXG4gIHZhciBlbnVtVG9UaXRsZU1hcCA9IGZ1bmN0aW9uKGVubSkge1xuICAgIHZhciB0aXRsZU1hcCA9IFtdOyAvL2Nhbm9uaWNhbCB0aXRsZU1hcCBmb3JtYXQgaXMgYSBsaXN0LlxuICAgIGVubS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHRpdGxlTWFwLnB1c2goe25hbWU6IG5hbWUsIHZhbHVlOiBuYW1lfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRpdGxlTWFwO1xuICB9O1xuXG4gIC8vIFRha2VzIGEgdGl0bGVNYXAgaW4gZWl0aGVyIG9iamVjdCBvciBsaXN0IGZvcm1hdCBhbmQgcmV0dXJucyBvbmUgaW5cbiAgLy8gaW4gdGhlIGxpc3QgZm9ybWF0LlxuICB2YXIgY2Fub25pY2FsVGl0bGVNYXAgPSBmdW5jdGlvbih0aXRsZU1hcCwgb3JpZ2luYWxFbnVtKSB7XG4gICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkodGl0bGVNYXApKSB7XG4gICAgICB2YXIgY2Fub25pY2FsID0gW107XG4gICAgICBpZiAob3JpZ2luYWxFbnVtKSB7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcmlnaW5hbEVudW0sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgICAgIGNhbm9uaWNhbC5wdXNoKHtuYW1lOiB0aXRsZU1hcFt2YWx1ZV0sIHZhbHVlOiB2YWx1ZX0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aXRsZU1hcCwgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICBjYW5vbmljYWwucHVzaCh7bmFtZTogbmFtZSwgdmFsdWU6IHZhbHVlfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNhbm9uaWNhbDtcbiAgICB9XG4gICAgcmV0dXJuIHRpdGxlTWFwO1xuICB9O1xuXG4gIHZhciBkZWZhdWx0Rm9ybURlZmluaXRpb24gPSBmdW5jdGlvbihuYW1lLCBzY2hlbWEsIG9wdGlvbnMpIHtcbiAgICB2YXIgcnVsZXMgPSBkZWZhdWx0c1tzY2hlbWEudHlwZV07XG4gICAgaWYgKHJ1bGVzKSB7XG4gICAgICB2YXIgZGVmO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkZWYgPSBydWxlc1tpXShuYW1lLCBzY2hlbWEsIG9wdGlvbnMpO1xuICAgICAgICAvL2ZpcnN0IGhhbmRsZXIgaW4gbGlzdCB0aGF0IGFjdHVhbGx5IHJldHVybnMgc29tZXRoaW5nIGlzIG91ciBoYW5kbGVyIVxuICAgICAgICBpZiAoZGVmKSB7XG4gICAgICAgICAgcmV0dXJuIGRlZjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvL0NyZWF0ZXMgYSBmb3JtIG9iamVjdCB3aXRoIGFsbCBjb21tb24gcHJvcGVydGllc1xuICB2YXIgc3RkRm9ybU9iaiA9IGZ1bmN0aW9uKG5hbWUsIHNjaGVtYSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBmID0gb3B0aW9ucy5nbG9iYWwgJiYgb3B0aW9ucy5nbG9iYWwuZm9ybURlZmF1bHRzID9cbiAgICAgICAgICAgIGFuZ3VsYXIuY29weShvcHRpb25zLmdsb2JhbC5mb3JtRGVmYXVsdHMpIDoge307XG4gICAgaWYgKG9wdGlvbnMuZ2xvYmFsICYmIG9wdGlvbnMuZ2xvYmFsLnN1cHJlc3NQcm9wZXJ0eVRpdGxlcyA9PT0gdHJ1ZSkge1xuICAgICAgZi50aXRsZSA9IHNjaGVtYS50aXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZi50aXRsZSA9IHNjaGVtYS50aXRsZSB8fCBuYW1lO1xuICAgIH1cblxuICAgIGlmIChzY2hlbWEuZGVzY3JpcHRpb24pIHsgZi5kZXNjcmlwdGlvbiA9IHNjaGVtYS5kZXNjcmlwdGlvbjsgfVxuICAgIGlmIChvcHRpb25zLnJlcXVpcmVkID09PSB0cnVlIHx8IHNjaGVtYS5yZXF1aXJlZCA9PT0gdHJ1ZSkgeyBmLnJlcXVpcmVkID0gdHJ1ZTsgfVxuICAgIGlmIChzY2hlbWEubWF4TGVuZ3RoKSB7IGYubWF4bGVuZ3RoID0gc2NoZW1hLm1heExlbmd0aDsgfVxuICAgIGlmIChzY2hlbWEubWluTGVuZ3RoKSB7IGYubWlubGVuZ3RoID0gc2NoZW1hLm1heExlbmd0aDsgfVxuICAgIGlmIChzY2hlbWEucmVhZE9ubHkgfHwgc2NoZW1hLnJlYWRvbmx5KSB7IGYucmVhZG9ubHkgID0gdHJ1ZTsgfVxuICAgIGlmIChzY2hlbWEubWluaW11bSkgeyBmLm1pbmltdW0gPSBzY2hlbWEubWluaW11bSArIChzY2hlbWEuZXhjbHVzaXZlTWluaW11bSA/IDEgOiAwKTsgfVxuICAgIGlmIChzY2hlbWEubWF4aW11bSkgeyBmLm1heGltdW0gPSBzY2hlbWEubWF4aW11bSAtIChzY2hlbWEuZXhjbHVzaXZlTWF4aW11bSA/IDEgOiAwKTsgfVxuXG4gICAgLy9Ob24gc3RhbmRhcmQgYXR0cmlidXRlc1xuICAgIGlmIChzY2hlbWEudmFsaWRhdGlvbk1lc3NhZ2UpIHsgZi52YWxpZGF0aW9uTWVzc2FnZSA9IHNjaGVtYS52YWxpZGF0aW9uTWVzc2FnZTsgfVxuICAgIGlmIChzY2hlbWEuZW51bU5hbWVzKSB7IGYudGl0bGVNYXAgPSBjYW5vbmljYWxUaXRsZU1hcChzY2hlbWEuZW51bU5hbWVzLCBzY2hlbWFbJ2VudW0nXSk7IH1cbiAgICBmLnNjaGVtYSA9IHNjaGVtYTtcblxuICAgIC8vIE5nIG1vZGVsIG9wdGlvbnMgZG9lc24ndCBwbGF5IG5pY2Ugd2l0aCB1bmRlZmluZWQsIG1pZ2h0IGJlIGRlZmluZWRcbiAgICAvLyBnbG9iYWxseSB0aG91Z2hcbiAgICBmLm5nTW9kZWxPcHRpb25zID0gZi5uZ01vZGVsT3B0aW9ucyB8fCB7fTtcbiAgICByZXR1cm4gZjtcbiAgfTtcblxuICB2YXIgdGV4dCA9IGZ1bmN0aW9uKG5hbWUsIHNjaGVtYSwgb3B0aW9ucykge1xuICAgIGlmIChzY2hlbWEudHlwZSA9PT0gJ3N0cmluZycgJiYgIXNjaGVtYVsnZW51bSddKSB7XG4gICAgICB2YXIgZiA9IHN0ZEZvcm1PYmoobmFtZSwgc2NoZW1hLCBvcHRpb25zKTtcbiAgICAgIGYua2V5ICA9IG9wdGlvbnMucGF0aDtcbiAgICAgIGYudHlwZSA9ICd0ZXh0JztcbiAgICAgIG9wdGlvbnMubG9va3VwW3NmUGF0aFByb3ZpZGVyLnN0cmluZ2lmeShvcHRpb25zLnBhdGgpXSA9IGY7XG4gICAgICByZXR1cm4gZjtcbiAgICB9XG4gIH07XG5cbiAgLy9kZWZhdWx0IGluIGpzb24gZm9ybSBmb3IgbnVtYmVyIGFuZCBpbnRlZ2VyIGlzIGEgdGV4dCBmaWVsZFxuICAvL2lucHV0IHR5cGU9XCJudW1iZXJcIiB3b3VsZCBiZSBtb3JlIHN1aXRhYmxlIGRvbid0IHlhIHRoaW5rP1xuICB2YXIgbnVtYmVyID0gZnVuY3Rpb24obmFtZSwgc2NoZW1hLCBvcHRpb25zKSB7XG4gICAgaWYgKHNjaGVtYS50eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgdmFyIGYgPSBzdGRGb3JtT2JqKG5hbWUsIHNjaGVtYSwgb3B0aW9ucyk7XG4gICAgICBmLmtleSAgPSBvcHRpb25zLnBhdGg7XG4gICAgICBmLnR5cGUgPSAnbnVtYmVyJztcbiAgICAgIG9wdGlvbnMubG9va3VwW3NmUGF0aFByb3ZpZGVyLnN0cmluZ2lmeShvcHRpb25zLnBhdGgpXSA9IGY7XG4gICAgICByZXR1cm4gZjtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGludGVnZXIgPSBmdW5jdGlvbihuYW1lLCBzY2hlbWEsIG9wdGlvbnMpIHtcbiAgICBpZiAoc2NoZW1hLnR5cGUgPT09ICdpbnRlZ2VyJykge1xuICAgICAgdmFyIGYgPSBzdGRGb3JtT2JqKG5hbWUsIHNjaGVtYSwgb3B0aW9ucyk7XG4gICAgICBmLmtleSAgPSBvcHRpb25zLnBhdGg7XG4gICAgICBmLnR5cGUgPSAnbnVtYmVyJztcbiAgICAgIG9wdGlvbnMubG9va3VwW3NmUGF0aFByb3ZpZGVyLnN0cmluZ2lmeShvcHRpb25zLnBhdGgpXSA9IGY7XG4gICAgICByZXR1cm4gZjtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGNoZWNrYm94ID0gZnVuY3Rpb24obmFtZSwgc2NoZW1hLCBvcHRpb25zKSB7XG4gICAgaWYgKHNjaGVtYS50eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHZhciBmID0gc3RkRm9ybU9iaihuYW1lLCBzY2hlbWEsIG9wdGlvbnMpO1xuICAgICAgZi5rZXkgID0gb3B0aW9ucy5wYXRoO1xuICAgICAgZi50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgIG9wdGlvbnMubG9va3VwW3NmUGF0aFByb3ZpZGVyLnN0cmluZ2lmeShvcHRpb25zLnBhdGgpXSA9IGY7XG4gICAgICByZXR1cm4gZjtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHNlbGVjdCA9IGZ1bmN0aW9uKG5hbWUsIHNjaGVtYSwgb3B0aW9ucykge1xuICAgIGlmIChzY2hlbWEudHlwZSA9PT0gJ3N0cmluZycgJiYgc2NoZW1hWydlbnVtJ10pIHtcbiAgICAgIHZhciBmID0gc3RkRm9ybU9iaihuYW1lLCBzY2hlbWEsIG9wdGlvbnMpO1xuICAgICAgZi5rZXkgID0gb3B0aW9ucy5wYXRoO1xuICAgICAgZi50eXBlID0gJ3NlbGVjdCc7XG4gICAgICBpZiAoIWYudGl0bGVNYXApIHtcbiAgICAgICAgZi50aXRsZU1hcCA9IGVudW1Ub1RpdGxlTWFwKHNjaGVtYVsnZW51bSddKTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMubG9va3VwW3NmUGF0aFByb3ZpZGVyLnN0cmluZ2lmeShvcHRpb25zLnBhdGgpXSA9IGY7XG4gICAgICByZXR1cm4gZjtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGNoZWNrYm94ZXMgPSBmdW5jdGlvbihuYW1lLCBzY2hlbWEsIG9wdGlvbnMpIHtcbiAgICBpZiAoc2NoZW1hLnR5cGUgPT09ICdhcnJheScgJiYgc2NoZW1hLml0ZW1zICYmIHNjaGVtYS5pdGVtc1snZW51bSddKSB7XG4gICAgICB2YXIgZiA9IHN0ZEZvcm1PYmoobmFtZSwgc2NoZW1hLCBvcHRpb25zKTtcbiAgICAgIGYua2V5ICA9IG9wdGlvbnMucGF0aDtcbiAgICAgIGYudHlwZSA9ICdjaGVja2JveGVzJztcbiAgICAgIGlmICghZi50aXRsZU1hcCkge1xuICAgICAgICBmLnRpdGxlTWFwID0gZW51bVRvVGl0bGVNYXAoc2NoZW1hLml0ZW1zWydlbnVtJ10pO1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5sb29rdXBbc2ZQYXRoUHJvdmlkZXIuc3RyaW5naWZ5KG9wdGlvbnMucGF0aCldID0gZjtcbiAgICAgIHJldHVybiBmO1xuICAgIH1cbiAgfTtcblxuICB2YXIgZmllbGRzZXQgPSBmdW5jdGlvbihuYW1lLCBzY2hlbWEsIG9wdGlvbnMpIHtcbiAgICBpZiAoc2NoZW1hLnR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgZiAgID0gc3RkRm9ybU9iaihuYW1lLCBzY2hlbWEsIG9wdGlvbnMpO1xuICAgICAgZi50eXBlICA9ICdmaWVsZHNldCc7XG4gICAgICBmLml0ZW1zID0gW107XG4gICAgICBvcHRpb25zLmxvb2t1cFtzZlBhdGhQcm92aWRlci5zdHJpbmdpZnkob3B0aW9ucy5wYXRoKV0gPSBmO1xuXG4gICAgICAvL3JlY3Vyc2UgZG93biBpbnRvIHByb3BlcnRpZXNcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY2hlbWEucHJvcGVydGllcywgZnVuY3Rpb24odiwgaykge1xuICAgICAgICB2YXIgcGF0aCA9IG9wdGlvbnMucGF0aC5zbGljZSgpO1xuICAgICAgICBwYXRoLnB1c2goayk7XG4gICAgICAgIGlmIChvcHRpb25zLmlnbm9yZVtzZlBhdGhQcm92aWRlci5zdHJpbmdpZnkocGF0aCldICE9PSB0cnVlKSB7XG4gICAgICAgICAgdmFyIHJlcXVpcmVkID0gc2NoZW1hLnJlcXVpcmVkICYmIHNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKGspICE9PSAtMTtcblxuICAgICAgICAgIHZhciBkZWYgPSBkZWZhdWx0Rm9ybURlZmluaXRpb24oaywgdiwge1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIHJlcXVpcmVkOiByZXF1aXJlZCB8fCBmYWxzZSxcbiAgICAgICAgICAgIGxvb2t1cDogb3B0aW9ucy5sb29rdXAsXG4gICAgICAgICAgICBpZ25vcmU6IG9wdGlvbnMuaWdub3JlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGRlZikge1xuICAgICAgICAgICAgZi5pdGVtcy5wdXNoKGRlZik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGY7XG4gICAgfVxuXG4gIH07XG5cbiAgdmFyIGFycmF5ID0gZnVuY3Rpb24obmFtZSwgc2NoZW1hLCBvcHRpb25zKSB7XG5cbiAgICBpZiAoc2NoZW1hLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIHZhciBmICAgPSBzdGRGb3JtT2JqKG5hbWUsIHNjaGVtYSwgb3B0aW9ucyk7XG4gICAgICBmLnR5cGUgID0gJ2FycmF5JztcbiAgICAgIGYua2V5ICAgPSBvcHRpb25zLnBhdGg7XG4gICAgICBvcHRpb25zLmxvb2t1cFtzZlBhdGhQcm92aWRlci5zdHJpbmdpZnkob3B0aW9ucy5wYXRoKV0gPSBmO1xuXG4gICAgICB2YXIgcmVxdWlyZWQgPSBzY2hlbWEucmVxdWlyZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgIHNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKG9wdGlvbnMucGF0aFtvcHRpb25zLnBhdGgubGVuZ3RoIC0gMV0pICE9PSAtMTtcblxuICAgICAgLy8gVGhlIGRlZmF1bHQgaXMgdG8gYWx3YXlzIGp1c3QgY3JlYXRlIG9uZSBjaGlsZC4gVGhpcyB3b3JrcyBzaW5jZSBpZiB0aGVcbiAgICAgIC8vIHNjaGVtYXMgaXRlbXMgZGVjbGFyYXRpb24gaXMgb2YgdHlwZTogXCJvYmplY3RcIiB0aGVuIHdlIGdldCBhIGZpZWxkc2V0LlxuICAgICAgLy8gV2UgYWxzbyBmb2xsb3cganNvbiBmb3JtIG5vdGF0YXRpb24sIGFkZGluZyBlbXB0eSBicmFja2V0cyBcIltdXCIgdG9cbiAgICAgIC8vIHNpZ25pZnkgYXJyYXlzLlxuXG4gICAgICB2YXIgYXJyUGF0aCA9IG9wdGlvbnMucGF0aC5zbGljZSgpO1xuICAgICAgYXJyUGF0aC5wdXNoKCcnKTtcblxuICAgICAgZi5pdGVtcyA9IFtkZWZhdWx0Rm9ybURlZmluaXRpb24obmFtZSwgc2NoZW1hLml0ZW1zLCB7XG4gICAgICAgIHBhdGg6IGFyclBhdGgsXG4gICAgICAgIHJlcXVpcmVkOiByZXF1aXJlZCB8fCBmYWxzZSxcbiAgICAgICAgbG9va3VwOiBvcHRpb25zLmxvb2t1cCxcbiAgICAgICAgaWdub3JlOiBvcHRpb25zLmlnbm9yZSxcbiAgICAgICAgZ2xvYmFsOiBvcHRpb25zLmdsb2JhbFxuICAgICAgfSldO1xuXG4gICAgICByZXR1cm4gZjtcbiAgICB9XG5cbiAgfTtcblxuICAvL0ZpcnN0IHNvcnRlZCBieSBzY2hlbWEgdHlwZSB0aGVuIGEgbGlzdC5cbiAgLy9PcmRlciBoYXMgaW1wb3J0YW5jZS4gRmlyc3QgaGFuZGxlciByZXR1cm5pbmcgYW4gZm9ybSBzbmlwcGV0IHdpbGwgYmUgdXNlZC5cbiAgdmFyIGRlZmF1bHRzID0ge1xuICAgIHN0cmluZzogIFtzZWxlY3QsIHRleHRdLFxuICAgIG9iamVjdDogIFtmaWVsZHNldF0sXG4gICAgbnVtYmVyOiAgW251bWJlcl0sXG4gICAgaW50ZWdlcjogW2ludGVnZXJdLFxuICAgIGJvb2xlYW46IFtjaGVja2JveF0sXG4gICAgYXJyYXk6ICAgW2NoZWNrYm94ZXMsIGFycmF5XVxuICB9O1xuXG4gIHZhciBwb3N0UHJvY2Vzc0ZuID0gZnVuY3Rpb24oZm9ybSkgeyByZXR1cm4gZm9ybTsgfTtcblxuICAvKipcbiAgICogUHJvdmlkZXIgQVBJXG4gICAqL1xuICB0aGlzLmRlZmF1bHRzICAgICAgICAgICAgICA9IGRlZmF1bHRzO1xuICB0aGlzLnN0ZEZvcm1PYmogICAgICAgICAgICA9IHN0ZEZvcm1PYmo7XG4gIHRoaXMuZGVmYXVsdEZvcm1EZWZpbml0aW9uID0gZGVmYXVsdEZvcm1EZWZpbml0aW9uO1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIHBvc3QgcHJvY2VzcyBmdW5jdGlvbi5cbiAgICogVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCB0aGUgZnVsbHkgbWVyZ2VkXG4gICAqIGZvcm0gZGVmaW5pdGlvbiAoaS5lLiBhZnRlciBtZXJnaW5nIHdpdGggc2NoZW1hKVxuICAgKiBhbmQgd2hhdGV2ZXIgaXQgcmV0dXJucyBpcyB1c2VkIGFzIGZvcm0uXG4gICAqL1xuICB0aGlzLnBvc3RQcm9jZXNzID0gZnVuY3Rpb24oZm4pIHtcbiAgICBwb3N0UHJvY2Vzc0ZuID0gZm47XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGVuZCBkZWZhdWx0IGZvcm0gcnVsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gICB0eXBlIGpzb24gc2NoZW1hIHR5cGVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcnVsZSBhIGZ1bmN0aW9uKHByb3BlcnR5TmFtZSxwcm9wZXJ0eVNjaGVtYSxvcHRpb25zKSB0aGF0IHJldHVybnMgYSBmb3JtXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbiBvciB1bmRlZmluZWRcbiAgICovXG4gIHRoaXMuYXBwZW5kUnVsZSA9IGZ1bmN0aW9uKHR5cGUsIHJ1bGUpIHtcbiAgICBpZiAoIWRlZmF1bHRzW3R5cGVdKSB7XG4gICAgICBkZWZhdWx0c1t0eXBlXSA9IFtdO1xuICAgIH1cbiAgICBkZWZhdWx0c1t0eXBlXS5wdXNoKHJ1bGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQcmVwZW5kIGRlZmF1bHQgZm9ybSBydWxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgIHR5cGUganNvbiBzY2hlbWEgdHlwZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBydWxlIGEgZnVuY3Rpb24ocHJvcGVydHlOYW1lLHByb3BlcnR5U2NoZW1hLG9wdGlvbnMpIHRoYXQgcmV0dXJucyBhIGZvcm1cbiAgICogICAgICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uIG9yIHVuZGVmaW5lZFxuICAgKi9cbiAgdGhpcy5wcmVwZW5kUnVsZSA9IGZ1bmN0aW9uKHR5cGUsIHJ1bGUpIHtcbiAgICBpZiAoIWRlZmF1bHRzW3R5cGVdKSB7XG4gICAgICBkZWZhdWx0c1t0eXBlXSA9IFtdO1xuICAgIH1cbiAgICBkZWZhdWx0c1t0eXBlXS51bnNoaWZ0KHJ1bGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGNyZWF0ZSBhIHN0YW5kYXJkIGZvcm0gb2JqZWN0LlxuICAgKiBUaGlzIGRvZXMgKm5vdCogc2V0IHRoZSB0eXBlIG9mIHRoZSBmb3JtIGJ1dCByYXRoZXIgYWxsIHNoYXJlZCBhdHRyaWJ1dGVzLlxuICAgKiBZb3UgcHJvYmFibHkgd2FudCB0byBzdGFydCB5b3VyIHJ1bGUgd2l0aCBjcmVhdGluZyB0aGUgZm9ybSB3aXRoIHRoaXMgbWV0aG9kXG4gICAqIHRoZW4gc2V0dGluZyB0eXBlIGFuZCBhbnkgb3RoZXIgdmFsdWVzIHlvdSBuZWVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gc2NoZW1hXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge09iamVjdH0gYSBmb3JtIGZpZWxkIGRlZmludGlvblxuICAgKi9cbiAgdGhpcy5jcmVhdGVTdGFuZGFyZEZvcm0gPSBzdGRGb3JtT2JqO1xuICAvKiBFbmQgUHJvdmlkZXIgQVBJICovXG5cbiAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgc2VydmljZSA9IHt9O1xuXG4gICAgc2VydmljZS5tZXJnZSA9IGZ1bmN0aW9uKHNjaGVtYSwgZm9ybSwgaWdub3JlLCBvcHRpb25zLCByZWFkb25seSkge1xuICAgICAgZm9ybSAgPSBmb3JtIHx8IFsnKiddO1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgIC8vIEdldCByZWFkb25seSBmcm9tIHJvb3Qgb2JqZWN0XG4gICAgICByZWFkb25seSA9IHJlYWRvbmx5IHx8IHNjaGVtYS5yZWFkb25seSB8fCBzY2hlbWEucmVhZE9ubHk7XG5cbiAgICAgIHZhciBzdGRGb3JtID0gc2VydmljZS5kZWZhdWx0cyhzY2hlbWEsIGlnbm9yZSwgb3B0aW9ucyk7XG5cbiAgICAgIC8vc2ltcGxlIGNhc2UsIHdlIGhhdmUgYSBcIipcIiwganVzdCBwdXQgdGhlIHN0ZEZvcm0gdGhlcmVcbiAgICAgIHZhciBpZHggPSBmb3JtLmluZGV4T2YoJyonKTtcbiAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgIGZvcm0gID0gZm9ybS5zbGljZSgwLCBpZHgpXG4gICAgICAgICAgICAgICAgICAgIC5jb25jYXQoc3RkRm9ybS5mb3JtKVxuICAgICAgICAgICAgICAgICAgICAuY29uY2F0KGZvcm0uc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgfVxuXG4gICAgICAvL29rIGxldCdzIG1lcmdlIVxuICAgICAgLy9XZSBsb29rIGF0IHRoZSBzdXBwbGllZCBmb3JtIGFuZCBleHRlbmQgaXQgd2l0aCBzY2hlbWEgc3RhbmRhcmRzXG4gICAgICB2YXIgbG9va3VwID0gc3RkRm9ybS5sb29rdXA7XG5cbiAgICAgIHJldHVybiBwb3N0UHJvY2Vzc0ZuKGZvcm0ubWFwKGZ1bmN0aW9uKG9iaikge1xuXG4gICAgICAgIC8vaGFuZGxlIHRoZSBzaG9ydGN1dCB3aXRoIGp1c3QgYSBuYW1lXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIG9iaiA9IHtrZXk6IG9ian07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqLmtleSkge1xuICAgICAgICAgIGlmICh0eXBlb2Ygb2JqLmtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG9iai5rZXkgPSBzZlBhdGhQcm92aWRlci5wYXJzZShvYmoua2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL0lmIGl0IGhhcyBhIHRpdGxlTWFwIG1ha2Ugc3VyZSBpdCdzIGEgbGlzdFxuICAgICAgICBpZiAob2JqLnRpdGxlTWFwKSB7XG4gICAgICAgICAgb2JqLnRpdGxlTWFwID0gY2Fub25pY2FsVGl0bGVNYXAob2JqLnRpdGxlTWFwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIGlmIChvYmouaXRlbUZvcm0pIHtcbiAgICAgICAgICBvYmouaXRlbXMgPSBbXTtcbiAgICAgICAgICB2YXIgc3RyID0gc2ZQYXRoUHJvdmlkZXIuc3RyaW5naWZ5KG9iai5rZXkpO1xuICAgICAgICAgIHZhciBzdGRGb3JtID0gbG9va3VwW3N0cl07XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHN0ZEZvcm0uaXRlbXMsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBvID0gYW5ndWxhci5jb3B5KG9iai5pdGVtRm9ybSk7XG4gICAgICAgICAgICBvLmtleSA9IGl0ZW0ua2V5O1xuICAgICAgICAgICAgb2JqLml0ZW1zLnB1c2gobyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2V4dGVuZCB3aXRoIHN0ZCBmb3JtIGZyb20gc2NoZW1hLlxuXG4gICAgICAgIGlmIChvYmoua2V5KSB7XG4gICAgICAgICAgdmFyIHN0cmlkID0gc2ZQYXRoUHJvdmlkZXIuc3RyaW5naWZ5KG9iai5rZXkpO1xuICAgICAgICAgIGlmIChsb29rdXBbc3RyaWRdKSB7XG4gICAgICAgICAgICBvYmogPSBhbmd1bGFyLmV4dGVuZChsb29rdXBbc3RyaWRdLCBvYmopO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFyZSB3ZSBpbmhlcml0aW5nIHJlYWRvbmx5P1xuICAgICAgICBpZiAocmVhZG9ubHkgPT09IHRydWUpIHsgLy8gSW5oZXJpdGluZyBmYWxzZSBpcyBub3QgY29vbC5cbiAgICAgICAgICBvYmoucmVhZG9ubHkgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiBpdCdzIGEgdHlwZSB3aXRoIGl0ZW1zLCBtZXJnZSAnZW0hXG4gICAgICAgIGlmIChvYmouaXRlbXMpIHtcbiAgICAgICAgICBvYmouaXRlbXMgPSBzZXJ2aWNlLm1lcmdlKHNjaGVtYSwgb2JqLml0ZW1zLCBpZ25vcmUsIG9wdGlvbnMsIG9iai5yZWFkb25seSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2lmIGl0cyBoYXMgdGFicywgbWVyZ2UgdGhlbSBhbHNvIVxuICAgICAgICBpZiAob2JqLnRhYnMpIHtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2gob2JqLnRhYnMsIGZ1bmN0aW9uKHRhYikge1xuICAgICAgICAgICAgdGFiLml0ZW1zID0gc2VydmljZS5tZXJnZShzY2hlbWEsIHRhYi5pdGVtcywgaWdub3JlLCBvcHRpb25zLCBvYmoucmVhZG9ubHkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3BlY2lhbCBjYXNlOiBjaGVja2JveFxuICAgICAgICAvLyBTaW5jZSBoYXZlIHRvIHRlcm5hcnkgc3RhdGUgd2UgbmVlZCBhIGRlZmF1bHRcbiAgICAgICAgaWYgKG9iai50eXBlID09PSAnY2hlY2tib3gnICYmIGFuZ3VsYXIuaXNVbmRlZmluZWQob2JqLnNjaGVtYVsnZGVmYXVsdCddKSkge1xuICAgICAgICAgIG9iai5zY2hlbWFbJ2RlZmF1bHQnXSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGZvcm0gZGVmYXVsdHMgZnJvbSBzY2hlbWFcbiAgICAgKi9cbiAgICBzZXJ2aWNlLmRlZmF1bHRzID0gZnVuY3Rpb24oc2NoZW1hLCBpZ25vcmUsIGdsb2JhbE9wdGlvbnMpIHtcbiAgICAgIHZhciBmb3JtICAgPSBbXTtcbiAgICAgIHZhciBsb29rdXAgPSB7fTsgLy9NYXAgcGF0aCA9PiBmb3JtIG9iaiBmb3IgZmFzdCBsb29rdXAgaW4gbWVyZ2luZ1xuICAgICAgaWdub3JlID0gaWdub3JlIHx8IHt9O1xuICAgICAgZ2xvYmFsT3B0aW9ucyA9IGdsb2JhbE9wdGlvbnMgfHwge307XG5cbiAgICAgIGlmIChzY2hlbWEudHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjaGVtYS5wcm9wZXJ0aWVzLCBmdW5jdGlvbih2LCBrKSB7XG4gICAgICAgICAgaWYgKGlnbm9yZVtrXSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHJlcXVpcmVkID0gc2NoZW1hLnJlcXVpcmVkICYmIHNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKGspICE9PSAtMTtcbiAgICAgICAgICAgIHZhciBkZWYgPSBkZWZhdWx0Rm9ybURlZmluaXRpb24oaywgdiwge1xuICAgICAgICAgICAgICBwYXRoOiBba10sICAgICAgICAgLy8gUGF0aCB0byB0aGlzIHByb3BlcnR5IGluIGJyYWNrZXQgbm90YXRpb24uXG4gICAgICAgICAgICAgIGxvb2t1cDogbG9va3VwLCAgICAvLyBFeHRyYSBtYXAgdG8gcmVnaXN0ZXIgd2l0aC4gT3B0aW1pemF0aW9uIGZvciBtZXJnZXIuXG4gICAgICAgICAgICAgIGlnbm9yZTogaWdub3JlLCAgICAvLyBUaGUgaWdub3JlIGxpc3Qgb2YgcGF0aHMgKHNhbnMgcm9vdCBsZXZlbCBuYW1lKVxuICAgICAgICAgICAgICByZXF1aXJlZDogcmVxdWlyZWQsIC8vIElzIGl0IHJlcXVpcmVkPyAodjQganNvbiBzY2hlbWEgc3R5bGUpXG4gICAgICAgICAgICAgIGdsb2JhbDogZ2xvYmFsT3B0aW9ucyAvLyBHbG9iYWwgb3B0aW9ucywgaW5jbHVkaW5nIGZvcm0gZGVmYXVsdHNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGRlZikge1xuICAgICAgICAgICAgICBmb3JtLnB1c2goZGVmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZC4gT25seSB0eXBlIFwib2JqZWN0XCIgYWxsb3dlZCBhdCByb290IGxldmVsIG9mIHNjaGVtYS4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7Zm9ybTogZm9ybSwgbG9va3VwOiBsb29rdXB9O1xuICAgIH07XG5cbiAgICAvL1V0aWxpdHkgZnVuY3Rpb25zXG4gICAgLyoqXG4gICAgICogVHJhdmVyc2UgYSBzY2hlbWEsIGFwcGx5aW5nIGEgZnVuY3Rpb24oc2NoZW1hLHBhdGgpIG9uIGV2ZXJ5IHN1YiBzY2hlbWFcbiAgICAgKiBpLmUuIGV2ZXJ5IHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICAgKi9cbiAgICBzZXJ2aWNlLnRyYXZlcnNlU2NoZW1hID0gZnVuY3Rpb24oc2NoZW1hLCBmbiwgcGF0aCwgaWdub3JlQXJyYXlzKSB7XG4gICAgICBpZ25vcmVBcnJheXMgPSBhbmd1bGFyLmlzRGVmaW5lZChpZ25vcmVBcnJheXMpID8gaWdub3JlQXJyYXlzIDogdHJ1ZTtcblxuICAgICAgcGF0aCA9IHBhdGggfHwgW107XG5cbiAgICAgIHZhciB0cmF2ZXJzZSA9IGZ1bmN0aW9uKHNjaGVtYSwgZm4sIHBhdGgpIHtcbiAgICAgICAgZm4oc2NoZW1hLCBwYXRoKTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjaGVtYS5wcm9wZXJ0aWVzLCBmdW5jdGlvbihwcm9wLCBuYW1lKSB7XG4gICAgICAgICAgdmFyIGN1cnJlbnRQYXRoID0gcGF0aC5zbGljZSgpO1xuICAgICAgICAgIGN1cnJlbnRQYXRoLnB1c2gobmFtZSk7XG4gICAgICAgICAgdHJhdmVyc2UocHJvcCwgZm4sIGN1cnJlbnRQYXRoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Pbmx5IHN1cHBvcnQgdHlwZSBcImFycmF5XCIgd2hpY2ggaGF2ZSBhIHNjaGVtYSBhcyBcIml0ZW1zXCIuXG4gICAgICAgIGlmICghaWdub3JlQXJyYXlzICYmIHNjaGVtYS5pdGVtcykge1xuICAgICAgICAgIHZhciBhcnJQYXRoID0gcGF0aC5zbGljZSgpOyBhcnJQYXRoLnB1c2goJycpO1xuICAgICAgICAgIHRyYXZlcnNlKHNjaGVtYS5pdGVtcywgZm4sIGFyclBhdGgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0cmF2ZXJzZShzY2hlbWEsIGZuLCBwYXRoIHx8IFtdKTtcbiAgICB9O1xuXG4gICAgc2VydmljZS50cmF2ZXJzZUZvcm0gPSBmdW5jdGlvbihmb3JtLCBmbikge1xuICAgICAgZm4oZm9ybSk7XG4gICAgICBhbmd1bGFyLmZvckVhY2goZm9ybS5pdGVtcywgZnVuY3Rpb24oZikge1xuICAgICAgICBzZXJ2aWNlLnRyYXZlcnNlRm9ybShmLCBmbik7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGZvcm0udGFicykge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goZm9ybS50YWJzLCBmdW5jdGlvbih0YWIpIHtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2godGFiLml0ZW1zLCBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnRyYXZlcnNlRm9ybShmLCBmbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gc2VydmljZTtcbiAgfTtcblxufV0pO1xuXG4vKiAgQ29tbW9uIGNvZGUgZm9yIHZhbGlkYXRpbmcgYSB2YWx1ZSBhZ2FpbnN0IGl0cyBmb3JtIGFuZCBzY2hlbWEgZGVmaW5pdGlvbiAqL1xuLyogZ2xvYmFsIHR2NCAqL1xuYW5ndWxhci5tb2R1bGUoJ3NjaGVtYUZvcm0nKS5mYWN0b3J5KCdzZlZhbGlkYXRvcicsIFtmdW5jdGlvbigpIHtcblxuICB2YXIgdmFsaWRhdG9yID0ge307XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGEgdmFsdWUgYWdhaW5zdCBpdHMgZm9ybSBkZWZpbml0aW9uIGFuZCBzY2hlbWEuXG4gICAqIFRoZSB2YWx1ZSBzaG91bGQgZWl0aGVyIGJlIG9mIHByb3BlciB0eXBlIG9yIGEgc3RyaW5nLCBzb21lIHR5cGVcbiAgICogY29lcmNpb24gaXMgYXBwbGllZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGZvcm0gQSBtZXJnZWQgZm9ybSBkZWZpbml0aW9uLCBpLmUuIG9uZSB3aXRoIGEgc2NoZW1hLlxuICAgKiBAcGFyYW0ge0FueX0gdmFsdWUgdGhlIHZhbHVlIHRvIHZhbGlkYXRlLlxuICAgKiBAcmV0dXJuIGEgdHY0anMgcmVzdWx0IG9iamVjdC5cbiAgICovXG4gIHZhbGlkYXRvci52YWxpZGF0ZSA9IGZ1bmN0aW9uKGZvcm0sIHZhbHVlKSB7XG4gICAgaWYgKCFmb3JtKSB7XG4gICAgICByZXR1cm4ge3ZhbGlkOiB0cnVlfTtcbiAgICB9XG4gICAgdmFyIHNjaGVtYSA9IGZvcm0uc2NoZW1hO1xuXG4gICAgaWYgKCFzY2hlbWEpIHtcbiAgICAgIHJldHVybiB7dmFsaWQ6IHRydWV9O1xuICAgIH1cblxuICAgIC8vIElucHV0IG9mIHR5cGUgdGV4dCBhbmQgdGV4dGFyZWFzIHdpbGwgZ2l2ZSB1cyBhIHZpZXdWYWx1ZSBvZiAnJ1xuICAgIC8vIHdoZW4gZW1wdHksIHRoaXMgaXMgYSB2YWxpZCB2YWx1ZSBpbiBhIHNjaGVtYSBhbmQgZG9lcyBub3QgY291bnQgYXMgc29tZXRoaW5nXG4gICAgLy8gdGhhdCBicmVha3MgdmFsaWRhdGlvbiBvZiAncmVxdWlyZWQnLiBCdXQgZm9yIG91ciBvd24gc2FuaXR5IGFuIGVtcHR5IGZpZWxkIHNob3VsZFxuICAgIC8vIG5vdCB2YWxpZGF0ZSBpZiBpdCdzIHJlcXVpcmVkLlxuICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIE51bWJlcnMgZmllbGRzIHdpbGwgZ2l2ZSBhIG51bGwgdmFsdWUsIHdoaWNoIGFsc28gbWVhbnMgZW1wdHkgZmllbGRcbiAgICBpZiAoZm9ybS50eXBlID09PSAnbnVtYmVyJyAmJiB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLy8gVmVyc2lvbiA0IG9mIEpTT04gU2NoZW1hIGhhcyB0aGUgcmVxdWlyZWQgcHJvcGVydHkgbm90IG9uIHRoZVxuICAgIC8vIHByb3BlcnR5IGl0c2VsZiBidXQgb24gdGhlIHdyYXBwaW5nIG9iamVjdC4gU2luY2Ugd2UgbGlrZSB0byB0ZXN0XG4gICAgLy8gb25seSB0aGlzIHByb3BlcnR5IHdlIHdyYXAgaXQgaW4gYSBmYWtlIG9iamVjdC5cbiAgICB2YXIgd3JhcCA9IHt0eXBlOiAnb2JqZWN0JywgJ3Byb3BlcnRpZXMnOiB7fX07XG4gICAgdmFyIHByb3BOYW1lID0gZm9ybS5rZXlbZm9ybS5rZXkubGVuZ3RoIC0gMV07XG4gICAgd3JhcC5wcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IHNjaGVtYTtcblxuICAgIGlmIChmb3JtLnJlcXVpcmVkKSB7XG4gICAgICB3cmFwLnJlcXVpcmVkID0gW3Byb3BOYW1lXTtcbiAgICB9XG4gICAgdmFyIHZhbHVlV3JhcCA9IHt9O1xuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlV3JhcFtwcm9wTmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHR2NC52YWxpZGF0ZVJlc3VsdCh2YWx1ZVdyYXAsIHdyYXApO1xuXG4gIH07XG5cbiAgcmV0dXJuIHZhbGlkYXRvcjtcbn1dKTtcblxuLyoqXG4gKiBEaXJlY3RpdmUgdGhhdCBoYW5kbGVzIHRoZSBtb2RlbCBhcnJheXNcbiAqL1xuYW5ndWxhci5tb2R1bGUoJ3NjaGVtYUZvcm0nKS5kaXJlY3RpdmUoJ3NmQXJyYXknLCBbJ3NmU2VsZWN0JywgJ3NjaGVtYUZvcm0nLCAnc2ZWYWxpZGF0b3InLFxuICBmdW5jdGlvbihzZlNlbGVjdCwgc2NoZW1hRm9ybSwgc2ZWYWxpZGF0b3IpIHtcblxuICAgIHZhciBzZXRJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZm9ybSkge1xuICAgICAgICBpZiAoZm9ybS5rZXkpIHtcbiAgICAgICAgICBmb3JtLmtleVtmb3JtLmtleS5pbmRleE9mKCcnKV0gPSBpbmRleDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBzY29wZTogdHJ1ZSxcbiAgICAgIHJlcXVpcmU6ICc/bmdNb2RlbCcsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIG5nTW9kZWwpIHtcbiAgICAgICAgdmFyIGZvcm1EZWZDYWNoZSA9IHt9O1xuXG4gICAgICAgIC8vIFdhdGNoIGZvciB0aGUgZm9ybSBkZWZpbml0aW9uIGFuZCB0aGVuIHJld3JpdGUgaXQuXG4gICAgICAgIC8vIEl0J3MgdGhlIChmaXJzdCkgYXJyYXkgcGFydCBvZiB0aGUga2V5LCAnW10nIHRoYXQgbmVlZHMgYSBudW1iZXJcbiAgICAgICAgLy8gY29ycmVzcG9uZGluZyB0byBhbiBpbmRleCBvZiB0aGUgZm9ybS5cbiAgICAgICAgdmFyIG9uY2UgPSBzY29wZS4kd2F0Y2goYXR0cnMuc2ZBcnJheSwgZnVuY3Rpb24oZm9ybSkge1xuXG4gICAgICAgICAgLy8gQW4gYXJyYXkgbW9kZWwgYWx3YXlzIG5lZWRzIGEga2V5IHNvIHdlIGtub3cgd2hhdCBwYXJ0IG9mIHRoZSBtb2RlbFxuICAgICAgICAgIC8vIHRvIGxvb2sgYXQuIFRoaXMgbWFrZXMgdXMgYSBiaXQgaW5jb21wYXRpYmxlIHdpdGggSlNPTiBGb3JtLCBvbiB0aGVcbiAgICAgICAgICAvLyBvdGhlciBoYW5kIGl0IGVuYWJsZXMgdHdvIHdheSBiaW5kaW5nLlxuICAgICAgICAgIHZhciBsaXN0ID0gc2ZTZWxlY3QoZm9ybS5rZXksIHNjb3BlLm1vZGVsKTtcblxuICAgICAgICAgIC8vIFNpbmNlIG5nLW1vZGVsIGhhcHBpbHkgY3JlYXRlcyBvYmplY3RzIGluIGEgZGVlcCBwYXRoIHdoZW4gc2V0dGluZyBhXG4gICAgICAgICAgLy8gYSB2YWx1ZSBidXQgbm90IGFycmF5cyB3ZSBuZWVkIHRvIGNyZWF0ZSB0aGUgYXJyYXkuXG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQobGlzdCkpIHtcbiAgICAgICAgICAgIGxpc3QgPSBbXTtcbiAgICAgICAgICAgIHNmU2VsZWN0KGZvcm0ua2V5LCBzY29wZS5tb2RlbCwgbGlzdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNjb3BlLm1vZGVsQXJyYXkgPSBsaXN0O1xuXG4gICAgICAgICAgLy8gQXJyYXlzIHdpdGggdGl0bGVNYXBzLCBpLmUuIGNoZWNrYm94ZXMgZG9lc24ndCBoYXZlIGl0ZW1zLlxuICAgICAgICAgIGlmIChmb3JtLml0ZW1zKSB7XG5cbiAgICAgICAgICAgIC8vIFRvIGJlIG1vcmUgY29tcGF0aWJsZSB3aXRoIEpTT04gRm9ybSB3ZSBzdXBwb3J0IGFuIGFycmF5IG9mIGl0ZW1zXG4gICAgICAgICAgICAvLyBpbiB0aGUgZm9ybSBkZWZpbml0aW9uIG9mIFwiYXJyYXlcIiAodGhlIHNjaGVtYSBqdXN0IGEgdmFsdWUpLlxuICAgICAgICAgICAgLy8gZm9yIHRoZSBzdWJmb3JtcyBjb2RlIHRvIHdvcmsgdGhpcyBtZWFucyB3ZSB3cmFwIGV2ZXJ5dGhpbmcgaW4gYVxuICAgICAgICAgICAgLy8gc2VjdGlvbi4gVW5sZXNzIHRoZXJlIGlzIGp1c3Qgb25lLlxuICAgICAgICAgICAgdmFyIHN1YkZvcm0gPSBmb3JtLml0ZW1zWzBdO1xuICAgICAgICAgICAgaWYgKGZvcm0uaXRlbXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBzdWJGb3JtID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzZWN0aW9uJyxcbiAgICAgICAgICAgICAgICBpdGVtczogZm9ybS5pdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICAgICAgICBpdGVtLm5nTW9kZWxPcHRpb25zID0gZm9ybS5uZ01vZGVsT3B0aW9ucztcbiAgICAgICAgICAgICAgICAgIGl0ZW0ucmVhZG9ubHkgPSBmb3JtLnJlYWRvbmx5O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFdlIGNlYXRlIGNvcGllcyBvZiB0aGUgZm9ybSBvbiBkZW1hbmQsIGNhY2hpbmcgdGhlbSBmb3JcbiAgICAgICAgICAvLyBsYXRlciByZXF1ZXN0c1xuICAgICAgICAgIHNjb3BlLmNvcHlXaXRoSW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgaWYgKCFmb3JtRGVmQ2FjaGVbaW5kZXhdKSB7XG4gICAgICAgICAgICAgIGlmIChzdWJGb3JtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcHkgPSBhbmd1bGFyLmNvcHkoc3ViRm9ybSk7XG4gICAgICAgICAgICAgICAgY29weS5hcnJheUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgc2NoZW1hRm9ybS50cmF2ZXJzZUZvcm0oY29weSwgc2V0SW5kZXgoaW5kZXgpKTtcbiAgICAgICAgICAgICAgICBmb3JtRGVmQ2FjaGVbaW5kZXhdID0gY29weTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZvcm1EZWZDYWNoZVtpbmRleF07XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHNjb3BlLmFwcGVuZFRvQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjb3B5ID0gc2NvcGUuY29weVdpdGhJbmRleChsZW4pO1xuICAgICAgICAgICAgc2NoZW1hRm9ybS50cmF2ZXJzZUZvcm0oY29weSwgZnVuY3Rpb24ocGFydCkge1xuICAgICAgICAgICAgICBpZiAocGFydC5rZXkgJiYgYW5ndWxhci5pc0RlZmluZWQocGFydFsnZGVmYXVsdCddKSkge1xuICAgICAgICAgICAgICAgIHNmU2VsZWN0KHBhcnQua2V5LCBzY29wZS5tb2RlbCwgcGFydFsnZGVmYXVsdCddKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBkZWZhdWx0cyBub3RoaW5nIGlzIGFkZGVkIHNvIHdlIG5lZWQgdG8gaW5pdGlhbGl6ZVxuICAgICAgICAgICAgLy8gdGhlIGFycmF5LiB1bmRlZmluZWQgZm9yIGJhc2ljIHZhbHVlcywge30gb3IgW10gZm9yIHRoZSBvdGhlcnMuXG4gICAgICAgICAgICBpZiAobGVuID09PSBsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICB2YXIgdHlwZSA9IHNmU2VsZWN0KCdzY2hlbWEuaXRlbXMudHlwZScsIGZvcm0pO1xuICAgICAgICAgICAgICB2YXIgZGZsdDtcbiAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgZGZsdCA9IHt9O1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgICAgICBkZmx0ID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGlzdC5wdXNoKGRmbHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUcmlnZ2VyIHZhbGlkYXRpb24uXG4gICAgICAgICAgICBpZiAoc2NvcGUudmFsaWRhdGVBcnJheSkge1xuICAgICAgICAgICAgICBzY29wZS52YWxpZGF0ZUFycmF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGlzdDtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgc2NvcGUuZGVsZXRlRnJvbUFycmF5ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgLy8gVHJpZ2dlciB2YWxpZGF0aW9uLlxuICAgICAgICAgICAgaWYgKHNjb3BlLnZhbGlkYXRlQXJyYXkpIHtcbiAgICAgICAgICAgICAgc2NvcGUudmFsaWRhdGVBcnJheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIEFsd2F5cyBzdGFydCB3aXRoIG9uZSBlbXB0eSBmb3JtIHVubGVzcyBjb25maWd1cmVkIG90aGVyd2lzZS5cbiAgICAgICAgICAvLyBTcGVjaWFsIGNhc2U6IGRvbid0IGRvIGl0IGlmIGZvcm0gaGFzIGEgdGl0bGVNYXBcbiAgICAgICAgICBpZiAoIWZvcm0udGl0bGVNYXAgJiYgZm9ybS5zdGFydEVtcHR5ICE9PSB0cnVlICYmIGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzY29wZS5hcHBlbmRUb0FycmF5KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVGl0bGUgTWFwIGhhbmRsaW5nXG4gICAgICAgICAgLy8gSWYgZm9ybSBoYXMgYSB0aXRsZU1hcCBjb25maWd1cmVkIHdlJ2QgbGlrZSB0byBlbmFibGUgbG9vcGluZyBvdmVyXG4gICAgICAgICAgLy8gdGl0bGVNYXAgaW5zdGVhZCBvZiBtb2RlbEFycmF5LCB0aGlzIGlzIHVzZWQgZm9yIGludGFuY2UgaW5cbiAgICAgICAgICAvLyBjaGVja2JveGVzLiBTbyBpbnN0ZWFkIG9mIHZhcmlhYmxlIG51bWJlciBvZiB0aGluZ3Mgd2UgbGlrZSB0byBjcmVhdGVcbiAgICAgICAgICAvLyBhIGFycmF5IHZhbHVlIGZyb20gYSBzdWJzZXQgb2YgdmFsdWVzIGluIHRoZSB0aXRsZU1hcC5cbiAgICAgICAgICAvLyBUaGUgcHJvYmxlbSBoZXJlIGlzIHRoYXQgbmctbW9kZWwgb24gYSBjaGVja2JveCBkb2Vzbid0IHJlYWxseSBtYXAgdG9cbiAgICAgICAgICAvLyBhIGxpc3Qgb2YgdmFsdWVzLiBUaGlzIGlzIGhlcmUgdG8gZml4IHRoYXQuXG4gICAgICAgICAgaWYgKGZvcm0udGl0bGVNYXAgJiYgZm9ybS50aXRsZU1hcC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzY29wZS50aXRsZU1hcFZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAvLyBXZSB3YXRjaCB0aGUgbW9kZWwgZm9yIGNoYW5nZXMgYW5kIHRoZSB0aXRsZU1hcFZhbHVlcyB0byByZWZsZWN0XG4gICAgICAgICAgICAvLyB0aGUgbW9kZWxBcnJheVxuICAgICAgICAgICAgdmFyIHVwZGF0ZVRpdGxlTWFwVmFsdWVzID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgICAgICAgIHNjb3BlLnRpdGxlTWFwVmFsdWVzID0gW107XG4gICAgICAgICAgICAgIGFyciA9IGFyciB8fCBbXTtcblxuICAgICAgICAgICAgICBmb3JtLnRpdGxlTWFwLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnRpdGxlTWFwVmFsdWVzLnB1c2goYXJyLmluZGV4T2YoaXRlbS52YWx1ZSkgIT09IC0xKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvL0NhdGNoIGRlZmF1bHQgdmFsdWVzXG4gICAgICAgICAgICB1cGRhdGVUaXRsZU1hcFZhbHVlcyhzY29wZS5tb2RlbEFycmF5KTtcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaENvbGxlY3Rpb24oJ21vZGVsQXJyYXknLCB1cGRhdGVUaXRsZU1hcFZhbHVlcyk7XG5cbiAgICAgICAgICAgIC8vVG8gZ2V0IHR3byB3YXkgYmluZGluZyB3ZSBhbHNvIHdhdGNoIG91ciB0aXRsZU1hcFZhbHVlc1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoQ29sbGVjdGlvbigndGl0bGVNYXBWYWx1ZXMnLCBmdW5jdGlvbih2YWxzKSB7XG4gICAgICAgICAgICAgIGlmICh2YWxzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyciA9IHNjb3BlLm1vZGVsQXJyYXk7XG5cbiAgICAgICAgICAgICAgICAvLyBBcHBhcmVudGx5IHRoZSBmYXN0ZXN0IHdheSB0byBjbGVhciBhbiBhcnJheSwgcmVhZGFibGUgdG9vLlxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9qc3BlcmYuY29tL2FycmF5LWRlc3Ryb3kvMzJcbiAgICAgICAgICAgICAgICB3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvcm0udGl0bGVNYXAuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbHNbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgbmdNb2RlbCBwcmVzZW50IHdlIG5lZWQgdG8gdmFsaWRhdGUgd2hlbiBhc2tlZC5cbiAgICAgICAgICBpZiAobmdNb2RlbCkge1xuICAgICAgICAgICAgdmFyIGVycm9yO1xuXG4gICAgICAgICAgICBzY29wZS52YWxpZGF0ZUFycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIC8vIFRoZSBhY3R1YWwgY29udGVudCBvZiB0aGUgYXJyYXkgaXMgdmFsaWRhdGVkIGJ5IGVhY2ggZmllbGRcbiAgICAgICAgICAgICAgLy8gc28gd2Ugc2V0dGxlIGZvciBjaGVja2luZyB2YWxpZGF0aW9ucyBzcGVjaWZpYyB0byBhcnJheXNcblxuICAgICAgICAgICAgICAvLyBTaW5jZSB3ZSBwcmVmaWxsIHdpdGggZW1wdHkgYXJyYXlzIHdlIGNhbiBnZXQgdGhlIGZ1bm55IHNpdHVhdGlvblxuICAgICAgICAgICAgICAvLyB3aGVyZSB0aGUgYXJyYXkgaXMgcmVxdWlyZWQgYnV0IGVtcHR5IGluIHRoZSBndWkgYnV0IHN0aWxsIHZhbGlkYXRlcy5cbiAgICAgICAgICAgICAgLy8gVGhhdHMgd2h5IHdlIGNoZWNrIHRoZSBsZW5ndGguXG4gICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZlZhbGlkYXRvci52YWxpZGF0ZShcbiAgICAgICAgICAgICAgICBmb3JtLFxuICAgICAgICAgICAgICAgIHNjb3BlLm1vZGVsQXJyYXkubGVuZ3RoID4gMCA/IHNjb3BlLm1vZGVsQXJyYXkgOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdC52YWxpZCA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC5lcnJvciAmJlxuICAgICAgICAgICAgICAgICAgKHJlc3VsdC5lcnJvci5kYXRhUGF0aCA9PT0gJycgfHxcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC5lcnJvci5kYXRhUGF0aCA9PT0gJy8nICsgZm9ybS5rZXlbZm9ybS5rZXkubGVuZ3RoIC0gMV0pKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgdmlld1ZhbHVlIHRvIHRyaWdnZXIgJGRpcnR5IG9uIGZpZWxkLiBJZiBzb21lb25lIGtub3dzIGFcbiAgICAgICAgICAgICAgICAvLyBhIGJldHRlciB3YXkgdG8gZG8gaXQgcGxlYXNlIHRlbGwuXG4gICAgICAgICAgICAgICAgbmdNb2RlbC4kc2V0Vmlld1ZhbHVlKHNjb3BlLm1vZGVsQXJyYXkpO1xuICAgICAgICAgICAgICAgIGVycm9yID0gcmVzdWx0LmVycm9yO1xuICAgICAgICAgICAgICAgIG5nTW9kZWwuJHNldFZhbGlkaXR5KCdzY2hlbWEnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZ01vZGVsLiRzZXRWYWxpZGl0eSgnc2NoZW1hJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLiRvbignc2NoZW1hRm9ybVZhbGlkYXRlJywgc2NvcGUudmFsaWRhdGVBcnJheSk7XG5cbiAgICAgICAgICAgIHNjb3BlLmhhc1N1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5nTW9kZWwuJHZhbGlkICYmICFuZ01vZGVsLiRwcmlzdGluZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLmhhc0Vycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBuZ01vZGVsLiRpbnZhbGlkO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUuc2NoZW1hRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIG9uY2UoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXSk7XG5cbi8qKlxuICogQSB2ZXJzaW9uIG9mIG5nLWNoYW5nZWQgdGhhdCBvbmx5IGxpc3RlbnMgaWZcbiAqIHRoZXJlIGlzIGFjdHVhbGx5IGEgb25DaGFuZ2UgZGVmaW5lZCBvbiB0aGUgZm9ybVxuICpcbiAqIFRha2VzIHRoZSBmb3JtIGRlZmluaXRpb24gYXMgYXJndW1lbnQuXG4gKiBJZiB0aGUgZm9ybSBkZWZpbml0aW9uIGhhcyBhIFwib25DaGFuZ2VcIiBkZWZpbmVkIGFzIGVpdGhlciBhIGZ1bmN0aW9uIG9yXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCdzY2hlbWFGb3JtJykuZGlyZWN0aXZlKCdzZkNoYW5nZWQnLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgcmVzdHJpY3Q6ICdBQycsXG4gICAgc2NvcGU6IGZhbHNlLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgY3RybCkge1xuICAgICAgdmFyIGZvcm0gPSBzY29wZS4kZXZhbChhdHRycy5zZkNoYW5nZWQpO1xuICAgICAgLy9cImZvcm1cIiBpcyByZWFsbHkgZ3VhcmFudGVlZCB0byBiZSBoZXJlIHNpbmNlIHRoZSBkZWNvcmF0b3IgZGlyZWN0aXZlXG4gICAgICAvL3dhaXRzIGZvciBpdC4gQnV0IGJlc3QgYmUgc3VyZS5cbiAgICAgIGlmIChmb3JtICYmIGZvcm0ub25DaGFuZ2UpIHtcbiAgICAgICAgY3RybC4kdmlld0NoYW5nZUxpc3RlbmVycy5wdXNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZm9ybS5vbkNoYW5nZSkpIHtcbiAgICAgICAgICAgIGZvcm0ub25DaGFuZ2UoY3RybC4kbW9kZWxWYWx1ZSwgZm9ybSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjb3BlLmV2YWxFeHByKGZvcm0ub25DaGFuZ2UsIHsnbW9kZWxWYWx1ZSc6IGN0cmwuJG1vZGVsVmFsdWUsIGZvcm06IGZvcm19KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn0pO1xuXG4vKlxuRklYTUU6IHJlYWwgZG9jdW1lbnRhdGlvblxuPGZvcm0gc2YtZm9ybT1cImZvcm1cIiAgc2Ytc2NoZW1hPVwic2NoZW1hXCIgc2YtZGVjb3JhdG9yPVwiZm9vYmFyXCI+PC9mb3JtPlxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ3NjaGVtYUZvcm0nKVxuICAgICAgIC5kaXJlY3RpdmUoJ3NmU2NoZW1hJyxcblsnJGNvbXBpbGUnLCAnc2NoZW1hRm9ybScsICdzY2hlbWFGb3JtRGVjb3JhdG9ycycsICdzZlNlbGVjdCcsXG4gIGZ1bmN0aW9uKCRjb21waWxlLCAgc2NoZW1hRm9ybSwgIHNjaGVtYUZvcm1EZWNvcmF0b3JzLCBzZlNlbGVjdCkge1xuXG4gICAgdmFyIFNOQUtFX0NBU0VfUkVHRVhQID0gL1tBLVpdL2c7XG4gICAgdmFyIHNuYWtlQ2FzZSA9IGZ1bmN0aW9uKG5hbWUsIHNlcGFyYXRvcikge1xuICAgICAgc2VwYXJhdG9yID0gc2VwYXJhdG9yIHx8ICdfJztcbiAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoU05BS0VfQ0FTRV9SRUdFWFAsIGZ1bmN0aW9uKGxldHRlciwgcG9zKSB7XG4gICAgICAgIHJldHVybiAocG9zID8gc2VwYXJhdG9yIDogJycpICsgbGV0dGVyLnRvTG93ZXJDYXNlKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIHNjaGVtYTogJz1zZlNjaGVtYScsXG4gICAgICAgIGluaXRpYWxGb3JtOiAnPXNmRm9ybScsXG4gICAgICAgIG1vZGVsOiAnPXNmTW9kZWwnLFxuICAgICAgICBvcHRpb25zOiAnPXNmT3B0aW9ucydcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICB0aGlzLmV2YWxJblBhcmVudFNjb3BlID0gZnVuY3Rpb24oZXhwciwgbG9jYWxzKSB7XG4gICAgICAgICAgcmV0dXJuICRzY29wZS4kcGFyZW50LiRldmFsKGV4cHIsIGxvY2Fscyk7XG4gICAgICAgIH07XG4gICAgICB9XSxcbiAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICByZXF1aXJlOiAnP2Zvcm0nLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBmb3JtQ3RybCwgdHJhbnNjbHVkZSkge1xuXG4gICAgICAgIC8vZXhwb3NlIGZvcm0gY29udHJvbGxlciBvbiBzY29wZSBzbyB0aGF0IHdlIGRvbid0IGZvcmNlIGF1dGhvcnMgdG8gdXNlIG5hbWUgb24gZm9ybVxuICAgICAgICBzY29wZS5mb3JtQ3RybCA9IGZvcm1DdHJsO1xuXG4gICAgICAgIC8vV2UnZCBsaWtlIHRvIGhhbmRsZSBleGlzdGluZyBtYXJrdXAsXG4gICAgICAgIC8vYmVzaWRlcyB1c2luZyBpdCBpbiBvdXIgdGVtcGxhdGUgd2UgYWxzb1xuICAgICAgICAvL2NoZWNrIGZvciBuZy1tb2RlbCBhbmQgYWRkIHRoYXQgdG8gYW4gaWdub3JlIGxpc3RcbiAgICAgICAgLy9pLmUuIGV2ZW4gaWYgZm9ybSBoYXMgYSBkZWZpbml0aW9uIGZvciBpdCBvciBmb3JtIGlzIFtcIipcIl1cbiAgICAgICAgLy93ZSBkb24ndCBnZW5lcmF0ZSBpdC5cbiAgICAgICAgdmFyIGlnbm9yZSA9IHt9O1xuICAgICAgICB0cmFuc2NsdWRlKHNjb3BlLCBmdW5jdGlvbihjbG9uZSkge1xuICAgICAgICAgIGNsb25lLmFkZENsYXNzKCdzY2hlbWEtZm9ybS1pZ25vcmUnKTtcbiAgICAgICAgICBlbGVtZW50LnByZXBlbmQoY2xvbmUpO1xuXG4gICAgICAgICAgaWYgKGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCkge1xuICAgICAgICAgICAgdmFyIG1vZGVscyA9IGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnW25nLW1vZGVsXScpO1xuICAgICAgICAgICAgaWYgKG1vZGVscykge1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZGVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBtb2RlbHNbaV0uZ2V0QXR0cmlidXRlKCduZy1tb2RlbCcpO1xuICAgICAgICAgICAgICAgIC8vc2tpcCBmaXJzdCBwYXJ0IGJlZm9yZSAuXG4gICAgICAgICAgICAgICAgaWdub3JlW2tleS5zdWJzdHJpbmcoa2V5LmluZGV4T2YoJy4nKSArIDEpXSA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL1NpbmNlIHdlIGFyZSBkZXBlbmRhbnQgb24gdXAgdG8gdGhyZWVcbiAgICAgICAgLy9hdHRyaWJ1dGVzIHdlJ2xsIGRvIGEgY29tbW9uIHdhdGNoXG4gICAgICAgIHZhciBsYXN0RGlnZXN0ID0ge307XG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdmFyIHNjaGVtYSA9IHNjb3BlLnNjaGVtYTtcbiAgICAgICAgICB2YXIgZm9ybSAgID0gc2NvcGUuaW5pdGlhbEZvcm0gfHwgWycqJ107XG5cbiAgICAgICAgICAvL1RoZSBjaGVjayBmb3Igc2NoZW1hLnR5cGUgaXMgdG8gZW5zdXJlIHRoYXQgc2NoZW1hIGlzIG5vdCB7fVxuICAgICAgICAgIGlmIChmb3JtICYmIHNjaGVtYSAmJiBzY2hlbWEudHlwZSAmJlxuICAgICAgICAgICAgICAobGFzdERpZ2VzdC5mb3JtICE9PSBmb3JtIHx8IGxhc3REaWdlc3Quc2NoZW1hICE9PSBzY2hlbWEpICYmXG4gICAgICAgICAgICAgIE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXN0RGlnZXN0LnNjaGVtYSA9IHNjaGVtYTtcbiAgICAgICAgICAgIGxhc3REaWdlc3QuZm9ybSA9IGZvcm07XG5cbiAgICAgICAgICAgIHZhciBtZXJnZWQgPSBzY2hlbWFGb3JtLm1lcmdlKHNjaGVtYSwgZm9ybSwgaWdub3JlLCBzY29wZS5vcHRpb25zKTtcbiAgICAgICAgICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICAgICAgICAvL21ha2UgdGhlIGZvcm0gYXZhaWxhYmxlIHRvIGRlY29yYXRvcnNcbiAgICAgICAgICAgIHNjb3BlLnNjaGVtYUZvcm0gID0ge2Zvcm06ICBtZXJnZWQsIHNjaGVtYTogc2NoZW1hfTtcblxuICAgICAgICAgICAgLy9jbGVhbiBhbGwgYnV0IHByZSBleGlzdGluZyBodG1sLlxuICAgICAgICAgICAgZWxlbWVudC5jaGlsZHJlbignOm5vdCguc2NoZW1hLWZvcm0taWdub3JlKScpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAvL0NyZWF0ZSBkaXJlY3RpdmVzIGZyb20gdGhlIGZvcm0gZGVmaW5pdGlvblxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKG1lcmdlZCxmdW5jdGlvbihvYmosaSl7XG4gICAgICAgICAgICAgIHZhciBuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChhdHRycy5zZkRlY29yYXRvciB8fCBzbmFrZUNhc2Uoc2NoZW1hRm9ybURlY29yYXRvcnMuZGVmYXVsdERlY29yYXRvciwnLScpKTtcbiAgICAgICAgICAgICAgbi5zZXRBdHRyaWJ1dGUoJ2Zvcm0nLCdzY2hlbWFGb3JtLmZvcm1bJytpKyddJyk7XG4gICAgICAgICAgICAgIHZhciBzbG90O1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNsb3QgPSBlbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJypbc2YtaW5zZXJ0LWZpZWxkPVwiJyArIG9iai5rZXkgKyAnXCJdJyk7XG4gICAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gZmllbGQgaW5zZXJ0aW9uIG5vdCBzdXBwb3J0ZWQgZm9yIGNvbXBsZXgga2V5c1xuICAgICAgICAgICAgICAgIHNsb3QgPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmKHNsb3QpIHtcbiAgICAgICAgICAgICAgICBzbG90LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgc2xvdC5hcHBlbmRDaGlsZChuKTsgIFxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQobik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBlbGVtZW50WzBdLmFwcGVuZENoaWxkKGZyYWcpO1xuXG4gICAgICAgICAgICAvL2NvbXBpbGUgb25seSBjaGlsZHJlblxuICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jaGlsZHJlbigpKShzY29wZSk7XG5cbiAgICAgICAgICAgIC8vb2ssIG5vdyB0aGF0IHRoYXQgaXMgZG9uZSBsZXQncyBzZXQgYW55IGRlZmF1bHRzXG4gICAgICAgICAgICBzY2hlbWFGb3JtLnRyYXZlcnNlU2NoZW1hKHNjaGVtYSwgZnVuY3Rpb24ocHJvcCwgcGF0aCkge1xuICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQocHJvcFsnZGVmYXVsdCddKSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBzZlNlbGVjdChwYXRoLCBzY29wZS5tb2RlbCk7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQodmFsKSkge1xuICAgICAgICAgICAgICAgICAgc2ZTZWxlY3QocGF0aCwgc2NvcGUubW9kZWwsIHByb3BbJ2RlZmF1bHQnXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbl0pO1xuXG5hbmd1bGFyLm1vZHVsZSgnc2NoZW1hRm9ybScpLmRpcmVjdGl2ZSgnc2NoZW1hVmFsaWRhdGUnLCBbJ3NmVmFsaWRhdG9yJywgZnVuY3Rpb24oc2ZWYWxpZGF0b3IpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHNjb3BlOiBmYWxzZSxcbiAgICAvLyBXZSB3YW50IHRoZSBsaW5rIGZ1bmN0aW9uIHRvIGJlICphZnRlciogdGhlIGlucHV0IGRpcmVjdGl2ZXMgbGluayBmdW5jdGlvbiBzbyB3ZSBnZXQgYWNjZXNzXG4gICAgLy8gdGhlIHBhcnNlZCB2YWx1ZSwgZXguIGEgbnVtYmVyIGluc3RlYWQgb2YgYSBzdHJpbmdcbiAgICBwcmlvcml0eTogMTAwMCxcbiAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBuZ01vZGVsKSB7XG4gICAgICAvL1NpbmNlIHdlIGhhdmUgc2NvcGUgZmFsc2UgdGhpcyBpcyB0aGUgc2FtZSBzY29wZVxuICAgICAgLy9hcyB0aGUgZGVjb3JhdG9yXG4gICAgICBzY29wZS5uZ01vZGVsID0gbmdNb2RlbDtcblxuICAgICAgdmFyIGVycm9yID0gbnVsbDtcblxuICAgICAgdmFyIGdldEZvcm0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFmb3JtKSB7XG4gICAgICAgICAgZm9ybSA9IHNjb3BlLiRldmFsKGF0dHJzLnNjaGVtYVZhbGlkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybTtcbiAgICAgIH07XG4gICAgICB2YXIgZm9ybSAgID0gZ2V0Rm9ybSgpO1xuXG4gICAgICAvLyBWYWxpZGF0ZSBhZ2FpbnN0IHRoZSBzY2hlbWEuXG5cbiAgICAgIC8vIEdldCBpbiBsYXN0IG9mIHRoZSBwYXJzZXMgc28gdGhlIHBhcnNlZCB2YWx1ZSBoYXMgdGhlIGNvcnJlY3QgdHlwZS5cbiAgICAgIGlmIChuZ01vZGVsLiR2YWxpZGF0b3JzKSB7IC8vIEFuZ3VsYXIgMS4zXG4gICAgICAgIG5nTW9kZWwuJHZhbGlkYXRvcnMuc2NoZW1hID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gc2ZWYWxpZGF0b3IudmFsaWRhdGUoZ2V0Rm9ybSgpLCB2YWx1ZSk7XG4gICAgICAgICAgZXJyb3IgPSByZXN1bHQuZXJyb3I7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC52YWxpZDtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgLy8gQW5ndWxhciAxLjJcbiAgICAgICAgbmdNb2RlbC4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uKHZpZXdWYWx1ZSkge1xuICAgICAgICAgIGZvcm0gPSBnZXRGb3JtKCk7XG4gICAgICAgICAgLy9TdGlsbCBtaWdodCBiZSB1bmRlZmluZWRcbiAgICAgICAgICBpZiAoIWZvcm0pIHtcbiAgICAgICAgICAgIHJldHVybiB2aWV3VmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9ICBzZlZhbGlkYXRvci52YWxpZGF0ZShmb3JtLCB2aWV3VmFsdWUpO1xuXG4gICAgICAgICAgaWYgKHJlc3VsdC52YWxpZCkge1xuICAgICAgICAgICAgLy8gaXQgaXMgdmFsaWRcbiAgICAgICAgICAgIG5nTW9kZWwuJHNldFZhbGlkaXR5KCdzY2hlbWEnLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB2aWV3VmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGl0IGlzIGludmFsaWQsIHJldHVybiB1bmRlZmluZWQgKG5vIG1vZGVsIHVwZGF0ZSlcbiAgICAgICAgICAgIG5nTW9kZWwuJHNldFZhbGlkaXR5KCdzY2hlbWEnLCBmYWxzZSk7XG4gICAgICAgICAgICBlcnJvciA9IHJlc3VsdC5lcnJvcjtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuXG4gICAgICAvLyBMaXN0ZW4gdG8gYW4gZXZlbnQgc28gd2UgY2FuIHZhbGlkYXRlIHRoZSBpbnB1dCBvbiByZXF1ZXN0XG4gICAgICBzY29wZS4kb24oJ3NjaGVtYUZvcm1WYWxpZGF0ZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmIChuZ01vZGVsLiR2YWxpZGF0ZSkge1xuICAgICAgICAgIG5nTW9kZWwuJHZhbGlkYXRlKCk7XG4gICAgICAgICAgaWYgKG5nTW9kZWwuJGludmFsaWQpIHsgLy8gVGhlIGZpZWxkIG11c3QgYmUgbWFkZSBkaXJ0eSBzbyB0aGUgZXJyb3IgbWVzc2FnZSBpcyBkaXNwbGF5ZWRcbiAgICAgICAgICAgIG5nTW9kZWwuJGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIG5nTW9kZWwuJHByaXN0aW5lID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5nTW9kZWwuJHNldFZpZXdWYWx1ZShuZ01vZGVsLiR2aWV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy9UaGlzIHdvcmtzIHNpbmNlIHdlIG5vdyB3ZSdyZSBpbnNpZGUgYSBkZWNvcmF0b3IgYW5kIHRoYXQgdGhpcyBpcyB0aGUgZGVjb3JhdG9ycyBzY29wZS5cbiAgICAgIC8vSWYgJHByaXN0aW5lIGFuZCBlbXB0eSBkb24ndCBzaG93IHN1Y2Nlc3MgKGV2ZW4gaWYgaXQncyB2YWxpZClcbiAgICAgIHNjb3BlLmhhc1N1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5nTW9kZWwuJHZhbGlkICYmICghbmdNb2RlbC4kcHJpc3RpbmUgfHwgIW5nTW9kZWwuJGlzRW1wdHkobmdNb2RlbC4kbW9kZWxWYWx1ZSkpO1xuICAgICAgfTtcblxuICAgICAgc2NvcGUuaGFzRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5nTW9kZWwuJGludmFsaWQgJiYgIW5nTW9kZWwuJHByaXN0aW5lO1xuICAgICAgfTtcblxuICAgICAgc2NvcGUuc2NoZW1hRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfTtcblxuICAgIH1cbiAgfTtcbn1dKTtcbiIsbnVsbCwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcbi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyByZXNvbHZlcyAuIGFuZCAuLiBlbGVtZW50cyBpbiBhIHBhdGggYXJyYXkgd2l0aCBkaXJlY3RvcnkgbmFtZXMgdGhlcmVcbi8vIG11c3QgYmUgbm8gc2xhc2hlcywgZW1wdHkgZWxlbWVudHMsIG9yIGRldmljZSBuYW1lcyAoYzpcXCkgaW4gdGhlIGFycmF5XG4vLyAoc28gYWxzbyBubyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzIC0gaXQgZG9lcyBub3QgZGlzdGluZ3Vpc2hcbi8vIHJlbGF0aXZlIGFuZCBhYnNvbHV0ZSBwYXRocylcbmZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5KHBhcnRzLCBhbGxvd0Fib3ZlUm9vdCkge1xuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgbGFzdCA9IHBhcnRzW2ldO1xuICAgIGlmIChsYXN0ID09PSAnLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXG4gIGlmIChhbGxvd0Fib3ZlUm9vdCkge1xuICAgIGZvciAoOyB1cC0tOyB1cCkge1xuICAgICAgcGFydHMudW5zaGlmdCgnLi4nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFydHM7XG59XG5cbi8vIFNwbGl0IGEgZmlsZW5hbWUgaW50byBbcm9vdCwgZGlyLCBiYXNlbmFtZSwgZXh0XSwgdW5peCB2ZXJzaW9uXG4vLyAncm9vdCcgaXMganVzdCBhIHNsYXNoLCBvciBub3RoaW5nLlxudmFyIHNwbGl0UGF0aFJlID1cbiAgICAvXihcXC8/fCkoW1xcc1xcU10qPykoKD86XFwuezEsMn18W15cXC9dKz98KShcXC5bXi5cXC9dKnwpKSg/OltcXC9dKikkLztcbnZhciBzcGxpdFBhdGggPSBmdW5jdGlvbihmaWxlbmFtZSkge1xuICByZXR1cm4gc3BsaXRQYXRoUmUuZXhlYyhmaWxlbmFtZSkuc2xpY2UoMSk7XG59O1xuXG4vLyBwYXRoLnJlc29sdmUoW2Zyb20gLi4uXSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc29sdmVkUGF0aCA9ICcnLFxuICAgICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAtMSAmJiAhcmVzb2x2ZWRBYnNvbHV0ZTsgaS0tKSB7XG4gICAgdmFyIHBhdGggPSAoaSA+PSAwKSA/IGFyZ3VtZW50c1tpXSA6IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAvLyBTa2lwIGVtcHR5IGFuZCBpbnZhbGlkIGVudHJpZXNcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH0gZWxzZSBpZiAoIXBhdGgpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJlc29sdmVkUGF0aCA9IHBhdGggKyAnLycgKyByZXNvbHZlZFBhdGg7XG4gICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IHBhdGguY2hhckF0KDApID09PSAnLyc7XG4gIH1cblxuICAvLyBBdCB0aGlzIHBvaW50IHRoZSBwYXRoIHNob3VsZCBiZSByZXNvbHZlZCB0byBhIGZ1bGwgYWJzb2x1dGUgcGF0aCwgYnV0XG4gIC8vIGhhbmRsZSByZWxhdGl2ZSBwYXRocyB0byBiZSBzYWZlIChtaWdodCBoYXBwZW4gd2hlbiBwcm9jZXNzLmN3ZCgpIGZhaWxzKVxuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICByZXNvbHZlZFBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocmVzb2x2ZWRQYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIXJlc29sdmVkQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICByZXR1cm4gKChyZXNvbHZlZEFic29sdXRlID8gJy8nIDogJycpICsgcmVzb2x2ZWRQYXRoKSB8fCAnLic7XG59O1xuXG4vLyBwYXRoLm5vcm1hbGl6ZShwYXRoKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5ub3JtYWxpemUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHZhciBpc0Fic29sdXRlID0gZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpLFxuICAgICAgdHJhaWxpbmdTbGFzaCA9IHN1YnN0cihwYXRoLCAtMSkgPT09ICcvJztcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihwYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIWlzQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICBpZiAoIXBhdGggJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBwYXRoID0gJy4nO1xuICB9XG4gIGlmIChwYXRoICYmIHRyYWlsaW5nU2xhc2gpIHtcbiAgICBwYXRoICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiAoaXNBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHBhdGg7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmlzQWJzb2x1dGUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5qb2luID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwYXRocyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiBleHBvcnRzLm5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsIGZ1bmN0aW9uKHAsIGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBwICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH0pLmpvaW4oJy8nKSk7XG59O1xuXG5cbi8vIHBhdGgucmVsYXRpdmUoZnJvbSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlbGF0aXZlID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgZnJvbSA9IGV4cG9ydHMucmVzb2x2ZShmcm9tKS5zdWJzdHIoMSk7XG4gIHRvID0gZXhwb3J0cy5yZXNvbHZlKHRvKS5zdWJzdHIoMSk7XG5cbiAgZnVuY3Rpb24gdHJpbShhcnIpIHtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIGZvciAoOyBzdGFydCA8IGFyci5sZW5ndGg7IHN0YXJ0KyspIHtcbiAgICAgIGlmIChhcnJbc3RhcnRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgdmFyIGVuZCA9IGFyci5sZW5ndGggLSAxO1xuICAgIGZvciAoOyBlbmQgPj0gMDsgZW5kLS0pIHtcbiAgICAgIGlmIChhcnJbZW5kXSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0ICsgMSk7XG4gIH1cblxuICB2YXIgZnJvbVBhcnRzID0gdHJpbShmcm9tLnNwbGl0KCcvJykpO1xuICB2YXIgdG9QYXJ0cyA9IHRyaW0odG8uc3BsaXQoJy8nKSk7XG5cbiAgdmFyIGxlbmd0aCA9IE1hdGgubWluKGZyb21QYXJ0cy5sZW5ndGgsIHRvUGFydHMubGVuZ3RoKTtcbiAgdmFyIHNhbWVQYXJ0c0xlbmd0aCA9IGxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChmcm9tUGFydHNbaV0gIT09IHRvUGFydHNbaV0pIHtcbiAgICAgIHNhbWVQYXJ0c0xlbmd0aCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgb3V0cHV0UGFydHMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IHNhbWVQYXJ0c0xlbmd0aDsgaSA8IGZyb21QYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIG91dHB1dFBhcnRzLnB1c2goJy4uJyk7XG4gIH1cblxuICBvdXRwdXRQYXJ0cyA9IG91dHB1dFBhcnRzLmNvbmNhdCh0b1BhcnRzLnNsaWNlKHNhbWVQYXJ0c0xlbmd0aCkpO1xuXG4gIHJldHVybiBvdXRwdXRQYXJ0cy5qb2luKCcvJyk7XG59O1xuXG5leHBvcnRzLnNlcCA9ICcvJztcbmV4cG9ydHMuZGVsaW1pdGVyID0gJzonO1xuXG5leHBvcnRzLmRpcm5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHZhciByZXN1bHQgPSBzcGxpdFBhdGgocGF0aCksXG4gICAgICByb290ID0gcmVzdWx0WzBdLFxuICAgICAgZGlyID0gcmVzdWx0WzFdO1xuXG4gIGlmICghcm9vdCAmJiAhZGlyKSB7XG4gICAgLy8gTm8gZGlybmFtZSB3aGF0c29ldmVyXG4gICAgcmV0dXJuICcuJztcbiAgfVxuXG4gIGlmIChkaXIpIHtcbiAgICAvLyBJdCBoYXMgYSBkaXJuYW1lLCBzdHJpcCB0cmFpbGluZyBzbGFzaFxuICAgIGRpciA9IGRpci5zdWJzdHIoMCwgZGlyLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgcmV0dXJuIHJvb3QgKyBkaXI7XG59O1xuXG5cbmV4cG9ydHMuYmFzZW5hbWUgPSBmdW5jdGlvbihwYXRoLCBleHQpIHtcbiAgdmFyIGYgPSBzcGxpdFBhdGgocGF0aClbMl07XG4gIC8vIFRPRE86IG1ha2UgdGhpcyBjb21wYXJpc29uIGNhc2UtaW5zZW5zaXRpdmUgb24gd2luZG93cz9cbiAgaWYgKGV4dCAmJiBmLnN1YnN0cigtMSAqIGV4dC5sZW5ndGgpID09PSBleHQpIHtcbiAgICBmID0gZi5zdWJzdHIoMCwgZi5sZW5ndGggLSBleHQubGVuZ3RoKTtcbiAgfVxuICByZXR1cm4gZjtcbn07XG5cblxuZXhwb3J0cy5leHRuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gc3BsaXRQYXRoKHBhdGgpWzNdO1xufTtcblxuZnVuY3Rpb24gZmlsdGVyICh4cywgZikge1xuICAgIGlmICh4cy5maWx0ZXIpIHJldHVybiB4cy5maWx0ZXIoZik7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGYoeHNbaV0sIGksIHhzKSkgcmVzLnB1c2goeHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG4vLyBTdHJpbmcucHJvdG90eXBlLnN1YnN0ciAtIG5lZ2F0aXZlIGluZGV4IGRvbid0IHdvcmsgaW4gSUU4XG52YXIgc3Vic3RyID0gJ2FiJy5zdWJzdHIoLTEpID09PSAnYidcbiAgICA/IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHsgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbikgfVxuICAgIDogZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikge1xuICAgICAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IHN0ci5sZW5ndGggKyBzdGFydDtcbiAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbik7XG4gICAgfVxuO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSkiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5NdXRhdGlvbk9ic2VydmVyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcjtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICB2YXIgcXVldWUgPSBbXTtcblxuICAgIGlmIChjYW5NdXRhdGlvbk9ic2VydmVyKSB7XG4gICAgICAgIHZhciBoaWRkZW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcXVldWVMaXN0ID0gcXVldWUuc2xpY2UoKTtcbiAgICAgICAgICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBxdWV1ZUxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoaGlkZGVuRGl2LCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGhpZGRlbkRpdi5zZXRBdHRyaWJ1dGUoJ3llcycsICdubycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwiKGZ1bmN0aW9uIChfX2Rpcm5hbWUpe1xuLyoqXG4gKiBtZXNzYWdlZm9ybWF0LmpzXG4gKlxuICogSUNVIFBsdXJhbEZvcm1hdCArIFNlbGVjdEZvcm1hdCBmb3IgSmF2YVNjcmlwdFxuICogXG4gKiBDb3B5cmlnaHQgMjAxNFxuICogXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKiBcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqIFxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAYXV0aG9yIEFsZXggU2V4dG9uIC0gQFNsZXhBeHRvblxuICogQHZlcnNpb24gMC4xLjdcbiAqIEBjb250cmlidXRvcl9saWNlbnNlIERvam8gQ0xBXG4gKi9cblxuKGZ1bmN0aW9uICggcm9vdCApIHtcblxuICBmdW5jdGlvbiBNZXNzYWdlRm9ybWF0ICggbG9jYWxlLCBwbHVyYWxGdW5jLCBnbG9iYWxOYW1lICkge1xuICAgIHZhciBsYyA9IGxvY2FsZSB8fCAnZW4nLCBsY0ZpbGU7XG4gICAgaWYgKCBwbHVyYWxGdW5jICkge1xuICAgICAgTWVzc2FnZUZvcm1hdC5sb2NhbGVbbGNdID0gcGx1cmFsRnVuYztcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKCBsYyAmJiAhIE1lc3NhZ2VGb3JtYXQubG9jYWxlLmhhc093blByb3BlcnR5KCBsYyApICkge1xuICAgICAgICBsYyA9IGxjLnJlcGxhY2UoL1stX10/W14tX10qJC8sICcnKTtcbiAgICAgIH1cbiAgICAgIGlmICggISBsYyApIHtcbiAgICAgICAgbGMgPSBsb2NhbGUucmVwbGFjZSgvWy1fXS4qJC8sICcnKTtcbiAgICAgICAgTWVzc2FnZUZvcm1hdC5sb2FkTG9jYWxlKGxjKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sYyA9IGxjOyAgLy8gdXNlZCBpbiAnZWxlbWVudEZvcm1hdCdcbiAgICB0aGlzLmdsb2JhbE5hbWUgPSBnbG9iYWxOYW1lIHx8ICdpMThuJztcbiAgfVxuXG4gIGlmICggISgnbG9jYWxlJyBpbiBNZXNzYWdlRm9ybWF0KSApIE1lc3NhZ2VGb3JtYXQubG9jYWxlID0ge307XG5cbiAgTWVzc2FnZUZvcm1hdC5sb2FkTG9jYWxlID0gZnVuY3Rpb24gKCBsYyApIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGxjRmlsZSA9IHJlcXVpcmUoJ3BhdGgnKS5qb2luKF9fZGlybmFtZSwgJ2xvY2FsZScsIGxjICsgJy5qcycpLFxuICAgICAgICAgIGxjU3RyID0gKCcnICsgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMobGNGaWxlKSkubWF0Y2goL3tbXl0qfS8pO1xuICAgICAgaWYgKCFsY1N0cikgdGhyb3cgXCJubyBmdW5jdGlvbiBmb3VuZCBpbiBmaWxlICdcIiArIGxjRmlsZSArIFwiJ1wiO1xuICAgICAgTWVzc2FnZUZvcm1hdC5sb2NhbGVbbGNdID0gJ2Z1bmN0aW9uKG4pJyArIGxjU3RyO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBpZiAoIGxjID09ICdlbicgKSB7XG4gICAgICAgIE1lc3NhZ2VGb3JtYXQubG9jYWxlW2xjXSA9ICdmdW5jdGlvbihuKXtyZXR1cm4gbj09PTE/XCJvbmVcIjpcIm90aGVyXCJ9JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV4Lm1lc3NhZ2UgPSAnTG9jYWxlICcgKyBsYyArICcgY291bGQgbm90IGJlIGxvYWRlZDogJyArIGV4Lm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGV4O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBNZXNzYWdlRm9ybWF0LnByb3RvdHlwZS5mdW5jdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGwgPSBbXTtcbiAgICBmb3IgKCB2YXIgbGMgaW4gTWVzc2FnZUZvcm1hdC5sb2NhbGUgKSB7XG4gICAgICBpZiAoIE1lc3NhZ2VGb3JtYXQubG9jYWxlLmhhc093blByb3BlcnR5KGxjKSApIHtcbiAgICAgICAgbC5wdXNoKEpTT04uc3RyaW5naWZ5KGxjKSArICc6JyArIE1lc3NhZ2VGb3JtYXQubG9jYWxlW2xjXS50b1N0cmluZygpLnRyaW0oKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAne2xjOnsnICsgbC5qb2luKCcsJykgKyAnfSxcXG4nXG4gICAgICArICdjOmZ1bmN0aW9uKGQsayl7aWYoIWQpdGhyb3cgbmV3IEVycm9yKFwiTWVzc2FnZUZvcm1hdDogRGF0YSByZXF1aXJlZCBmb3IgXFwnXCIraytcIlxcJy5cIil9LFxcbidcbiAgICAgICsgJ246ZnVuY3Rpb24oZCxrLG8pe2lmKGlzTmFOKGRba10pKXRocm93IG5ldyBFcnJvcihcIk1lc3NhZ2VGb3JtYXQ6IFxcJ1wiK2srXCJcXCcgaXNuXFwndCBhIG51bWJlci5cIik7cmV0dXJuIGRba10tKG98fDApfSxcXG4nXG4gICAgICArICd2OmZ1bmN0aW9uKGQsayl7JyArIHRoaXMuZ2xvYmFsTmFtZSArICcuYyhkLGspO3JldHVybiBkW2tdfSxcXG4nXG4gICAgICArICdwOmZ1bmN0aW9uKGQsayxvLGwscCl7JyArIHRoaXMuZ2xvYmFsTmFtZSArICcuYyhkLGspO3JldHVybiBkW2tdIGluIHA/cFtkW2tdXTooaz0nICsgdGhpcy5nbG9iYWxOYW1lICsgJy5sY1tsXShkW2tdLW8pLGsgaW4gcD9wW2tdOnAub3RoZXIpfSxcXG4nXG4gICAgICArICdzOmZ1bmN0aW9uKGQsayxwKXsnICsgdGhpcy5nbG9iYWxOYW1lICsgJy5jKGQsayk7cmV0dXJuIGRba10gaW4gcD9wW2Rba11dOnAub3RoZXJ9fSc7XG4gIH07XG5cbiAgLy8gVGhpcyBpcyBnZW5lcmF0ZWQgYW5kIHB1bGxlZCBpbiBmb3IgYnJvd3NlcnMuXG4gIHZhciBtcGFyc2VyID0gKGZ1bmN0aW9uKCkge1xuICAgIC8qXG4gICAgICogR2VuZXJhdGVkIGJ5IFBFRy5qcyAwLjguMC5cbiAgICAgKlxuICAgICAqIGh0dHA6Ly9wZWdqcy5tYWpkYS5jei9cbiAgICAgKi9cbiAgXG4gICAgZnVuY3Rpb24gcGVnJHN1YmNsYXNzKGNoaWxkLCBwYXJlbnQpIHtcbiAgICAgIGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfVxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xuICAgICAgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTtcbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIFN5bnRheEVycm9yKG1lc3NhZ2UsIGV4cGVjdGVkLCBmb3VuZCwgb2Zmc2V0LCBsaW5lLCBjb2x1bW4pIHtcbiAgICAgIHRoaXMubWVzc2FnZSAgPSBtZXNzYWdlO1xuICAgICAgdGhpcy5leHBlY3RlZCA9IGV4cGVjdGVkO1xuICAgICAgdGhpcy5mb3VuZCAgICA9IGZvdW5kO1xuICAgICAgdGhpcy5vZmZzZXQgICA9IG9mZnNldDtcbiAgICAgIHRoaXMubGluZSAgICAgPSBsaW5lO1xuICAgICAgdGhpcy5jb2x1bW4gICA9IGNvbHVtbjtcbiAgXG4gICAgICB0aGlzLm5hbWUgICAgID0gXCJTeW50YXhFcnJvclwiO1xuICAgIH1cbiAgXG4gICAgcGVnJHN1YmNsYXNzKFN5bnRheEVycm9yLCBFcnJvcik7XG4gIFxuICAgIGZ1bmN0aW9uIHBhcnNlKGlucHV0KSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDoge30sXG4gIFxuICAgICAgICAgIHBlZyRGQUlMRUQgPSB7fSxcbiAgXG4gICAgICAgICAgcGVnJHN0YXJ0UnVsZUZ1bmN0aW9ucyA9IHsgc3RhcnQ6IHBlZyRwYXJzZXN0YXJ0IH0sXG4gICAgICAgICAgcGVnJHN0YXJ0UnVsZUZ1bmN0aW9uICA9IHBlZyRwYXJzZXN0YXJ0LFxuICBcbiAgICAgICAgICBwZWckYzAgPSBmdW5jdGlvbihtZXNzYWdlRm9ybWF0UGF0dGVybikgeyByZXR1cm4geyB0eXBlOiBcInByb2dyYW1cIiwgcHJvZ3JhbTogbWVzc2FnZUZvcm1hdFBhdHRlcm4gfTsgfSxcbiAgICAgICAgICBwZWckYzEgPSBwZWckRkFJTEVELFxuICAgICAgICAgIHBlZyRjMiA9IFtdLFxuICAgICAgICAgIHBlZyRjMyA9IGZ1bmN0aW9uKHMxLCBpbm5lcikge1xuICAgICAgICAgICAgICB2YXIgc3QgPSBbXTtcbiAgICAgICAgICAgICAgaWYgKCBzMSAmJiBzMS52YWwgKSB7XG4gICAgICAgICAgICAgICAgc3QucHVzaCggczEgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmb3IoIHZhciBpIGluIGlubmVyICl7XG4gICAgICAgICAgICAgICAgaWYgKCBpbm5lci5oYXNPd25Qcm9wZXJ0eSggaSApICkge1xuICAgICAgICAgICAgICAgICAgc3QucHVzaCggaW5uZXJbIGkgXSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4geyB0eXBlOiAnbWVzc2FnZUZvcm1hdFBhdHRlcm4nLCBzdGF0ZW1lbnRzOiBzdCB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICBwZWckYzQgPSBcIntcIixcbiAgICAgICAgICBwZWckYzUgPSB7IHR5cGU6IFwibGl0ZXJhbFwiLCB2YWx1ZTogXCJ7XCIsIGRlc2NyaXB0aW9uOiBcIlxcXCJ7XFxcIlwiIH0sXG4gICAgICAgICAgcGVnJGM2ID0gXCJ9XCIsXG4gICAgICAgICAgcGVnJGM3ID0geyB0eXBlOiBcImxpdGVyYWxcIiwgdmFsdWU6IFwifVwiLCBkZXNjcmlwdGlvbjogXCJcXFwifVxcXCJcIiB9LFxuICAgICAgICAgIHBlZyRjOCA9IGZ1bmN0aW9uKG1mZSwgczEpIHtcbiAgICAgICAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICAgICAgICBpZiAoIG1mZSApIHtcbiAgICAgICAgICAgICAgICByZXMucHVzaChtZmUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICggczEgJiYgczEudmFsICkge1xuICAgICAgICAgICAgICAgIHJlcy5wdXNoKCBzMSApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IFwibWVzc2FnZUZvcm1hdFBhdHRlcm5SaWdodFwiLCBzdGF0ZW1lbnRzIDogcmVzIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIHBlZyRjOSA9IG51bGwsXG4gICAgICAgICAgcGVnJGMxMCA9IFwiLFwiLFxuICAgICAgICAgIHBlZyRjMTEgPSB7IHR5cGU6IFwibGl0ZXJhbFwiLCB2YWx1ZTogXCIsXCIsIGRlc2NyaXB0aW9uOiBcIlxcXCIsXFxcIlwiIH0sXG4gICAgICAgICAgcGVnJGMxMiA9IGZ1bmN0aW9uKGFyZ0lkeCwgZWZtdCkge1xuICAgICAgICAgICAgICB2YXIgcmVzID0geyBcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2VGb3JtYXRFbGVtZW50XCIsXG4gICAgICAgICAgICAgICAgYXJndW1lbnRJbmRleDogYXJnSWR4XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGlmICggZWZtdCAmJiBlZm10Lmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICByZXMuZWxlbWVudEZvcm1hdCA9IGVmbXRbMV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzLm91dHB1dCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgcGVnJGMxMyA9IFwicGx1cmFsXCIsXG4gICAgICAgICAgcGVnJGMxNCA9IHsgdHlwZTogXCJsaXRlcmFsXCIsIHZhbHVlOiBcInBsdXJhbFwiLCBkZXNjcmlwdGlvbjogXCJcXFwicGx1cmFsXFxcIlwiIH0sXG4gICAgICAgICAgcGVnJGMxNSA9IGZ1bmN0aW9uKHQsIHMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlIDogXCJlbGVtZW50Rm9ybWF0XCIsXG4gICAgICAgICAgICAgICAga2V5ICA6IHQsXG4gICAgICAgICAgICAgICAgdmFsICA6IHMudmFsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIHBlZyRjMTYgPSBcInNlbGVjdFwiLFxuICAgICAgICAgIHBlZyRjMTcgPSB7IHR5cGU6IFwibGl0ZXJhbFwiLCB2YWx1ZTogXCJzZWxlY3RcIiwgZGVzY3JpcHRpb246IFwiXFxcInNlbGVjdFxcXCJcIiB9LFxuICAgICAgICAgIHBlZyRjMTggPSBmdW5jdGlvbihwZnApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogXCJwbHVyYWxTdHlsZVwiLCB2YWw6IHBmcCB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICBwZWckYzE5ID0gZnVuY3Rpb24oc2ZwKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IFwic2VsZWN0U3R5bGVcIiwgdmFsOiBzZnAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgcGVnJGMyMCA9IGZ1bmN0aW9uKG9wLCBwZikge1xuICAgICAgICAgICAgICB2YXIgcmVzID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwicGx1cmFsRm9ybWF0UGF0dGVyblwiLFxuICAgICAgICAgICAgICAgIHBsdXJhbEZvcm1zOiBwZlxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBpZiAoIG9wICkge1xuICAgICAgICAgICAgICAgIHJlcy5vZmZzZXQgPSBvcDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMub2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICBwZWckYzIxID0gXCJvZmZzZXRcIixcbiAgICAgICAgICBwZWckYzIyID0geyB0eXBlOiBcImxpdGVyYWxcIiwgdmFsdWU6IFwib2Zmc2V0XCIsIGRlc2NyaXB0aW9uOiBcIlxcXCJvZmZzZXRcXFwiXCIgfSxcbiAgICAgICAgICBwZWckYzIzID0gXCI6XCIsXG4gICAgICAgICAgcGVnJGMyNCA9IHsgdHlwZTogXCJsaXRlcmFsXCIsIHZhbHVlOiBcIjpcIiwgZGVzY3JpcHRpb246IFwiXFxcIjpcXFwiXCIgfSxcbiAgICAgICAgICBwZWckYzI1ID0gZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgcGVnJGMyNiA9IGZ1bmN0aW9uKHBmKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RGb3JtYXRQYXR0ZXJuXCIsXG4gICAgICAgICAgICAgICAgcGx1cmFsRm9ybXM6IHBmXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIHBlZyRjMjcgPSBmdW5jdGlvbihrLCBtZnApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInBsdXJhbEZvcm1zXCIsXG4gICAgICAgICAgICAgICAga2V5OiBrLFxuICAgICAgICAgICAgICAgIHZhbDogbWZwXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIHBlZyRjMjggPSBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICBwZWckYzI5ID0gXCI9XCIsXG4gICAgICAgICAgcGVnJGMzMCA9IHsgdHlwZTogXCJsaXRlcmFsXCIsIHZhbHVlOiBcIj1cIiwgZGVzY3JpcHRpb246IFwiXFxcIj1cXFwiXCIgfSxcbiAgICAgICAgICBwZWckYzMxID0gZnVuY3Rpb24od3MsIHMpIHtcbiAgICAgICAgICAgICAgdmFyIHRtcCA9IFtdO1xuICAgICAgICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIgaiA9IDA7IGogPCBzWyBpIF0ubGVuZ3RoOyArK2ogKSB7XG4gICAgICAgICAgICAgICAgICB0bXAucHVzaChzW2ldW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHZhbDogd3MgKyB0bXAuam9pbignJylcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgcGVnJGMzMiA9IC9eWzAtOWEtekEtWiRfXS8sXG4gICAgICAgICAgcGVnJGMzMyA9IHsgdHlwZTogXCJjbGFzc1wiLCB2YWx1ZTogXCJbMC05YS16QS1aJF9dXCIsIGRlc2NyaXB0aW9uOiBcIlswLTlhLXpBLVokX11cIiB9LFxuICAgICAgICAgIHBlZyRjMzQgPSAvXlteIFxcdFxcblxcciwuKz17fV0vLFxuICAgICAgICAgIHBlZyRjMzUgPSB7IHR5cGU6IFwiY2xhc3NcIiwgdmFsdWU6IFwiW14gXFxcXHRcXFxcblxcXFxyLC4rPXt9XVwiLCBkZXNjcmlwdGlvbjogXCJbXiBcXFxcdFxcXFxuXFxcXHIsLis9e31dXCIgfSxcbiAgICAgICAgICBwZWckYzM2ID0gZnVuY3Rpb24oczEsIHMyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzMSArIChzMiA/IHMyLmpvaW4oJycpIDogJycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICBwZWckYzM3ID0gZnVuY3Rpb24oY2hhcnMpIHsgcmV0dXJuIGNoYXJzLmpvaW4oJycpOyB9LFxuICAgICAgICAgIHBlZyRjMzggPSAvXltee31cXFxcXFwwLVxceDFGfyBcXHRcXG5cXHJdLyxcbiAgICAgICAgICBwZWckYzM5ID0geyB0eXBlOiBcImNsYXNzXCIsIHZhbHVlOiBcIltee31cXFxcXFxcXFxcXFwwLVxcXFx4MUZ/IFxcXFx0XFxcXG5cXFxccl1cIiwgZGVzY3JpcHRpb246IFwiW157fVxcXFxcXFxcXFxcXDAtXFxcXHgxRn8gXFxcXHRcXFxcblxcXFxyXVwiIH0sXG4gICAgICAgICAgcGVnJGM0MCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIHBlZyRjNDEgPSBcIlxcXFwjXCIsXG4gICAgICAgICAgcGVnJGM0MiA9IHsgdHlwZTogXCJsaXRlcmFsXCIsIHZhbHVlOiBcIlxcXFwjXCIsIGRlc2NyaXB0aW9uOiBcIlxcXCJcXFxcXFxcXCNcXFwiXCIgfSxcbiAgICAgICAgICBwZWckYzQzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcIlxcXFwjXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIHBlZyRjNDQgPSBcIlxcXFx7XCIsXG4gICAgICAgICAgcGVnJGM0NSA9IHsgdHlwZTogXCJsaXRlcmFsXCIsIHZhbHVlOiBcIlxcXFx7XCIsIGRlc2NyaXB0aW9uOiBcIlxcXCJcXFxcXFxcXHtcXFwiXCIgfSxcbiAgICAgICAgICBwZWckYzQ2ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcIlxcdTAwN0JcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgcGVnJGM0NyA9IFwiXFxcXH1cIixcbiAgICAgICAgICBwZWckYzQ4ID0geyB0eXBlOiBcImxpdGVyYWxcIiwgdmFsdWU6IFwiXFxcXH1cIiwgZGVzY3JpcHRpb246IFwiXFxcIlxcXFxcXFxcfVxcXCJcIiB9LFxuICAgICAgICAgIHBlZyRjNDkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiXFx1MDA3RFwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICBwZWckYzUwID0gXCJcXFxcdVwiLFxuICAgICAgICAgIHBlZyRjNTEgPSB7IHR5cGU6IFwibGl0ZXJhbFwiLCB2YWx1ZTogXCJcXFxcdVwiLCBkZXNjcmlwdGlvbjogXCJcXFwiXFxcXFxcXFx1XFxcIlwiIH0sXG4gICAgICAgICAgcGVnJGM1MiA9IGZ1bmN0aW9uKGgxLCBoMiwgaDMsIGg0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoXCIweFwiICsgaDEgKyBoMiArIGgzICsgaDQpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgcGVnJGM1MyA9IC9eWzAtOV0vLFxuICAgICAgICAgIHBlZyRjNTQgPSB7IHR5cGU6IFwiY2xhc3NcIiwgdmFsdWU6IFwiWzAtOV1cIiwgZGVzY3JpcHRpb246IFwiWzAtOV1cIiB9LFxuICAgICAgICAgIHBlZyRjNTUgPSBmdW5jdGlvbihkcykge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoKGRzLmpvaW4oJycpKSwgMTApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICBwZWckYzU2ID0gL15bMC05YS1mQS1GXS8sXG4gICAgICAgICAgcGVnJGM1NyA9IHsgdHlwZTogXCJjbGFzc1wiLCB2YWx1ZTogXCJbMC05YS1mQS1GXVwiLCBkZXNjcmlwdGlvbjogXCJbMC05YS1mQS1GXVwiIH0sXG4gICAgICAgICAgcGVnJGM1OCA9IHsgdHlwZTogXCJvdGhlclwiLCBkZXNjcmlwdGlvbjogXCJ3aGl0ZXNwYWNlXCIgfSxcbiAgICAgICAgICBwZWckYzU5ID0gZnVuY3Rpb24odykgeyByZXR1cm4gdy5qb2luKCcnKTsgfSxcbiAgICAgICAgICBwZWckYzYwID0gL15bIFxcdFxcblxccl0vLFxuICAgICAgICAgIHBlZyRjNjEgPSB7IHR5cGU6IFwiY2xhc3NcIiwgdmFsdWU6IFwiWyBcXFxcdFxcXFxuXFxcXHJdXCIsIGRlc2NyaXB0aW9uOiBcIlsgXFxcXHRcXFxcblxcXFxyXVwiIH0sXG4gIFxuICAgICAgICAgIHBlZyRjdXJyUG9zICAgICAgICAgID0gMCxcbiAgICAgICAgICBwZWckcmVwb3J0ZWRQb3MgICAgICA9IDAsXG4gICAgICAgICAgcGVnJGNhY2hlZFBvcyAgICAgICAgPSAwLFxuICAgICAgICAgIHBlZyRjYWNoZWRQb3NEZXRhaWxzID0geyBsaW5lOiAxLCBjb2x1bW46IDEsIHNlZW5DUjogZmFsc2UgfSxcbiAgICAgICAgICBwZWckbWF4RmFpbFBvcyAgICAgICA9IDAsXG4gICAgICAgICAgcGVnJG1heEZhaWxFeHBlY3RlZCAgPSBbXSxcbiAgICAgICAgICBwZWckc2lsZW50RmFpbHMgICAgICA9IDAsXG4gIFxuICAgICAgICAgIHBlZyRyZXN1bHQ7XG4gIFxuICAgICAgaWYgKFwic3RhcnRSdWxlXCIgaW4gb3B0aW9ucykge1xuICAgICAgICBpZiAoIShvcHRpb25zLnN0YXJ0UnVsZSBpbiBwZWckc3RhcnRSdWxlRnVuY3Rpb25zKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHN0YXJ0IHBhcnNpbmcgZnJvbSBydWxlIFxcXCJcIiArIG9wdGlvbnMuc3RhcnRSdWxlICsgXCJcXFwiLlwiKTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgcGVnJHN0YXJ0UnVsZUZ1bmN0aW9uID0gcGVnJHN0YXJ0UnVsZUZ1bmN0aW9uc1tvcHRpb25zLnN0YXJ0UnVsZV07XG4gICAgICB9XG4gIFxuICAgICAgZnVuY3Rpb24gdGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0LnN1YnN0cmluZyhwZWckcmVwb3J0ZWRQb3MsIHBlZyRjdXJyUG9zKTtcbiAgICAgIH1cbiAgXG4gICAgICBmdW5jdGlvbiBvZmZzZXQoKSB7XG4gICAgICAgIHJldHVybiBwZWckcmVwb3J0ZWRQb3M7XG4gICAgICB9XG4gIFxuICAgICAgZnVuY3Rpb24gbGluZSgpIHtcbiAgICAgICAgcmV0dXJuIHBlZyRjb21wdXRlUG9zRGV0YWlscyhwZWckcmVwb3J0ZWRQb3MpLmxpbmU7XG4gICAgICB9XG4gIFxuICAgICAgZnVuY3Rpb24gY29sdW1uKCkge1xuICAgICAgICByZXR1cm4gcGVnJGNvbXB1dGVQb3NEZXRhaWxzKHBlZyRyZXBvcnRlZFBvcykuY29sdW1uO1xuICAgICAgfVxuICBcbiAgICAgIGZ1bmN0aW9uIGV4cGVjdGVkKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRocm93IHBlZyRidWlsZEV4Y2VwdGlvbihcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIFt7IHR5cGU6IFwib3RoZXJcIiwgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIH1dLFxuICAgICAgICAgIHBlZyRyZXBvcnRlZFBvc1xuICAgICAgICApO1xuICAgICAgfVxuICBcbiAgICAgIGZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhyb3cgcGVnJGJ1aWxkRXhjZXB0aW9uKG1lc3NhZ2UsIG51bGwsIHBlZyRyZXBvcnRlZFBvcyk7XG4gICAgICB9XG4gIFxuICAgICAgZnVuY3Rpb24gcGVnJGNvbXB1dGVQb3NEZXRhaWxzKHBvcykge1xuICAgICAgICBmdW5jdGlvbiBhZHZhbmNlKGRldGFpbHMsIHN0YXJ0UG9zLCBlbmRQb3MpIHtcbiAgICAgICAgICB2YXIgcCwgY2g7XG4gIFxuICAgICAgICAgIGZvciAocCA9IHN0YXJ0UG9zOyBwIDwgZW5kUG9zOyBwKyspIHtcbiAgICAgICAgICAgIGNoID0gaW5wdXQuY2hhckF0KHApO1xuICAgICAgICAgICAgaWYgKGNoID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICAgIGlmICghZGV0YWlscy5zZWVuQ1IpIHsgZGV0YWlscy5saW5lKys7IH1cbiAgICAgICAgICAgICAgZGV0YWlscy5jb2x1bW4gPSAxO1xuICAgICAgICAgICAgICBkZXRhaWxzLnNlZW5DUiA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjaCA9PT0gXCJcXHJcIiB8fCBjaCA9PT0gXCJcXHUyMDI4XCIgfHwgY2ggPT09IFwiXFx1MjAyOVwiKSB7XG4gICAgICAgICAgICAgIGRldGFpbHMubGluZSsrO1xuICAgICAgICAgICAgICBkZXRhaWxzLmNvbHVtbiA9IDE7XG4gICAgICAgICAgICAgIGRldGFpbHMuc2VlbkNSID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRldGFpbHMuY29sdW1uKys7XG4gICAgICAgICAgICAgIGRldGFpbHMuc2VlbkNSID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gIFxuICAgICAgICBpZiAocGVnJGNhY2hlZFBvcyAhPT0gcG9zKSB7XG4gICAgICAgICAgaWYgKHBlZyRjYWNoZWRQb3MgPiBwb3MpIHtcbiAgICAgICAgICAgIHBlZyRjYWNoZWRQb3MgPSAwO1xuICAgICAgICAgICAgcGVnJGNhY2hlZFBvc0RldGFpbHMgPSB7IGxpbmU6IDEsIGNvbHVtbjogMSwgc2VlbkNSOiBmYWxzZSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBhZHZhbmNlKHBlZyRjYWNoZWRQb3NEZXRhaWxzLCBwZWckY2FjaGVkUG9zLCBwb3MpO1xuICAgICAgICAgIHBlZyRjYWNoZWRQb3MgPSBwb3M7XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHJldHVybiBwZWckY2FjaGVkUG9zRGV0YWlscztcbiAgICAgIH1cbiAgXG4gICAgICBmdW5jdGlvbiBwZWckZmFpbChleHBlY3RlZCkge1xuICAgICAgICBpZiAocGVnJGN1cnJQb3MgPCBwZWckbWF4RmFpbFBvcykgeyByZXR1cm47IH1cbiAgXG4gICAgICAgIGlmIChwZWckY3VyclBvcyA+IHBlZyRtYXhGYWlsUG9zKSB7XG4gICAgICAgICAgcGVnJG1heEZhaWxQb3MgPSBwZWckY3VyclBvcztcbiAgICAgICAgICBwZWckbWF4RmFpbEV4cGVjdGVkID0gW107XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHBlZyRtYXhGYWlsRXhwZWN0ZWQucHVzaChleHBlY3RlZCk7XG4gICAgICB9XG4gIFxuICAgICAgZnVuY3Rpb24gcGVnJGJ1aWxkRXhjZXB0aW9uKG1lc3NhZ2UsIGV4cGVjdGVkLCBwb3MpIHtcbiAgICAgICAgZnVuY3Rpb24gY2xlYW51cEV4cGVjdGVkKGV4cGVjdGVkKSB7XG4gICAgICAgICAgdmFyIGkgPSAxO1xuICBcbiAgICAgICAgICBleHBlY3RlZC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIGlmIChhLmRlc2NyaXB0aW9uIDwgYi5kZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGEuZGVzY3JpcHRpb24gPiBiLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gIFxuICAgICAgICAgIHdoaWxlIChpIDwgZXhwZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoZXhwZWN0ZWRbaSAtIDFdID09PSBleHBlY3RlZFtpXSkge1xuICAgICAgICAgICAgICBleHBlY3RlZC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gIFxuICAgICAgICBmdW5jdGlvbiBidWlsZE1lc3NhZ2UoZXhwZWN0ZWQsIGZvdW5kKSB7XG4gICAgICAgICAgZnVuY3Rpb24gc3RyaW5nRXNjYXBlKHMpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGhleChjaCkgeyByZXR1cm4gY2guY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTsgfVxuICBcbiAgICAgICAgICAgIHJldHVybiBzXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcL2csICAgJ1xcXFxcXFxcJylcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csICAgICdcXFxcXCInKVxuICAgICAgICAgICAgICAucmVwbGFjZSgvXFx4MDgvZywgJ1xcXFxiJylcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcdC9nLCAgICdcXFxcdCcpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgICAnXFxcXG4nKVxuICAgICAgICAgICAgICAucmVwbGFjZSgvXFxmL2csICAgJ1xcXFxmJylcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcci9nLCAgICdcXFxccicpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx4MDAtXFx4MDdcXHgwQlxceDBFXFx4MEZdL2csIGZ1bmN0aW9uKGNoKSB7IHJldHVybiAnXFxcXHgwJyArIGhleChjaCk7IH0pXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx4MTAtXFx4MUZcXHg4MC1cXHhGRl0vZywgICAgZnVuY3Rpb24oY2gpIHsgcmV0dXJuICdcXFxceCcgICsgaGV4KGNoKTsgfSlcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHUwMTgwLVxcdTBGRkZdL2csICAgICAgICAgZnVuY3Rpb24oY2gpIHsgcmV0dXJuICdcXFxcdTAnICsgaGV4KGNoKTsgfSlcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHUxMDgwLVxcdUZGRkZdL2csICAgICAgICAgZnVuY3Rpb24oY2gpIHsgcmV0dXJuICdcXFxcdScgICsgaGV4KGNoKTsgfSk7XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICB2YXIgZXhwZWN0ZWREZXNjcyA9IG5ldyBBcnJheShleHBlY3RlZC5sZW5ndGgpLFxuICAgICAgICAgICAgICBleHBlY3RlZERlc2MsIGZvdW5kRGVzYywgaTtcbiAgXG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGV4cGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBleHBlY3RlZERlc2NzW2ldID0gZXhwZWN0ZWRbaV0uZGVzY3JpcHRpb247XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICBleHBlY3RlZERlc2MgPSBleHBlY3RlZC5sZW5ndGggPiAxXG4gICAgICAgICAgICA/IGV4cGVjdGVkRGVzY3Muc2xpY2UoMCwgLTEpLmpvaW4oXCIsIFwiKVxuICAgICAgICAgICAgICAgICsgXCIgb3IgXCJcbiAgICAgICAgICAgICAgICArIGV4cGVjdGVkRGVzY3NbZXhwZWN0ZWQubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgIDogZXhwZWN0ZWREZXNjc1swXTtcbiAgXG4gICAgICAgICAgZm91bmREZXNjID0gZm91bmQgPyBcIlxcXCJcIiArIHN0cmluZ0VzY2FwZShmb3VuZCkgKyBcIlxcXCJcIiA6IFwiZW5kIG9mIGlucHV0XCI7XG4gIFxuICAgICAgICAgIHJldHVybiBcIkV4cGVjdGVkIFwiICsgZXhwZWN0ZWREZXNjICsgXCIgYnV0IFwiICsgZm91bmREZXNjICsgXCIgZm91bmQuXCI7XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHZhciBwb3NEZXRhaWxzID0gcGVnJGNvbXB1dGVQb3NEZXRhaWxzKHBvcyksXG4gICAgICAgICAgICBmb3VuZCAgICAgID0gcG9zIDwgaW5wdXQubGVuZ3RoID8gaW5wdXQuY2hhckF0KHBvcykgOiBudWxsO1xuICBcbiAgICAgICAgaWYgKGV4cGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xlYW51cEV4cGVjdGVkKGV4cGVjdGVkKTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgcmV0dXJuIG5ldyBTeW50YXhFcnJvcihcbiAgICAgICAgICBtZXNzYWdlICE9PSBudWxsID8gbWVzc2FnZSA6IGJ1aWxkTWVzc2FnZShleHBlY3RlZCwgZm91bmQpLFxuICAgICAgICAgIGV4cGVjdGVkLFxuICAgICAgICAgIGZvdW5kLFxuICAgICAgICAgIHBvcyxcbiAgICAgICAgICBwb3NEZXRhaWxzLmxpbmUsXG4gICAgICAgICAgcG9zRGV0YWlscy5jb2x1bW5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgXG4gICAgICBmdW5jdGlvbiBwZWckcGFyc2VzdGFydCgpIHtcbiAgICAgICAgdmFyIHMwLCBzMTtcbiAgXG4gICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgIHMxID0gcGVnJHBhcnNlbWVzc2FnZUZvcm1hdFBhdHRlcm4oKTtcbiAgICAgICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgcGVnJHJlcG9ydGVkUG9zID0gczA7XG4gICAgICAgICAgczEgPSBwZWckYzAoczEpO1xuICAgICAgICB9XG4gICAgICAgIHMwID0gczE7XG4gIFxuICAgICAgICByZXR1cm4gczA7XG4gICAgICB9XG4gIFxuICAgICAgZnVuY3Rpb24gcGVnJHBhcnNlbWVzc2FnZUZvcm1hdFBhdHRlcm4oKSB7XG4gICAgICAgIHZhciBzMCwgczEsIHMyLCBzMztcbiAgXG4gICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgIHMxID0gcGVnJHBhcnNlc3RyaW5nKCk7XG4gICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgIHMyID0gW107XG4gICAgICAgICAgczMgPSBwZWckcGFyc2VtZXNzYWdlRm9ybWF0UGF0dGVyblJpZ2h0KCk7XG4gICAgICAgICAgd2hpbGUgKHMzICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICBzMi5wdXNoKHMzKTtcbiAgICAgICAgICAgIHMzID0gcGVnJHBhcnNlbWVzc2FnZUZvcm1hdFBhdHRlcm5SaWdodCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIHBlZyRyZXBvcnRlZFBvcyA9IHMwO1xuICAgICAgICAgICAgczEgPSBwZWckYzMoczEsIHMyKTtcbiAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgcmV0dXJuIHMwO1xuICAgICAgfVxuICBcbiAgICAgIGZ1bmN0aW9uIHBlZyRwYXJzZW1lc3NhZ2VGb3JtYXRQYXR0ZXJuUmlnaHQoKSB7XG4gICAgICAgIHZhciBzMCwgczEsIHMyLCBzMywgczQsIHM1LCBzNjtcbiAgXG4gICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KHBlZyRjdXJyUG9zKSA9PT0gMTIzKSB7XG4gICAgICAgICAgczEgPSBwZWckYzQ7XG4gICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzMSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzUpOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgczIgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgaWYgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICBzMyA9IHBlZyRwYXJzZW1lc3NhZ2VGb3JtYXRFbGVtZW50KCk7XG4gICAgICAgICAgICBpZiAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgczQgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICAgIGlmIChzNCAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KHBlZyRjdXJyUG9zKSA9PT0gMTI1KSB7XG4gICAgICAgICAgICAgICAgICBzNSA9IHBlZyRjNjtcbiAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHM1ID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGM3KTsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoczUgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgIHM2ID0gcGVnJHBhcnNlc3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICBpZiAoczYgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVnJHJlcG9ydGVkUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgIHMxID0gcGVnJGM4KHMzLCBzNik7XG4gICAgICAgICAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgIHMwID0gcGVnJGMxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgIHMwID0gcGVnJGMxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgIHMwID0gcGVnJGMxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgIHMwID0gcGVnJGMxO1xuICAgICAgICB9XG4gIFxuICAgICAgICByZXR1cm4gczA7XG4gICAgICB9XG4gIFxuICAgICAgZnVuY3Rpb24gcGVnJHBhcnNlbWVzc2FnZUZvcm1hdEVsZW1lbnQoKSB7XG4gICAgICAgIHZhciBzMCwgczEsIHMyLCBzMywgczQ7XG4gIFxuICAgICAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgICAgICBzMSA9IHBlZyRwYXJzZWlkKCk7XG4gICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgIHMyID0gcGVnJGN1cnJQb3M7XG4gICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSA0NCkge1xuICAgICAgICAgICAgczMgPSBwZWckYzEwO1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgczMgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzExKTsgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIHM0ID0gcGVnJHBhcnNlZWxlbWVudEZvcm1hdCgpO1xuICAgICAgICAgICAgaWYgKHM0ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgIHMzID0gW3MzLCBzNF07XG4gICAgICAgICAgICAgIHMyID0gczM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMyO1xuICAgICAgICAgICAgICBzMiA9IHBlZyRjMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMjtcbiAgICAgICAgICAgIHMyID0gcGVnJGMxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoczIgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIHMyID0gcGVnJGM5O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIHBlZyRyZXBvcnRlZFBvcyA9IHMwO1xuICAgICAgICAgICAgczEgPSBwZWckYzEyKHMxLCBzMik7XG4gICAgICAgICAgICBzMCA9IHMxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHJldHVybiBzMDtcbiAgICAgIH1cbiAgXG4gICAgICBmdW5jdGlvbiBwZWckcGFyc2VlbGVtZW50Rm9ybWF0KCkge1xuICAgICAgICB2YXIgczAsIHMxLCBzMiwgczMsIHM0LCBzNSwgczYsIHM3O1xuICBcbiAgICAgICAgczAgPSBwZWckY3VyclBvcztcbiAgICAgICAgczEgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgIGlmIChpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDYpID09PSBwZWckYzEzKSB7XG4gICAgICAgICAgICBzMiA9IHBlZyRjMTM7XG4gICAgICAgICAgICBwZWckY3VyclBvcyArPSA2O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzMiA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMTQpOyB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgczMgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICBpZiAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSA0NCkge1xuICAgICAgICAgICAgICAgIHM0ID0gcGVnJGMxMDtcbiAgICAgICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHM0ID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMTEpOyB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHM0ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgczUgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICAgICAgaWYgKHM1ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICBzNiA9IHBlZyRwYXJzZXBsdXJhbFN0eWxlKCk7XG4gICAgICAgICAgICAgICAgICBpZiAoczYgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgczcgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzNyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICAgIHBlZyRyZXBvcnRlZFBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICAgIHMxID0gcGVnJGMxNShzMiwgczYpO1xuICAgICAgICAgICAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoczAgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgICAgICAgIHMxID0gcGVnJHBhcnNlXygpO1xuICAgICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgNikgPT09IHBlZyRjMTYpIHtcbiAgICAgICAgICAgICAgczIgPSBwZWckYzE2O1xuICAgICAgICAgICAgICBwZWckY3VyclBvcyArPSA2O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgczIgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMTcpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgczMgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICAgIGlmIChzMyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KHBlZyRjdXJyUG9zKSA9PT0gNDQpIHtcbiAgICAgICAgICAgICAgICAgIHM0ID0gcGVnJGMxMDtcbiAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHM0ID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMxMSk7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHM0ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICBzNSA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICAgICAgICAgIGlmIChzNSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICBzNiA9IHBlZyRwYXJzZXNlbGVjdFN0eWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzNiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICAgIHM3ID0gcGVnJHBhcnNlXygpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChzNyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVnJHJlcG9ydGVkUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzMSA9IHBlZyRjMTUoczIsIHM2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHJldHVybiBzMDtcbiAgICAgIH1cbiAgXG4gICAgICBmdW5jdGlvbiBwZWckcGFyc2VwbHVyYWxTdHlsZSgpIHtcbiAgICAgICAgdmFyIHMwLCBzMTtcbiAgXG4gICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgIHMxID0gcGVnJHBhcnNlcGx1cmFsRm9ybWF0UGF0dGVybigpO1xuICAgICAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBwZWckcmVwb3J0ZWRQb3MgPSBzMDtcbiAgICAgICAgICBzMSA9IHBlZyRjMTgoczEpO1xuICAgICAgICB9XG4gICAgICAgIHMwID0gczE7XG4gIFxuICAgICAgICByZXR1cm4gczA7XG4gICAgICB9XG4gIFxuICAgICAgZnVuY3Rpb24gcGVnJHBhcnNlc2VsZWN0U3R5bGUoKSB7XG4gICAgICAgIHZhciBzMCwgczE7XG4gIFxuICAgICAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgICAgICBzMSA9IHBlZyRwYXJzZXNlbGVjdEZvcm1hdFBhdHRlcm4oKTtcbiAgICAgICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgcGVnJHJlcG9ydGVkUG9zID0gczA7XG4gICAgICAgICAgczEgPSBwZWckYzE5KHMxKTtcbiAgICAgICAgfVxuICAgICAgICBzMCA9IHMxO1xuICBcbiAgICAgICAgcmV0dXJuIHMwO1xuICAgICAgfVxuICBcbiAgICAgIGZ1bmN0aW9uIHBlZyRwYXJzZXBsdXJhbEZvcm1hdFBhdHRlcm4oKSB7XG4gICAgICAgIHZhciBzMCwgczEsIHMyLCBzMztcbiAgXG4gICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgIHMxID0gcGVnJHBhcnNlb2Zmc2V0UGF0dGVybigpO1xuICAgICAgICBpZiAoczEgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBzMSA9IHBlZyRjOTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBzMiA9IFtdO1xuICAgICAgICAgIHMzID0gcGVnJHBhcnNlcGx1cmFsRm9ybXMoKTtcbiAgICAgICAgICB3aGlsZSAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIHMyLnB1c2goczMpO1xuICAgICAgICAgICAgczMgPSBwZWckcGFyc2VwbHVyYWxGb3JtcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIHBlZyRyZXBvcnRlZFBvcyA9IHMwO1xuICAgICAgICAgICAgczEgPSBwZWckYzIwKHMxLCBzMik7XG4gICAgICAgICAgICBzMCA9IHMxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHJldHVybiBzMDtcbiAgICAgIH1cbiAgXG4gICAgICBmdW5jdGlvbiBwZWckcGFyc2VvZmZzZXRQYXR0ZXJuKCkge1xuICAgICAgICB2YXIgczAsIHMxLCBzMiwgczMsIHM0LCBzNSwgczYsIHM3O1xuICBcbiAgICAgICAgczAgPSBwZWckY3VyclBvcztcbiAgICAgICAgczEgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgIGlmIChpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDYpID09PSBwZWckYzIxKSB7XG4gICAgICAgICAgICBzMiA9IHBlZyRjMjE7XG4gICAgICAgICAgICBwZWckY3VyclBvcyArPSA2O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzMiA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMjIpOyB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgczMgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICBpZiAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSA1OCkge1xuICAgICAgICAgICAgICAgIHM0ID0gcGVnJGMyMztcbiAgICAgICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHM0ID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMjQpOyB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHM0ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgczUgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICAgICAgaWYgKHM1ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICBzNiA9IHBlZyRwYXJzZWRpZ2l0cygpO1xuICAgICAgICAgICAgICAgICAgaWYgKHM2ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIHM3ID0gcGVnJHBhcnNlXygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoczcgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBwZWckcmVwb3J0ZWRQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgICBzMSA9IHBlZyRjMjUoczYpO1xuICAgICAgICAgICAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgcmV0dXJuIHMwO1xuICAgICAgfVxuICBcbiAgICAgIGZ1bmN0aW9uIHBlZyRwYXJzZXNlbGVjdEZvcm1hdFBhdHRlcm4oKSB7XG4gICAgICAgIHZhciBzMCwgczEsIHMyO1xuICBcbiAgICAgICAgczAgPSBwZWckY3VyclBvcztcbiAgICAgICAgczEgPSBbXTtcbiAgICAgICAgczIgPSBwZWckcGFyc2VwbHVyYWxGb3JtcygpO1xuICAgICAgICB3aGlsZSAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBzMS5wdXNoKHMyKTtcbiAgICAgICAgICBzMiA9IHBlZyRwYXJzZXBsdXJhbEZvcm1zKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgcGVnJHJlcG9ydGVkUG9zID0gczA7XG4gICAgICAgICAgczEgPSBwZWckYzI2KHMxKTtcbiAgICAgICAgfVxuICAgICAgICBzMCA9IHMxO1xuICBcbiAgICAgICAgcmV0dXJuIHMwO1xuICAgICAgfVxuICBcbiAgICAgIGZ1bmN0aW9uIHBlZyRwYXJzZXBsdXJhbEZvcm1zKCkge1xuICAgICAgICB2YXIgczAsIHMxLCBzMiwgczMsIHM0LCBzNSwgczYsIHM3LCBzODtcbiAgXG4gICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgIHMxID0gcGVnJHBhcnNlXygpO1xuICAgICAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBzMiA9IHBlZyRwYXJzZXN0cmluZ0tleSgpO1xuICAgICAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgczMgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICBpZiAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSAxMjMpIHtcbiAgICAgICAgICAgICAgICBzNCA9IHBlZyRjNDtcbiAgICAgICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHM0ID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNSk7IH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoczQgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICBzNSA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICAgICAgICBpZiAoczUgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgIHM2ID0gcGVnJHBhcnNlbWVzc2FnZUZvcm1hdFBhdHRlcm4oKTtcbiAgICAgICAgICAgICAgICAgIGlmIChzNiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICBzNyA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHM3ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LmNoYXJDb2RlQXQocGVnJGN1cnJQb3MpID09PSAxMjUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHM4ID0gcGVnJGM2O1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgczggPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzcpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlmIChzOCAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVnJHJlcG9ydGVkUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzMSA9IHBlZyRjMjcoczIsIHM2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgcmV0dXJuIHMwO1xuICAgICAgfVxuICBcbiAgICAgIGZ1bmN0aW9uIHBlZyRwYXJzZXN0cmluZ0tleSgpIHtcbiAgICAgICAgdmFyIHMwLCBzMSwgczI7XG4gIFxuICAgICAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgICAgICBzMSA9IHBlZyRwYXJzZWlkKCk7XG4gICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgIHBlZyRyZXBvcnRlZFBvcyA9IHMwO1xuICAgICAgICAgIHMxID0gcGVnJGMyOChzMSk7XG4gICAgICAgIH1cbiAgICAgICAgczAgPSBzMTtcbiAgICAgICAgaWYgKHMwID09PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgczAgPSBwZWckY3VyclBvcztcbiAgICAgICAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChwZWckY3VyclBvcykgPT09IDYxKSB7XG4gICAgICAgICAgICBzMSA9IHBlZyRjMjk7XG4gICAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzMSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjMzApOyB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgczIgPSBwZWckcGFyc2VkaWdpdHMoKTtcbiAgICAgICAgICAgIGlmIChzMiAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICBwZWckcmVwb3J0ZWRQb3MgPSBzMDtcbiAgICAgICAgICAgICAgczEgPSBwZWckYzI1KHMyKTtcbiAgICAgICAgICAgICAgczAgPSBzMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgIHMwID0gcGVnJGMxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gIFxuICAgICAgICByZXR1cm4gczA7XG4gICAgICB9XG4gIFxuICAgICAgZnVuY3Rpb24gcGVnJHBhcnNlc3RyaW5nKCkge1xuICAgICAgICB2YXIgczAsIHMxLCBzMiwgczMsIHM0LCBzNSwgczY7XG4gIFxuICAgICAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgICAgICBzMSA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgczIgPSBbXTtcbiAgICAgICAgICBzMyA9IHBlZyRjdXJyUG9zO1xuICAgICAgICAgIHM0ID0gcGVnJHBhcnNlXygpO1xuICAgICAgICAgIGlmIChzNCAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgczUgPSBwZWckcGFyc2VjaGFycygpO1xuICAgICAgICAgICAgaWYgKHM1ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgIHM2ID0gcGVnJHBhcnNlXygpO1xuICAgICAgICAgICAgICBpZiAoczYgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICBzNCA9IFtzNCwgczUsIHM2XTtcbiAgICAgICAgICAgICAgICBzMyA9IHM0O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczM7XG4gICAgICAgICAgICAgICAgczMgPSBwZWckYzE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczM7XG4gICAgICAgICAgICAgIHMzID0gcGVnJGMxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZWckY3VyclBvcyA9IHMzO1xuICAgICAgICAgICAgczMgPSBwZWckYzE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlIChzMyAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgczIucHVzaChzMyk7XG4gICAgICAgICAgICBzMyA9IHBlZyRjdXJyUG9zO1xuICAgICAgICAgICAgczQgPSBwZWckcGFyc2VfKCk7XG4gICAgICAgICAgICBpZiAoczQgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgczUgPSBwZWckcGFyc2VjaGFycygpO1xuICAgICAgICAgICAgICBpZiAoczUgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICBzNiA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgICAgICAgICBpZiAoczYgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgIHM0ID0gW3M0LCBzNSwgczZdO1xuICAgICAgICAgICAgICAgICAgczMgPSBzNDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMztcbiAgICAgICAgICAgICAgICAgIHMzID0gcGVnJGMxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMzO1xuICAgICAgICAgICAgICAgIHMzID0gcGVnJGMxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMzO1xuICAgICAgICAgICAgICBzMyA9IHBlZyRjMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICBwZWckcmVwb3J0ZWRQb3MgPSBzMDtcbiAgICAgICAgICAgIHMxID0gcGVnJGMzMShzMSwgczIpO1xuICAgICAgICAgICAgczAgPSBzMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgIHMwID0gcGVnJGMxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgIHMwID0gcGVnJGMxO1xuICAgICAgICB9XG4gIFxuICAgICAgICByZXR1cm4gczA7XG4gICAgICB9XG4gIFxuICAgICAgZnVuY3Rpb24gcGVnJHBhcnNlaWQoKSB7XG4gICAgICAgIHZhciBzMCwgczEsIHMyLCBzMywgczQ7XG4gIFxuICAgICAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgICAgICBzMSA9IHBlZyRwYXJzZV8oKTtcbiAgICAgICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgaWYgKHBlZyRjMzIudGVzdChpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpKSkge1xuICAgICAgICAgICAgczIgPSBpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpO1xuICAgICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgczIgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzMzKTsgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIHMzID0gW107XG4gICAgICAgICAgICBpZiAocGVnJGMzNC50ZXN0KGlucHV0LmNoYXJBdChwZWckY3VyclBvcykpKSB7XG4gICAgICAgICAgICAgIHM0ID0gaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKTtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHM0ID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzM1KTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHM0ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgIHMzLnB1c2goczQpO1xuICAgICAgICAgICAgICBpZiAocGVnJGMzNC50ZXN0KGlucHV0LmNoYXJBdChwZWckY3VyclBvcykpKSB7XG4gICAgICAgICAgICAgICAgczQgPSBpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpO1xuICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgczQgPSBwZWckRkFJTEVEO1xuICAgICAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMzNSk7IH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMzICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgIHM0ID0gcGVnJHBhcnNlXygpO1xuICAgICAgICAgICAgICBpZiAoczQgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICBwZWckcmVwb3J0ZWRQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICBzMSA9IHBlZyRjMzYoczIsIHMzKTtcbiAgICAgICAgICAgICAgICBzMCA9IHMxO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgICAgIHMwID0gcGVnJGMxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBlZyRjdXJyUG9zID0gczA7XG4gICAgICAgICAgczAgPSBwZWckYzE7XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHJldHVybiBzMDtcbiAgICAgIH1cbiAgXG4gICAgICBmdW5jdGlvbiBwZWckcGFyc2VjaGFycygpIHtcbiAgICAgICAgdmFyIHMwLCBzMSwgczI7XG4gIFxuICAgICAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgICAgICBzMSA9IFtdO1xuICAgICAgICBzMiA9IHBlZyRwYXJzZWNoYXIoKTtcbiAgICAgICAgaWYgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgd2hpbGUgKHMyICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICBzMS5wdXNoKHMyKTtcbiAgICAgICAgICAgIHMyID0gcGVnJHBhcnNlY2hhcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzMSA9IHBlZyRjMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBwZWckcmVwb3J0ZWRQb3MgPSBzMDtcbiAgICAgICAgICBzMSA9IHBlZyRjMzcoczEpO1xuICAgICAgICB9XG4gICAgICAgIHMwID0gczE7XG4gIFxuICAgICAgICByZXR1cm4gczA7XG4gICAgICB9XG4gIFxuICAgICAgZnVuY3Rpb24gcGVnJHBhcnNlY2hhcigpIHtcbiAgICAgICAgdmFyIHMwLCBzMSwgczIsIHMzLCBzNCwgczU7XG4gIFxuICAgICAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgICAgICBpZiAocGVnJGMzOC50ZXN0KGlucHV0LmNoYXJBdChwZWckY3VyclBvcykpKSB7XG4gICAgICAgICAgczEgPSBpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpO1xuICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgczEgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGMzOSk7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBwZWckcmVwb3J0ZWRQb3MgPSBzMDtcbiAgICAgICAgICBzMSA9IHBlZyRjNDAoczEpO1xuICAgICAgICB9XG4gICAgICAgIHMwID0gczE7XG4gICAgICAgIGlmIChzMCA9PT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgMikgPT09IHBlZyRjNDEpIHtcbiAgICAgICAgICAgIHMxID0gcGVnJGM0MTtcbiAgICAgICAgICAgIHBlZyRjdXJyUG9zICs9IDI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGM0Mik7IH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICBwZWckcmVwb3J0ZWRQb3MgPSBzMDtcbiAgICAgICAgICAgIHMxID0gcGVnJGM0MygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzMCA9IHMxO1xuICAgICAgICAgIGlmIChzMCA9PT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgczAgPSBwZWckY3VyclBvcztcbiAgICAgICAgICAgIGlmIChpbnB1dC5zdWJzdHIocGVnJGN1cnJQb3MsIDIpID09PSBwZWckYzQ0KSB7XG4gICAgICAgICAgICAgIHMxID0gcGVnJGM0NDtcbiAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgKz0gMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzQ1KTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgIHBlZyRyZXBvcnRlZFBvcyA9IHMwO1xuICAgICAgICAgICAgICBzMSA9IHBlZyRjNDYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgICBpZiAoczAgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgczAgPSBwZWckY3VyclBvcztcbiAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgMikgPT09IHBlZyRjNDcpIHtcbiAgICAgICAgICAgICAgICBzMSA9IHBlZyRjNDc7XG4gICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgKz0gMjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzMSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzQ4KTsgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChzMSAhPT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgIHBlZyRyZXBvcnRlZFBvcyA9IHMwO1xuICAgICAgICAgICAgICAgIHMxID0gcGVnJGM0OSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgICAgIGlmIChzMCA9PT0gcGVnJEZBSUxFRCkge1xuICAgICAgICAgICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LnN1YnN0cihwZWckY3VyclBvcywgMikgPT09IHBlZyRjNTApIHtcbiAgICAgICAgICAgICAgICAgIHMxID0gcGVnJGM1MDtcbiAgICAgICAgICAgICAgICAgIHBlZyRjdXJyUG9zICs9IDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHMxID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGM1MSk7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICBzMiA9IHBlZyRwYXJzZWhleERpZ2l0KCk7XG4gICAgICAgICAgICAgICAgICBpZiAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgczMgPSBwZWckcGFyc2VoZXhEaWdpdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoczMgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzNCA9IHBlZyRwYXJzZWhleERpZ2l0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHM0ICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzNSA9IHBlZyRwYXJzZWhleERpZ2l0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoczUgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGVnJHJlcG9ydGVkUG9zID0gczA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHMxID0gcGVnJGM1MihzMiwgczMsIHM0LCBzNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHMwID0gczE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMwID0gcGVnJGMxO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICAgIHMwID0gcGVnJGMxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwZWckY3VyclBvcyA9IHMwO1xuICAgICAgICAgICAgICAgICAgICBzMCA9IHBlZyRjMTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcGVnJGN1cnJQb3MgPSBzMDtcbiAgICAgICAgICAgICAgICAgIHMwID0gcGVnJGMxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICBcbiAgICAgICAgcmV0dXJuIHMwO1xuICAgICAgfVxuICBcbiAgICAgIGZ1bmN0aW9uIHBlZyRwYXJzZWRpZ2l0cygpIHtcbiAgICAgICAgdmFyIHMwLCBzMSwgczI7XG4gIFxuICAgICAgICBzMCA9IHBlZyRjdXJyUG9zO1xuICAgICAgICBzMSA9IFtdO1xuICAgICAgICBpZiAocGVnJGM1My50ZXN0KGlucHV0LmNoYXJBdChwZWckY3VyclBvcykpKSB7XG4gICAgICAgICAgczIgPSBpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpO1xuICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgczIgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGM1NCk7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICB3aGlsZSAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICAgIHMxLnB1c2goczIpO1xuICAgICAgICAgICAgaWYgKHBlZyRjNTMudGVzdChpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpKSkge1xuICAgICAgICAgICAgICBzMiA9IGlucHV0LmNoYXJBdChwZWckY3VyclBvcyk7XG4gICAgICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzMiA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGM1NCk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgczEgPSBwZWckYzE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMxICE9PSBwZWckRkFJTEVEKSB7XG4gICAgICAgICAgcGVnJHJlcG9ydGVkUG9zID0gczA7XG4gICAgICAgICAgczEgPSBwZWckYzU1KHMxKTtcbiAgICAgICAgfVxuICAgICAgICBzMCA9IHMxO1xuICBcbiAgICAgICAgcmV0dXJuIHMwO1xuICAgICAgfVxuICBcbiAgICAgIGZ1bmN0aW9uIHBlZyRwYXJzZWhleERpZ2l0KCkge1xuICAgICAgICB2YXIgczA7XG4gIFxuICAgICAgICBpZiAocGVnJGM1Ni50ZXN0KGlucHV0LmNoYXJBdChwZWckY3VyclBvcykpKSB7XG4gICAgICAgICAgczAgPSBpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpO1xuICAgICAgICAgIHBlZyRjdXJyUG9zKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgczAgPSBwZWckRkFJTEVEO1xuICAgICAgICAgIGlmIChwZWckc2lsZW50RmFpbHMgPT09IDApIHsgcGVnJGZhaWwocGVnJGM1Nyk7IH1cbiAgICAgICAgfVxuICBcbiAgICAgICAgcmV0dXJuIHMwO1xuICAgICAgfVxuICBcbiAgICAgIGZ1bmN0aW9uIHBlZyRwYXJzZV8oKSB7XG4gICAgICAgIHZhciBzMCwgczEsIHMyO1xuICBcbiAgICAgICAgcGVnJHNpbGVudEZhaWxzKys7XG4gICAgICAgIHMwID0gcGVnJGN1cnJQb3M7XG4gICAgICAgIHMxID0gW107XG4gICAgICAgIHMyID0gcGVnJHBhcnNld2hpdGVzcGFjZSgpO1xuICAgICAgICB3aGlsZSAoczIgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBzMS5wdXNoKHMyKTtcbiAgICAgICAgICBzMiA9IHBlZyRwYXJzZXdoaXRlc3BhY2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoczEgIT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBwZWckcmVwb3J0ZWRQb3MgPSBzMDtcbiAgICAgICAgICBzMSA9IHBlZyRjNTkoczEpO1xuICAgICAgICB9XG4gICAgICAgIHMwID0gczE7XG4gICAgICAgIHBlZyRzaWxlbnRGYWlscy0tO1xuICAgICAgICBpZiAoczAgPT09IHBlZyRGQUlMRUQpIHtcbiAgICAgICAgICBzMSA9IHBlZyRGQUlMRUQ7XG4gICAgICAgICAgaWYgKHBlZyRzaWxlbnRGYWlscyA9PT0gMCkgeyBwZWckZmFpbChwZWckYzU4KTsgfVxuICAgICAgICB9XG4gIFxuICAgICAgICByZXR1cm4gczA7XG4gICAgICB9XG4gIFxuICAgICAgZnVuY3Rpb24gcGVnJHBhcnNld2hpdGVzcGFjZSgpIHtcbiAgICAgICAgdmFyIHMwO1xuICBcbiAgICAgICAgaWYgKHBlZyRjNjAudGVzdChpbnB1dC5jaGFyQXQocGVnJGN1cnJQb3MpKSkge1xuICAgICAgICAgIHMwID0gaW5wdXQuY2hhckF0KHBlZyRjdXJyUG9zKTtcbiAgICAgICAgICBwZWckY3VyclBvcysrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHMwID0gcGVnJEZBSUxFRDtcbiAgICAgICAgICBpZiAocGVnJHNpbGVudEZhaWxzID09PSAwKSB7IHBlZyRmYWlsKHBlZyRjNjEpOyB9XG4gICAgICAgIH1cbiAgXG4gICAgICAgIHJldHVybiBzMDtcbiAgICAgIH1cbiAgXG4gICAgICBwZWckcmVzdWx0ID0gcGVnJHN0YXJ0UnVsZUZ1bmN0aW9uKCk7XG4gIFxuICAgICAgaWYgKHBlZyRyZXN1bHQgIT09IHBlZyRGQUlMRUQgJiYgcGVnJGN1cnJQb3MgPT09IGlucHV0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcGVnJHJlc3VsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwZWckcmVzdWx0ICE9PSBwZWckRkFJTEVEICYmIHBlZyRjdXJyUG9zIDwgaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgcGVnJGZhaWwoeyB0eXBlOiBcImVuZFwiLCBkZXNjcmlwdGlvbjogXCJlbmQgb2YgaW5wdXRcIiB9KTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgdGhyb3cgcGVnJGJ1aWxkRXhjZXB0aW9uKG51bGwsIHBlZyRtYXhGYWlsRXhwZWN0ZWQsIHBlZyRtYXhGYWlsUG9zKTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIHJldHVybiB7XG4gICAgICBTeW50YXhFcnJvcjogU3ludGF4RXJyb3IsXG4gICAgICBwYXJzZTogICAgICAgcGFyc2VcbiAgICB9O1xuICB9KSgpO1xuXG4gIE1lc3NhZ2VGb3JtYXQucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIEJpbmQgdG8gaXRzZWxmIHNvIGVycm9yIGhhbmRsaW5nIHdvcmtzXG4gICAgcmV0dXJuIG1wYXJzZXIucGFyc2UuYXBwbHkoIG1wYXJzZXIsIGFyZ3VtZW50cyApO1xuICB9O1xuXG4gIE1lc3NhZ2VGb3JtYXQucHJvdG90eXBlLnByZWNvbXBpbGUgPSBmdW5jdGlvbiAoIGFzdCApIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG5lZWRPdGhlciA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gX25leHQgKCBkYXRhICkge1xuICAgICAgdmFyIHJlcyA9IEpTT04ucGFyc2UoIEpTT04uc3RyaW5naWZ5KCBkYXRhICkgKTtcbiAgICAgIHJlcy5wZl9jb3VudCsrO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgZnVuY3Rpb24gaW50ZXJwTUZQICggYXN0LCBkYXRhICkge1xuICAgICAgLy8gU2V0IHNvbWUgZGVmYXVsdCBkYXRhXG4gICAgICBkYXRhID0gZGF0YSB8fCB7IGtleXM6IHt9LCBvZmZzZXQ6IHt9IH07XG4gICAgICB2YXIgciA9IFtdLCBpLCB0bXA7XG5cbiAgICAgIHN3aXRjaCAoIGFzdC50eXBlICkge1xuICAgICAgICBjYXNlICdwcm9ncmFtJzpcbiAgICAgICAgICByZXR1cm4gaW50ZXJwTUZQKCBhc3QucHJvZ3JhbSApO1xuICAgICAgICBjYXNlICdtZXNzYWdlRm9ybWF0UGF0dGVybic6XG4gICAgICAgICAgZm9yICggaSA9IDA7IGkgPCBhc3Quc3RhdGVtZW50cy5sZW5ndGg7ICsraSApIHtcbiAgICAgICAgICAgIHIucHVzaChpbnRlcnBNRlAoIGFzdC5zdGF0ZW1lbnRzW2ldLCBkYXRhICkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0bXAgPSByLmpvaW4oJysnKSB8fCAnXCJcIic7XG4gICAgICAgICAgcmV0dXJuIGRhdGEucGZfY291bnQgPyB0bXAgOiAnZnVuY3Rpb24oZCl7cmV0dXJuICcgKyB0bXAgKyAnfSc7XG4gICAgICAgIGNhc2UgJ21lc3NhZ2VGb3JtYXRQYXR0ZXJuUmlnaHQnOlxuICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXN0LnN0YXRlbWVudHMubGVuZ3RoOyArK2kgKSB7XG4gICAgICAgICAgICByLnB1c2goaW50ZXJwTUZQKCBhc3Quc3RhdGVtZW50c1tpXSwgZGF0YSApKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHIuam9pbignKycpO1xuICAgICAgICBjYXNlICdtZXNzYWdlRm9ybWF0RWxlbWVudCc6XG4gICAgICAgICAgZGF0YS5wZl9jb3VudCA9IGRhdGEucGZfY291bnQgfHwgMDtcbiAgICAgICAgICBpZiAoIGFzdC5vdXRwdXQgKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5nbG9iYWxOYW1lICsgJy52KGQsXCInICsgYXN0LmFyZ3VtZW50SW5kZXggKyAnXCIpJztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhLmtleXNbZGF0YS5wZl9jb3VudF0gPSAnXCInICsgYXN0LmFyZ3VtZW50SW5kZXggKyAnXCInO1xuICAgICAgICAgICAgcmV0dXJuIGludGVycE1GUCggYXN0LmVsZW1lbnRGb3JtYXQsIGRhdGEgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICBjYXNlICdlbGVtZW50Rm9ybWF0JzpcbiAgICAgICAgICBpZiAoIGFzdC5rZXkgPT09ICdzZWxlY3QnICkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZ2xvYmFsTmFtZSArICcucyhkLCcgKyBkYXRhLmtleXNbZGF0YS5wZl9jb3VudF0gKyAnLCcgKyBpbnRlcnBNRlAoIGFzdC52YWwsIGRhdGEgKSArICcpJztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoIGFzdC5rZXkgPT09ICdwbHVyYWwnICkge1xuICAgICAgICAgICAgZGF0YS5vZmZzZXRbZGF0YS5wZl9jb3VudCB8fCAwXSA9IGFzdC52YWwub2Zmc2V0IHx8IDA7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5nbG9iYWxOYW1lICsgJy5wKGQsJyArIGRhdGEua2V5c1tkYXRhLnBmX2NvdW50XSArICcsJyArIChkYXRhLm9mZnNldFtkYXRhLnBmX2NvdW50XSB8fCAwKVxuICAgICAgICAgICAgICArICcsXCInICsgc2VsZi5sYyArICdcIiwnICsgaW50ZXJwTUZQKCBhc3QudmFsLCBkYXRhICkgKyAnKSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgLyogLy8gVW5yZWFjaGFibGUgY2FzZXMuXG4gICAgICAgIGNhc2UgJ3BsdXJhbFN0eWxlJzpcbiAgICAgICAgY2FzZSAnc2VsZWN0U3R5bGUnOiovXG4gICAgICAgIGNhc2UgJ3BsdXJhbEZvcm1hdFBhdHRlcm4nOlxuICAgICAgICAgIGRhdGEucGZfY291bnQgPSBkYXRhLnBmX2NvdW50IHx8IDA7XG4gICAgICAgICAgbmVlZE90aGVyID0gdHJ1ZTtcbiAgICAgICAgICAvLyBXZSdyZSBnb2luZyB0byBzaW11bHRhbmVvdXNseSBjaGVjayB0byBtYWtlIHN1cmUgd2UgaGl0IHRoZSByZXF1aXJlZCAnb3RoZXInIG9wdGlvbi5cblxuICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXN0LnBsdXJhbEZvcm1zLmxlbmd0aDsgKytpICkge1xuICAgICAgICAgICAgaWYgKCBhc3QucGx1cmFsRm9ybXNbIGkgXS5rZXkgPT09ICdvdGhlcicgKSB7XG4gICAgICAgICAgICAgIG5lZWRPdGhlciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgci5wdXNoKCdcIicgKyBhc3QucGx1cmFsRm9ybXNbIGkgXS5rZXkgKyAnXCI6JyArIGludGVycE1GUCggYXN0LnBsdXJhbEZvcm1zWyBpIF0udmFsLCBfbmV4dChkYXRhKSApKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCBuZWVkT3RoZXIgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyAnb3RoZXInIGZvcm0gZm91bmQgaW4gcGx1cmFsRm9ybWF0UGF0dGVybiBcIiArIGRhdGEucGZfY291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJ3snICsgci5qb2luKCcsJykgKyAnfSc7XG4gICAgICAgIGNhc2UgJ3NlbGVjdEZvcm1hdFBhdHRlcm4nOlxuXG4gICAgICAgICAgZGF0YS5wZl9jb3VudCA9IGRhdGEucGZfY291bnQgfHwgMDtcbiAgICAgICAgICBkYXRhLm9mZnNldFtkYXRhLnBmX2NvdW50XSA9IDA7XG4gICAgICAgICAgbmVlZE90aGVyID0gdHJ1ZTtcblxuICAgICAgICAgIGZvciAoIGkgPSAwOyBpIDwgYXN0LnBsdXJhbEZvcm1zLmxlbmd0aDsgKytpICkge1xuICAgICAgICAgICAgaWYgKCBhc3QucGx1cmFsRm9ybXNbIGkgXS5rZXkgPT09ICdvdGhlcicgKSB7XG4gICAgICAgICAgICAgIG5lZWRPdGhlciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgci5wdXNoKCdcIicgKyBhc3QucGx1cmFsRm9ybXNbIGkgXS5rZXkgKyAnXCI6JyArIGludGVycE1GUCggYXN0LnBsdXJhbEZvcm1zWyBpIF0udmFsLCBfbmV4dChkYXRhKSApKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCBuZWVkT3RoZXIgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyAnb3RoZXInIGZvcm0gZm91bmQgaW4gc2VsZWN0Rm9ybWF0UGF0dGVybiBcIiArIGRhdGEucGZfY291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJ3snICsgci5qb2luKCcsJykgKyAnfSc7XG4gICAgICAgIC8qIC8vIFVucmVhY2hhYmxlXG4gICAgICAgIGNhc2UgJ3BsdXJhbEZvcm1zJzpcbiAgICAgICAgKi9cbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICB0bXAgPSAnXCInICsgKGFzdC52YWwgfHwgXCJcIikucmVwbGFjZSgvXFxuL2csICdcXFxcbicpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIic7XG4gICAgICAgICAgaWYgKCBkYXRhLnBmX2NvdW50ICkge1xuICAgICAgICAgICAgdmFyIG8gPSBkYXRhLm9mZnNldFtkYXRhLnBmX2NvdW50LTFdO1xuICAgICAgICAgICAgdG1wID0gdG1wLnJlcGxhY2UoLyhefFteXFxcXF0pIy9nLCAnJDFcIisnICsgc2VsZi5nbG9iYWxOYW1lICsgJy5uKGQsJyArIGRhdGEua2V5c1tkYXRhLnBmX2NvdW50LTFdICsgKG8gPyAnLCcgKyBvIDogJycpICsgJykrXCInKTtcbiAgICAgICAgICAgIHRtcCA9IHRtcC5yZXBsYWNlKC9eXCJcIlxcKy8sICcnKS5yZXBsYWNlKC9cXCtcIlwiJC8sICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoICdCYWQgQVNUIHR5cGU6ICcgKyBhc3QudHlwZSApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW50ZXJwTUZQKCBhc3QgKTtcbiAgfTtcblxuICBNZXNzYWdlRm9ybWF0LnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKCBtZXNzYWdlICkge1xuICAgIHJldHVybiAobmV3IEZ1bmN0aW9uKFxuICAgICAgJ3RoaXNbXFwnJyArIHRoaXMuZ2xvYmFsTmFtZSArICdcXCddPScgKyB0aGlzLmZ1bmN0aW9ucygpICsgJzsnICtcbiAgICAgICdyZXR1cm4gJyArIHRoaXMucHJlY29tcGlsZSggdGhpcy5wYXJzZSggbWVzc2FnZSApKVxuICAgICkpKCk7XG4gIH07XG5cbiAgTWVzc2FnZUZvcm1hdC5wcm90b3R5cGUucHJlY29tcGlsZU9iamVjdCA9IGZ1bmN0aW9uICggbWVzc2FnZXMgKSB7XG4gICAgdmFyIHRtcCA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBtZXNzYWdlcykge1xuICAgICAgdG1wLnB1c2goSlNPTi5zdHJpbmdpZnkoa2V5KSArICc6JyArIHRoaXMucHJlY29tcGlsZSh0aGlzLnBhcnNlKG1lc3NhZ2VzW2tleV0pKSk7XG4gICAgfVxuICAgIHJldHVybiAne1xcbicgKyB0bXAuam9pbignLFxcbicpICsgJ30nO1xuICB9O1xuXG5cbiAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gTWVzc2FnZUZvcm1hdDtcbiAgICB9XG4gICAgZXhwb3J0cy5NZXNzYWdlRm9ybWF0ID0gTWVzc2FnZUZvcm1hdDtcbiAgfVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gTWVzc2FnZUZvcm1hdDtcbiAgICB9KTtcbiAgfVxuICBlbHNlIHtcbiAgICByb290WydNZXNzYWdlRm9ybWF0J10gPSBNZXNzYWdlRm9ybWF0O1xuICB9XG5cbn0pKCB0aGlzICk7XG5cbn0pLmNhbGwodGhpcyxcIi9ub2RlX21vZHVsZXMvbWVzc2FnZWZvcm1hdFwiKSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvT2JqZWN0UGF0aC5qcycpLk9iamVjdFBhdGg7XG4iLCIndXNlIHN0cmljdCc7XG5cbjshZnVuY3Rpb24odW5kZWZpbmVkKSB7XG5cblx0dmFyIE9iamVjdFBhdGggPSB7XG5cdFx0cGFyc2U6IGZ1bmN0aW9uKHN0cil7XG5cdFx0XHRpZih0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJyl7XG5cdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdFBhdGgucGFyc2UgbXVzdCBiZSBwYXNzZWQgYSBzdHJpbmcnKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cdFx0XHR2YXIgZCwgYiwgcSwgYztcblx0XHRcdHdoaWxlIChpIDwgc3RyLmxlbmd0aCl7XG5cdFx0XHRcdGQgPSBzdHIuaW5kZXhPZignLicsIGkpO1xuXHRcdFx0XHRiID0gc3RyLmluZGV4T2YoJ1snLCBpKTtcblxuXHRcdFx0XHQvLyB3ZSd2ZSByZWFjaGVkIHRoZSBlbmRcblx0XHRcdFx0aWYgKGQgPT09IC0xICYmIGIgPT09IC0xKXtcblx0XHRcdFx0XHRwYXJ0cy5wdXNoKHN0ci5zbGljZShpLCBzdHIubGVuZ3RoKSk7XG5cdFx0XHRcdFx0aSA9IHN0ci5sZW5ndGg7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBkb3RzXG5cdFx0XHRcdGVsc2UgaWYgKGIgPT09IC0xIHx8IChkICE9PSAtMSAmJiBkIDwgYikpIHtcblx0XHRcdFx0XHRwYXJ0cy5wdXNoKHN0ci5zbGljZShpLCBkKSk7XG5cdFx0XHRcdFx0aSA9IGQgKyAxO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gYnJhY2tldHNcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGIgPiBpKXtcblx0XHRcdFx0XHRcdHBhcnRzLnB1c2goc3RyLnNsaWNlKGksIGIpKTtcblx0XHRcdFx0XHRcdGkgPSBiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRxID0gc3RyLnNsaWNlKGIrMSwgYisyKTtcblx0XHRcdFx0XHRpZiAocSAhPT0gJ1wiJyAmJiBxICE9PSdcXCcnKSB7XG5cdFx0XHRcdFx0XHRjID0gc3RyLmluZGV4T2YoJ10nLCBiKTtcblx0XHRcdFx0XHRcdGlmIChjID09PSAtMSkgYyA9IHN0ci5sZW5ndGg7XG5cdFx0XHRcdFx0XHRwYXJ0cy5wdXNoKHN0ci5zbGljZShpICsgMSwgYykpO1xuXHRcdFx0XHRcdFx0aSA9IChzdHIuc2xpY2UoYyArIDEsIGMgKyAyKSA9PT0gJy4nKSA/IGMgKyAyIDogYyArIDE7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGMgPSBzdHIuaW5kZXhPZihxKyddJywgYik7XG5cdFx0XHRcdFx0XHRpZiAoYyA9PT0gLTEpIGMgPSBzdHIubGVuZ3RoO1xuXHRcdFx0XHRcdFx0d2hpbGUgKHN0ci5zbGljZShjIC0gMSwgYykgPT09ICdcXFxcJyAmJiBiIDwgc3RyLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRcdGIrKztcblx0XHRcdFx0XHRcdFx0YyA9IHN0ci5pbmRleE9mKHErJ10nLCBiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHBhcnRzLnB1c2goc3RyLnNsaWNlKGkgKyAyLCBjKS5yZXBsYWNlKG5ldyBSZWdFeHAoJ1xcXFwnK3EsJ2cnKSwgcSkpO1xuXHRcdFx0XHRcdFx0aSA9IChzdHIuc2xpY2UoYyArIDIsIGMgKyAzKSA9PT0gJy4nKSA/IGMgKyAzIDogYyArIDI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGFydHM7XG5cdFx0fSxcblxuXHRcdC8vIHJvb3QgPT09IHRydWUgOiBhdXRvIGNhbGN1bGF0ZSByb290OyBtdXN0IGJlIGRvdC1ub3RhdGlvbiBmcmllbmRseVxuXHRcdC8vIHJvb3QgU3RyaW5nIDogdGhlIHN0cmluZyB0byB1c2UgYXMgcm9vdFxuXHRcdHN0cmluZ2lmeTogZnVuY3Rpb24oYXJyLCBxdW90ZSl7XG5cblx0XHRcdGlmKCFBcnJheS5pc0FycmF5KGFycikpXG5cdFx0XHRcdGFyciA9IFthcnIudG9TdHJpbmcoKV07XG5cblx0XHRcdHF1b3RlID0gcXVvdGUgPT09ICdcIicgPyAnXCInIDogJ1xcJyc7XG5cblx0XHRcdHJldHVybiBhcnIubWFwKGZ1bmN0aW9uKG4peyByZXR1cm4gJ1snICsgcXVvdGUgKyAobi50b1N0cmluZygpKS5yZXBsYWNlKG5ldyBSZWdFeHAocXVvdGUsICdnJyksICdcXFxcJyArIHF1b3RlKSArIHF1b3RlICsgJ10nOyB9KS5qb2luKCcnKTtcblx0XHR9LFxuXG5cdFx0bm9ybWFsaXplOiBmdW5jdGlvbihkYXRhLCBxdW90ZSl7XG5cdFx0XHRyZXR1cm4gT2JqZWN0UGF0aC5zdHJpbmdpZnkoQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBPYmplY3RQYXRoLnBhcnNlKGRhdGEpLCBxdW90ZSk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIEFNRFxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIE9iamVjdFBhdGg7XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBDb21tb25KU1xuXHRlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblx0XHRleHBvcnRzLk9iamVjdFBhdGggPSBPYmplY3RQYXRoO1xuXHR9XG5cblx0Ly8gQW5ndWxhclxuXHRlbHNlIGlmICh0eXBlb2YgYW5ndWxhciA9PT0gJ29iamVjdCcpIHtcblx0XHRhbmd1bGFyLm1vZHVsZSgnT2JqZWN0UGF0aCcsIFtdKS5wcm92aWRlcignT2JqZWN0UGF0aCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLnBhcnNlID0gT2JqZWN0UGF0aC5wYXJzZTtcblx0XHRcdHRoaXMuc3RyaW5naWZ5ID0gT2JqZWN0UGF0aC5zdHJpbmdpZnk7XG5cdFx0XHR0aGlzLm5vcm1hbGl6ZSA9IE9iamVjdFBhdGgubm9ybWFsaXplO1xuXHRcdFx0dGhpcy4kZ2V0ID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0cmV0dXJuIE9iamVjdFBhdGg7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gQnJvd3NlciBnbG9iYWwuXG5cdGVsc2Uge1xuXHRcdHdpbmRvdy5PYmplY3RQYXRoID0gT2JqZWN0UGF0aDtcblx0fVxufSgpOyIsIi8qXG5BdXRob3I6IEdlcmFpbnQgTHVmZiBhbmQgb3RoZXJzXG5ZZWFyOiAyMDEzXG5cblRoaXMgY29kZSBpcyByZWxlYXNlZCBpbnRvIHRoZSBcInB1YmxpYyBkb21haW5cIiBieSBpdHMgYXV0aG9yKHMpLiAgQW55Ym9keSBtYXkgdXNlLCBhbHRlciBhbmQgZGlzdHJpYnV0ZSB0aGUgY29kZSB3aXRob3V0IHJlc3RyaWN0aW9uLiAgVGhlIGF1dGhvciBtYWtlcyBubyBndWFyYW50ZWVzLCBhbmQgdGFrZXMgbm8gbGlhYmlsaXR5IG9mIGFueSBraW5kIGZvciB1c2Ugb2YgdGhpcyBjb2RlLlxuXG5JZiB5b3UgZmluZCBhIGJ1ZyBvciBtYWtlIGFuIGltcHJvdmVtZW50LCBpdCB3b3VsZCBiZSBjb3VydGVvdXMgdG8gbGV0IHRoZSBhdXRob3Iga25vdywgYnV0IGl0IGlzIG5vdCBjb21wdWxzb3J5LlxuKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cyl7XG4gICAgLy8gQ29tbW9uSlMuIERlZmluZSBleHBvcnQuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgZ2xvYmFsLnR2NCA9IGZhY3RvcnkoKTtcbiAgfVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9rZXlzP3JlZGlyZWN0bG9jYWxlPWVuLVVTJnJlZGlyZWN0c2x1Zz1KYXZhU2NyaXB0JTJGUmVmZXJlbmNlJTJGR2xvYmFsX09iamVjdHMlMkZPYmplY3QlMkZrZXlzXG5pZiAoIU9iamVjdC5rZXlzKSB7XG5cdE9iamVjdC5rZXlzID0gKGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuXHRcdFx0aGFzRG9udEVudW1CdWcgPSAhKHt0b1N0cmluZzogbnVsbH0pLnByb3BlcnR5SXNFbnVtZXJhYmxlKCd0b1N0cmluZycpLFxuXHRcdFx0ZG9udEVudW1zID0gW1xuXHRcdFx0XHQndG9TdHJpbmcnLFxuXHRcdFx0XHQndG9Mb2NhbGVTdHJpbmcnLFxuXHRcdFx0XHQndmFsdWVPZicsXG5cdFx0XHRcdCdoYXNPd25Qcm9wZXJ0eScsXG5cdFx0XHRcdCdpc1Byb3RvdHlwZU9mJyxcblx0XHRcdFx0J3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcblx0XHRcdFx0J2NvbnN0cnVjdG9yJ1xuXHRcdFx0XSxcblx0XHRcdGRvbnRFbnVtc0xlbmd0aCA9IGRvbnRFbnVtcy5sZW5ndGg7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0aWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmogIT09ICdmdW5jdGlvbicgfHwgb2JqID09PSBudWxsKSB7XG5cdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5rZXlzIGNhbGxlZCBvbiBub24tb2JqZWN0Jyk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciByZXN1bHQgPSBbXTtcblxuXHRcdFx0Zm9yICh2YXIgcHJvcCBpbiBvYmopIHtcblx0XHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkge1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKHByb3ApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChoYXNEb250RW51bUJ1Zykge1xuXHRcdFx0XHRmb3IgKHZhciBpPTA7IGkgPCBkb250RW51bXNMZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgZG9udEVudW1zW2ldKSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goZG9udEVudW1zW2ldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fTtcblx0fSkoKTtcbn1cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9jcmVhdGVcbmlmICghT2JqZWN0LmNyZWF0ZSkge1xuXHRPYmplY3QuY3JlYXRlID0gKGZ1bmN0aW9uKCl7XG5cdFx0ZnVuY3Rpb24gRigpe31cblxuXHRcdHJldHVybiBmdW5jdGlvbihvKXtcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoICE9PSAxKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignT2JqZWN0LmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvbmx5IGFjY2VwdHMgb25lIHBhcmFtZXRlci4nKTtcblx0XHRcdH1cblx0XHRcdEYucHJvdG90eXBlID0gbztcblx0XHRcdHJldHVybiBuZXcgRigpO1xuXHRcdH07XG5cdH0pKCk7XG59XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9pc0FycmF5P3JlZGlyZWN0bG9jYWxlPWVuLVVTJnJlZGlyZWN0c2x1Zz1KYXZhU2NyaXB0JTJGUmVmZXJlbmNlJTJGR2xvYmFsX09iamVjdHMlMkZBcnJheSUyRmlzQXJyYXlcbmlmKCFBcnJheS5pc0FycmF5KSB7XG5cdEFycmF5LmlzQXJyYXkgPSBmdW5jdGlvbiAodkFyZykge1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodkFyZykgPT09IFwiW29iamVjdCBBcnJheV1cIjtcblx0fTtcbn1cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2luZGV4T2Y/cmVkaXJlY3Rsb2NhbGU9ZW4tVVMmcmVkaXJlY3RzbHVnPUphdmFTY3JpcHQlMkZSZWZlcmVuY2UlMkZHbG9iYWxfT2JqZWN0cyUyRkFycmF5JTJGaW5kZXhPZlxuaWYgKCFBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuXHRBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChzZWFyY2hFbGVtZW50IC8qLCBmcm9tSW5kZXggKi8gKSB7XG5cdFx0aWYgKHRoaXMgPT09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoKTtcblx0XHR9XG5cdFx0dmFyIHQgPSBPYmplY3QodGhpcyk7XG5cdFx0dmFyIGxlbiA9IHQubGVuZ3RoID4+PiAwO1xuXG5cdFx0aWYgKGxlbiA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH1cblx0XHR2YXIgbiA9IDA7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRuID0gTnVtYmVyKGFyZ3VtZW50c1sxXSk7XG5cdFx0XHRpZiAobiAhPT0gbikgeyAvLyBzaG9ydGN1dCBmb3IgdmVyaWZ5aW5nIGlmIGl0J3MgTmFOXG5cdFx0XHRcdG4gPSAwO1xuXHRcdFx0fSBlbHNlIGlmIChuICE9PSAwICYmIG4gIT09IEluZmluaXR5ICYmIG4gIT09IC1JbmZpbml0eSkge1xuXHRcdFx0XHRuID0gKG4gPiAwIHx8IC0xKSAqIE1hdGguZmxvb3IoTWF0aC5hYnMobikpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAobiA+PSBsZW4pIHtcblx0XHRcdHJldHVybiAtMTtcblx0XHR9XG5cdFx0dmFyIGsgPSBuID49IDAgPyBuIDogTWF0aC5tYXgobGVuIC0gTWF0aC5hYnMobiksIDApO1xuXHRcdGZvciAoOyBrIDwgbGVuOyBrKyspIHtcblx0XHRcdGlmIChrIGluIHQgJiYgdFtrXSA9PT0gc2VhcmNoRWxlbWVudCkge1xuXHRcdFx0XHRyZXR1cm4gaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9O1xufVxuXG4vLyBHcnVuZ2V5IE9iamVjdC5pc0Zyb3plbiBoYWNrXG5pZiAoIU9iamVjdC5pc0Zyb3plbikge1xuXHRPYmplY3QuaXNGcm96ZW4gPSBmdW5jdGlvbiAob2JqKSB7XG5cdFx0dmFyIGtleSA9IFwidHY0X3Rlc3RfZnJvemVuX2tleVwiO1xuXHRcdHdoaWxlIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0a2V5ICs9IE1hdGgucmFuZG9tKCk7XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRvYmpba2V5XSA9IHRydWU7XG5cdFx0XHRkZWxldGUgb2JqW2tleV07XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9O1xufVxuLy8gQmFzZWQgb246IGh0dHBzOi8vZ2l0aHViLmNvbS9nZXJhaW50bHVmZi91cmktdGVtcGxhdGVzLCBidXQgd2l0aCBhbGwgdGhlIGRlLXN1YnN0aXR1dGlvbiBzdHVmZiByZW1vdmVkXG5cbnZhciB1cmlUZW1wbGF0ZUdsb2JhbE1vZGlmaWVycyA9IHtcblx0XCIrXCI6IHRydWUsXG5cdFwiI1wiOiB0cnVlLFxuXHRcIi5cIjogdHJ1ZSxcblx0XCIvXCI6IHRydWUsXG5cdFwiO1wiOiB0cnVlLFxuXHRcIj9cIjogdHJ1ZSxcblx0XCImXCI6IHRydWVcbn07XG52YXIgdXJpVGVtcGxhdGVTdWZmaWNlcyA9IHtcblx0XCIqXCI6IHRydWVcbn07XG5cbmZ1bmN0aW9uIG5vdFJlYWxseVBlcmNlbnRFbmNvZGUoc3RyaW5nKSB7XG5cdHJldHVybiBlbmNvZGVVUkkoc3RyaW5nKS5yZXBsYWNlKC8lMjVbMC05XVswLTldL2csIGZ1bmN0aW9uIChkb3VibGVFbmNvZGVkKSB7XG5cdFx0cmV0dXJuIFwiJVwiICsgZG91YmxlRW5jb2RlZC5zdWJzdHJpbmcoMyk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiB1cmlUZW1wbGF0ZVN1YnN0aXR1dGlvbihzcGVjKSB7XG5cdHZhciBtb2RpZmllciA9IFwiXCI7XG5cdGlmICh1cmlUZW1wbGF0ZUdsb2JhbE1vZGlmaWVyc1tzcGVjLmNoYXJBdCgwKV0pIHtcblx0XHRtb2RpZmllciA9IHNwZWMuY2hhckF0KDApO1xuXHRcdHNwZWMgPSBzcGVjLnN1YnN0cmluZygxKTtcblx0fVxuXHR2YXIgc2VwYXJhdG9yID0gXCJcIjtcblx0dmFyIHByZWZpeCA9IFwiXCI7XG5cdHZhciBzaG91bGRFc2NhcGUgPSB0cnVlO1xuXHR2YXIgc2hvd1ZhcmlhYmxlcyA9IGZhbHNlO1xuXHR2YXIgdHJpbUVtcHR5U3RyaW5nID0gZmFsc2U7XG5cdGlmIChtb2RpZmllciA9PT0gJysnKSB7XG5cdFx0c2hvdWxkRXNjYXBlID0gZmFsc2U7XG5cdH0gZWxzZSBpZiAobW9kaWZpZXIgPT09IFwiLlwiKSB7XG5cdFx0cHJlZml4ID0gXCIuXCI7XG5cdFx0c2VwYXJhdG9yID0gXCIuXCI7XG5cdH0gZWxzZSBpZiAobW9kaWZpZXIgPT09IFwiL1wiKSB7XG5cdFx0cHJlZml4ID0gXCIvXCI7XG5cdFx0c2VwYXJhdG9yID0gXCIvXCI7XG5cdH0gZWxzZSBpZiAobW9kaWZpZXIgPT09ICcjJykge1xuXHRcdHByZWZpeCA9IFwiI1wiO1xuXHRcdHNob3VsZEVzY2FwZSA9IGZhbHNlO1xuXHR9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnOycpIHtcblx0XHRwcmVmaXggPSBcIjtcIjtcblx0XHRzZXBhcmF0b3IgPSBcIjtcIjtcblx0XHRzaG93VmFyaWFibGVzID0gdHJ1ZTtcblx0XHR0cmltRW1wdHlTdHJpbmcgPSB0cnVlO1xuXHR9IGVsc2UgaWYgKG1vZGlmaWVyID09PSAnPycpIHtcblx0XHRwcmVmaXggPSBcIj9cIjtcblx0XHRzZXBhcmF0b3IgPSBcIiZcIjtcblx0XHRzaG93VmFyaWFibGVzID0gdHJ1ZTtcblx0fSBlbHNlIGlmIChtb2RpZmllciA9PT0gJyYnKSB7XG5cdFx0cHJlZml4ID0gXCImXCI7XG5cdFx0c2VwYXJhdG9yID0gXCImXCI7XG5cdFx0c2hvd1ZhcmlhYmxlcyA9IHRydWU7XG5cdH1cblxuXHR2YXIgdmFyTmFtZXMgPSBbXTtcblx0dmFyIHZhckxpc3QgPSBzcGVjLnNwbGl0KFwiLFwiKTtcblx0dmFyIHZhclNwZWNzID0gW107XG5cdHZhciB2YXJTcGVjTWFwID0ge307XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdmFyTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB2YXJOYW1lID0gdmFyTGlzdFtpXTtcblx0XHR2YXIgdHJ1bmNhdGUgPSBudWxsO1xuXHRcdGlmICh2YXJOYW1lLmluZGV4T2YoXCI6XCIpICE9PSAtMSkge1xuXHRcdFx0dmFyIHBhcnRzID0gdmFyTmFtZS5zcGxpdChcIjpcIik7XG5cdFx0XHR2YXJOYW1lID0gcGFydHNbMF07XG5cdFx0XHR0cnVuY2F0ZSA9IHBhcnNlSW50KHBhcnRzWzFdLCAxMCk7XG5cdFx0fVxuXHRcdHZhciBzdWZmaWNlcyA9IHt9O1xuXHRcdHdoaWxlICh1cmlUZW1wbGF0ZVN1ZmZpY2VzW3Zhck5hbWUuY2hhckF0KHZhck5hbWUubGVuZ3RoIC0gMSldKSB7XG5cdFx0XHRzdWZmaWNlc1t2YXJOYW1lLmNoYXJBdCh2YXJOYW1lLmxlbmd0aCAtIDEpXSA9IHRydWU7XG5cdFx0XHR2YXJOYW1lID0gdmFyTmFtZS5zdWJzdHJpbmcoMCwgdmFyTmFtZS5sZW5ndGggLSAxKTtcblx0XHR9XG5cdFx0dmFyIHZhclNwZWMgPSB7XG5cdFx0XHR0cnVuY2F0ZTogdHJ1bmNhdGUsXG5cdFx0XHRuYW1lOiB2YXJOYW1lLFxuXHRcdFx0c3VmZmljZXM6IHN1ZmZpY2VzXG5cdFx0fTtcblx0XHR2YXJTcGVjcy5wdXNoKHZhclNwZWMpO1xuXHRcdHZhclNwZWNNYXBbdmFyTmFtZV0gPSB2YXJTcGVjO1xuXHRcdHZhck5hbWVzLnB1c2godmFyTmFtZSk7XG5cdH1cblx0dmFyIHN1YkZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhbHVlRnVuY3Rpb24pIHtcblx0XHR2YXIgcmVzdWx0ID0gXCJcIjtcblx0XHR2YXIgc3RhcnRJbmRleCA9IDA7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YXJTcGVjcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHZhclNwZWMgPSB2YXJTcGVjc1tpXTtcblx0XHRcdHZhciB2YWx1ZSA9IHZhbHVlRnVuY3Rpb24odmFyU3BlYy5uYW1lKTtcblx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHx8ICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDApKSB7XG5cdFx0XHRcdHN0YXJ0SW5kZXgrKztcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaSA9PT0gc3RhcnRJbmRleCkge1xuXHRcdFx0XHRyZXN1bHQgKz0gcHJlZml4O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0ICs9IChzZXBhcmF0b3IgfHwgXCIsXCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRcdGlmIChzaG93VmFyaWFibGVzKSB7XG5cdFx0XHRcdFx0cmVzdWx0ICs9IHZhclNwZWMubmFtZSArIFwiPVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgdmFsdWUubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRpZiAoaiA+IDApIHtcblx0XHRcdFx0XHRcdHJlc3VsdCArPSB2YXJTcGVjLnN1ZmZpY2VzWycqJ10gPyAoc2VwYXJhdG9yIHx8IFwiLFwiKSA6IFwiLFwiO1xuXHRcdFx0XHRcdFx0aWYgKHZhclNwZWMuc3VmZmljZXNbJyonXSAmJiBzaG93VmFyaWFibGVzKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdCArPSB2YXJTcGVjLm5hbWUgKyBcIj1cIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVzdWx0ICs9IHNob3VsZEVzY2FwZSA/IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZVtqXSkucmVwbGFjZSgvIS9nLCBcIiUyMVwiKSA6IG5vdFJlYWxseVBlcmNlbnRFbmNvZGUodmFsdWVbal0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRpZiAoc2hvd1ZhcmlhYmxlcyAmJiAhdmFyU3BlYy5zdWZmaWNlc1snKiddKSB7XG5cdFx0XHRcdFx0cmVzdWx0ICs9IHZhclNwZWMubmFtZSArIFwiPVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBmaXJzdCA9IHRydWU7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuXHRcdFx0XHRcdGlmICghZmlyc3QpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCArPSB2YXJTcGVjLnN1ZmZpY2VzWycqJ10gPyAoc2VwYXJhdG9yIHx8IFwiLFwiKSA6IFwiLFwiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmaXJzdCA9IGZhbHNlO1xuXHRcdFx0XHRcdHJlc3VsdCArPSBzaG91bGRFc2NhcGUgPyBlbmNvZGVVUklDb21wb25lbnQoa2V5KS5yZXBsYWNlKC8hL2csIFwiJTIxXCIpIDogbm90UmVhbGx5UGVyY2VudEVuY29kZShrZXkpO1xuXHRcdFx0XHRcdHJlc3VsdCArPSB2YXJTcGVjLnN1ZmZpY2VzWycqJ10gPyAnPScgOiBcIixcIjtcblx0XHRcdFx0XHRyZXN1bHQgKz0gc2hvdWxkRXNjYXBlID8gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlW2tleV0pLnJlcGxhY2UoLyEvZywgXCIlMjFcIikgOiBub3RSZWFsbHlQZXJjZW50RW5jb2RlKHZhbHVlW2tleV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoc2hvd1ZhcmlhYmxlcykge1xuXHRcdFx0XHRcdHJlc3VsdCArPSB2YXJTcGVjLm5hbWU7XG5cdFx0XHRcdFx0aWYgKCF0cmltRW1wdHlTdHJpbmcgfHwgdmFsdWUgIT09IFwiXCIpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCArPSBcIj1cIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHZhclNwZWMudHJ1bmNhdGUgIT0gbnVsbCkge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWUuc3Vic3RyaW5nKDAsIHZhclNwZWMudHJ1bmNhdGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJlc3VsdCArPSBzaG91bGRFc2NhcGUgPyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLnJlcGxhY2UoLyEvZywgXCIlMjFcIik6IG5vdFJlYWxseVBlcmNlbnRFbmNvZGUodmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xuXHRzdWJGdW5jdGlvbi52YXJOYW1lcyA9IHZhck5hbWVzO1xuXHRyZXR1cm4ge1xuXHRcdHByZWZpeDogcHJlZml4LFxuXHRcdHN1YnN0aXR1dGlvbjogc3ViRnVuY3Rpb25cblx0fTtcbn1cblxuZnVuY3Rpb24gVXJpVGVtcGxhdGUodGVtcGxhdGUpIHtcblx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIFVyaVRlbXBsYXRlKSkge1xuXHRcdHJldHVybiBuZXcgVXJpVGVtcGxhdGUodGVtcGxhdGUpO1xuXHR9XG5cdHZhciBwYXJ0cyA9IHRlbXBsYXRlLnNwbGl0KFwie1wiKTtcblx0dmFyIHRleHRQYXJ0cyA9IFtwYXJ0cy5zaGlmdCgpXTtcblx0dmFyIHByZWZpeGVzID0gW107XG5cdHZhciBzdWJzdGl0dXRpb25zID0gW107XG5cdHZhciB2YXJOYW1lcyA9IFtdO1xuXHR3aGlsZSAocGFydHMubGVuZ3RoID4gMCkge1xuXHRcdHZhciBwYXJ0ID0gcGFydHMuc2hpZnQoKTtcblx0XHR2YXIgc3BlYyA9IHBhcnQuc3BsaXQoXCJ9XCIpWzBdO1xuXHRcdHZhciByZW1haW5kZXIgPSBwYXJ0LnN1YnN0cmluZyhzcGVjLmxlbmd0aCArIDEpO1xuXHRcdHZhciBmdW5jcyA9IHVyaVRlbXBsYXRlU3Vic3RpdHV0aW9uKHNwZWMpO1xuXHRcdHN1YnN0aXR1dGlvbnMucHVzaChmdW5jcy5zdWJzdGl0dXRpb24pO1xuXHRcdHByZWZpeGVzLnB1c2goZnVuY3MucHJlZml4KTtcblx0XHR0ZXh0UGFydHMucHVzaChyZW1haW5kZXIpO1xuXHRcdHZhck5hbWVzID0gdmFyTmFtZXMuY29uY2F0KGZ1bmNzLnN1YnN0aXR1dGlvbi52YXJOYW1lcyk7XG5cdH1cblx0dGhpcy5maWxsID0gZnVuY3Rpb24gKHZhbHVlRnVuY3Rpb24pIHtcblx0XHR2YXIgcmVzdWx0ID0gdGV4dFBhcnRzWzBdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic3RpdHV0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHN1YnN0aXR1dGlvbiA9IHN1YnN0aXR1dGlvbnNbaV07XG5cdFx0XHRyZXN1bHQgKz0gc3Vic3RpdHV0aW9uKHZhbHVlRnVuY3Rpb24pO1xuXHRcdFx0cmVzdWx0ICs9IHRleHRQYXJ0c1tpICsgMV07XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cdHRoaXMudmFyTmFtZXMgPSB2YXJOYW1lcztcblx0dGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xufVxuVXJpVGVtcGxhdGUucHJvdG90eXBlID0ge1xuXHR0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnRlbXBsYXRlO1xuXHR9LFxuXHRmaWxsRnJvbU9iamVjdDogZnVuY3Rpb24gKG9iaikge1xuXHRcdHJldHVybiB0aGlzLmZpbGwoZnVuY3Rpb24gKHZhck5hbWUpIHtcblx0XHRcdHJldHVybiBvYmpbdmFyTmFtZV07XG5cdFx0fSk7XG5cdH1cbn07XG52YXIgVmFsaWRhdG9yQ29udGV4dCA9IGZ1bmN0aW9uIFZhbGlkYXRvckNvbnRleHQocGFyZW50LCBjb2xsZWN0TXVsdGlwbGUsIGVycm9yTWVzc2FnZXMsIGNoZWNrUmVjdXJzaXZlLCB0cmFja1Vua25vd25Qcm9wZXJ0aWVzKSB7XG5cdHRoaXMubWlzc2luZyA9IFtdO1xuXHR0aGlzLm1pc3NpbmdNYXAgPSB7fTtcblx0dGhpcy5mb3JtYXRWYWxpZGF0b3JzID0gcGFyZW50ID8gT2JqZWN0LmNyZWF0ZShwYXJlbnQuZm9ybWF0VmFsaWRhdG9ycykgOiB7fTtcblx0dGhpcy5zY2hlbWFzID0gcGFyZW50ID8gT2JqZWN0LmNyZWF0ZShwYXJlbnQuc2NoZW1hcykgOiB7fTtcblx0dGhpcy5jb2xsZWN0TXVsdGlwbGUgPSBjb2xsZWN0TXVsdGlwbGU7XG5cdHRoaXMuZXJyb3JzID0gW107XG5cdHRoaXMuaGFuZGxlRXJyb3IgPSBjb2xsZWN0TXVsdGlwbGUgPyB0aGlzLmNvbGxlY3RFcnJvciA6IHRoaXMucmV0dXJuRXJyb3I7XG5cdGlmIChjaGVja1JlY3Vyc2l2ZSkge1xuXHRcdHRoaXMuY2hlY2tSZWN1cnNpdmUgPSB0cnVlO1xuXHRcdHRoaXMuc2Nhbm5lZCA9IFtdO1xuXHRcdHRoaXMuc2Nhbm5lZEZyb3plbiA9IFtdO1xuXHRcdHRoaXMuc2Nhbm5lZEZyb3plblNjaGVtYXMgPSBbXTtcblx0XHR0aGlzLnNjYW5uZWRGcm96ZW5WYWxpZGF0aW9uRXJyb3JzID0gW107XG5cdFx0dGhpcy52YWxpZGF0ZWRTY2hlbWFzS2V5ID0gJ3R2NF92YWxpZGF0aW9uX2lkJztcblx0XHR0aGlzLnZhbGlkYXRpb25FcnJvcnNLZXkgPSAndHY0X3ZhbGlkYXRpb25fZXJyb3JzX2lkJztcblx0fVxuXHRpZiAodHJhY2tVbmtub3duUHJvcGVydGllcykge1xuXHRcdHRoaXMudHJhY2tVbmtub3duUHJvcGVydGllcyA9IHRydWU7XG5cdFx0dGhpcy5rbm93blByb3BlcnR5UGF0aHMgPSB7fTtcblx0XHR0aGlzLnVua25vd25Qcm9wZXJ0eVBhdGhzID0ge307XG5cdH1cblx0dGhpcy5lcnJvck1lc3NhZ2VzID0gZXJyb3JNZXNzYWdlcztcblx0dGhpcy5kZWZpbmVkS2V5d29yZHMgPSB7fTtcblx0aWYgKHBhcmVudCkge1xuXHRcdGZvciAodmFyIGtleSBpbiBwYXJlbnQuZGVmaW5lZEtleXdvcmRzKSB7XG5cdFx0XHR0aGlzLmRlZmluZWRLZXl3b3Jkc1trZXldID0gcGFyZW50LmRlZmluZWRLZXl3b3Jkc1trZXldLnNsaWNlKDApO1xuXHRcdH1cblx0fVxufTtcblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLmRlZmluZUtleXdvcmQgPSBmdW5jdGlvbiAoa2V5d29yZCwga2V5d29yZEZ1bmN0aW9uKSB7XG5cdHRoaXMuZGVmaW5lZEtleXdvcmRzW2tleXdvcmRdID0gdGhpcy5kZWZpbmVkS2V5d29yZHNba2V5d29yZF0gfHwgW107XG5cdHRoaXMuZGVmaW5lZEtleXdvcmRzW2tleXdvcmRdLnB1c2goa2V5d29yZEZ1bmN0aW9uKTtcbn07XG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS5jcmVhdGVFcnJvciA9IGZ1bmN0aW9uIChjb2RlLCBtZXNzYWdlUGFyYW1zLCBkYXRhUGF0aCwgc2NoZW1hUGF0aCwgc3ViRXJyb3JzKSB7XG5cdHZhciBtZXNzYWdlVGVtcGxhdGUgPSB0aGlzLmVycm9yTWVzc2FnZXNbY29kZV0gfHwgRXJyb3JNZXNzYWdlc0RlZmF1bHRbY29kZV07XG5cdGlmICh0eXBlb2YgbWVzc2FnZVRlbXBsYXRlICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBuZXcgVmFsaWRhdGlvbkVycm9yKGNvZGUsIFwiVW5rbm93biBlcnJvciBjb2RlIFwiICsgY29kZSArIFwiOiBcIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2VQYXJhbXMpLCBtZXNzYWdlUGFyYW1zLCBkYXRhUGF0aCwgc2NoZW1hUGF0aCwgc3ViRXJyb3JzKTtcblx0fVxuXHQvLyBBZGFwdGVkIGZyb20gQ3JvY2tmb3JkJ3Mgc3VwcGxhbnQoKVxuXHR2YXIgbWVzc2FnZSA9IG1lc3NhZ2VUZW1wbGF0ZS5yZXBsYWNlKC9cXHsoW157fV0qKVxcfS9nLCBmdW5jdGlvbiAod2hvbGUsIHZhck5hbWUpIHtcblx0XHR2YXIgc3ViVmFsdWUgPSBtZXNzYWdlUGFyYW1zW3Zhck5hbWVdO1xuXHRcdHJldHVybiB0eXBlb2Ygc3ViVmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzdWJWYWx1ZSA9PT0gJ251bWJlcicgPyBzdWJWYWx1ZSA6IHdob2xlO1xuXHR9KTtcblx0cmV0dXJuIG5ldyBWYWxpZGF0aW9uRXJyb3IoY29kZSwgbWVzc2FnZSwgbWVzc2FnZVBhcmFtcywgZGF0YVBhdGgsIHNjaGVtYVBhdGgsIHN1YkVycm9ycyk7XG59O1xuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUucmV0dXJuRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcblx0cmV0dXJuIGVycm9yO1xufTtcblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLmNvbGxlY3RFcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuXHRpZiAoZXJyb3IpIHtcblx0XHR0aGlzLmVycm9ycy5wdXNoKGVycm9yKTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS5wcmVmaXhFcnJvcnMgPSBmdW5jdGlvbiAoc3RhcnRJbmRleCwgZGF0YVBhdGgsIHNjaGVtYVBhdGgpIHtcblx0Zm9yICh2YXIgaSA9IHN0YXJ0SW5kZXg7IGkgPCB0aGlzLmVycm9ycy5sZW5ndGg7IGkrKykge1xuXHRcdHRoaXMuZXJyb3JzW2ldID0gdGhpcy5lcnJvcnNbaV0ucHJlZml4V2l0aChkYXRhUGF0aCwgc2NoZW1hUGF0aCk7XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUuYmFuVW5rbm93blByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XG5cdGZvciAodmFyIHVua25vd25QYXRoIGluIHRoaXMudW5rbm93blByb3BlcnR5UGF0aHMpIHtcblx0XHR2YXIgZXJyb3IgPSB0aGlzLmNyZWF0ZUVycm9yKEVycm9yQ29kZXMuVU5LTk9XTl9QUk9QRVJUWSwge3BhdGg6IHVua25vd25QYXRofSwgdW5rbm93blBhdGgsIFwiXCIpO1xuXHRcdHZhciByZXN1bHQgPSB0aGlzLmhhbmRsZUVycm9yKGVycm9yKTtcblx0XHRpZiAocmVzdWx0KSB7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLmFkZEZvcm1hdCA9IGZ1bmN0aW9uIChmb3JtYXQsIHZhbGlkYXRvcikge1xuXHRpZiAodHlwZW9mIGZvcm1hdCA9PT0gJ29iamVjdCcpIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gZm9ybWF0KSB7XG5cdFx0XHR0aGlzLmFkZEZvcm1hdChrZXksIGZvcm1hdFtrZXldKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0dGhpcy5mb3JtYXRWYWxpZGF0b3JzW2Zvcm1hdF0gPSB2YWxpZGF0b3I7XG59O1xuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUucmVzb2x2ZVJlZnMgPSBmdW5jdGlvbiAoc2NoZW1hLCB1cmxIaXN0b3J5KSB7XG5cdGlmIChzY2hlbWFbJyRyZWYnXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dXJsSGlzdG9yeSA9IHVybEhpc3RvcnkgfHwge307XG5cdFx0aWYgKHVybEhpc3Rvcnlbc2NoZW1hWyckcmVmJ11dKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLkNJUkNVTEFSX1JFRkVSRU5DRSwge3VybHM6IE9iamVjdC5rZXlzKHVybEhpc3RvcnkpLmpvaW4oJywgJyl9LCAnJywgJycpO1xuXHRcdH1cblx0XHR1cmxIaXN0b3J5W3NjaGVtYVsnJHJlZiddXSA9IHRydWU7XG5cdFx0c2NoZW1hID0gdGhpcy5nZXRTY2hlbWEoc2NoZW1hWyckcmVmJ10sIHVybEhpc3RvcnkpO1xuXHR9XG5cdHJldHVybiBzY2hlbWE7XG59O1xuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUuZ2V0U2NoZW1hID0gZnVuY3Rpb24gKHVybCwgdXJsSGlzdG9yeSkge1xuXHR2YXIgc2NoZW1hO1xuXHRpZiAodGhpcy5zY2hlbWFzW3VybF0gIT09IHVuZGVmaW5lZCkge1xuXHRcdHNjaGVtYSA9IHRoaXMuc2NoZW1hc1t1cmxdO1xuXHRcdHJldHVybiB0aGlzLnJlc29sdmVSZWZzKHNjaGVtYSwgdXJsSGlzdG9yeSk7XG5cdH1cblx0dmFyIGJhc2VVcmwgPSB1cmw7XG5cdHZhciBmcmFnbWVudCA9IFwiXCI7XG5cdGlmICh1cmwuaW5kZXhPZignIycpICE9PSAtMSkge1xuXHRcdGZyYWdtZW50ID0gdXJsLnN1YnN0cmluZyh1cmwuaW5kZXhPZihcIiNcIikgKyAxKTtcblx0XHRiYXNlVXJsID0gdXJsLnN1YnN0cmluZygwLCB1cmwuaW5kZXhPZihcIiNcIikpO1xuXHR9XG5cdGlmICh0eXBlb2YgdGhpcy5zY2hlbWFzW2Jhc2VVcmxdID09PSAnb2JqZWN0Jykge1xuXHRcdHNjaGVtYSA9IHRoaXMuc2NoZW1hc1tiYXNlVXJsXTtcblx0XHR2YXIgcG9pbnRlclBhdGggPSBkZWNvZGVVUklDb21wb25lbnQoZnJhZ21lbnQpO1xuXHRcdGlmIChwb2ludGVyUGF0aCA9PT0gXCJcIikge1xuXHRcdFx0cmV0dXJuIHRoaXMucmVzb2x2ZVJlZnMoc2NoZW1hLCB1cmxIaXN0b3J5KTtcblx0XHR9IGVsc2UgaWYgKHBvaW50ZXJQYXRoLmNoYXJBdCgwKSAhPT0gXCIvXCIpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdHZhciBwYXJ0cyA9IHBvaW50ZXJQYXRoLnNwbGl0KFwiL1wiKS5zbGljZSgxKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgY29tcG9uZW50ID0gcGFydHNbaV0ucmVwbGFjZSgvfjEvZywgXCIvXCIpLnJlcGxhY2UoL34wL2csIFwiflwiKTtcblx0XHRcdGlmIChzY2hlbWFbY29tcG9uZW50XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHNjaGVtYSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRzY2hlbWEgPSBzY2hlbWFbY29tcG9uZW50XTtcblx0XHR9XG5cdFx0aWYgKHNjaGVtYSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5yZXNvbHZlUmVmcyhzY2hlbWEsIHVybEhpc3RvcnkpO1xuXHRcdH1cblx0fVxuXHRpZiAodGhpcy5taXNzaW5nW2Jhc2VVcmxdID09PSB1bmRlZmluZWQpIHtcblx0XHR0aGlzLm1pc3NpbmcucHVzaChiYXNlVXJsKTtcblx0XHR0aGlzLm1pc3NpbmdbYmFzZVVybF0gPSBiYXNlVXJsO1xuXHRcdHRoaXMubWlzc2luZ01hcFtiYXNlVXJsXSA9IGJhc2VVcmw7XG5cdH1cbn07XG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS5zZWFyY2hTY2hlbWFzID0gZnVuY3Rpb24gKHNjaGVtYSwgdXJsKSB7XG5cdGlmIChzY2hlbWEgJiYgdHlwZW9mIHNjaGVtYSA9PT0gXCJvYmplY3RcIikge1xuXHRcdGlmICh0eXBlb2Ygc2NoZW1hLmlkID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRpZiAoaXNUcnVzdGVkVXJsKHVybCwgc2NoZW1hLmlkKSkge1xuXHRcdFx0XHRpZiAodGhpcy5zY2hlbWFzW3NjaGVtYS5pZF0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHRoaXMuc2NoZW1hc1tzY2hlbWEuaWRdID0gc2NoZW1hO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAodmFyIGtleSBpbiBzY2hlbWEpIHtcblx0XHRcdGlmIChrZXkgIT09IFwiZW51bVwiKSB7XG5cdFx0XHRcdGlmICh0eXBlb2Ygc2NoZW1hW2tleV0gPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0XHR0aGlzLnNlYXJjaFNjaGVtYXMoc2NoZW1hW2tleV0sIHVybCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoa2V5ID09PSBcIiRyZWZcIikge1xuXHRcdFx0XHRcdHZhciB1cmkgPSBnZXREb2N1bWVudFVyaShzY2hlbWFba2V5XSk7XG5cdFx0XHRcdFx0aWYgKHVyaSAmJiB0aGlzLnNjaGVtYXNbdXJpXSA9PT0gdW5kZWZpbmVkICYmIHRoaXMubWlzc2luZ01hcFt1cmldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHRoaXMubWlzc2luZ01hcFt1cmldID0gdXJpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLmFkZFNjaGVtYSA9IGZ1bmN0aW9uICh1cmwsIHNjaGVtYSkge1xuXHQvL292ZXJsb2FkXG5cdGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJyB8fCB0eXBlb2Ygc2NoZW1hID09PSAndW5kZWZpbmVkJykge1xuXHRcdGlmICh0eXBlb2YgdXJsID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdXJsLmlkID09PSAnc3RyaW5nJykge1xuXHRcdFx0c2NoZW1hID0gdXJsO1xuXHRcdFx0dXJsID0gc2NoZW1hLmlkO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblx0aWYgKHVybCA9PT0gZ2V0RG9jdW1lbnRVcmkodXJsKSArIFwiI1wiKSB7XG5cdFx0Ly8gUmVtb3ZlIGVtcHR5IGZyYWdtZW50XG5cdFx0dXJsID0gZ2V0RG9jdW1lbnRVcmkodXJsKTtcblx0fVxuXHR0aGlzLnNjaGVtYXNbdXJsXSA9IHNjaGVtYTtcblx0ZGVsZXRlIHRoaXMubWlzc2luZ01hcFt1cmxdO1xuXHRub3JtU2NoZW1hKHNjaGVtYSwgdXJsKTtcblx0dGhpcy5zZWFyY2hTY2hlbWFzKHNjaGVtYSwgdXJsKTtcbn07XG5cblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLmdldFNjaGVtYU1hcCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIG1hcCA9IHt9O1xuXHRmb3IgKHZhciBrZXkgaW4gdGhpcy5zY2hlbWFzKSB7XG5cdFx0bWFwW2tleV0gPSB0aGlzLnNjaGVtYXNba2V5XTtcblx0fVxuXHRyZXR1cm4gbWFwO1xufTtcblxuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUuZ2V0U2NoZW1hVXJpcyA9IGZ1bmN0aW9uIChmaWx0ZXJSZWdFeHApIHtcblx0dmFyIGxpc3QgPSBbXTtcblx0Zm9yICh2YXIga2V5IGluIHRoaXMuc2NoZW1hcykge1xuXHRcdGlmICghZmlsdGVyUmVnRXhwIHx8IGZpbHRlclJlZ0V4cC50ZXN0KGtleSkpIHtcblx0XHRcdGxpc3QucHVzaChrZXkpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbGlzdDtcbn07XG5cblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLmdldE1pc3NpbmdVcmlzID0gZnVuY3Rpb24gKGZpbHRlclJlZ0V4cCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXHRmb3IgKHZhciBrZXkgaW4gdGhpcy5taXNzaW5nTWFwKSB7XG5cdFx0aWYgKCFmaWx0ZXJSZWdFeHAgfHwgZmlsdGVyUmVnRXhwLnRlc3Qoa2V5KSkge1xuXHRcdFx0bGlzdC5wdXNoKGtleSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBsaXN0O1xufTtcblxuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUuZHJvcFNjaGVtYXMgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMuc2NoZW1hcyA9IHt9O1xuXHR0aGlzLnJlc2V0KCk7XG59O1xuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMubWlzc2luZyA9IFtdO1xuXHR0aGlzLm1pc3NpbmdNYXAgPSB7fTtcblx0dGhpcy5lcnJvcnMgPSBbXTtcbn07XG5cblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLnZhbGlkYXRlQWxsID0gZnVuY3Rpb24gKGRhdGEsIHNjaGVtYSwgZGF0YVBhdGhQYXJ0cywgc2NoZW1hUGF0aFBhcnRzLCBkYXRhUG9pbnRlclBhdGgpIHtcblx0dmFyIHRvcExldmVsO1xuXHRzY2hlbWEgPSB0aGlzLnJlc29sdmVSZWZzKHNjaGVtYSk7XG5cdGlmICghc2NoZW1hKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSBpZiAoc2NoZW1hIGluc3RhbmNlb2YgVmFsaWRhdGlvbkVycm9yKSB7XG5cdFx0dGhpcy5lcnJvcnMucHVzaChzY2hlbWEpO1xuXHRcdHJldHVybiBzY2hlbWE7XG5cdH1cblxuXHR2YXIgc3RhcnRFcnJvckNvdW50ID0gdGhpcy5lcnJvcnMubGVuZ3RoO1xuXHR2YXIgZnJvemVuSW5kZXgsIHNjYW5uZWRGcm96ZW5TY2hlbWFJbmRleCA9IG51bGwsIHNjYW5uZWRTY2hlbWFzSW5kZXggPSBudWxsO1xuXHRpZiAodGhpcy5jaGVja1JlY3Vyc2l2ZSAmJiBkYXRhICYmIHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuXHRcdHRvcExldmVsID0gIXRoaXMuc2Nhbm5lZC5sZW5ndGg7XG5cdFx0aWYgKGRhdGFbdGhpcy52YWxpZGF0ZWRTY2hlbWFzS2V5XSkge1xuXHRcdFx0dmFyIHNjaGVtYUluZGV4ID0gZGF0YVt0aGlzLnZhbGlkYXRlZFNjaGVtYXNLZXldLmluZGV4T2Yoc2NoZW1hKTtcblx0XHRcdGlmIChzY2hlbWFJbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0dGhpcy5lcnJvcnMgPSB0aGlzLmVycm9ycy5jb25jYXQoZGF0YVt0aGlzLnZhbGlkYXRpb25FcnJvcnNLZXldW3NjaGVtYUluZGV4XSk7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoT2JqZWN0LmlzRnJvemVuKGRhdGEpKSB7XG5cdFx0XHRmcm96ZW5JbmRleCA9IHRoaXMuc2Nhbm5lZEZyb3plbi5pbmRleE9mKGRhdGEpO1xuXHRcdFx0aWYgKGZyb3plbkluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHR2YXIgZnJvemVuU2NoZW1hSW5kZXggPSB0aGlzLnNjYW5uZWRGcm96ZW5TY2hlbWFzW2Zyb3plbkluZGV4XS5pbmRleE9mKHNjaGVtYSk7XG5cdFx0XHRcdGlmIChmcm96ZW5TY2hlbWFJbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHR0aGlzLmVycm9ycyA9IHRoaXMuZXJyb3JzLmNvbmNhdCh0aGlzLnNjYW5uZWRGcm96ZW5WYWxpZGF0aW9uRXJyb3JzW2Zyb3plbkluZGV4XVtmcm96ZW5TY2hlbWFJbmRleF0pO1xuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2Nhbm5lZC5wdXNoKGRhdGEpO1xuXHRcdGlmIChPYmplY3QuaXNGcm96ZW4oZGF0YSkpIHtcblx0XHRcdGlmIChmcm96ZW5JbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0ZnJvemVuSW5kZXggPSB0aGlzLnNjYW5uZWRGcm96ZW4ubGVuZ3RoO1xuXHRcdFx0XHR0aGlzLnNjYW5uZWRGcm96ZW4ucHVzaChkYXRhKTtcblx0XHRcdFx0dGhpcy5zY2FubmVkRnJvemVuU2NoZW1hcy5wdXNoKFtdKTtcblx0XHRcdH1cblx0XHRcdHNjYW5uZWRGcm96ZW5TY2hlbWFJbmRleCA9IHRoaXMuc2Nhbm5lZEZyb3plblNjaGVtYXNbZnJvemVuSW5kZXhdLmxlbmd0aDtcblx0XHRcdHRoaXMuc2Nhbm5lZEZyb3plblNjaGVtYXNbZnJvemVuSW5kZXhdW3NjYW5uZWRGcm96ZW5TY2hlbWFJbmRleF0gPSBzY2hlbWE7XG5cdFx0XHR0aGlzLnNjYW5uZWRGcm96ZW5WYWxpZGF0aW9uRXJyb3JzW2Zyb3plbkluZGV4XVtzY2FubmVkRnJvemVuU2NoZW1hSW5kZXhdID0gW107XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICghZGF0YVt0aGlzLnZhbGlkYXRlZFNjaGVtYXNLZXldKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGRhdGEsIHRoaXMudmFsaWRhdGVkU2NoZW1hc0tleSwge1xuXHRcdFx0XHRcdFx0dmFsdWU6IFtdLFxuXHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGRhdGEsIHRoaXMudmFsaWRhdGlvbkVycm9yc0tleSwge1xuXHRcdFx0XHRcdFx0dmFsdWU6IFtdLFxuXHRcdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHQvL0lFIDcvOCB3b3JrYXJvdW5kXG5cdFx0XHRcdFx0ZGF0YVt0aGlzLnZhbGlkYXRlZFNjaGVtYXNLZXldID0gW107XG5cdFx0XHRcdFx0ZGF0YVt0aGlzLnZhbGlkYXRpb25FcnJvcnNLZXldID0gW107XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHNjYW5uZWRTY2hlbWFzSW5kZXggPSBkYXRhW3RoaXMudmFsaWRhdGVkU2NoZW1hc0tleV0ubGVuZ3RoO1xuXHRcdFx0ZGF0YVt0aGlzLnZhbGlkYXRlZFNjaGVtYXNLZXldW3NjYW5uZWRTY2hlbWFzSW5kZXhdID0gc2NoZW1hO1xuXHRcdFx0ZGF0YVt0aGlzLnZhbGlkYXRpb25FcnJvcnNLZXldW3NjYW5uZWRTY2hlbWFzSW5kZXhdID0gW107XG5cdFx0fVxuXHR9XG5cblx0dmFyIGVycm9yQ291bnQgPSB0aGlzLmVycm9ycy5sZW5ndGg7XG5cdHZhciBlcnJvciA9IHRoaXMudmFsaWRhdGVCYXNpYyhkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aClcblx0XHR8fCB0aGlzLnZhbGlkYXRlTnVtZXJpYyhkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aClcblx0XHR8fCB0aGlzLnZhbGlkYXRlU3RyaW5nKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKVxuXHRcdHx8IHRoaXMudmFsaWRhdGVBcnJheShkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aClcblx0XHR8fCB0aGlzLnZhbGlkYXRlT2JqZWN0KGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKVxuXHRcdHx8IHRoaXMudmFsaWRhdGVDb21iaW5hdGlvbnMoZGF0YSwgc2NoZW1hLCBkYXRhUG9pbnRlclBhdGgpXG5cdFx0fHwgdGhpcy52YWxpZGF0ZUh5cGVybWVkaWEoZGF0YSwgc2NoZW1hLCBkYXRhUG9pbnRlclBhdGgpXG5cdFx0fHwgdGhpcy52YWxpZGF0ZUZvcm1hdChkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aClcblx0XHR8fCB0aGlzLnZhbGlkYXRlRGVmaW5lZEtleXdvcmRzKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKVxuXHRcdHx8IG51bGw7XG5cblx0aWYgKHRvcExldmVsKSB7XG5cdFx0d2hpbGUgKHRoaXMuc2Nhbm5lZC5sZW5ndGgpIHtcblx0XHRcdHZhciBpdGVtID0gdGhpcy5zY2FubmVkLnBvcCgpO1xuXHRcdFx0ZGVsZXRlIGl0ZW1bdGhpcy52YWxpZGF0ZWRTY2hlbWFzS2V5XTtcblx0XHR9XG5cdFx0dGhpcy5zY2FubmVkRnJvemVuID0gW107XG5cdFx0dGhpcy5zY2FubmVkRnJvemVuU2NoZW1hcyA9IFtdO1xuXHR9XG5cblx0aWYgKGVycm9yIHx8IGVycm9yQ291bnQgIT09IHRoaXMuZXJyb3JzLmxlbmd0aCkge1xuXHRcdHdoaWxlICgoZGF0YVBhdGhQYXJ0cyAmJiBkYXRhUGF0aFBhcnRzLmxlbmd0aCkgfHwgKHNjaGVtYVBhdGhQYXJ0cyAmJiBzY2hlbWFQYXRoUGFydHMubGVuZ3RoKSkge1xuXHRcdFx0dmFyIGRhdGFQYXJ0ID0gKGRhdGFQYXRoUGFydHMgJiYgZGF0YVBhdGhQYXJ0cy5sZW5ndGgpID8gXCJcIiArIGRhdGFQYXRoUGFydHMucG9wKCkgOiBudWxsO1xuXHRcdFx0dmFyIHNjaGVtYVBhcnQgPSAoc2NoZW1hUGF0aFBhcnRzICYmIHNjaGVtYVBhdGhQYXJ0cy5sZW5ndGgpID8gXCJcIiArIHNjaGVtYVBhdGhQYXJ0cy5wb3AoKSA6IG51bGw7XG5cdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0ZXJyb3IgPSBlcnJvci5wcmVmaXhXaXRoKGRhdGFQYXJ0LCBzY2hlbWFQYXJ0KTtcblx0XHRcdH1cblx0XHRcdHRoaXMucHJlZml4RXJyb3JzKGVycm9yQ291bnQsIGRhdGFQYXJ0LCBzY2hlbWFQYXJ0KTtcblx0XHR9XG5cdH1cblxuXHRpZiAoc2Nhbm5lZEZyb3plblNjaGVtYUluZGV4ICE9PSBudWxsKSB7XG5cdFx0dGhpcy5zY2FubmVkRnJvemVuVmFsaWRhdGlvbkVycm9yc1tmcm96ZW5JbmRleF1bc2Nhbm5lZEZyb3plblNjaGVtYUluZGV4XSA9IHRoaXMuZXJyb3JzLnNsaWNlKHN0YXJ0RXJyb3JDb3VudCk7XG5cdH0gZWxzZSBpZiAoc2Nhbm5lZFNjaGVtYXNJbmRleCAhPT0gbnVsbCkge1xuXHRcdGRhdGFbdGhpcy52YWxpZGF0aW9uRXJyb3JzS2V5XVtzY2FubmVkU2NoZW1hc0luZGV4XSA9IHRoaXMuZXJyb3JzLnNsaWNlKHN0YXJ0RXJyb3JDb3VudCk7XG5cdH1cblxuXHRyZXR1cm4gdGhpcy5oYW5kbGVFcnJvcihlcnJvcik7XG59O1xuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUudmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiAoZGF0YSwgc2NoZW1hKSB7XG5cdGlmICh0eXBlb2Ygc2NoZW1hLmZvcm1hdCAhPT0gJ3N0cmluZycgfHwgIXRoaXMuZm9ybWF0VmFsaWRhdG9yc1tzY2hlbWEuZm9ybWF0XSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHZhciBlcnJvck1lc3NhZ2UgPSB0aGlzLmZvcm1hdFZhbGlkYXRvcnNbc2NoZW1hLmZvcm1hdF0uY2FsbChudWxsLCBkYXRhLCBzY2hlbWEpO1xuXHRpZiAodHlwZW9mIGVycm9yTWVzc2FnZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGVycm9yTWVzc2FnZSA9PT0gJ251bWJlcicpIHtcblx0XHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLkZPUk1BVF9DVVNUT00sIHttZXNzYWdlOiBlcnJvck1lc3NhZ2V9KS5wcmVmaXhXaXRoKG51bGwsIFwiZm9ybWF0XCIpO1xuXHR9IGVsc2UgaWYgKGVycm9yTWVzc2FnZSAmJiB0eXBlb2YgZXJyb3JNZXNzYWdlID09PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiB0aGlzLmNyZWF0ZUVycm9yKEVycm9yQ29kZXMuRk9STUFUX0NVU1RPTSwge21lc3NhZ2U6IGVycm9yTWVzc2FnZS5tZXNzYWdlIHx8IFwiP1wifSwgZXJyb3JNZXNzYWdlLmRhdGFQYXRoIHx8IG51bGwsIGVycm9yTWVzc2FnZS5zY2hlbWFQYXRoIHx8IFwiL2Zvcm1hdFwiKTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZURlZmluZWRLZXl3b3JkcyA9IGZ1bmN0aW9uIChkYXRhLCBzY2hlbWEpIHtcblx0Zm9yICh2YXIga2V5IGluIHRoaXMuZGVmaW5lZEtleXdvcmRzKSB7XG5cdFx0aWYgKHR5cGVvZiBzY2hlbWFba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHR2YXIgdmFsaWRhdGlvbkZ1bmN0aW9ucyA9IHRoaXMuZGVmaW5lZEtleXdvcmRzW2tleV07XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWxpZGF0aW9uRnVuY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZnVuYyA9IHZhbGlkYXRpb25GdW5jdGlvbnNbaV07XG5cdFx0XHR2YXIgcmVzdWx0ID0gZnVuYyhkYXRhLCBzY2hlbWFba2V5XSwgc2NoZW1hKTtcblx0XHRcdGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcmVzdWx0ID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLktFWVdPUkRfQ1VTVE9NLCB7a2V5OiBrZXksIG1lc3NhZ2U6IHJlc3VsdH0pLnByZWZpeFdpdGgobnVsbCwgXCJmb3JtYXRcIik7XG5cdFx0XHR9IGVsc2UgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHR2YXIgY29kZSA9IHJlc3VsdC5jb2RlIHx8IEVycm9yQ29kZXMuS0VZV09SRF9DVVNUT007XG5cdFx0XHRcdGlmICh0eXBlb2YgY29kZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRpZiAoIUVycm9yQ29kZXNbY29kZV0pIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignVW5kZWZpbmVkIGVycm9yIGNvZGUgKHVzZSBkZWZpbmVFcnJvcik6ICcgKyBjb2RlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29kZSA9IEVycm9yQ29kZXNbY29kZV07XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIG1lc3NhZ2VQYXJhbXMgPSAodHlwZW9mIHJlc3VsdC5tZXNzYWdlID09PSAnb2JqZWN0JykgPyByZXN1bHQubWVzc2FnZSA6IHtrZXk6IGtleSwgbWVzc2FnZTogcmVzdWx0Lm1lc3NhZ2UgfHwgXCI/XCJ9O1xuXHRcdFx0XHR2YXIgc2NoZW1hUGF0aCA9IHJlc3VsdC5zY2hlbWFQYXRoIHx8KCBcIi9cIiArIGtleS5yZXBsYWNlKC9+L2csICd+MCcpLnJlcGxhY2UoL1xcLy9nLCAnfjEnKSk7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUVycm9yKGNvZGUsIG1lc3NhZ2VQYXJhbXMsIHJlc3VsdC5kYXRhUGF0aCB8fCBudWxsLCBzY2hlbWFQYXRoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5mdW5jdGlvbiByZWN1cnNpdmVDb21wYXJlKEEsIEIpIHtcblx0aWYgKEEgPT09IEIpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAodHlwZW9mIEEgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIEIgPT09IFwib2JqZWN0XCIpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShBKSAhPT0gQXJyYXkuaXNBcnJheShCKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShBKSkge1xuXHRcdFx0aWYgKEEubGVuZ3RoICE9PSBCLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IEEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKCFyZWN1cnNpdmVDb21wYXJlKEFbaV0sIEJbaV0pKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBrZXk7XG5cdFx0XHRmb3IgKGtleSBpbiBBKSB7XG5cdFx0XHRcdGlmIChCW2tleV0gPT09IHVuZGVmaW5lZCAmJiBBW2tleV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Zm9yIChrZXkgaW4gQikge1xuXHRcdFx0XHRpZiAoQVtrZXldID09PSB1bmRlZmluZWQgJiYgQltrZXldICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGZvciAoa2V5IGluIEEpIHtcblx0XHRcdFx0aWYgKCFyZWN1cnNpdmVDb21wYXJlKEFba2V5XSwgQltrZXldKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59XG5cblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLnZhbGlkYXRlQmFzaWMgPSBmdW5jdGlvbiB2YWxpZGF0ZUJhc2ljKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKSB7XG5cdHZhciBlcnJvcjtcblx0aWYgKGVycm9yID0gdGhpcy52YWxpZGF0ZVR5cGUoZGF0YSwgc2NoZW1hLCBkYXRhUG9pbnRlclBhdGgpKSB7XG5cdFx0cmV0dXJuIGVycm9yLnByZWZpeFdpdGgobnVsbCwgXCJ0eXBlXCIpO1xuXHR9XG5cdGlmIChlcnJvciA9IHRoaXMudmFsaWRhdGVFbnVtKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKSkge1xuXHRcdHJldHVybiBlcnJvci5wcmVmaXhXaXRoKG51bGwsIFwidHlwZVwiKTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLnZhbGlkYXRlVHlwZSA9IGZ1bmN0aW9uIHZhbGlkYXRlVHlwZShkYXRhLCBzY2hlbWEpIHtcblx0aWYgKHNjaGVtYS50eXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHR2YXIgZGF0YVR5cGUgPSB0eXBlb2YgZGF0YTtcblx0aWYgKGRhdGEgPT09IG51bGwpIHtcblx0XHRkYXRhVHlwZSA9IFwibnVsbFwiO1xuXHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcblx0XHRkYXRhVHlwZSA9IFwiYXJyYXlcIjtcblx0fVxuXHR2YXIgYWxsb3dlZFR5cGVzID0gc2NoZW1hLnR5cGU7XG5cdGlmICh0eXBlb2YgYWxsb3dlZFR5cGVzICE9PSBcIm9iamVjdFwiKSB7XG5cdFx0YWxsb3dlZFR5cGVzID0gW2FsbG93ZWRUeXBlc107XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFsbG93ZWRUeXBlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0eXBlID0gYWxsb3dlZFR5cGVzW2ldO1xuXHRcdGlmICh0eXBlID09PSBkYXRhVHlwZSB8fCAodHlwZSA9PT0gXCJpbnRlZ2VyXCIgJiYgZGF0YVR5cGUgPT09IFwibnVtYmVyXCIgJiYgKGRhdGEgJSAxID09PSAwKSkpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLklOVkFMSURfVFlQRSwge3R5cGU6IGRhdGFUeXBlLCBleHBlY3RlZDogYWxsb3dlZFR5cGVzLmpvaW4oXCIvXCIpfSk7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZUVudW0gPSBmdW5jdGlvbiB2YWxpZGF0ZUVudW0oZGF0YSwgc2NoZW1hKSB7XG5cdGlmIChzY2hlbWFbXCJlbnVtXCJdID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHNjaGVtYVtcImVudW1cIl0ubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZW51bVZhbCA9IHNjaGVtYVtcImVudW1cIl1baV07XG5cdFx0aWYgKHJlY3Vyc2l2ZUNvbXBhcmUoZGF0YSwgZW51bVZhbCkpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLkVOVU1fTUlTTUFUQ0gsIHt2YWx1ZTogKHR5cGVvZiBKU09OICE9PSAndW5kZWZpbmVkJykgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IGRhdGF9KTtcbn07XG5cblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLnZhbGlkYXRlTnVtZXJpYyA9IGZ1bmN0aW9uIHZhbGlkYXRlTnVtZXJpYyhkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aCkge1xuXHRyZXR1cm4gdGhpcy52YWxpZGF0ZU11bHRpcGxlT2YoZGF0YSwgc2NoZW1hLCBkYXRhUG9pbnRlclBhdGgpXG5cdFx0fHwgdGhpcy52YWxpZGF0ZU1pbk1heChkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aClcblx0XHR8fCB0aGlzLnZhbGlkYXRlTmFOKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKVxuXHRcdHx8IG51bGw7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZU11bHRpcGxlT2YgPSBmdW5jdGlvbiB2YWxpZGF0ZU11bHRpcGxlT2YoZGF0YSwgc2NoZW1hKSB7XG5cdHZhciBtdWx0aXBsZU9mID0gc2NoZW1hLm11bHRpcGxlT2YgfHwgc2NoZW1hLmRpdmlzaWJsZUJ5O1xuXHRpZiAobXVsdGlwbGVPZiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKHR5cGVvZiBkYXRhID09PSBcIm51bWJlclwiKSB7XG5cdFx0aWYgKGRhdGEgJSBtdWx0aXBsZU9mICE9PSAwKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLk5VTUJFUl9NVUxUSVBMRV9PRiwge3ZhbHVlOiBkYXRhLCBtdWx0aXBsZU9mOiBtdWx0aXBsZU9mfSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUudmFsaWRhdGVNaW5NYXggPSBmdW5jdGlvbiB2YWxpZGF0ZU1pbk1heChkYXRhLCBzY2hlbWEpIHtcblx0aWYgKHR5cGVvZiBkYXRhICE9PSBcIm51bWJlclwiKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKHNjaGVtYS5taW5pbXVtICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoZGF0YSA8IHNjaGVtYS5taW5pbXVtKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLk5VTUJFUl9NSU5JTVVNLCB7dmFsdWU6IGRhdGEsIG1pbmltdW06IHNjaGVtYS5taW5pbXVtfSkucHJlZml4V2l0aChudWxsLCBcIm1pbmltdW1cIik7XG5cdFx0fVxuXHRcdGlmIChzY2hlbWEuZXhjbHVzaXZlTWluaW11bSAmJiBkYXRhID09PSBzY2hlbWEubWluaW11bSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlRXJyb3IoRXJyb3JDb2Rlcy5OVU1CRVJfTUlOSU1VTV9FWENMVVNJVkUsIHt2YWx1ZTogZGF0YSwgbWluaW11bTogc2NoZW1hLm1pbmltdW19KS5wcmVmaXhXaXRoKG51bGwsIFwiZXhjbHVzaXZlTWluaW11bVwiKTtcblx0XHR9XG5cdH1cblx0aWYgKHNjaGVtYS5tYXhpbXVtICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoZGF0YSA+IHNjaGVtYS5tYXhpbXVtKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLk5VTUJFUl9NQVhJTVVNLCB7dmFsdWU6IGRhdGEsIG1heGltdW06IHNjaGVtYS5tYXhpbXVtfSkucHJlZml4V2l0aChudWxsLCBcIm1heGltdW1cIik7XG5cdFx0fVxuXHRcdGlmIChzY2hlbWEuZXhjbHVzaXZlTWF4aW11bSAmJiBkYXRhID09PSBzY2hlbWEubWF4aW11bSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlRXJyb3IoRXJyb3JDb2Rlcy5OVU1CRVJfTUFYSU1VTV9FWENMVVNJVkUsIHt2YWx1ZTogZGF0YSwgbWF4aW11bTogc2NoZW1hLm1heGltdW19KS5wcmVmaXhXaXRoKG51bGwsIFwiZXhjbHVzaXZlTWF4aW11bVwiKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZU5hTiA9IGZ1bmN0aW9uIHZhbGlkYXRlTmFOKGRhdGEpIHtcblx0aWYgKHR5cGVvZiBkYXRhICE9PSBcIm51bWJlclwiKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKGlzTmFOKGRhdGEpID09PSB0cnVlIHx8IGRhdGEgPT09IEluZmluaXR5IHx8IGRhdGEgPT09IC1JbmZpbml0eSkge1xuXHRcdHJldHVybiB0aGlzLmNyZWF0ZUVycm9yKEVycm9yQ29kZXMuTlVNQkVSX05PVF9BX05VTUJFUiwge3ZhbHVlOiBkYXRhfSkucHJlZml4V2l0aChudWxsLCBcInR5cGVcIik7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZVN0cmluZyA9IGZ1bmN0aW9uIHZhbGlkYXRlU3RyaW5nKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKSB7XG5cdHJldHVybiB0aGlzLnZhbGlkYXRlU3RyaW5nTGVuZ3RoKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKVxuXHRcdHx8IHRoaXMudmFsaWRhdGVTdHJpbmdQYXR0ZXJuKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKVxuXHRcdHx8IG51bGw7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZVN0cmluZ0xlbmd0aCA9IGZ1bmN0aW9uIHZhbGlkYXRlU3RyaW5nTGVuZ3RoKGRhdGEsIHNjaGVtYSkge1xuXHRpZiAodHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRpZiAoc2NoZW1hLm1pbkxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKGRhdGEubGVuZ3RoIDwgc2NoZW1hLm1pbkxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlRXJyb3IoRXJyb3JDb2Rlcy5TVFJJTkdfTEVOR1RIX1NIT1JULCB7bGVuZ3RoOiBkYXRhLmxlbmd0aCwgbWluaW11bTogc2NoZW1hLm1pbkxlbmd0aH0pLnByZWZpeFdpdGgobnVsbCwgXCJtaW5MZW5ndGhcIik7XG5cdFx0fVxuXHR9XG5cdGlmIChzY2hlbWEubWF4TGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoZGF0YS5sZW5ndGggPiBzY2hlbWEubWF4TGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLlNUUklOR19MRU5HVEhfTE9ORywge2xlbmd0aDogZGF0YS5sZW5ndGgsIG1heGltdW06IHNjaGVtYS5tYXhMZW5ndGh9KS5wcmVmaXhXaXRoKG51bGwsIFwibWF4TGVuZ3RoXCIpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLnZhbGlkYXRlU3RyaW5nUGF0dGVybiA9IGZ1bmN0aW9uIHZhbGlkYXRlU3RyaW5nUGF0dGVybihkYXRhLCBzY2hlbWEpIHtcblx0aWYgKHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiIHx8IHNjaGVtYS5wYXR0ZXJuID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHR2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChzY2hlbWEucGF0dGVybik7XG5cdGlmICghcmVnZXhwLnRlc3QoZGF0YSkpIHtcblx0XHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLlNUUklOR19QQVRURVJOLCB7cGF0dGVybjogc2NoZW1hLnBhdHRlcm59KS5wcmVmaXhXaXRoKG51bGwsIFwicGF0dGVyblwiKTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZUFycmF5ID0gZnVuY3Rpb24gdmFsaWRhdGVBcnJheShkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aCkge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRyZXR1cm4gdGhpcy52YWxpZGF0ZUFycmF5TGVuZ3RoKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKVxuXHRcdHx8IHRoaXMudmFsaWRhdGVBcnJheVVuaXF1ZUl0ZW1zKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKVxuXHRcdHx8IHRoaXMudmFsaWRhdGVBcnJheUl0ZW1zKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKVxuXHRcdHx8IG51bGw7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZUFycmF5TGVuZ3RoID0gZnVuY3Rpb24gdmFsaWRhdGVBcnJheUxlbmd0aChkYXRhLCBzY2hlbWEpIHtcblx0dmFyIGVycm9yO1xuXHRpZiAoc2NoZW1hLm1pbkl0ZW1zICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoZGF0YS5sZW5ndGggPCBzY2hlbWEubWluSXRlbXMpIHtcblx0XHRcdGVycm9yID0gKHRoaXMuY3JlYXRlRXJyb3IoRXJyb3JDb2Rlcy5BUlJBWV9MRU5HVEhfU0hPUlQsIHtsZW5ndGg6IGRhdGEubGVuZ3RoLCBtaW5pbXVtOiBzY2hlbWEubWluSXRlbXN9KSkucHJlZml4V2l0aChudWxsLCBcIm1pbkl0ZW1zXCIpO1xuXHRcdFx0aWYgKHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpKSB7XG5cdFx0XHRcdHJldHVybiBlcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0aWYgKHNjaGVtYS5tYXhJdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKGRhdGEubGVuZ3RoID4gc2NoZW1hLm1heEl0ZW1zKSB7XG5cdFx0XHRlcnJvciA9ICh0aGlzLmNyZWF0ZUVycm9yKEVycm9yQ29kZXMuQVJSQVlfTEVOR1RIX0xPTkcsIHtsZW5ndGg6IGRhdGEubGVuZ3RoLCBtYXhpbXVtOiBzY2hlbWEubWF4SXRlbXN9KSkucHJlZml4V2l0aChudWxsLCBcIm1heEl0ZW1zXCIpO1xuXHRcdFx0aWYgKHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpKSB7XG5cdFx0XHRcdHJldHVybiBlcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZUFycmF5VW5pcXVlSXRlbXMgPSBmdW5jdGlvbiB2YWxpZGF0ZUFycmF5VW5pcXVlSXRlbXMoZGF0YSwgc2NoZW1hKSB7XG5cdGlmIChzY2hlbWEudW5pcXVlSXRlbXMpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdGZvciAodmFyIGogPSBpICsgMTsgaiA8IGRhdGEubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0aWYgKHJlY3Vyc2l2ZUNvbXBhcmUoZGF0YVtpXSwgZGF0YVtqXSkpIHtcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSAodGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLkFSUkFZX1VOSVFVRSwge21hdGNoMTogaSwgbWF0Y2gyOiBqfSkpLnByZWZpeFdpdGgobnVsbCwgXCJ1bmlxdWVJdGVtc1wiKTtcblx0XHRcdFx0XHRpZiAodGhpcy5oYW5kbGVFcnJvcihlcnJvcikpIHtcblx0XHRcdFx0XHRcdHJldHVybiBlcnJvcjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZUFycmF5SXRlbXMgPSBmdW5jdGlvbiB2YWxpZGF0ZUFycmF5SXRlbXMoZGF0YSwgc2NoZW1hLCBkYXRhUG9pbnRlclBhdGgpIHtcblx0aWYgKHNjaGVtYS5pdGVtcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0dmFyIGVycm9yLCBpO1xuXHRpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEuaXRlbXMpKSB7XG5cdFx0Zm9yIChpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChpIDwgc2NoZW1hLml0ZW1zLmxlbmd0aCkge1xuXHRcdFx0XHRpZiAoZXJyb3IgPSB0aGlzLnZhbGlkYXRlQWxsKGRhdGFbaV0sIHNjaGVtYS5pdGVtc1tpXSwgW2ldLCBbXCJpdGVtc1wiLCBpXSwgZGF0YVBvaW50ZXJQYXRoICsgXCIvXCIgKyBpKSkge1xuXHRcdFx0XHRcdHJldHVybiBlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChzY2hlbWEuYWRkaXRpb25hbEl0ZW1zICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBzY2hlbWEuYWRkaXRpb25hbEl0ZW1zID09PSBcImJvb2xlYW5cIikge1xuXHRcdFx0XHRcdGlmICghc2NoZW1hLmFkZGl0aW9uYWxJdGVtcykge1xuXHRcdFx0XHRcdFx0ZXJyb3IgPSAodGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLkFSUkFZX0FERElUSU9OQUxfSVRFTVMsIHt9KSkucHJlZml4V2l0aChcIlwiICsgaSwgXCJhZGRpdGlvbmFsSXRlbXNcIik7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5oYW5kbGVFcnJvcihlcnJvcikpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGVycm9yO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChlcnJvciA9IHRoaXMudmFsaWRhdGVBbGwoZGF0YVtpXSwgc2NoZW1hLmFkZGl0aW9uYWxJdGVtcywgW2ldLCBbXCJhZGRpdGlvbmFsSXRlbXNcIl0sIGRhdGFQb2ludGVyUGF0aCArIFwiL1wiICsgaSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Zm9yIChpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChlcnJvciA9IHRoaXMudmFsaWRhdGVBbGwoZGF0YVtpXSwgc2NoZW1hLml0ZW1zLCBbaV0sIFtcIml0ZW1zXCJdLCBkYXRhUG9pbnRlclBhdGggKyBcIi9cIiArIGkpKSB7XG5cdFx0XHRcdHJldHVybiBlcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZU9iamVjdCA9IGZ1bmN0aW9uIHZhbGlkYXRlT2JqZWN0KGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKSB7XG5cdGlmICh0eXBlb2YgZGF0YSAhPT0gXCJvYmplY3RcIiB8fCBkYXRhID09PSBudWxsIHx8IEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRyZXR1cm4gdGhpcy52YWxpZGF0ZU9iamVjdE1pbk1heFByb3BlcnRpZXMoZGF0YSwgc2NoZW1hLCBkYXRhUG9pbnRlclBhdGgpXG5cdFx0fHwgdGhpcy52YWxpZGF0ZU9iamVjdFJlcXVpcmVkUHJvcGVydGllcyhkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aClcblx0XHR8fCB0aGlzLnZhbGlkYXRlT2JqZWN0UHJvcGVydGllcyhkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aClcblx0XHR8fCB0aGlzLnZhbGlkYXRlT2JqZWN0RGVwZW5kZW5jaWVzKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKVxuXHRcdHx8IG51bGw7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZU9iamVjdE1pbk1heFByb3BlcnRpZXMgPSBmdW5jdGlvbiB2YWxpZGF0ZU9iamVjdE1pbk1heFByb3BlcnRpZXMoZGF0YSwgc2NoZW1hKSB7XG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSk7XG5cdHZhciBlcnJvcjtcblx0aWYgKHNjaGVtYS5taW5Qcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoa2V5cy5sZW5ndGggPCBzY2hlbWEubWluUHJvcGVydGllcykge1xuXHRcdFx0ZXJyb3IgPSB0aGlzLmNyZWF0ZUVycm9yKEVycm9yQ29kZXMuT0JKRUNUX1BST1BFUlRJRVNfTUlOSU1VTSwge3Byb3BlcnR5Q291bnQ6IGtleXMubGVuZ3RoLCBtaW5pbXVtOiBzY2hlbWEubWluUHJvcGVydGllc30pLnByZWZpeFdpdGgobnVsbCwgXCJtaW5Qcm9wZXJ0aWVzXCIpO1xuXHRcdFx0aWYgKHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpKSB7XG5cdFx0XHRcdHJldHVybiBlcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0aWYgKHNjaGVtYS5tYXhQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoa2V5cy5sZW5ndGggPiBzY2hlbWEubWF4UHJvcGVydGllcykge1xuXHRcdFx0ZXJyb3IgPSB0aGlzLmNyZWF0ZUVycm9yKEVycm9yQ29kZXMuT0JKRUNUX1BST1BFUlRJRVNfTUFYSU1VTSwge3Byb3BlcnR5Q291bnQ6IGtleXMubGVuZ3RoLCBtYXhpbXVtOiBzY2hlbWEubWF4UHJvcGVydGllc30pLnByZWZpeFdpdGgobnVsbCwgXCJtYXhQcm9wZXJ0aWVzXCIpO1xuXHRcdFx0aWYgKHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpKSB7XG5cdFx0XHRcdHJldHVybiBlcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZU9iamVjdFJlcXVpcmVkUHJvcGVydGllcyA9IGZ1bmN0aW9uIHZhbGlkYXRlT2JqZWN0UmVxdWlyZWRQcm9wZXJ0aWVzKGRhdGEsIHNjaGVtYSkge1xuXHRpZiAoc2NoZW1hLnJlcXVpcmVkICE9PSB1bmRlZmluZWQpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNjaGVtYS5yZXF1aXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGtleSA9IHNjaGVtYS5yZXF1aXJlZFtpXTtcblx0XHRcdGlmIChkYXRhW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR2YXIgZXJyb3IgPSB0aGlzLmNyZWF0ZUVycm9yKEVycm9yQ29kZXMuT0JKRUNUX1JFUVVJUkVELCB7a2V5OiBrZXl9KS5wcmVmaXhXaXRoKG51bGwsIFwiXCIgKyBpKS5wcmVmaXhXaXRoKG51bGwsIFwicmVxdWlyZWRcIik7XG5cdFx0XHRcdGlmICh0aGlzLmhhbmRsZUVycm9yKGVycm9yKSkge1xuXHRcdFx0XHRcdHJldHVybiBlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLnZhbGlkYXRlT2JqZWN0UHJvcGVydGllcyA9IGZ1bmN0aW9uIHZhbGlkYXRlT2JqZWN0UHJvcGVydGllcyhkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aCkge1xuXHR2YXIgZXJyb3I7XG5cdGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG5cdFx0dmFyIGtleVBvaW50ZXJQYXRoID0gZGF0YVBvaW50ZXJQYXRoICsgXCIvXCIgKyBrZXkucmVwbGFjZSgvfi9nLCAnfjAnKS5yZXBsYWNlKC9cXC8vZywgJ34xJyk7XG5cdFx0dmFyIGZvdW5kTWF0Y2ggPSBmYWxzZTtcblx0XHRpZiAoc2NoZW1hLnByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCAmJiBzY2hlbWEucHJvcGVydGllc1trZXldICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGZvdW5kTWF0Y2ggPSB0cnVlO1xuXHRcdFx0aWYgKGVycm9yID0gdGhpcy52YWxpZGF0ZUFsbChkYXRhW2tleV0sIHNjaGVtYS5wcm9wZXJ0aWVzW2tleV0sIFtrZXldLCBbXCJwcm9wZXJ0aWVzXCIsIGtleV0sIGtleVBvaW50ZXJQYXRoKSkge1xuXHRcdFx0XHRyZXR1cm4gZXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChzY2hlbWEucGF0dGVyblByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Zm9yICh2YXIgcGF0dGVybktleSBpbiBzY2hlbWEucGF0dGVyblByb3BlcnRpZXMpIHtcblx0XHRcdFx0dmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAocGF0dGVybktleSk7XG5cdFx0XHRcdGlmIChyZWdleHAudGVzdChrZXkpKSB7XG5cdFx0XHRcdFx0Zm91bmRNYXRjaCA9IHRydWU7XG5cdFx0XHRcdFx0aWYgKGVycm9yID0gdGhpcy52YWxpZGF0ZUFsbChkYXRhW2tleV0sIHNjaGVtYS5wYXR0ZXJuUHJvcGVydGllc1twYXR0ZXJuS2V5XSwgW2tleV0sIFtcInBhdHRlcm5Qcm9wZXJ0aWVzXCIsIHBhdHRlcm5LZXldLCBrZXlQb2ludGVyUGF0aCkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBlcnJvcjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCFmb3VuZE1hdGNoKSB7XG5cdFx0XHRpZiAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0aWYgKHRoaXMudHJhY2tVbmtub3duUHJvcGVydGllcykge1xuXHRcdFx0XHRcdHRoaXMua25vd25Qcm9wZXJ0eVBhdGhzW2tleVBvaW50ZXJQYXRoXSA9IHRydWU7XG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMudW5rbm93blByb3BlcnR5UGF0aHNba2V5UG9pbnRlclBhdGhdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlb2Ygc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzID09PSBcImJvb2xlYW5cIikge1xuXHRcdFx0XHRcdGlmICghc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XG5cdFx0XHRcdFx0XHRlcnJvciA9IHRoaXMuY3JlYXRlRXJyb3IoRXJyb3JDb2Rlcy5PQkpFQ1RfQURESVRJT05BTF9QUk9QRVJUSUVTLCB7fSkucHJlZml4V2l0aChrZXksIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIik7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5oYW5kbGVFcnJvcihlcnJvcikpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGVycm9yO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoZXJyb3IgPSB0aGlzLnZhbGlkYXRlQWxsKGRhdGFba2V5XSwgc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLCBba2V5XSwgW1wiYWRkaXRpb25hbFByb3BlcnRpZXNcIl0sIGtleVBvaW50ZXJQYXRoKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVycm9yO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnRyYWNrVW5rbm93blByb3BlcnRpZXMgJiYgIXRoaXMua25vd25Qcm9wZXJ0eVBhdGhzW2tleVBvaW50ZXJQYXRoXSkge1xuXHRcdFx0XHR0aGlzLnVua25vd25Qcm9wZXJ0eVBhdGhzW2tleVBvaW50ZXJQYXRoXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0aGlzLnRyYWNrVW5rbm93blByb3BlcnRpZXMpIHtcblx0XHRcdHRoaXMua25vd25Qcm9wZXJ0eVBhdGhzW2tleVBvaW50ZXJQYXRoXSA9IHRydWU7XG5cdFx0XHRkZWxldGUgdGhpcy51bmtub3duUHJvcGVydHlQYXRoc1trZXlQb2ludGVyUGF0aF07XG5cdFx0fVxuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUudmFsaWRhdGVPYmplY3REZXBlbmRlbmNpZXMgPSBmdW5jdGlvbiB2YWxpZGF0ZU9iamVjdERlcGVuZGVuY2llcyhkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aCkge1xuXHR2YXIgZXJyb3I7XG5cdGlmIChzY2hlbWEuZGVwZW5kZW5jaWVzICE9PSB1bmRlZmluZWQpIHtcblx0XHRmb3IgKHZhciBkZXBLZXkgaW4gc2NoZW1hLmRlcGVuZGVuY2llcykge1xuXHRcdFx0aWYgKGRhdGFbZGVwS2V5XSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHZhciBkZXAgPSBzY2hlbWEuZGVwZW5kZW5jaWVzW2RlcEtleV07XG5cdFx0XHRcdGlmICh0eXBlb2YgZGVwID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0aWYgKGRhdGFbZGVwXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRlcnJvciA9IHRoaXMuY3JlYXRlRXJyb3IoRXJyb3JDb2Rlcy5PQkpFQ1RfREVQRU5ERU5DWV9LRVksIHtrZXk6IGRlcEtleSwgbWlzc2luZzogZGVwfSkucHJlZml4V2l0aChudWxsLCBkZXBLZXkpLnByZWZpeFdpdGgobnVsbCwgXCJkZXBlbmRlbmNpZXNcIik7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5oYW5kbGVFcnJvcihlcnJvcikpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGVycm9yO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRlcCkpIHtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIHJlcXVpcmVkS2V5ID0gZGVwW2ldO1xuXHRcdFx0XHRcdFx0aWYgKGRhdGFbcmVxdWlyZWRLZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0ZXJyb3IgPSB0aGlzLmNyZWF0ZUVycm9yKEVycm9yQ29kZXMuT0JKRUNUX0RFUEVOREVOQ1lfS0VZLCB7a2V5OiBkZXBLZXksIG1pc3Npbmc6IHJlcXVpcmVkS2V5fSkucHJlZml4V2l0aChudWxsLCBcIlwiICsgaSkucHJlZml4V2l0aChudWxsLCBkZXBLZXkpLnByZWZpeFdpdGgobnVsbCwgXCJkZXBlbmRlbmNpZXNcIik7XG5cdFx0XHRcdFx0XHRcdGlmICh0aGlzLmhhbmRsZUVycm9yKGVycm9yKSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBlcnJvcjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoZXJyb3IgPSB0aGlzLnZhbGlkYXRlQWxsKGRhdGEsIGRlcCwgW10sIFtcImRlcGVuZGVuY2llc1wiLCBkZXBLZXldLCBkYXRhUG9pbnRlclBhdGgpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZXJyb3I7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBudWxsO1xufTtcblxuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUudmFsaWRhdGVDb21iaW5hdGlvbnMgPSBmdW5jdGlvbiB2YWxpZGF0ZUNvbWJpbmF0aW9ucyhkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aCkge1xuXHRyZXR1cm4gdGhpcy52YWxpZGF0ZUFsbE9mKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKVxuXHRcdHx8IHRoaXMudmFsaWRhdGVBbnlPZihkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aClcblx0XHR8fCB0aGlzLnZhbGlkYXRlT25lT2YoZGF0YSwgc2NoZW1hLCBkYXRhUG9pbnRlclBhdGgpXG5cdFx0fHwgdGhpcy52YWxpZGF0ZU5vdChkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aClcblx0XHR8fCBudWxsO1xufTtcblxuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUudmFsaWRhdGVBbGxPZiA9IGZ1bmN0aW9uIHZhbGlkYXRlQWxsT2YoZGF0YSwgc2NoZW1hLCBkYXRhUG9pbnRlclBhdGgpIHtcblx0aWYgKHNjaGVtYS5hbGxPZiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0dmFyIGVycm9yO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHNjaGVtYS5hbGxPZi5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBzdWJTY2hlbWEgPSBzY2hlbWEuYWxsT2ZbaV07XG5cdFx0aWYgKGVycm9yID0gdGhpcy52YWxpZGF0ZUFsbChkYXRhLCBzdWJTY2hlbWEsIFtdLCBbXCJhbGxPZlwiLCBpXSwgZGF0YVBvaW50ZXJQYXRoKSkge1xuXHRcdFx0cmV0dXJuIGVycm9yO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cblZhbGlkYXRvckNvbnRleHQucHJvdG90eXBlLnZhbGlkYXRlQW55T2YgPSBmdW5jdGlvbiB2YWxpZGF0ZUFueU9mKGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKSB7XG5cdGlmIChzY2hlbWEuYW55T2YgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHZhciBlcnJvcnMgPSBbXTtcblx0dmFyIHN0YXJ0RXJyb3JDb3VudCA9IHRoaXMuZXJyb3JzLmxlbmd0aDtcblx0dmFyIG9sZFVua25vd25Qcm9wZXJ0eVBhdGhzLCBvbGRLbm93blByb3BlcnR5UGF0aHM7XG5cdGlmICh0aGlzLnRyYWNrVW5rbm93blByb3BlcnRpZXMpIHtcblx0XHRvbGRVbmtub3duUHJvcGVydHlQYXRocyA9IHRoaXMudW5rbm93blByb3BlcnR5UGF0aHM7XG5cdFx0b2xkS25vd25Qcm9wZXJ0eVBhdGhzID0gdGhpcy5rbm93blByb3BlcnR5UGF0aHM7XG5cdH1cblx0dmFyIGVycm9yQXRFbmQgPSB0cnVlO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHNjaGVtYS5hbnlPZi5sZW5ndGg7IGkrKykge1xuXHRcdGlmICh0aGlzLnRyYWNrVW5rbm93blByb3BlcnRpZXMpIHtcblx0XHRcdHRoaXMudW5rbm93blByb3BlcnR5UGF0aHMgPSB7fTtcblx0XHRcdHRoaXMua25vd25Qcm9wZXJ0eVBhdGhzID0ge307XG5cdFx0fVxuXHRcdHZhciBzdWJTY2hlbWEgPSBzY2hlbWEuYW55T2ZbaV07XG5cblx0XHR2YXIgZXJyb3JDb3VudCA9IHRoaXMuZXJyb3JzLmxlbmd0aDtcblx0XHR2YXIgZXJyb3IgPSB0aGlzLnZhbGlkYXRlQWxsKGRhdGEsIHN1YlNjaGVtYSwgW10sIFtcImFueU9mXCIsIGldLCBkYXRhUG9pbnRlclBhdGgpO1xuXG5cdFx0aWYgKGVycm9yID09PSBudWxsICYmIGVycm9yQ291bnQgPT09IHRoaXMuZXJyb3JzLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5lcnJvcnMgPSB0aGlzLmVycm9ycy5zbGljZSgwLCBzdGFydEVycm9yQ291bnQpO1xuXG5cdFx0XHRpZiAodGhpcy50cmFja1Vua25vd25Qcm9wZXJ0aWVzKSB7XG5cdFx0XHRcdGZvciAodmFyIGtub3duS2V5IGluIHRoaXMua25vd25Qcm9wZXJ0eVBhdGhzKSB7XG5cdFx0XHRcdFx0b2xkS25vd25Qcm9wZXJ0eVBhdGhzW2tub3duS2V5XSA9IHRydWU7XG5cdFx0XHRcdFx0ZGVsZXRlIG9sZFVua25vd25Qcm9wZXJ0eVBhdGhzW2tub3duS2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IgKHZhciB1bmtub3duS2V5IGluIHRoaXMudW5rbm93blByb3BlcnR5UGF0aHMpIHtcblx0XHRcdFx0XHRpZiAoIW9sZEtub3duUHJvcGVydHlQYXRoc1t1bmtub3duS2V5XSkge1xuXHRcdFx0XHRcdFx0b2xkVW5rbm93blByb3BlcnR5UGF0aHNbdW5rbm93bktleV0gPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBXZSBuZWVkIHRvIGNvbnRpbnVlIGxvb3Bpbmcgc28gd2UgY2F0Y2ggYWxsIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucywgYnV0IHdlIGRvbid0IHdhbnQgdG8gcmV0dXJuIGFuIGVycm9yXG5cdFx0XHRcdGVycm9yQXRFbmQgPSBmYWxzZTtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdGVycm9ycy5wdXNoKGVycm9yLnByZWZpeFdpdGgobnVsbCwgXCJcIiArIGkpLnByZWZpeFdpdGgobnVsbCwgXCJhbnlPZlwiKSk7XG5cdFx0fVxuXHR9XG5cdGlmICh0aGlzLnRyYWNrVW5rbm93blByb3BlcnRpZXMpIHtcblx0XHR0aGlzLnVua25vd25Qcm9wZXJ0eVBhdGhzID0gb2xkVW5rbm93blByb3BlcnR5UGF0aHM7XG5cdFx0dGhpcy5rbm93blByb3BlcnR5UGF0aHMgPSBvbGRLbm93blByb3BlcnR5UGF0aHM7XG5cdH1cblx0aWYgKGVycm9yQXRFbmQpIHtcblx0XHRlcnJvcnMgPSBlcnJvcnMuY29uY2F0KHRoaXMuZXJyb3JzLnNsaWNlKHN0YXJ0RXJyb3JDb3VudCkpO1xuXHRcdHRoaXMuZXJyb3JzID0gdGhpcy5lcnJvcnMuc2xpY2UoMCwgc3RhcnRFcnJvckNvdW50KTtcblx0XHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLkFOWV9PRl9NSVNTSU5HLCB7fSwgXCJcIiwgXCIvYW55T2ZcIiwgZXJyb3JzKTtcblx0fVxufTtcblxuVmFsaWRhdG9yQ29udGV4dC5wcm90b3R5cGUudmFsaWRhdGVPbmVPZiA9IGZ1bmN0aW9uIHZhbGlkYXRlT25lT2YoZGF0YSwgc2NoZW1hLCBkYXRhUG9pbnRlclBhdGgpIHtcblx0aWYgKHNjaGVtYS5vbmVPZiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0dmFyIHZhbGlkSW5kZXggPSBudWxsO1xuXHR2YXIgZXJyb3JzID0gW107XG5cdHZhciBzdGFydEVycm9yQ291bnQgPSB0aGlzLmVycm9ycy5sZW5ndGg7XG5cdHZhciBvbGRVbmtub3duUHJvcGVydHlQYXRocywgb2xkS25vd25Qcm9wZXJ0eVBhdGhzO1xuXHRpZiAodGhpcy50cmFja1Vua25vd25Qcm9wZXJ0aWVzKSB7XG5cdFx0b2xkVW5rbm93blByb3BlcnR5UGF0aHMgPSB0aGlzLnVua25vd25Qcm9wZXJ0eVBhdGhzO1xuXHRcdG9sZEtub3duUHJvcGVydHlQYXRocyA9IHRoaXMua25vd25Qcm9wZXJ0eVBhdGhzO1xuXHR9XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc2NoZW1hLm9uZU9mLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKHRoaXMudHJhY2tVbmtub3duUHJvcGVydGllcykge1xuXHRcdFx0dGhpcy51bmtub3duUHJvcGVydHlQYXRocyA9IHt9O1xuXHRcdFx0dGhpcy5rbm93blByb3BlcnR5UGF0aHMgPSB7fTtcblx0XHR9XG5cdFx0dmFyIHN1YlNjaGVtYSA9IHNjaGVtYS5vbmVPZltpXTtcblxuXHRcdHZhciBlcnJvckNvdW50ID0gdGhpcy5lcnJvcnMubGVuZ3RoO1xuXHRcdHZhciBlcnJvciA9IHRoaXMudmFsaWRhdGVBbGwoZGF0YSwgc3ViU2NoZW1hLCBbXSwgW1wib25lT2ZcIiwgaV0sIGRhdGFQb2ludGVyUGF0aCk7XG5cblx0XHRpZiAoZXJyb3IgPT09IG51bGwgJiYgZXJyb3JDb3VudCA9PT0gdGhpcy5lcnJvcnMubGVuZ3RoKSB7XG5cdFx0XHRpZiAodmFsaWRJbmRleCA9PT0gbnVsbCkge1xuXHRcdFx0XHR2YWxpZEluZGV4ID0gaTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZXJyb3JzID0gdGhpcy5lcnJvcnMuc2xpY2UoMCwgc3RhcnRFcnJvckNvdW50KTtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlRXJyb3IoRXJyb3JDb2Rlcy5PTkVfT0ZfTVVMVElQTEUsIHtpbmRleDE6IHZhbGlkSW5kZXgsIGluZGV4MjogaX0sIFwiXCIsIFwiL29uZU9mXCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMudHJhY2tVbmtub3duUHJvcGVydGllcykge1xuXHRcdFx0XHRmb3IgKHZhciBrbm93bktleSBpbiB0aGlzLmtub3duUHJvcGVydHlQYXRocykge1xuXHRcdFx0XHRcdG9sZEtub3duUHJvcGVydHlQYXRoc1trbm93bktleV0gPSB0cnVlO1xuXHRcdFx0XHRcdGRlbGV0ZSBvbGRVbmtub3duUHJvcGVydHlQYXRoc1trbm93bktleV07XG5cdFx0XHRcdH1cblx0XHRcdFx0Zm9yICh2YXIgdW5rbm93bktleSBpbiB0aGlzLnVua25vd25Qcm9wZXJ0eVBhdGhzKSB7XG5cdFx0XHRcdFx0aWYgKCFvbGRLbm93blByb3BlcnR5UGF0aHNbdW5rbm93bktleV0pIHtcblx0XHRcdFx0XHRcdG9sZFVua25vd25Qcm9wZXJ0eVBhdGhzW3Vua25vd25LZXldID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGVycm9yKSB7XG5cdFx0XHRlcnJvcnMucHVzaChlcnJvcik7XG5cdFx0fVxuXHR9XG5cdGlmICh0aGlzLnRyYWNrVW5rbm93blByb3BlcnRpZXMpIHtcblx0XHR0aGlzLnVua25vd25Qcm9wZXJ0eVBhdGhzID0gb2xkVW5rbm93blByb3BlcnR5UGF0aHM7XG5cdFx0dGhpcy5rbm93blByb3BlcnR5UGF0aHMgPSBvbGRLbm93blByb3BlcnR5UGF0aHM7XG5cdH1cblx0aWYgKHZhbGlkSW5kZXggPT09IG51bGwpIHtcblx0XHRlcnJvcnMgPSBlcnJvcnMuY29uY2F0KHRoaXMuZXJyb3JzLnNsaWNlKHN0YXJ0RXJyb3JDb3VudCkpO1xuXHRcdHRoaXMuZXJyb3JzID0gdGhpcy5lcnJvcnMuc2xpY2UoMCwgc3RhcnRFcnJvckNvdW50KTtcblx0XHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLk9ORV9PRl9NSVNTSU5HLCB7fSwgXCJcIiwgXCIvb25lT2ZcIiwgZXJyb3JzKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmVycm9ycyA9IHRoaXMuZXJyb3JzLnNsaWNlKDAsIHN0YXJ0RXJyb3JDb3VudCk7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZU5vdCA9IGZ1bmN0aW9uIHZhbGlkYXRlTm90KGRhdGEsIHNjaGVtYSwgZGF0YVBvaW50ZXJQYXRoKSB7XG5cdGlmIChzY2hlbWEubm90ID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHR2YXIgb2xkRXJyb3JDb3VudCA9IHRoaXMuZXJyb3JzLmxlbmd0aDtcblx0dmFyIG9sZFVua25vd25Qcm9wZXJ0eVBhdGhzLCBvbGRLbm93blByb3BlcnR5UGF0aHM7XG5cdGlmICh0aGlzLnRyYWNrVW5rbm93blByb3BlcnRpZXMpIHtcblx0XHRvbGRVbmtub3duUHJvcGVydHlQYXRocyA9IHRoaXMudW5rbm93blByb3BlcnR5UGF0aHM7XG5cdFx0b2xkS25vd25Qcm9wZXJ0eVBhdGhzID0gdGhpcy5rbm93blByb3BlcnR5UGF0aHM7XG5cdFx0dGhpcy51bmtub3duUHJvcGVydHlQYXRocyA9IHt9O1xuXHRcdHRoaXMua25vd25Qcm9wZXJ0eVBhdGhzID0ge307XG5cdH1cblx0dmFyIGVycm9yID0gdGhpcy52YWxpZGF0ZUFsbChkYXRhLCBzY2hlbWEubm90LCBudWxsLCBudWxsLCBkYXRhUG9pbnRlclBhdGgpO1xuXHR2YXIgbm90RXJyb3JzID0gdGhpcy5lcnJvcnMuc2xpY2Uob2xkRXJyb3JDb3VudCk7XG5cdHRoaXMuZXJyb3JzID0gdGhpcy5lcnJvcnMuc2xpY2UoMCwgb2xkRXJyb3JDb3VudCk7XG5cdGlmICh0aGlzLnRyYWNrVW5rbm93blByb3BlcnRpZXMpIHtcblx0XHR0aGlzLnVua25vd25Qcm9wZXJ0eVBhdGhzID0gb2xkVW5rbm93blByb3BlcnR5UGF0aHM7XG5cdFx0dGhpcy5rbm93blByb3BlcnR5UGF0aHMgPSBvbGRLbm93blByb3BlcnR5UGF0aHM7XG5cdH1cblx0aWYgKGVycm9yID09PSBudWxsICYmIG5vdEVycm9ycy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gdGhpcy5jcmVhdGVFcnJvcihFcnJvckNvZGVzLk5PVF9QQVNTRUQsIHt9LCBcIlwiLCBcIi9ub3RcIik7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuXG5WYWxpZGF0b3JDb250ZXh0LnByb3RvdHlwZS52YWxpZGF0ZUh5cGVybWVkaWEgPSBmdW5jdGlvbiB2YWxpZGF0ZUNvbWJpbmF0aW9ucyhkYXRhLCBzY2hlbWEsIGRhdGFQb2ludGVyUGF0aCkge1xuXHRpZiAoIXNjaGVtYS5saW5rcykge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHZhciBlcnJvcjtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzY2hlbWEubGlua3MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgbGRvID0gc2NoZW1hLmxpbmtzW2ldO1xuXHRcdGlmIChsZG8ucmVsID09PSBcImRlc2NyaWJlZGJ5XCIpIHtcblx0XHRcdHZhciB0ZW1wbGF0ZSA9IG5ldyBVcmlUZW1wbGF0ZShsZG8uaHJlZik7XG5cdFx0XHR2YXIgYWxsUHJlc2VudCA9IHRydWU7XG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRlbXBsYXRlLnZhck5hbWVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGlmICghKHRlbXBsYXRlLnZhck5hbWVzW2pdIGluIGRhdGEpKSB7XG5cdFx0XHRcdFx0YWxsUHJlc2VudCA9IGZhbHNlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoYWxsUHJlc2VudCkge1xuXHRcdFx0XHR2YXIgc2NoZW1hVXJsID0gdGVtcGxhdGUuZmlsbEZyb21PYmplY3QoZGF0YSk7XG5cdFx0XHRcdHZhciBzdWJTY2hlbWEgPSB7XCIkcmVmXCI6IHNjaGVtYVVybH07XG5cdFx0XHRcdGlmIChlcnJvciA9IHRoaXMudmFsaWRhdGVBbGwoZGF0YSwgc3ViU2NoZW1hLCBbXSwgW1wibGlua3NcIiwgaV0sIGRhdGFQb2ludGVyUGF0aCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbi8vIHBhcnNlVVJJKCkgYW5kIHJlc29sdmVVcmwoKSBhcmUgZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS8xMDg4ODUwXG4vLyAgIC0gIHJlbGVhc2VkIGFzIHB1YmxpYyBkb21haW4gYnkgYXV0aG9yIChcIllhZmZsZVwiKSAtIHNlZSBjb21tZW50cyBvbiBnaXN0XG5cbmZ1bmN0aW9uIHBhcnNlVVJJKHVybCkge1xuXHR2YXIgbSA9IFN0cmluZyh1cmwpLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKS5tYXRjaCgvXihbXjpcXC8/I10rOik/KFxcL1xcLyg/OlteOkBdKig/OjpbXjpAXSopP0ApPygoW146XFwvPyNdKikoPzo6KFxcZCopKT8pKT8oW14/I10qKShcXD9bXiNdKik/KCNbXFxzXFxTXSopPy8pO1xuXHQvLyBhdXRob3JpdHkgPSAnLy8nICsgdXNlciArICc6JyArIHBhc3MgJ0AnICsgaG9zdG5hbWUgKyAnOicgcG9ydFxuXHRyZXR1cm4gKG0gPyB7XG5cdFx0aHJlZiAgICAgOiBtWzBdIHx8ICcnLFxuXHRcdHByb3RvY29sIDogbVsxXSB8fCAnJyxcblx0XHRhdXRob3JpdHk6IG1bMl0gfHwgJycsXG5cdFx0aG9zdCAgICAgOiBtWzNdIHx8ICcnLFxuXHRcdGhvc3RuYW1lIDogbVs0XSB8fCAnJyxcblx0XHRwb3J0ICAgICA6IG1bNV0gfHwgJycsXG5cdFx0cGF0aG5hbWUgOiBtWzZdIHx8ICcnLFxuXHRcdHNlYXJjaCAgIDogbVs3XSB8fCAnJyxcblx0XHRoYXNoICAgICA6IG1bOF0gfHwgJydcblx0fSA6IG51bGwpO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlVXJsKGJhc2UsIGhyZWYpIHsvLyBSRkMgMzk4NlxuXG5cdGZ1bmN0aW9uIHJlbW92ZURvdFNlZ21lbnRzKGlucHV0KSB7XG5cdFx0dmFyIG91dHB1dCA9IFtdO1xuXHRcdGlucHV0LnJlcGxhY2UoL14oXFwuXFwuPyhcXC98JCkpKy8sICcnKVxuXHRcdFx0LnJlcGxhY2UoL1xcLyhcXC4oXFwvfCQpKSsvZywgJy8nKVxuXHRcdFx0LnJlcGxhY2UoL1xcL1xcLlxcLiQvLCAnLy4uLycpXG5cdFx0XHQucmVwbGFjZSgvXFwvP1teXFwvXSovZywgZnVuY3Rpb24gKHApIHtcblx0XHRcdFx0aWYgKHAgPT09ICcvLi4nKSB7XG5cdFx0XHRcdFx0b3V0cHV0LnBvcCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHApO1xuXHRcdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG91dHB1dC5qb2luKCcnKS5yZXBsYWNlKC9eXFwvLywgaW5wdXQuY2hhckF0KDApID09PSAnLycgPyAnLycgOiAnJyk7XG5cdH1cblxuXHRocmVmID0gcGFyc2VVUkkoaHJlZiB8fCAnJyk7XG5cdGJhc2UgPSBwYXJzZVVSSShiYXNlIHx8ICcnKTtcblxuXHRyZXR1cm4gIWhyZWYgfHwgIWJhc2UgPyBudWxsIDogKGhyZWYucHJvdG9jb2wgfHwgYmFzZS5wcm90b2NvbCkgK1xuXHRcdChocmVmLnByb3RvY29sIHx8IGhyZWYuYXV0aG9yaXR5ID8gaHJlZi5hdXRob3JpdHkgOiBiYXNlLmF1dGhvcml0eSkgK1xuXHRcdHJlbW92ZURvdFNlZ21lbnRzKGhyZWYucHJvdG9jb2wgfHwgaHJlZi5hdXRob3JpdHkgfHwgaHJlZi5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJyA/IGhyZWYucGF0aG5hbWUgOiAoaHJlZi5wYXRobmFtZSA/ICgoYmFzZS5hdXRob3JpdHkgJiYgIWJhc2UucGF0aG5hbWUgPyAnLycgOiAnJykgKyBiYXNlLnBhdGhuYW1lLnNsaWNlKDAsIGJhc2UucGF0aG5hbWUubGFzdEluZGV4T2YoJy8nKSArIDEpICsgaHJlZi5wYXRobmFtZSkgOiBiYXNlLnBhdGhuYW1lKSkgK1xuXHRcdChocmVmLnByb3RvY29sIHx8IGhyZWYuYXV0aG9yaXR5IHx8IGhyZWYucGF0aG5hbWUgPyBocmVmLnNlYXJjaCA6IChocmVmLnNlYXJjaCB8fCBiYXNlLnNlYXJjaCkpICtcblx0XHRocmVmLmhhc2g7XG59XG5cbmZ1bmN0aW9uIGdldERvY3VtZW50VXJpKHVyaSkge1xuXHRyZXR1cm4gdXJpLnNwbGl0KCcjJylbMF07XG59XG5mdW5jdGlvbiBub3JtU2NoZW1hKHNjaGVtYSwgYmFzZVVyaSkge1xuXHRpZiAoc2NoZW1hICYmIHR5cGVvZiBzY2hlbWEgPT09IFwib2JqZWN0XCIpIHtcblx0XHRpZiAoYmFzZVVyaSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRiYXNlVXJpID0gc2NoZW1hLmlkO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHNjaGVtYS5pZCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0YmFzZVVyaSA9IHJlc29sdmVVcmwoYmFzZVVyaSwgc2NoZW1hLmlkKTtcblx0XHRcdHNjaGVtYS5pZCA9IGJhc2VVcmk7XG5cdFx0fVxuXHRcdGlmIChBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc2NoZW1hLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG5vcm1TY2hlbWEoc2NoZW1hW2ldLCBiYXNlVXJpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHR5cGVvZiBzY2hlbWFbJyRyZWYnXSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRzY2hlbWFbJyRyZWYnXSA9IHJlc29sdmVVcmwoYmFzZVVyaSwgc2NoZW1hWyckcmVmJ10pO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIHNjaGVtYSkge1xuXHRcdFx0XHRpZiAoa2V5ICE9PSBcImVudW1cIikge1xuXHRcdFx0XHRcdG5vcm1TY2hlbWEoc2NoZW1hW2tleV0sIGJhc2VVcmkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbnZhciBFcnJvckNvZGVzID0ge1xuXHRJTlZBTElEX1RZUEU6IDAsXG5cdEVOVU1fTUlTTUFUQ0g6IDEsXG5cdEFOWV9PRl9NSVNTSU5HOiAxMCxcblx0T05FX09GX01JU1NJTkc6IDExLFxuXHRPTkVfT0ZfTVVMVElQTEU6IDEyLFxuXHROT1RfUEFTU0VEOiAxMyxcblx0Ly8gTnVtZXJpYyBlcnJvcnNcblx0TlVNQkVSX01VTFRJUExFX09GOiAxMDAsXG5cdE5VTUJFUl9NSU5JTVVNOiAxMDEsXG5cdE5VTUJFUl9NSU5JTVVNX0VYQ0xVU0lWRTogMTAyLFxuXHROVU1CRVJfTUFYSU1VTTogMTAzLFxuXHROVU1CRVJfTUFYSU1VTV9FWENMVVNJVkU6IDEwNCxcblx0TlVNQkVSX05PVF9BX05VTUJFUjogMTA1LFxuXHQvLyBTdHJpbmcgZXJyb3JzXG5cdFNUUklOR19MRU5HVEhfU0hPUlQ6IDIwMCxcblx0U1RSSU5HX0xFTkdUSF9MT05HOiAyMDEsXG5cdFNUUklOR19QQVRURVJOOiAyMDIsXG5cdC8vIE9iamVjdCBlcnJvcnNcblx0T0JKRUNUX1BST1BFUlRJRVNfTUlOSU1VTTogMzAwLFxuXHRPQkpFQ1RfUFJPUEVSVElFU19NQVhJTVVNOiAzMDEsXG5cdE9CSkVDVF9SRVFVSVJFRDogMzAyLFxuXHRPQkpFQ1RfQURESVRJT05BTF9QUk9QRVJUSUVTOiAzMDMsXG5cdE9CSkVDVF9ERVBFTkRFTkNZX0tFWTogMzA0LFxuXHQvLyBBcnJheSBlcnJvcnNcblx0QVJSQVlfTEVOR1RIX1NIT1JUOiA0MDAsXG5cdEFSUkFZX0xFTkdUSF9MT05HOiA0MDEsXG5cdEFSUkFZX1VOSVFVRTogNDAyLFxuXHRBUlJBWV9BRERJVElPTkFMX0lURU1TOiA0MDMsXG5cdC8vIEN1c3RvbS91c2VyLWRlZmluZWQgZXJyb3JzXG5cdEZPUk1BVF9DVVNUT006IDUwMCxcblx0S0VZV09SRF9DVVNUT006IDUwMSxcblx0Ly8gU2NoZW1hIHN0cnVjdHVyZVxuXHRDSVJDVUxBUl9SRUZFUkVOQ0U6IDYwMCxcblx0Ly8gTm9uLXN0YW5kYXJkIHZhbGlkYXRpb24gb3B0aW9uc1xuXHRVTktOT1dOX1BST1BFUlRZOiAxMDAwXG59O1xudmFyIEVycm9yQ29kZUxvb2t1cCA9IHt9O1xuZm9yICh2YXIga2V5IGluIEVycm9yQ29kZXMpIHtcblx0RXJyb3JDb2RlTG9va3VwW0Vycm9yQ29kZXNba2V5XV0gPSBrZXk7XG59XG52YXIgRXJyb3JNZXNzYWdlc0RlZmF1bHQgPSB7XG5cdElOVkFMSURfVFlQRTogXCJJbnZhbGlkIHR5cGU6IHt0eXBlfSAoZXhwZWN0ZWQge2V4cGVjdGVkfSlcIixcblx0RU5VTV9NSVNNQVRDSDogXCJObyBlbnVtIG1hdGNoIGZvcjoge3ZhbHVlfVwiLFxuXHRBTllfT0ZfTUlTU0lORzogXCJEYXRhIGRvZXMgbm90IG1hdGNoIGFueSBzY2hlbWFzIGZyb20gXFxcImFueU9mXFxcIlwiLFxuXHRPTkVfT0ZfTUlTU0lORzogXCJEYXRhIGRvZXMgbm90IG1hdGNoIGFueSBzY2hlbWFzIGZyb20gXFxcIm9uZU9mXFxcIlwiLFxuXHRPTkVfT0ZfTVVMVElQTEU6IFwiRGF0YSBpcyB2YWxpZCBhZ2FpbnN0IG1vcmUgdGhhbiBvbmUgc2NoZW1hIGZyb20gXFxcIm9uZU9mXFxcIjogaW5kaWNlcyB7aW5kZXgxfSBhbmQge2luZGV4Mn1cIixcblx0Tk9UX1BBU1NFRDogXCJEYXRhIG1hdGNoZXMgc2NoZW1hIGZyb20gXFxcIm5vdFxcXCJcIixcblx0Ly8gTnVtZXJpYyBlcnJvcnNcblx0TlVNQkVSX01VTFRJUExFX09GOiBcIlZhbHVlIHt2YWx1ZX0gaXMgbm90IGEgbXVsdGlwbGUgb2Yge211bHRpcGxlT2Z9XCIsXG5cdE5VTUJFUl9NSU5JTVVNOiBcIlZhbHVlIHt2YWx1ZX0gaXMgbGVzcyB0aGFuIG1pbmltdW0ge21pbmltdW19XCIsXG5cdE5VTUJFUl9NSU5JTVVNX0VYQ0xVU0lWRTogXCJWYWx1ZSB7dmFsdWV9IGlzIGVxdWFsIHRvIGV4Y2x1c2l2ZSBtaW5pbXVtIHttaW5pbXVtfVwiLFxuXHROVU1CRVJfTUFYSU1VTTogXCJWYWx1ZSB7dmFsdWV9IGlzIGdyZWF0ZXIgdGhhbiBtYXhpbXVtIHttYXhpbXVtfVwiLFxuXHROVU1CRVJfTUFYSU1VTV9FWENMVVNJVkU6IFwiVmFsdWUge3ZhbHVlfSBpcyBlcXVhbCB0byBleGNsdXNpdmUgbWF4aW11bSB7bWF4aW11bX1cIixcblx0TlVNQkVSX05PVF9BX05VTUJFUjogXCJWYWx1ZSB7dmFsdWV9IGlzIG5vdCBhIHZhbGlkIG51bWJlclwiLFxuXHQvLyBTdHJpbmcgZXJyb3JzXG5cdFNUUklOR19MRU5HVEhfU0hPUlQ6IFwiU3RyaW5nIGlzIHRvbyBzaG9ydCAoe2xlbmd0aH0gY2hhcnMpLCBtaW5pbXVtIHttaW5pbXVtfVwiLFxuXHRTVFJJTkdfTEVOR1RIX0xPTkc6IFwiU3RyaW5nIGlzIHRvbyBsb25nICh7bGVuZ3RofSBjaGFycyksIG1heGltdW0ge21heGltdW19XCIsXG5cdFNUUklOR19QQVRURVJOOiBcIlN0cmluZyBkb2VzIG5vdCBtYXRjaCBwYXR0ZXJuOiB7cGF0dGVybn1cIixcblx0Ly8gT2JqZWN0IGVycm9yc1xuXHRPQkpFQ1RfUFJPUEVSVElFU19NSU5JTVVNOiBcIlRvbyBmZXcgcHJvcGVydGllcyBkZWZpbmVkICh7cHJvcGVydHlDb3VudH0pLCBtaW5pbXVtIHttaW5pbXVtfVwiLFxuXHRPQkpFQ1RfUFJPUEVSVElFU19NQVhJTVVNOiBcIlRvbyBtYW55IHByb3BlcnRpZXMgZGVmaW5lZCAoe3Byb3BlcnR5Q291bnR9KSwgbWF4aW11bSB7bWF4aW11bX1cIixcblx0T0JKRUNUX1JFUVVJUkVEOiBcIk1pc3NpbmcgcmVxdWlyZWQgcHJvcGVydHk6IHtrZXl9XCIsXG5cdE9CSkVDVF9BRERJVElPTkFMX1BST1BFUlRJRVM6IFwiQWRkaXRpb25hbCBwcm9wZXJ0aWVzIG5vdCBhbGxvd2VkXCIsXG5cdE9CSkVDVF9ERVBFTkRFTkNZX0tFWTogXCJEZXBlbmRlbmN5IGZhaWxlZCAtIGtleSBtdXN0IGV4aXN0OiB7bWlzc2luZ30gKGR1ZSB0byBrZXk6IHtrZXl9KVwiLFxuXHQvLyBBcnJheSBlcnJvcnNcblx0QVJSQVlfTEVOR1RIX1NIT1JUOiBcIkFycmF5IGlzIHRvbyBzaG9ydCAoe2xlbmd0aH0pLCBtaW5pbXVtIHttaW5pbXVtfVwiLFxuXHRBUlJBWV9MRU5HVEhfTE9ORzogXCJBcnJheSBpcyB0b28gbG9uZyAoe2xlbmd0aH0pLCBtYXhpbXVtIHttYXhpbXVtfVwiLFxuXHRBUlJBWV9VTklRVUU6IFwiQXJyYXkgaXRlbXMgYXJlIG5vdCB1bmlxdWUgKGluZGljZXMge21hdGNoMX0gYW5kIHttYXRjaDJ9KVwiLFxuXHRBUlJBWV9BRERJVElPTkFMX0lURU1TOiBcIkFkZGl0aW9uYWwgaXRlbXMgbm90IGFsbG93ZWRcIixcblx0Ly8gRm9ybWF0IGVycm9yc1xuXHRGT1JNQVRfQ1VTVE9NOiBcIkZvcm1hdCB2YWxpZGF0aW9uIGZhaWxlZCAoe21lc3NhZ2V9KVwiLFxuXHRLRVlXT1JEX0NVU1RPTTogXCJLZXl3b3JkIGZhaWxlZDoge2tleX0gKHttZXNzYWdlfSlcIixcblx0Ly8gU2NoZW1hIHN0cnVjdHVyZVxuXHRDSVJDVUxBUl9SRUZFUkVOQ0U6IFwiQ2lyY3VsYXIgJHJlZnM6IHt1cmxzfVwiLFxuXHQvLyBOb24tc3RhbmRhcmQgdmFsaWRhdGlvbiBvcHRpb25zXG5cdFVOS05PV05fUFJPUEVSVFk6IFwiVW5rbm93biBwcm9wZXJ0eSAobm90IGluIHNjaGVtYSlcIlxufTtcblxuZnVuY3Rpb24gVmFsaWRhdGlvbkVycm9yKGNvZGUsIG1lc3NhZ2UsIHBhcmFtcywgZGF0YVBhdGgsIHNjaGVtYVBhdGgsIHN1YkVycm9ycykge1xuXHRFcnJvci5jYWxsKHRoaXMpO1xuXHRpZiAoY29kZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yIChcIk5vIGNvZGUgc3VwcGxpZWQgZm9yIGVycm9yOiBcIisgbWVzc2FnZSk7XG5cdH1cblx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0dGhpcy5wYXJhbXMgPSBwYXJhbXM7XG5cdHRoaXMuY29kZSA9IGNvZGU7XG5cdHRoaXMuZGF0YVBhdGggPSBkYXRhUGF0aCB8fCBcIlwiO1xuXHR0aGlzLnNjaGVtYVBhdGggPSBzY2hlbWFQYXRoIHx8IFwiXCI7XG5cdHRoaXMuc3ViRXJyb3JzID0gc3ViRXJyb3JzIHx8IG51bGw7XG5cblx0dmFyIGVyciA9IG5ldyBFcnJvcih0aGlzLm1lc3NhZ2UpO1xuXHR0aGlzLnN0YWNrID0gZXJyLnN0YWNrIHx8IGVyci5zdGFja3RyYWNlO1xuXHRpZiAoIXRoaXMuc3RhY2spIHtcblx0XHR0cnkge1xuXHRcdFx0dGhyb3cgZXJyO1xuXHRcdH1cblx0XHRjYXRjaChlcnIpIHtcblx0XHRcdHRoaXMuc3RhY2sgPSBlcnIuc3RhY2sgfHwgZXJyLnN0YWNrdHJhY2U7XG5cdFx0fVxuXHR9XG59XG5WYWxpZGF0aW9uRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuVmFsaWRhdGlvbkVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFZhbGlkYXRpb25FcnJvcjtcblZhbGlkYXRpb25FcnJvci5wcm90b3R5cGUubmFtZSA9ICdWYWxpZGF0aW9uRXJyb3InO1xuXG5WYWxpZGF0aW9uRXJyb3IucHJvdG90eXBlLnByZWZpeFdpdGggPSBmdW5jdGlvbiAoZGF0YVByZWZpeCwgc2NoZW1hUHJlZml4KSB7XG5cdGlmIChkYXRhUHJlZml4ICE9PSBudWxsKSB7XG5cdFx0ZGF0YVByZWZpeCA9IGRhdGFQcmVmaXgucmVwbGFjZSgvfi9nLCBcIn4wXCIpLnJlcGxhY2UoL1xcLy9nLCBcIn4xXCIpO1xuXHRcdHRoaXMuZGF0YVBhdGggPSBcIi9cIiArIGRhdGFQcmVmaXggKyB0aGlzLmRhdGFQYXRoO1xuXHR9XG5cdGlmIChzY2hlbWFQcmVmaXggIT09IG51bGwpIHtcblx0XHRzY2hlbWFQcmVmaXggPSBzY2hlbWFQcmVmaXgucmVwbGFjZSgvfi9nLCBcIn4wXCIpLnJlcGxhY2UoL1xcLy9nLCBcIn4xXCIpO1xuXHRcdHRoaXMuc2NoZW1hUGF0aCA9IFwiL1wiICsgc2NoZW1hUHJlZml4ICsgdGhpcy5zY2hlbWFQYXRoO1xuXHR9XG5cdGlmICh0aGlzLnN1YkVycm9ycyAhPT0gbnVsbCkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdWJFcnJvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMuc3ViRXJyb3JzW2ldLnByZWZpeFdpdGgoZGF0YVByZWZpeCwgc2NoZW1hUHJlZml4KTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBpc1RydXN0ZWRVcmwoYmFzZVVybCwgdGVzdFVybCkge1xuXHRpZih0ZXN0VXJsLnN1YnN0cmluZygwLCBiYXNlVXJsLmxlbmd0aCkgPT09IGJhc2VVcmwpe1xuXHRcdHZhciByZW1haW5kZXIgPSB0ZXN0VXJsLnN1YnN0cmluZyhiYXNlVXJsLmxlbmd0aCk7XG5cdFx0aWYgKCh0ZXN0VXJsLmxlbmd0aCA+IDAgJiYgdGVzdFVybC5jaGFyQXQoYmFzZVVybC5sZW5ndGggLSAxKSA9PT0gXCIvXCIpXG5cdFx0XHR8fCByZW1haW5kZXIuY2hhckF0KDApID09PSBcIiNcIlxuXHRcdFx0fHwgcmVtYWluZGVyLmNoYXJBdCgwKSA9PT0gXCI/XCIpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbnZhciBsYW5ndWFnZXMgPSB7fTtcbmZ1bmN0aW9uIGNyZWF0ZUFwaShsYW5ndWFnZSkge1xuXHR2YXIgZ2xvYmFsQ29udGV4dCA9IG5ldyBWYWxpZGF0b3JDb250ZXh0KCk7XG5cdHZhciBjdXJyZW50TGFuZ3VhZ2UgPSBsYW5ndWFnZSB8fCAnZW4nO1xuXHR2YXIgYXBpID0ge1xuXHRcdGFkZEZvcm1hdDogZnVuY3Rpb24gKCkge1xuXHRcdFx0Z2xvYmFsQ29udGV4dC5hZGRGb3JtYXQuYXBwbHkoZ2xvYmFsQ29udGV4dCwgYXJndW1lbnRzKTtcblx0XHR9LFxuXHRcdGxhbmd1YWdlOiBmdW5jdGlvbiAoY29kZSkge1xuXHRcdFx0aWYgKCFjb2RlKSB7XG5cdFx0XHRcdHJldHVybiBjdXJyZW50TGFuZ3VhZ2U7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWxhbmd1YWdlc1tjb2RlXSkge1xuXHRcdFx0XHRjb2RlID0gY29kZS5zcGxpdCgnLScpWzBdOyAvLyBmYWxsIGJhY2sgdG8gYmFzZSBsYW5ndWFnZVxuXHRcdFx0fVxuXHRcdFx0aWYgKGxhbmd1YWdlc1tjb2RlXSkge1xuXHRcdFx0XHRjdXJyZW50TGFuZ3VhZ2UgPSBjb2RlO1xuXHRcdFx0XHRyZXR1cm4gY29kZTsgLy8gc28geW91IGNhbiB0ZWxsIGlmIGZhbGwtYmFjayBoYXMgaGFwcGVuZWRcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9LFxuXHRcdGFkZExhbmd1YWdlOiBmdW5jdGlvbiAoY29kZSwgbWVzc2FnZU1hcCkge1xuXHRcdFx0dmFyIGtleTtcblx0XHRcdGZvciAoa2V5IGluIEVycm9yQ29kZXMpIHtcblx0XHRcdFx0aWYgKG1lc3NhZ2VNYXBba2V5XSAmJiAhbWVzc2FnZU1hcFtFcnJvckNvZGVzW2tleV1dKSB7XG5cdFx0XHRcdFx0bWVzc2FnZU1hcFtFcnJvckNvZGVzW2tleV1dID0gbWVzc2FnZU1hcFtrZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR2YXIgcm9vdENvZGUgPSBjb2RlLnNwbGl0KCctJylbMF07XG5cdFx0XHRpZiAoIWxhbmd1YWdlc1tyb290Q29kZV0pIHsgLy8gdXNlIGZvciBiYXNlIGxhbmd1YWdlIGlmIG5vdCB5ZXQgZGVmaW5lZFxuXHRcdFx0XHRsYW5ndWFnZXNbY29kZV0gPSBtZXNzYWdlTWFwO1xuXHRcdFx0XHRsYW5ndWFnZXNbcm9vdENvZGVdID0gbWVzc2FnZU1hcDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxhbmd1YWdlc1tjb2RlXSA9IE9iamVjdC5jcmVhdGUobGFuZ3VhZ2VzW3Jvb3RDb2RlXSk7XG5cdFx0XHRcdGZvciAoa2V5IGluIG1lc3NhZ2VNYXApIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGxhbmd1YWdlc1tyb290Q29kZV1ba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdGxhbmd1YWdlc1tyb290Q29kZV1ba2V5XSA9IG1lc3NhZ2VNYXBba2V5XTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bGFuZ3VhZ2VzW2NvZGVdW2tleV0gPSBtZXNzYWdlTWFwW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cdFx0ZnJlc2hBcGk6IGZ1bmN0aW9uIChsYW5ndWFnZSkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IGNyZWF0ZUFwaSgpO1xuXHRcdFx0aWYgKGxhbmd1YWdlKSB7XG5cdFx0XHRcdHJlc3VsdC5sYW5ndWFnZShsYW5ndWFnZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0dmFsaWRhdGU6IGZ1bmN0aW9uIChkYXRhLCBzY2hlbWEsIGNoZWNrUmVjdXJzaXZlLCBiYW5Vbmtub3duUHJvcGVydGllcykge1xuXHRcdFx0dmFyIGNvbnRleHQgPSBuZXcgVmFsaWRhdG9yQ29udGV4dChnbG9iYWxDb250ZXh0LCBmYWxzZSwgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0sIGNoZWNrUmVjdXJzaXZlLCBiYW5Vbmtub3duUHJvcGVydGllcyk7XG5cdFx0XHRpZiAodHlwZW9mIHNjaGVtYSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRzY2hlbWEgPSB7XCIkcmVmXCI6IHNjaGVtYX07XG5cdFx0XHR9XG5cdFx0XHRjb250ZXh0LmFkZFNjaGVtYShcIlwiLCBzY2hlbWEpO1xuXHRcdFx0dmFyIGVycm9yID0gY29udGV4dC52YWxpZGF0ZUFsbChkYXRhLCBzY2hlbWEsIG51bGwsIG51bGwsIFwiXCIpO1xuXHRcdFx0aWYgKCFlcnJvciAmJiBiYW5Vbmtub3duUHJvcGVydGllcykge1xuXHRcdFx0XHRlcnJvciA9IGNvbnRleHQuYmFuVW5rbm93blByb3BlcnRpZXMoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuZXJyb3IgPSBlcnJvcjtcblx0XHRcdHRoaXMubWlzc2luZyA9IGNvbnRleHQubWlzc2luZztcblx0XHRcdHRoaXMudmFsaWQgPSAoZXJyb3IgPT09IG51bGwpO1xuXHRcdFx0cmV0dXJuIHRoaXMudmFsaWQ7XG5cdFx0fSxcblx0XHR2YWxpZGF0ZVJlc3VsdDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHt9O1xuXHRcdFx0dGhpcy52YWxpZGF0ZS5hcHBseShyZXN1bHQsIGFyZ3VtZW50cyk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0dmFsaWRhdGVNdWx0aXBsZTogZnVuY3Rpb24gKGRhdGEsIHNjaGVtYSwgY2hlY2tSZWN1cnNpdmUsIGJhblVua25vd25Qcm9wZXJ0aWVzKSB7XG5cdFx0XHR2YXIgY29udGV4dCA9IG5ldyBWYWxpZGF0b3JDb250ZXh0KGdsb2JhbENvbnRleHQsIHRydWUsIGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLCBjaGVja1JlY3Vyc2l2ZSwgYmFuVW5rbm93blByb3BlcnRpZXMpO1xuXHRcdFx0aWYgKHR5cGVvZiBzY2hlbWEgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0c2NoZW1hID0ge1wiJHJlZlwiOiBzY2hlbWF9O1xuXHRcdFx0fVxuXHRcdFx0Y29udGV4dC5hZGRTY2hlbWEoXCJcIiwgc2NoZW1hKTtcblx0XHRcdGNvbnRleHQudmFsaWRhdGVBbGwoZGF0YSwgc2NoZW1hLCBudWxsLCBudWxsLCBcIlwiKTtcblx0XHRcdGlmIChiYW5Vbmtub3duUHJvcGVydGllcykge1xuXHRcdFx0XHRjb250ZXh0LmJhblVua25vd25Qcm9wZXJ0aWVzKCk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgcmVzdWx0ID0ge307XG5cdFx0XHRyZXN1bHQuZXJyb3JzID0gY29udGV4dC5lcnJvcnM7XG5cdFx0XHRyZXN1bHQubWlzc2luZyA9IGNvbnRleHQubWlzc2luZztcblx0XHRcdHJlc3VsdC52YWxpZCA9IChyZXN1bHQuZXJyb3JzLmxlbmd0aCA9PT0gMCk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0YWRkU2NoZW1hOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gZ2xvYmFsQ29udGV4dC5hZGRTY2hlbWEuYXBwbHkoZ2xvYmFsQ29udGV4dCwgYXJndW1lbnRzKTtcblx0XHR9LFxuXHRcdGdldFNjaGVtYTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGdsb2JhbENvbnRleHQuZ2V0U2NoZW1hLmFwcGx5KGdsb2JhbENvbnRleHQsIGFyZ3VtZW50cyk7XG5cdFx0fSxcblx0XHRnZXRTY2hlbWFNYXA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBnbG9iYWxDb250ZXh0LmdldFNjaGVtYU1hcC5hcHBseShnbG9iYWxDb250ZXh0LCBhcmd1bWVudHMpO1xuXHRcdH0sXG5cdFx0Z2V0U2NoZW1hVXJpczogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGdsb2JhbENvbnRleHQuZ2V0U2NoZW1hVXJpcy5hcHBseShnbG9iYWxDb250ZXh0LCBhcmd1bWVudHMpO1xuXHRcdH0sXG5cdFx0Z2V0TWlzc2luZ1VyaXM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBnbG9iYWxDb250ZXh0LmdldE1pc3NpbmdVcmlzLmFwcGx5KGdsb2JhbENvbnRleHQsIGFyZ3VtZW50cyk7XG5cdFx0fSxcblx0XHRkcm9wU2NoZW1hczogZnVuY3Rpb24gKCkge1xuXHRcdFx0Z2xvYmFsQ29udGV4dC5kcm9wU2NoZW1hcy5hcHBseShnbG9iYWxDb250ZXh0LCBhcmd1bWVudHMpO1xuXHRcdH0sXG5cdFx0ZGVmaW5lS2V5d29yZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0Z2xvYmFsQ29udGV4dC5kZWZpbmVLZXl3b3JkLmFwcGx5KGdsb2JhbENvbnRleHQsIGFyZ3VtZW50cyk7XG5cdFx0fSxcblx0XHRkZWZpbmVFcnJvcjogZnVuY3Rpb24gKGNvZGVOYW1lLCBjb2RlTnVtYmVyLCBkZWZhdWx0TWVzc2FnZSkge1xuXHRcdFx0aWYgKHR5cGVvZiBjb2RlTmFtZSAhPT0gJ3N0cmluZycgfHwgIS9eW0EtWl0rKF9bQS1aXSspKiQvLnRlc3QoY29kZU5hbWUpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignQ29kZSBuYW1lIG11c3QgYmUgYSBzdHJpbmcgaW4gVVBQRVJfQ0FTRV9XSVRIX1VOREVSU0NPUkVTJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIGNvZGVOdW1iZXIgIT09ICdudW1iZXInIHx8IGNvZGVOdW1iZXIlMSAhPT0gMCB8fCBjb2RlTnVtYmVyIDwgMTAwMDApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDb2RlIG51bWJlciBtdXN0IGJlIGFuIGludGVnZXIgPiAxMDAwMCcpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBFcnJvckNvZGVzW2NvZGVOYW1lXSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFcnJvciBhbHJlYWR5IGRlZmluZWQ6ICcgKyBjb2RlTmFtZSArICcgYXMgJyArIEVycm9yQ29kZXNbY29kZU5hbWVdKTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgRXJyb3JDb2RlTG9va3VwW2NvZGVOdW1iZXJdICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGNvZGUgYWxyZWFkeSB1c2VkOiAnICsgRXJyb3JDb2RlTG9va3VwW2NvZGVOdW1iZXJdICsgJyBhcyAnICsgY29kZU51bWJlcik7XG5cdFx0XHR9XG5cdFx0XHRFcnJvckNvZGVzW2NvZGVOYW1lXSA9IGNvZGVOdW1iZXI7XG5cdFx0XHRFcnJvckNvZGVMb29rdXBbY29kZU51bWJlcl0gPSBjb2RlTmFtZTtcblx0XHRcdEVycm9yTWVzc2FnZXNEZWZhdWx0W2NvZGVOYW1lXSA9IEVycm9yTWVzc2FnZXNEZWZhdWx0W2NvZGVOdW1iZXJdID0gZGVmYXVsdE1lc3NhZ2U7XG5cdFx0XHRmb3IgKHZhciBsYW5nQ29kZSBpbiBsYW5ndWFnZXMpIHtcblx0XHRcdFx0dmFyIGxhbmd1YWdlID0gbGFuZ3VhZ2VzW2xhbmdDb2RlXTtcblx0XHRcdFx0aWYgKGxhbmd1YWdlW2NvZGVOYW1lXSkge1xuXHRcdFx0XHRcdGxhbmd1YWdlW2NvZGVOdW1iZXJdID0gbGFuZ3VhZ2VbY29kZU51bWJlcl0gfHwgbGFuZ3VhZ2VbY29kZU5hbWVdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRyZXNldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0Z2xvYmFsQ29udGV4dC5yZXNldCgpO1xuXHRcdFx0dGhpcy5lcnJvciA9IG51bGw7XG5cdFx0XHR0aGlzLm1pc3NpbmcgPSBbXTtcblx0XHRcdHRoaXMudmFsaWQgPSB0cnVlO1xuXHRcdH0sXG5cdFx0bWlzc2luZzogW10sXG5cdFx0ZXJyb3I6IG51bGwsXG5cdFx0dmFsaWQ6IHRydWUsXG5cdFx0bm9ybVNjaGVtYTogbm9ybVNjaGVtYSxcblx0XHRyZXNvbHZlVXJsOiByZXNvbHZlVXJsLFxuXHRcdGdldERvY3VtZW50VXJpOiBnZXREb2N1bWVudFVyaSxcblx0XHRlcnJvckNvZGVzOiBFcnJvckNvZGVzXG5cdH07XG5cdHJldHVybiBhcGk7XG59XG5cbnZhciB0djQgPSBjcmVhdGVBcGkoKTtcbnR2NC5hZGRMYW5ndWFnZSgnZW4tZ2InLCBFcnJvck1lc3NhZ2VzRGVmYXVsdCk7XG5cbi8vbGVnYWN5IHByb3BlcnR5XG50djQudHY0ID0gdHY0O1xuXG5yZXR1cm4gdHY0OyAvLyB1c2VkIGJ5IF9oZWFkZXIuanMgdG8gZ2xvYmFsaXNlLlxuXG59KSk7IiwiLy8gICAgIFVuZGVyc2NvcmUuanMgMS43LjBcbi8vICAgICBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuLy8gICAgIChjKSAyMDA5LTIwMTQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG4oZnVuY3Rpb24oKSB7XG5cbiAgLy8gQmFzZWxpbmUgc2V0dXBcbiAgLy8gLS0tLS0tLS0tLS0tLS1cblxuICAvLyBFc3RhYmxpc2ggdGhlIHJvb3Qgb2JqZWN0LCBgd2luZG93YCBpbiB0aGUgYnJvd3Nlciwgb3IgYGV4cG9ydHNgIG9uIHRoZSBzZXJ2ZXIuXG4gIHZhciByb290ID0gdGhpcztcblxuICAvLyBTYXZlIHRoZSBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgYF9gIHZhcmlhYmxlLlxuICB2YXIgcHJldmlvdXNVbmRlcnNjb3JlID0gcm9vdC5fO1xuXG4gIC8vIFNhdmUgYnl0ZXMgaW4gdGhlIG1pbmlmaWVkIChidXQgbm90IGd6aXBwZWQpIHZlcnNpb246XG4gIHZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLCBPYmpQcm90byA9IE9iamVjdC5wcm90b3R5cGUsIEZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuICAvLyBDcmVhdGUgcXVpY2sgcmVmZXJlbmNlIHZhcmlhYmxlcyBmb3Igc3BlZWQgYWNjZXNzIHRvIGNvcmUgcHJvdG90eXBlcy5cbiAgdmFyXG4gICAgcHVzaCAgICAgICAgICAgICA9IEFycmF5UHJvdG8ucHVzaCxcbiAgICBzbGljZSAgICAgICAgICAgID0gQXJyYXlQcm90by5zbGljZSxcbiAgICBjb25jYXQgICAgICAgICAgID0gQXJyYXlQcm90by5jb25jYXQsXG4gICAgdG9TdHJpbmcgICAgICAgICA9IE9ialByb3RvLnRvU3RyaW5nLFxuICAgIGhhc093blByb3BlcnR5ICAgPSBPYmpQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuICAvLyBBbGwgKipFQ01BU2NyaXB0IDUqKiBuYXRpdmUgZnVuY3Rpb24gaW1wbGVtZW50YXRpb25zIHRoYXQgd2UgaG9wZSB0byB1c2VcbiAgLy8gYXJlIGRlY2xhcmVkIGhlcmUuXG4gIHZhclxuICAgIG5hdGl2ZUlzQXJyYXkgICAgICA9IEFycmF5LmlzQXJyYXksXG4gICAgbmF0aXZlS2V5cyAgICAgICAgID0gT2JqZWN0LmtleXMsXG4gICAgbmF0aXZlQmluZCAgICAgICAgID0gRnVuY1Byb3RvLmJpbmQ7XG5cbiAgLy8gQ3JlYXRlIGEgc2FmZSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0IGZvciB1c2UgYmVsb3cuXG4gIHZhciBfID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIF8pIHJldHVybiBvYmo7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIF8pKSByZXR1cm4gbmV3IF8ob2JqKTtcbiAgICB0aGlzLl93cmFwcGVkID0gb2JqO1xuICB9O1xuXG4gIC8vIEV4cG9ydCB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yICoqTm9kZS5qcyoqLCB3aXRoXG4gIC8vIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5IGZvciB0aGUgb2xkIGByZXF1aXJlKClgIEFQSS4gSWYgd2UncmUgaW5cbiAgLy8gdGhlIGJyb3dzZXIsIGFkZCBgX2AgYXMgYSBnbG9iYWwgb2JqZWN0LlxuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfO1xuICAgIH1cbiAgICBleHBvcnRzLl8gPSBfO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuXyA9IF87XG4gIH1cblxuICAvLyBDdXJyZW50IHZlcnNpb24uXG4gIF8uVkVSU0lPTiA9ICcxLjcuMCc7XG5cbiAgLy8gSW50ZXJuYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGVmZmljaWVudCAoZm9yIGN1cnJlbnQgZW5naW5lcykgdmVyc2lvblxuICAvLyBvZiB0aGUgcGFzc2VkLWluIGNhbGxiYWNrLCB0byBiZSByZXBlYXRlZGx5IGFwcGxpZWQgaW4gb3RoZXIgVW5kZXJzY29yZVxuICAvLyBmdW5jdGlvbnMuXG4gIHZhciBjcmVhdGVDYWxsYmFjayA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQsIGFyZ0NvdW50KSB7XG4gICAgaWYgKGNvbnRleHQgPT09IHZvaWQgMCkgcmV0dXJuIGZ1bmM7XG4gICAgc3dpdGNoIChhcmdDb3VudCA9PSBudWxsID8gMyA6IGFyZ0NvdW50KSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIHZhbHVlKTtcbiAgICAgIH07XG4gICAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgb3RoZXIpO1xuICAgICAgfTtcbiAgICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgICB9O1xuICAgICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEEgbW9zdGx5LWludGVybmFsIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGNhbGxiYWNrcyB0aGF0IGNhbiBiZSBhcHBsaWVkXG4gIC8vIHRvIGVhY2ggZWxlbWVudCBpbiBhIGNvbGxlY3Rpb24sIHJldHVybmluZyB0aGUgZGVzaXJlZCByZXN1bHQg4oCUIGVpdGhlclxuICAvLyBpZGVudGl0eSwgYW4gYXJiaXRyYXJ5IGNhbGxiYWNrLCBhIHByb3BlcnR5IG1hdGNoZXIsIG9yIGEgcHJvcGVydHkgYWNjZXNzb3IuXG4gIF8uaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIF8uaWRlbnRpdHk7XG4gICAgaWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybiBjcmVhdGVDYWxsYmFjayh2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpO1xuICAgIGlmIChfLmlzT2JqZWN0KHZhbHVlKSkgcmV0dXJuIF8ubWF0Y2hlcyh2YWx1ZSk7XG4gICAgcmV0dXJuIF8ucHJvcGVydHkodmFsdWUpO1xuICB9O1xuXG4gIC8vIENvbGxlY3Rpb24gRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gVGhlIGNvcm5lcnN0b25lLCBhbiBgZWFjaGAgaW1wbGVtZW50YXRpb24sIGFrYSBgZm9yRWFjaGAuXG4gIC8vIEhhbmRsZXMgcmF3IG9iamVjdHMgaW4gYWRkaXRpb24gdG8gYXJyYXktbGlrZXMuIFRyZWF0cyBhbGxcbiAgLy8gc3BhcnNlIGFycmF5LWxpa2VzIGFzIGlmIHRoZXkgd2VyZSBkZW5zZS5cbiAgXy5lYWNoID0gXy5mb3JFYWNoID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIG9iajtcbiAgICBpdGVyYXRlZSA9IGNyZWF0ZUNhbGxiYWNrKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIgaSwgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgICBpZiAobGVuZ3RoID09PSArbGVuZ3RoKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0ZWUob2JqW2ldLCBpLCBvYmopO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRlZShvYmpba2V5c1tpXV0sIGtleXNbaV0sIG9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQuXG4gIF8ubWFwID0gXy5jb2xsZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIFtdO1xuICAgIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSBvYmoubGVuZ3RoICE9PSArb2JqLmxlbmd0aCAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgIHJlc3VsdHMgPSBBcnJheShsZW5ndGgpLFxuICAgICAgICBjdXJyZW50S2V5O1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIHJlc3VsdHNbaW5kZXhdID0gaXRlcmF0ZWUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICB2YXIgcmVkdWNlRXJyb3IgPSAnUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZSc7XG5cbiAgLy8gKipSZWR1Y2UqKiBidWlsZHMgdXAgYSBzaW5nbGUgcmVzdWx0IGZyb20gYSBsaXN0IG9mIHZhbHVlcywgYWthIGBpbmplY3RgLFxuICAvLyBvciBgZm9sZGxgLlxuICBfLnJlZHVjZSA9IF8uZm9sZGwgPSBfLmluamVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGNvbnRleHQpIHtcbiAgICBpZiAob2JqID09IG51bGwpIG9iaiA9IFtdO1xuICAgIGl0ZXJhdGVlID0gY3JlYXRlQ2FsbGJhY2soaXRlcmF0ZWUsIGNvbnRleHQsIDQpO1xuICAgIHZhciBrZXlzID0gb2JqLmxlbmd0aCAhPT0gK29iai5sZW5ndGggJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IDAsIGN1cnJlbnRLZXk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICBpZiAoIWxlbmd0aCkgdGhyb3cgbmV3IFR5cGVFcnJvcihyZWR1Y2VFcnJvcik7XG4gICAgICBtZW1vID0gb2JqW2tleXMgPyBrZXlzW2luZGV4KytdIDogaW5kZXgrK107XG4gICAgfVxuICAgIGZvciAoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgbWVtbyA9IGl0ZXJhdGVlKG1lbW8sIG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG5cbiAgLy8gVGhlIHJpZ2h0LWFzc29jaWF0aXZlIHZlcnNpb24gb2YgcmVkdWNlLCBhbHNvIGtub3duIGFzIGBmb2xkcmAuXG4gIF8ucmVkdWNlUmlnaHQgPSBfLmZvbGRyID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgbWVtbywgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgb2JqID0gW107XG4gICAgaXRlcmF0ZWUgPSBjcmVhdGVDYWxsYmFjayhpdGVyYXRlZSwgY29udGV4dCwgNCk7XG4gICAgdmFyIGtleXMgPSBvYmoubGVuZ3RoICE9PSArIG9iai5sZW5ndGggJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGluZGV4ID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgIGN1cnJlbnRLZXk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICBpZiAoIWluZGV4KSB0aHJvdyBuZXcgVHlwZUVycm9yKHJlZHVjZUVycm9yKTtcbiAgICAgIG1lbW8gPSBvYmpba2V5cyA/IGtleXNbLS1pbmRleF0gOiAtLWluZGV4XTtcbiAgICB9XG4gICAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICAgIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIG1lbW8gPSBpdGVyYXRlZShtZW1vLCBvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgfVxuICAgIHJldHVybiBtZW1vO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgZmlyc3QgdmFsdWUgd2hpY2ggcGFzc2VzIGEgdHJ1dGggdGVzdC4gQWxpYXNlZCBhcyBgZGV0ZWN0YC5cbiAgXy5maW5kID0gXy5kZXRlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHQ7XG4gICAgcHJlZGljYXRlID0gXy5pdGVyYXRlZShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIF8uc29tZShvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGxpc3QpKSB7XG4gICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgcGFzcyBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYHNlbGVjdGAuXG4gIF8uZmlsdGVyID0gXy5zZWxlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gcmVzdWx0cztcbiAgICBwcmVkaWNhdGUgPSBfLml0ZXJhdGVlKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgbGlzdCkpIHJlc3VsdHMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgZm9yIHdoaWNoIGEgdHJ1dGggdGVzdCBmYWlscy5cbiAgXy5yZWplY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmosIF8ubmVnYXRlKF8uaXRlcmF0ZWUocHJlZGljYXRlKSksIGNvbnRleHQpO1xuICB9O1xuXG4gIC8vIERldGVybWluZSB3aGV0aGVyIGFsbCBvZiB0aGUgZWxlbWVudHMgbWF0Y2ggYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBhbGxgLlxuICBfLmV2ZXJ5ID0gXy5hbGwgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgcHJlZGljYXRlID0gXy5pdGVyYXRlZShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gb2JqLmxlbmd0aCAhPT0gK29iai5sZW5ndGggJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICBpbmRleCwgY3VycmVudEtleTtcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIGlmICghcHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgYXQgbGVhc3Qgb25lIGVsZW1lbnQgaW4gdGhlIG9iamVjdCBtYXRjaGVzIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgYW55YC5cbiAgXy5zb21lID0gXy5hbnkgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIHByZWRpY2F0ZSA9IF8uaXRlcmF0ZWUocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9IG9iai5sZW5ndGggIT09ICtvYmoubGVuZ3RoICYmIF8ua2V5cyhvYmopLFxuICAgICAgICBsZW5ndGggPSAoa2V5cyB8fCBvYmopLmxlbmd0aCxcbiAgICAgICAgaW5kZXgsIGN1cnJlbnRLZXk7XG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAocHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgdGhlIGFycmF5IG9yIG9iamVjdCBjb250YWlucyBhIGdpdmVuIHZhbHVlICh1c2luZyBgPT09YCkuXG4gIC8vIEFsaWFzZWQgYXMgYGluY2x1ZGVgLlxuICBfLmNvbnRhaW5zID0gXy5pbmNsdWRlID0gZnVuY3Rpb24ob2JqLCB0YXJnZXQpIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICBpZiAob2JqLmxlbmd0aCAhPT0gK29iai5sZW5ndGgpIG9iaiA9IF8udmFsdWVzKG9iaik7XG4gICAgcmV0dXJuIF8uaW5kZXhPZihvYmosIHRhcmdldCkgPj0gMDtcbiAgfTtcblxuICAvLyBJbnZva2UgYSBtZXRob2QgKHdpdGggYXJndW1lbnRzKSBvbiBldmVyeSBpdGVtIGluIGEgY29sbGVjdGlvbi5cbiAgXy5pbnZva2UgPSBmdW5jdGlvbihvYmosIG1ldGhvZCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHZhciBpc0Z1bmMgPSBfLmlzRnVuY3Rpb24obWV0aG9kKTtcbiAgICByZXR1cm4gXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIChpc0Z1bmMgPyBtZXRob2QgOiB2YWx1ZVttZXRob2RdKS5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgbWFwYDogZmV0Y2hpbmcgYSBwcm9wZXJ0eS5cbiAgXy5wbHVjayA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgXy5wcm9wZXJ0eShrZXkpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaWx0ZXJgOiBzZWxlY3Rpbmcgb25seSBvYmplY3RzXG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ud2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5tYXRjaGVzKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmluZGA6IGdldHRpbmcgdGhlIGZpcnN0IG9iamVjdFxuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLmZpbmRXaGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maW5kKG9iaiwgXy5tYXRjaGVzKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtYXhpbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1heCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0gLUluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSAtSW5maW5pdHksXG4gICAgICAgIHZhbHVlLCBjb21wdXRlZDtcbiAgICBpZiAoaXRlcmF0ZWUgPT0gbnVsbCAmJiBvYmogIT0gbnVsbCkge1xuICAgICAgb2JqID0gb2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGggPyBvYmogOiBfLnZhbHVlcyhvYmopO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IG9iai5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZSA9IG9ialtpXTtcbiAgICAgICAgaWYgKHZhbHVlID4gcmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaXRlcmF0ZWUgPSBfLml0ZXJhdGVlKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdCk7XG4gICAgICAgIGlmIChjb21wdXRlZCA+IGxhc3RDb21wdXRlZCB8fCBjb21wdXRlZCA9PT0gLUluZmluaXR5ICYmIHJlc3VsdCA9PT0gLUluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbWluaW11bSBlbGVtZW50IChvciBlbGVtZW50LWJhc2VkIGNvbXB1dGF0aW9uKS5cbiAgXy5taW4gPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdCA9IEluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSBJbmZpbml0eSxcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XG4gICAgICBvYmogPSBvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBpZiAodmFsdWUgPCByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRlZSA9IF8uaXRlcmF0ZWUoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KTtcbiAgICAgICAgaWYgKGNvbXB1dGVkIDwgbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSBJbmZpbml0eSAmJiByZXN1bHQgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFNodWZmbGUgYSBjb2xsZWN0aW9uLCB1c2luZyB0aGUgbW9kZXJuIHZlcnNpb24gb2YgdGhlXG4gIC8vIFtGaXNoZXItWWF0ZXMgc2h1ZmZsZV0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaXNoZXLigJNZYXRlc19zaHVmZmxlKS5cbiAgXy5zaHVmZmxlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHNldCA9IG9iaiAmJiBvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IHNldC5sZW5ndGg7XG4gICAgdmFyIHNodWZmbGVkID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIHJhbmQ7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICByYW5kID0gXy5yYW5kb20oMCwgaW5kZXgpO1xuICAgICAgaWYgKHJhbmQgIT09IGluZGV4KSBzaHVmZmxlZFtpbmRleF0gPSBzaHVmZmxlZFtyYW5kXTtcbiAgICAgIHNodWZmbGVkW3JhbmRdID0gc2V0W2luZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIHNodWZmbGVkO1xuICB9O1xuXG4gIC8vIFNhbXBsZSAqKm4qKiByYW5kb20gdmFsdWVzIGZyb20gYSBjb2xsZWN0aW9uLlxuICAvLyBJZiAqKm4qKiBpcyBub3Qgc3BlY2lmaWVkLCByZXR1cm5zIGEgc2luZ2xlIHJhbmRvbSBlbGVtZW50LlxuICAvLyBUaGUgaW50ZXJuYWwgYGd1YXJkYCBhcmd1bWVudCBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBtYXBgLlxuICBfLnNhbXBsZSA9IGZ1bmN0aW9uKG9iaiwgbiwgZ3VhcmQpIHtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSB7XG4gICAgICBpZiAob2JqLmxlbmd0aCAhPT0gK29iai5sZW5ndGgpIG9iaiA9IF8udmFsdWVzKG9iaik7XG4gICAgICByZXR1cm4gb2JqW18ucmFuZG9tKG9iai5sZW5ndGggLSAxKV07XG4gICAgfVxuICAgIHJldHVybiBfLnNodWZmbGUob2JqKS5zbGljZSgwLCBNYXRoLm1heCgwLCBuKSk7XG4gIH07XG5cbiAgLy8gU29ydCB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uIHByb2R1Y2VkIGJ5IGFuIGl0ZXJhdGVlLlxuICBfLnNvcnRCeSA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IF8uaXRlcmF0ZWUoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHJldHVybiBfLnBsdWNrKF8ubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgY3JpdGVyaWE6IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdClcbiAgICAgIH07XG4gICAgfSkuc29ydChmdW5jdGlvbihsZWZ0LCByaWdodCkge1xuICAgICAgdmFyIGEgPSBsZWZ0LmNyaXRlcmlhO1xuICAgICAgdmFyIGIgPSByaWdodC5jcml0ZXJpYTtcbiAgICAgIGlmIChhICE9PSBiKSB7XG4gICAgICAgIGlmIChhID4gYiB8fCBhID09PSB2b2lkIDApIHJldHVybiAxO1xuICAgICAgICBpZiAoYSA8IGIgfHwgYiA9PT0gdm9pZCAwKSByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGVmdC5pbmRleCAtIHJpZ2h0LmluZGV4O1xuICAgIH0pLCAndmFsdWUnKTtcbiAgfTtcblxuICAvLyBBbiBpbnRlcm5hbCBmdW5jdGlvbiB1c2VkIGZvciBhZ2dyZWdhdGUgXCJncm91cCBieVwiIG9wZXJhdGlvbnMuXG4gIHZhciBncm91cCA9IGZ1bmN0aW9uKGJlaGF2aW9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGtleSA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgb2JqKTtcbiAgICAgICAgYmVoYXZpb3IocmVzdWx0LCB2YWx1ZSwga2V5KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEdyb3VwcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLiBQYXNzIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGVcbiAgLy8gdG8gZ3JvdXAgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjcml0ZXJpb24uXG4gIF8uZ3JvdXBCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmhhcyhyZXN1bHQsIGtleSkpIHJlc3VsdFtrZXldLnB1c2godmFsdWUpOyBlbHNlIHJlc3VsdFtrZXldID0gW3ZhbHVlXTtcbiAgfSk7XG5cbiAgLy8gSW5kZXhlcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLCBzaW1pbGFyIHRvIGBncm91cEJ5YCwgYnV0IGZvclxuICAvLyB3aGVuIHlvdSBrbm93IHRoYXQgeW91ciBpbmRleCB2YWx1ZXMgd2lsbCBiZSB1bmlxdWUuXG4gIF8uaW5kZXhCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH0pO1xuXG4gIC8vIENvdW50cyBpbnN0YW5jZXMgb2YgYW4gb2JqZWN0IHRoYXQgZ3JvdXAgYnkgYSBjZXJ0YWluIGNyaXRlcmlvbi4gUGFzc1xuICAvLyBlaXRoZXIgYSBzdHJpbmcgYXR0cmlidXRlIHRvIGNvdW50IGJ5LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcbiAgLy8gY3JpdGVyaW9uLlxuICBfLmNvdW50QnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoXy5oYXMocmVzdWx0LCBrZXkpKSByZXN1bHRba2V5XSsrOyBlbHNlIHJlc3VsdFtrZXldID0gMTtcbiAgfSk7XG5cbiAgLy8gVXNlIGEgY29tcGFyYXRvciBmdW5jdGlvbiB0byBmaWd1cmUgb3V0IHRoZSBzbWFsbGVzdCBpbmRleCBhdCB3aGljaFxuICAvLyBhbiBvYmplY3Qgc2hvdWxkIGJlIGluc2VydGVkIHNvIGFzIHRvIG1haW50YWluIG9yZGVyLiBVc2VzIGJpbmFyeSBzZWFyY2guXG4gIF8uc29ydGVkSW5kZXggPSBmdW5jdGlvbihhcnJheSwgb2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCwgMSk7XG4gICAgdmFyIHZhbHVlID0gaXRlcmF0ZWUob2JqKTtcbiAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgdmFyIG1pZCA9IGxvdyArIGhpZ2ggPj4+IDE7XG4gICAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbbWlkXSkgPCB2YWx1ZSkgbG93ID0gbWlkICsgMTsgZWxzZSBoaWdoID0gbWlkO1xuICAgIH1cbiAgICByZXR1cm4gbG93O1xuICB9O1xuXG4gIC8vIFNhZmVseSBjcmVhdGUgYSByZWFsLCBsaXZlIGFycmF5IGZyb20gYW55dGhpbmcgaXRlcmFibGUuXG4gIF8udG9BcnJheSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gW107XG4gICAgaWYgKF8uaXNBcnJheShvYmopKSByZXR1cm4gc2xpY2UuY2FsbChvYmopO1xuICAgIGlmIChvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCkgcmV0dXJuIF8ubWFwKG9iaiwgXy5pZGVudGl0eSk7XG4gICAgcmV0dXJuIF8udmFsdWVzKG9iaik7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gYW4gb2JqZWN0LlxuICBfLnNpemUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiAwO1xuICAgIHJldHVybiBvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCA/IG9iai5sZW5ndGggOiBfLmtleXMob2JqKS5sZW5ndGg7XG4gIH07XG5cbiAgLy8gU3BsaXQgYSBjb2xsZWN0aW9uIGludG8gdHdvIGFycmF5czogb25lIHdob3NlIGVsZW1lbnRzIGFsbCBzYXRpc2Z5IHRoZSBnaXZlblxuICAvLyBwcmVkaWNhdGUsIGFuZCBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIGRvIG5vdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGUuXG4gIF8ucGFydGl0aW9uID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBfLml0ZXJhdGVlKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgdmFyIHBhc3MgPSBbXSwgZmFpbCA9IFtdO1xuICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBrZXksIG9iaikge1xuICAgICAgKHByZWRpY2F0ZSh2YWx1ZSwga2V5LCBvYmopID8gcGFzcyA6IGZhaWwpLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBbcGFzcywgZmFpbF07XG4gIH07XG5cbiAgLy8gQXJyYXkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEdldCB0aGUgZmlyc3QgZWxlbWVudCBvZiBhbiBhcnJheS4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiB0aGUgZmlyc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LiBBbGlhc2VkIGFzIGBoZWFkYCBhbmQgYHRha2VgLiBUaGUgKipndWFyZCoqIGNoZWNrXG4gIC8vIGFsbG93cyBpdCB0byB3b3JrIHdpdGggYF8ubWFwYC5cbiAgXy5maXJzdCA9IF8uaGVhZCA9IF8udGFrZSA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xuICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHJldHVybiBhcnJheVswXTtcbiAgICBpZiAobiA8IDApIHJldHVybiBbXTtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgMCwgbik7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgbGFzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEVzcGVjaWFsbHkgdXNlZnVsIG9uXG4gIC8vIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIGFsbCB0aGUgdmFsdWVzIGluXG4gIC8vIHRoZSBhcnJheSwgZXhjbHVkaW5nIHRoZSBsYXN0IE4uIFRoZSAqKmd1YXJkKiogY2hlY2sgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aFxuICAvLyBgXy5tYXBgLlxuICBfLmluaXRpYWwgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgMCwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gKG4gPT0gbnVsbCB8fCBndWFyZCA/IDEgOiBuKSkpO1xuICB9O1xuXG4gIC8vIEdldCB0aGUgbGFzdCBlbGVtZW50IG9mIGFuIGFycmF5LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIHRoZSBsYXN0IE5cbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS4gVGhlICoqZ3VhcmQqKiBjaGVjayBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8ubGFzdCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xuICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgTWF0aC5tYXgoYXJyYXkubGVuZ3RoIC0gbiwgMCkpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGZpcnN0IGVudHJ5IG9mIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgdGFpbGAgYW5kIGBkcm9wYC5cbiAgLy8gRXNwZWNpYWxseSB1c2VmdWwgb24gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgYW4gKipuKiogd2lsbCByZXR1cm5cbiAgLy8gdGhlIHJlc3QgTiB2YWx1ZXMgaW4gdGhlIGFycmF5LiBUaGUgKipndWFyZCoqXG4gIC8vIGNoZWNrIGFsbG93cyBpdCB0byB3b3JrIHdpdGggYF8ubWFwYC5cbiAgXy5yZXN0ID0gXy50YWlsID0gXy5kcm9wID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIG4gPT0gbnVsbCB8fCBndWFyZCA/IDEgOiBuKTtcbiAgfTtcblxuICAvLyBUcmltIG91dCBhbGwgZmFsc3kgdmFsdWVzIGZyb20gYW4gYXJyYXkuXG4gIF8uY29tcGFjdCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCBfLmlkZW50aXR5KTtcbiAgfTtcblxuICAvLyBJbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBvZiBhIHJlY3Vyc2l2ZSBgZmxhdHRlbmAgZnVuY3Rpb24uXG4gIHZhciBmbGF0dGVuID0gZnVuY3Rpb24oaW5wdXQsIHNoYWxsb3csIHN0cmljdCwgb3V0cHV0KSB7XG4gICAgaWYgKHNoYWxsb3cgJiYgXy5ldmVyeShpbnB1dCwgXy5pc0FycmF5KSkge1xuICAgICAgcmV0dXJuIGNvbmNhdC5hcHBseShvdXRwdXQsIGlucHV0KTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsdWUgPSBpbnB1dFtpXTtcbiAgICAgIGlmICghXy5pc0FycmF5KHZhbHVlKSAmJiAhXy5pc0FyZ3VtZW50cyh2YWx1ZSkpIHtcbiAgICAgICAgaWYgKCFzdHJpY3QpIG91dHB1dC5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoc2hhbGxvdykge1xuICAgICAgICBwdXNoLmFwcGx5KG91dHB1dCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmxhdHRlbih2YWx1ZSwgc2hhbGxvdywgc3RyaWN0LCBvdXRwdXQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xuXG4gIC8vIEZsYXR0ZW4gb3V0IGFuIGFycmF5LCBlaXRoZXIgcmVjdXJzaXZlbHkgKGJ5IGRlZmF1bHQpLCBvciBqdXN0IG9uZSBsZXZlbC5cbiAgXy5mbGF0dGVuID0gZnVuY3Rpb24oYXJyYXksIHNoYWxsb3cpIHtcbiAgICByZXR1cm4gZmxhdHRlbihhcnJheSwgc2hhbGxvdywgZmFsc2UsIFtdKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSB2ZXJzaW9uIG9mIHRoZSBhcnJheSB0aGF0IGRvZXMgbm90IGNvbnRhaW4gdGhlIHNwZWNpZmllZCB2YWx1ZShzKS5cbiAgXy53aXRob3V0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5kaWZmZXJlbmNlKGFycmF5LCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICB9O1xuXG4gIC8vIFByb2R1Y2UgYSBkdXBsaWNhdGUtZnJlZSB2ZXJzaW9uIG9mIHRoZSBhcnJheS4gSWYgdGhlIGFycmF5IGhhcyBhbHJlYWR5XG4gIC8vIGJlZW4gc29ydGVkLCB5b3UgaGF2ZSB0aGUgb3B0aW9uIG9mIHVzaW5nIGEgZmFzdGVyIGFsZ29yaXRobS5cbiAgLy8gQWxpYXNlZCBhcyBgdW5pcXVlYC5cbiAgXy51bmlxID0gXy51bmlxdWUgPSBmdW5jdGlvbihhcnJheSwgaXNTb3J0ZWQsIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiBbXTtcbiAgICBpZiAoIV8uaXNCb29sZWFuKGlzU29ydGVkKSkge1xuICAgICAgY29udGV4dCA9IGl0ZXJhdGVlO1xuICAgICAgaXRlcmF0ZWUgPSBpc1NvcnRlZDtcbiAgICAgIGlzU29ydGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpdGVyYXRlZSAhPSBudWxsKSBpdGVyYXRlZSA9IF8uaXRlcmF0ZWUoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgc2VlbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlID0gYXJyYXlbaV07XG4gICAgICBpZiAoaXNTb3J0ZWQpIHtcbiAgICAgICAgaWYgKCFpIHx8IHNlZW4gIT09IHZhbHVlKSByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIHNlZW4gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgdmFyIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGksIGFycmF5KTtcbiAgICAgICAgaWYgKF8uaW5kZXhPZihzZWVuLCBjb21wdXRlZCkgPCAwKSB7XG4gICAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXy5pbmRleE9mKHJlc3VsdCwgdmFsdWUpIDwgMCkge1xuICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSB1bmlvbjogZWFjaCBkaXN0aW5jdCBlbGVtZW50IGZyb20gYWxsIG9mXG4gIC8vIHRoZSBwYXNzZWQtaW4gYXJyYXlzLlxuICBfLnVuaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIF8udW5pcShmbGF0dGVuKGFyZ3VtZW50cywgdHJ1ZSwgdHJ1ZSwgW10pKTtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgZXZlcnkgaXRlbSBzaGFyZWQgYmV0d2VlbiBhbGwgdGhlXG4gIC8vIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8uaW50ZXJzZWN0aW9uID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIFtdO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgYXJnc0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKF8uY29udGFpbnMocmVzdWx0LCBpdGVtKSkgY29udGludWU7XG4gICAgICBmb3IgKHZhciBqID0gMTsgaiA8IGFyZ3NMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoIV8uY29udGFpbnMoYXJndW1lbnRzW2pdLCBpdGVtKSkgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaiA9PT0gYXJnc0xlbmd0aCkgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gVGFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9uZSBhcnJheSBhbmQgYSBudW1iZXIgb2Ygb3RoZXIgYXJyYXlzLlxuICAvLyBPbmx5IHRoZSBlbGVtZW50cyBwcmVzZW50IGluIGp1c3QgdGhlIGZpcnN0IGFycmF5IHdpbGwgcmVtYWluLlxuICBfLmRpZmZlcmVuY2UgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciByZXN0ID0gZmxhdHRlbihzbGljZS5jYWxsKGFyZ3VtZW50cywgMSksIHRydWUsIHRydWUsIFtdKTtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIHJldHVybiAhXy5jb250YWlucyhyZXN0LCB2YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gWmlwIHRvZ2V0aGVyIG11bHRpcGxlIGxpc3RzIGludG8gYSBzaW5nbGUgYXJyYXkgLS0gZWxlbWVudHMgdGhhdCBzaGFyZVxuICAvLyBhbiBpbmRleCBnbyB0b2dldGhlci5cbiAgXy56aXAgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gW107XG4gICAgdmFyIGxlbmd0aCA9IF8ubWF4KGFyZ3VtZW50cywgJ2xlbmd0aCcpLmxlbmd0aDtcbiAgICB2YXIgcmVzdWx0cyA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0c1tpXSA9IF8ucGx1Y2soYXJndW1lbnRzLCBpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQ29udmVydHMgbGlzdHMgaW50byBvYmplY3RzLiBQYXNzIGVpdGhlciBhIHNpbmdsZSBhcnJheSBvZiBgW2tleSwgdmFsdWVdYFxuICAvLyBwYWlycywgb3IgdHdvIHBhcmFsbGVsIGFycmF5cyBvZiB0aGUgc2FtZSBsZW5ndGggLS0gb25lIG9mIGtleXMsIGFuZCBvbmUgb2ZcbiAgLy8gdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICBfLm9iamVjdCA9IGZ1bmN0aW9uKGxpc3QsIHZhbHVlcykge1xuICAgIGlmIChsaXN0ID09IG51bGwpIHJldHVybiB7fTtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgcmVzdWx0W2xpc3RbaV1dID0gdmFsdWVzW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0W2xpc3RbaV1bMF1dID0gbGlzdFtpXVsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksXG4gIC8vIG9yIC0xIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuXG4gIC8vIElmIHRoZSBhcnJheSBpcyBsYXJnZSBhbmQgYWxyZWFkeSBpbiBzb3J0IG9yZGVyLCBwYXNzIGB0cnVlYFxuICAvLyBmb3IgKippc1NvcnRlZCoqIHRvIHVzZSBiaW5hcnkgc2VhcmNoLlxuICBfLmluZGV4T2YgPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgaXNTb3J0ZWQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIC0xO1xuICAgIHZhciBpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGlmIChpc1NvcnRlZCkge1xuICAgICAgaWYgKHR5cGVvZiBpc1NvcnRlZCA9PSAnbnVtYmVyJykge1xuICAgICAgICBpID0gaXNTb3J0ZWQgPCAwID8gTWF0aC5tYXgoMCwgbGVuZ3RoICsgaXNTb3J0ZWQpIDogaXNTb3J0ZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpID0gXy5zb3J0ZWRJbmRleChhcnJheSwgaXRlbSk7XG4gICAgICAgIHJldHVybiBhcnJheVtpXSA9PT0gaXRlbSA/IGkgOiAtMTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykgaWYgKGFycmF5W2ldID09PSBpdGVtKSByZXR1cm4gaTtcbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgXy5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBmcm9tKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiAtMTtcbiAgICB2YXIgaWR4ID0gYXJyYXkubGVuZ3RoO1xuICAgIGlmICh0eXBlb2YgZnJvbSA9PSAnbnVtYmVyJykge1xuICAgICAgaWR4ID0gZnJvbSA8IDAgPyBpZHggKyBmcm9tICsgMSA6IE1hdGgubWluKGlkeCwgZnJvbSArIDEpO1xuICAgIH1cbiAgICB3aGlsZSAoLS1pZHggPj0gMCkgaWYgKGFycmF5W2lkeF0gPT09IGl0ZW0pIHJldHVybiBpZHg7XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlIGFuIGludGVnZXIgQXJyYXkgY29udGFpbmluZyBhbiBhcml0aG1ldGljIHByb2dyZXNzaW9uLiBBIHBvcnQgb2ZcbiAgLy8gdGhlIG5hdGl2ZSBQeXRob24gYHJhbmdlKClgIGZ1bmN0aW9uLiBTZWVcbiAgLy8gW3RoZSBQeXRob24gZG9jdW1lbnRhdGlvbl0oaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L2Z1bmN0aW9ucy5odG1sI3JhbmdlKS5cbiAgXy5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPD0gMSkge1xuICAgICAgc3RvcCA9IHN0YXJ0IHx8IDA7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIHN0ZXAgPSBzdGVwIHx8IDE7XG5cbiAgICB2YXIgbGVuZ3RoID0gTWF0aC5tYXgoTWF0aC5jZWlsKChzdG9wIC0gc3RhcnQpIC8gc3RlcCksIDApO1xuICAgIHZhciByYW5nZSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBsZW5ndGg7IGlkeCsrLCBzdGFydCArPSBzdGVwKSB7XG4gICAgICByYW5nZVtpZHhdID0gc3RhcnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhbmdlO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIChhaGVtKSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUmV1c2FibGUgY29uc3RydWN0b3IgZnVuY3Rpb24gZm9yIHByb3RvdHlwZSBzZXR0aW5nLlxuICB2YXIgQ3RvciA9IGZ1bmN0aW9uKCl7fTtcblxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdCAoYXNzaWduaW5nIGB0aGlzYCwgYW5kIGFyZ3VtZW50cyxcbiAgLy8gb3B0aW9uYWxseSkuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBGdW5jdGlvbi5iaW5kYCBpZlxuICAvLyBhdmFpbGFibGUuXG4gIF8uYmluZCA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcbiAgICB2YXIgYXJncywgYm91bmQ7XG4gICAgaWYgKG5hdGl2ZUJpbmQgJiYgZnVuYy5iaW5kID09PSBuYXRpdmVCaW5kKSByZXR1cm4gbmF0aXZlQmluZC5hcHBseShmdW5jLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIGlmICghXy5pc0Z1bmN0aW9uKGZ1bmMpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb24nKTtcbiAgICBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIGJvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgYm91bmQpKSByZXR1cm4gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgIEN0b3IucHJvdG90eXBlID0gZnVuYy5wcm90b3R5cGU7XG4gICAgICB2YXIgc2VsZiA9IG5ldyBDdG9yO1xuICAgICAgQ3Rvci5wcm90b3R5cGUgPSBudWxsO1xuICAgICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkoc2VsZiwgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICBpZiAoXy5pc09iamVjdChyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICByZXR1cm4gYm91bmQ7XG4gIH07XG5cbiAgLy8gUGFydGlhbGx5IGFwcGx5IGEgZnVuY3Rpb24gYnkgY3JlYXRpbmcgYSB2ZXJzaW9uIHRoYXQgaGFzIGhhZCBzb21lIG9mIGl0c1xuICAvLyBhcmd1bWVudHMgcHJlLWZpbGxlZCwgd2l0aG91dCBjaGFuZ2luZyBpdHMgZHluYW1pYyBgdGhpc2AgY29udGV4dC4gXyBhY3RzXG4gIC8vIGFzIGEgcGxhY2Vob2xkZXIsIGFsbG93aW5nIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcHJlLWZpbGxlZC5cbiAgXy5wYXJ0aWFsID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHZhciBib3VuZEFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBvc2l0aW9uID0gMDtcbiAgICAgIHZhciBhcmdzID0gYm91bmRBcmdzLnNsaWNlKCk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYXJncy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXJnc1tpXSA9PT0gXykgYXJnc1tpXSA9IGFyZ3VtZW50c1twb3NpdGlvbisrXTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChwb3NpdGlvbiA8IGFyZ3VtZW50cy5sZW5ndGgpIGFyZ3MucHVzaChhcmd1bWVudHNbcG9zaXRpb24rK10pO1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBCaW5kIGEgbnVtYmVyIG9mIGFuIG9iamVjdCdzIG1ldGhvZHMgdG8gdGhhdCBvYmplY3QuIFJlbWFpbmluZyBhcmd1bWVudHNcbiAgLy8gYXJlIHRoZSBtZXRob2QgbmFtZXMgdG8gYmUgYm91bmQuIFVzZWZ1bCBmb3IgZW5zdXJpbmcgdGhhdCBhbGwgY2FsbGJhY2tzXG4gIC8vIGRlZmluZWQgb24gYW4gb2JqZWN0IGJlbG9uZyB0byBpdC5cbiAgXy5iaW5kQWxsID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGksIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsIGtleTtcbiAgICBpZiAobGVuZ3RoIDw9IDEpIHRocm93IG5ldyBFcnJvcignYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lcycpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gYXJndW1lbnRzW2ldO1xuICAgICAgb2JqW2tleV0gPSBfLmJpbmQob2JqW2tleV0sIG9iaik7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gTWVtb2l6ZSBhbiBleHBlbnNpdmUgZnVuY3Rpb24gYnkgc3RvcmluZyBpdHMgcmVzdWx0cy5cbiAgXy5tZW1vaXplID0gZnVuY3Rpb24oZnVuYywgaGFzaGVyKSB7XG4gICAgdmFyIG1lbW9pemUgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBjYWNoZSA9IG1lbW9pemUuY2FjaGU7XG4gICAgICB2YXIgYWRkcmVzcyA9IGhhc2hlciA/IGhhc2hlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDoga2V5O1xuICAgICAgaWYgKCFfLmhhcyhjYWNoZSwgYWRkcmVzcykpIGNhY2hlW2FkZHJlc3NdID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIGNhY2hlW2FkZHJlc3NdO1xuICAgIH07XG4gICAgbWVtb2l6ZS5jYWNoZSA9IHt9O1xuICAgIHJldHVybiBtZW1vaXplO1xuICB9O1xuXG4gIC8vIERlbGF5cyBhIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gbnVtYmVyIG9mIG1pbGxpc2Vjb25kcywgYW5kIHRoZW4gY2FsbHNcbiAgLy8gaXQgd2l0aCB0aGUgYXJndW1lbnRzIHN1cHBsaWVkLlxuICBfLmRlbGF5ID0gZnVuY3Rpb24oZnVuYywgd2FpdCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9LCB3YWl0KTtcbiAgfTtcblxuICAvLyBEZWZlcnMgYSBmdW5jdGlvbiwgc2NoZWR1bGluZyBpdCB0byBydW4gYWZ0ZXIgdGhlIGN1cnJlbnQgY2FsbCBzdGFjayBoYXNcbiAgLy8gY2xlYXJlZC5cbiAgXy5kZWZlciA9IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICByZXR1cm4gXy5kZWxheS5hcHBseShfLCBbZnVuYywgMV0uY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSkpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIGF0IG1vc3Qgb25jZVxuICAvLyBkdXJpbmcgYSBnaXZlbiB3aW5kb3cgb2YgdGltZS4gTm9ybWFsbHksIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gd2lsbCBydW5cbiAgLy8gYXMgbXVjaCBhcyBpdCBjYW4sIHdpdGhvdXQgZXZlciBnb2luZyBtb3JlIHRoYW4gb25jZSBwZXIgYHdhaXRgIGR1cmF0aW9uO1xuICAvLyBidXQgaWYgeW91J2QgbGlrZSB0byBkaXNhYmxlIHRoZSBleGVjdXRpb24gb24gdGhlIGxlYWRpbmcgZWRnZSwgcGFzc1xuICAvLyBge2xlYWRpbmc6IGZhbHNlfWAuIFRvIGRpc2FibGUgZXhlY3V0aW9uIG9uIHRoZSB0cmFpbGluZyBlZGdlLCBkaXR0by5cbiAgXy50aHJvdHRsZSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29udGV4dCwgYXJncywgcmVzdWx0O1xuICAgIHZhciB0aW1lb3V0ID0gbnVsbDtcbiAgICB2YXIgcHJldmlvdXMgPSAwO1xuICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcHJldmlvdXMgPSBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlID8gMCA6IF8ubm93KCk7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBub3cgPSBfLm5vdygpO1xuICAgICAgaWYgKCFwcmV2aW91cyAmJiBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlKSBwcmV2aW91cyA9IG5vdztcbiAgICAgIHZhciByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIHByZXZpb3VzID0gbm93O1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuICAvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4gIC8vIE4gbWlsbGlzZWNvbmRzLiBJZiBgaW1tZWRpYXRlYCBpcyBwYXNzZWQsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZVxuICAvLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuICBfLmRlYm91bmNlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgdmFyIHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xuXG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbGFzdCA9IF8ubm93KCkgLSB0aW1lc3RhbXA7XG5cbiAgICAgIGlmIChsYXN0IDwgd2FpdCAmJiBsYXN0ID4gMCkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB0aW1lc3RhbXAgPSBfLm5vdygpO1xuICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICBpZiAoIXRpbWVvdXQpIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGZ1bmN0aW9uIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGUgc2Vjb25kLFxuICAvLyBhbGxvd2luZyB5b3UgdG8gYWRqdXN0IGFyZ3VtZW50cywgcnVuIGNvZGUgYmVmb3JlIGFuZCBhZnRlciwgYW5kXG4gIC8vIGNvbmRpdGlvbmFsbHkgZXhlY3V0ZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXG4gIF8ud3JhcCA9IGZ1bmN0aW9uKGZ1bmMsIHdyYXBwZXIpIHtcbiAgICByZXR1cm4gXy5wYXJ0aWFsKHdyYXBwZXIsIGZ1bmMpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBuZWdhdGVkIHZlcnNpb24gb2YgdGhlIHBhc3NlZC1pbiBwcmVkaWNhdGUuXG4gIF8ubmVnYXRlID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICFwcmVkaWNhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiBhIGxpc3Qgb2YgZnVuY3Rpb25zLCBlYWNoXG4gIC8vIGNvbnN1bWluZyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmdW5jdGlvbiB0aGF0IGZvbGxvd3MuXG4gIF8uY29tcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBzdGFydCA9IGFyZ3MubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSA9IHN0YXJ0O1xuICAgICAgdmFyIHJlc3VsdCA9IGFyZ3Nbc3RhcnRdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB3aGlsZSAoaS0tKSByZXN1bHQgPSBhcmdzW2ldLmNhbGwodGhpcywgcmVzdWx0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgYWZ0ZXIgYmVpbmcgY2FsbGVkIE4gdGltZXMuXG4gIF8uYWZ0ZXIgPSBmdW5jdGlvbih0aW1lcywgZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgtLXRpbWVzIDwgMSkge1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBvbmx5IGJlIGV4ZWN1dGVkIGJlZm9yZSBiZWluZyBjYWxsZWQgTiB0aW1lcy5cbiAgXy5iZWZvcmUgPSBmdW5jdGlvbih0aW1lcywgZnVuYykge1xuICAgIHZhciBtZW1vO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgtLXRpbWVzID4gMCkge1xuICAgICAgICBtZW1vID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVuYyA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYXQgbW9zdCBvbmUgdGltZSwgbm8gbWF0dGVyIGhvd1xuICAvLyBvZnRlbiB5b3UgY2FsbCBpdC4gVXNlZnVsIGZvciBsYXp5IGluaXRpYWxpemF0aW9uLlxuICBfLm9uY2UgPSBfLnBhcnRpYWwoXy5iZWZvcmUsIDIpO1xuXG4gIC8vIE9iamVjdCBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJldHJpZXZlIHRoZSBuYW1lcyBvZiBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxuICAvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgT2JqZWN0LmtleXNgXG4gIF8ua2V5cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gW107XG4gICAgaWYgKG5hdGl2ZUtleXMpIHJldHVybiBuYXRpdmVLZXlzKG9iaik7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBpZiAoXy5oYXMob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgICByZXR1cm4ga2V5cztcbiAgfTtcblxuICAvLyBSZXRyaWV2ZSB0aGUgdmFsdWVzIG9mIGFuIG9iamVjdCdzIHByb3BlcnRpZXMuXG4gIF8udmFsdWVzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIHZhbHVlcyA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWVzW2ldID0gb2JqW2tleXNbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIC8vIENvbnZlcnQgYW4gb2JqZWN0IGludG8gYSBsaXN0IG9mIGBba2V5LCB2YWx1ZV1gIHBhaXJzLlxuICBfLnBhaXJzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIHBhaXJzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBwYWlyc1tpXSA9IFtrZXlzW2ldLCBvYmpba2V5c1tpXV1dO1xuICAgIH1cbiAgICByZXR1cm4gcGFpcnM7XG4gIH07XG5cbiAgLy8gSW52ZXJ0IHRoZSBrZXlzIGFuZCB2YWx1ZXMgb2YgYW4gb2JqZWN0LiBUaGUgdmFsdWVzIG11c3QgYmUgc2VyaWFsaXphYmxlLlxuICBfLmludmVydCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHRbb2JqW2tleXNbaV1dXSA9IGtleXNbaV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgc29ydGVkIGxpc3Qgb2YgdGhlIGZ1bmN0aW9uIG5hbWVzIGF2YWlsYWJsZSBvbiB0aGUgb2JqZWN0LlxuICAvLyBBbGlhc2VkIGFzIGBtZXRob2RzYFxuICBfLmZ1bmN0aW9ucyA9IF8ubWV0aG9kcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBuYW1lcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChfLmlzRnVuY3Rpb24ob2JqW2tleV0pKSBuYW1lcy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBuYW1lcy5zb3J0KCk7XG4gIH07XG5cbiAgLy8gRXh0ZW5kIGEgZ2l2ZW4gb2JqZWN0IHdpdGggYWxsIHRoZSBwcm9wZXJ0aWVzIGluIHBhc3NlZC1pbiBvYmplY3QocykuXG4gIF8uZXh0ZW5kID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gICAgdmFyIHNvdXJjZSwgcHJvcDtcbiAgICBmb3IgKHZhciBpID0gMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwgcHJvcCkpIHtcbiAgICAgICAgICAgIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCBvbmx5IGNvbnRhaW5pbmcgdGhlIHdoaXRlbGlzdGVkIHByb3BlcnRpZXMuXG4gIF8ucGljayA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0ge30sIGtleTtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcbiAgICAgIGl0ZXJhdGVlID0gY3JlYXRlQ2FsbGJhY2soaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgICBpZiAoaXRlcmF0ZWUodmFsdWUsIGtleSwgb2JqKSkgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGtleXMgPSBjb25jYXQuYXBwbHkoW10sIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICBvYmogPSBuZXcgT2JqZWN0KG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICBpZiAoa2V5IGluIG9iaikgcmVzdWx0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IHdpdGhvdXQgdGhlIGJsYWNrbGlzdGVkIHByb3BlcnRpZXMuXG4gIF8ub21pdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZXJhdGVlKSkge1xuICAgICAgaXRlcmF0ZWUgPSBfLm5lZ2F0ZShpdGVyYXRlZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBrZXlzID0gXy5tYXAoY29uY2F0LmFwcGx5KFtdLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpLCBTdHJpbmcpO1xuICAgICAgaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiAhXy5jb250YWlucyhrZXlzLCBrZXkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIF8ucGljayhvYmosIGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBGaWxsIGluIGEgZ2l2ZW4gb2JqZWN0IHdpdGggZGVmYXVsdCBwcm9wZXJ0aWVzLlxuICBfLmRlZmF1bHRzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChvYmpbcHJvcF0gPT09IHZvaWQgMCkgb2JqW3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIChzaGFsbG93LWNsb25lZCkgZHVwbGljYXRlIG9mIGFuIG9iamVjdC5cbiAgXy5jbG9uZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICAgIHJldHVybiBfLmlzQXJyYXkob2JqKSA/IG9iai5zbGljZSgpIDogXy5leHRlbmQoe30sIG9iaik7XG4gIH07XG5cbiAgLy8gSW52b2tlcyBpbnRlcmNlcHRvciB3aXRoIHRoZSBvYmosIGFuZCB0aGVuIHJldHVybnMgb2JqLlxuICAvLyBUaGUgcHJpbWFyeSBwdXJwb3NlIG9mIHRoaXMgbWV0aG9kIGlzIHRvIFwidGFwIGludG9cIiBhIG1ldGhvZCBjaGFpbiwgaW5cbiAgLy8gb3JkZXIgdG8gcGVyZm9ybSBvcGVyYXRpb25zIG9uIGludGVybWVkaWF0ZSByZXN1bHRzIHdpdGhpbiB0aGUgY2hhaW4uXG4gIF8udGFwID0gZnVuY3Rpb24ob2JqLCBpbnRlcmNlcHRvcikge1xuICAgIGludGVyY2VwdG9yKG9iaik7XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxuICB2YXIgZXEgPSBmdW5jdGlvbihhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cbiAgICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cbiAgICBpZiAoYSA9PT0gYikgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICAgIC8vIEEgc3RyaWN0IGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYG51bGwgPT0gdW5kZWZpbmVkYC5cbiAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGEgPT09IGI7XG4gICAgLy8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXG4gICAgaWYgKGEgaW5zdGFuY2VvZiBfKSBhID0gYS5fd3JhcHBlZDtcbiAgICBpZiAoYiBpbnN0YW5jZW9mIF8pIGIgPSBiLl93cmFwcGVkO1xuICAgIC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwoYSk7XG4gICAgaWYgKGNsYXNzTmFtZSAhPT0gdG9TdHJpbmcuY2FsbChiKSkgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCByZWd1bGFyIGV4cHJlc3Npb25zLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6XG4gICAgICAvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxuICAgICAgY2FzZSAnW29iamVjdCBTdHJpbmddJzpcbiAgICAgICAgLy8gUHJpbWl0aXZlcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBvYmplY3Qgd3JhcHBlcnMgYXJlIGVxdWl2YWxlbnQ7IHRodXMsIGBcIjVcImAgaXNcbiAgICAgICAgLy8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxuICAgICAgICByZXR1cm4gJycgKyBhID09PSAnJyArIGI7XG4gICAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxuICAgICAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICAgICAgICAvLyBPYmplY3QoTmFOKSBpcyBlcXVpdmFsZW50IHRvIE5hTlxuICAgICAgICBpZiAoK2EgIT09ICthKSByZXR1cm4gK2IgIT09ICtiO1xuICAgICAgICAvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxuICAgICAgICByZXR1cm4gK2EgPT09IDAgPyAxIC8gK2EgPT09IDEgLyBiIDogK2EgPT09ICtiO1xuICAgICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1lcmljIHByaW1pdGl2ZSB2YWx1ZXMuIERhdGVzIGFyZSBjb21wYXJlZCBieSB0aGVpclxuICAgICAgICAvLyBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnMuIE5vdGUgdGhhdCBpbnZhbGlkIGRhdGVzIHdpdGggbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zXG4gICAgICAgIC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cbiAgICAgICAgcmV0dXJuICthID09PSArYjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBhICE9ICdvYmplY3QnIHx8IHR5cGVvZiBiICE9ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gQXNzdW1lIGVxdWFsaXR5IGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhlIGFsZ29yaXRobSBmb3IgZGV0ZWN0aW5nIGN5Y2xpY1xuICAgIC8vIHN0cnVjdHVyZXMgaXMgYWRhcHRlZCBmcm9tIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMsIGFic3RyYWN0IG9wZXJhdGlvbiBgSk9gLlxuICAgIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgLy8gTGluZWFyIHNlYXJjaC4gUGVyZm9ybWFuY2UgaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mXG4gICAgICAvLyB1bmlxdWUgbmVzdGVkIHN0cnVjdHVyZXMuXG4gICAgICBpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PT0gYjtcbiAgICB9XG4gICAgLy8gT2JqZWN0cyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVpdmFsZW50LCBidXQgYE9iamVjdGBzXG4gICAgLy8gZnJvbSBkaWZmZXJlbnQgZnJhbWVzIGFyZS5cbiAgICB2YXIgYUN0b3IgPSBhLmNvbnN0cnVjdG9yLCBiQ3RvciA9IGIuY29uc3RydWN0b3I7XG4gICAgaWYgKFxuICAgICAgYUN0b3IgIT09IGJDdG9yICYmXG4gICAgICAvLyBIYW5kbGUgT2JqZWN0LmNyZWF0ZSh4KSBjYXNlc1xuICAgICAgJ2NvbnN0cnVjdG9yJyBpbiBhICYmICdjb25zdHJ1Y3RvcicgaW4gYiAmJlxuICAgICAgIShfLmlzRnVuY3Rpb24oYUN0b3IpICYmIGFDdG9yIGluc3RhbmNlb2YgYUN0b3IgJiZcbiAgICAgICAgXy5pc0Z1bmN0aW9uKGJDdG9yKSAmJiBiQ3RvciBpbnN0YW5jZW9mIGJDdG9yKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBBZGQgdGhlIGZpcnN0IG9iamVjdCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnB1c2goYSk7XG4gICAgYlN0YWNrLnB1c2goYik7XG4gICAgdmFyIHNpemUsIHJlc3VsdDtcbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICBpZiAoY2xhc3NOYW1lID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cbiAgICAgIHNpemUgPSBhLmxlbmd0aDtcbiAgICAgIHJlc3VsdCA9IHNpemUgPT09IGIubGVuZ3RoO1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAvLyBEZWVwIGNvbXBhcmUgdGhlIGNvbnRlbnRzLCBpZ25vcmluZyBub24tbnVtZXJpYyBwcm9wZXJ0aWVzLlxuICAgICAgICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgICAgICAgaWYgKCEocmVzdWx0ID0gZXEoYVtzaXplXSwgYltzaXplXSwgYVN0YWNrLCBiU3RhY2spKSkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGVlcCBjb21wYXJlIG9iamVjdHMuXG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhhKSwga2V5O1xuICAgICAgc2l6ZSA9IGtleXMubGVuZ3RoO1xuICAgICAgLy8gRW5zdXJlIHRoYXQgYm90aCBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyIG9mIHByb3BlcnRpZXMgYmVmb3JlIGNvbXBhcmluZyBkZWVwIGVxdWFsaXR5LlxuICAgICAgcmVzdWx0ID0gXy5rZXlzKGIpLmxlbmd0aCA9PT0gc2l6ZTtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgd2hpbGUgKHNpemUtLSkge1xuICAgICAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlclxuICAgICAgICAgIGtleSA9IGtleXNbc2l6ZV07XG4gICAgICAgICAgaWYgKCEocmVzdWx0ID0gXy5oYXMoYiwga2V5KSAmJiBlcShhW2tleV0sIGJba2V5XSwgYVN0YWNrLCBiU3RhY2spKSkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnBvcCgpO1xuICAgIGJTdGFjay5wb3AoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFBlcmZvcm0gYSBkZWVwIGNvbXBhcmlzb24gdG8gY2hlY2sgaWYgdHdvIG9iamVjdHMgYXJlIGVxdWFsLlxuICBfLmlzRXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGVxKGEsIGIsIFtdLCBbXSk7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiBhcnJheSwgc3RyaW5nLCBvciBvYmplY3QgZW1wdHk/XG4gIC8vIEFuIFwiZW1wdHlcIiBvYmplY3QgaGFzIG5vIGVudW1lcmFibGUgb3duLXByb3BlcnRpZXMuXG4gIF8uaXNFbXB0eSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKF8uaXNBcnJheShvYmopIHx8IF8uaXNTdHJpbmcob2JqKSB8fCBfLmlzQXJndW1lbnRzKG9iaikpIHJldHVybiBvYmoubGVuZ3RoID09PSAwO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGEgRE9NIGVsZW1lbnQ/XG4gIF8uaXNFbGVtZW50ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYW4gYXJyYXk/XG4gIC8vIERlbGVnYXRlcyB0byBFQ01BNSdzIG5hdGl2ZSBBcnJheS5pc0FycmF5XG4gIF8uaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhcmlhYmxlIGFuIG9iamVjdD9cbiAgXy5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciB0eXBlID0gdHlwZW9mIG9iajtcbiAgICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIW9iajtcbiAgfTtcblxuICAvLyBBZGQgc29tZSBpc1R5cGUgbWV0aG9kczogaXNBcmd1bWVudHMsIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBpc051bWJlciwgaXNEYXRlLCBpc1JlZ0V4cC5cbiAgXy5lYWNoKFsnQXJndW1lbnRzJywgJ0Z1bmN0aW9uJywgJ1N0cmluZycsICdOdW1iZXInLCAnRGF0ZScsICdSZWdFeHAnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIF9bJ2lzJyArIG5hbWVdID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCAnICsgbmFtZSArICddJztcbiAgICB9O1xuICB9KTtcblxuICAvLyBEZWZpbmUgYSBmYWxsYmFjayB2ZXJzaW9uIG9mIHRoZSBtZXRob2QgaW4gYnJvd3NlcnMgKGFoZW0sIElFKSwgd2hlcmVcbiAgLy8gdGhlcmUgaXNuJ3QgYW55IGluc3BlY3RhYmxlIFwiQXJndW1lbnRzXCIgdHlwZS5cbiAgaWYgKCFfLmlzQXJndW1lbnRzKGFyZ3VtZW50cykpIHtcbiAgICBfLmlzQXJndW1lbnRzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gXy5oYXMob2JqLCAnY2FsbGVlJyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIE9wdGltaXplIGBpc0Z1bmN0aW9uYCBpZiBhcHByb3ByaWF0ZS4gV29yayBhcm91bmQgYW4gSUUgMTEgYnVnLlxuICBpZiAodHlwZW9mIC8uLyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIF8uaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLy8gSXMgYSBnaXZlbiBvYmplY3QgYSBmaW5pdGUgbnVtYmVyP1xuICBfLmlzRmluaXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIGlzRmluaXRlKG9iaikgJiYgIWlzTmFOKHBhcnNlRmxvYXQob2JqKSk7XG4gIH07XG5cbiAgLy8gSXMgdGhlIGdpdmVuIHZhbHVlIGBOYU5gPyAoTmFOIGlzIHRoZSBvbmx5IG51bWJlciB3aGljaCBkb2VzIG5vdCBlcXVhbCBpdHNlbGYpLlxuICBfLmlzTmFOID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIF8uaXNOdW1iZXIob2JqKSAmJiBvYmogIT09ICtvYmo7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIGJvb2xlYW4/XG4gIF8uaXNCb29sZWFuID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgZXF1YWwgdG8gbnVsbD9cbiAgXy5pc051bGwgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgdW5kZWZpbmVkP1xuICBfLmlzVW5kZWZpbmVkID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdm9pZCAwO1xuICB9O1xuXG4gIC8vIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gcHJvcGVydHkgZGlyZWN0bHlcbiAgLy8gb24gaXRzZWxmIChpbiBvdGhlciB3b3Jkcywgbm90IG9uIGEgcHJvdG90eXBlKS5cbiAgXy5oYXMgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgfTtcblxuICAvLyBVdGlsaXR5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJ1biBVbmRlcnNjb3JlLmpzIGluICpub0NvbmZsaWN0KiBtb2RlLCByZXR1cm5pbmcgdGhlIGBfYCB2YXJpYWJsZSB0byBpdHNcbiAgLy8gcHJldmlvdXMgb3duZXIuIFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICByb290Ll8gPSBwcmV2aW91c1VuZGVyc2NvcmU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gS2VlcCB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gYXJvdW5kIGZvciBkZWZhdWx0IGl0ZXJhdGVlcy5cbiAgXy5pZGVudGl0eSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIF8uY29uc3RhbnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICB9O1xuXG4gIF8ubm9vcCA9IGZ1bmN0aW9uKCl7fTtcblxuICBfLnByb3BlcnR5ID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIHByZWRpY2F0ZSBmb3IgY2hlY2tpbmcgd2hldGhlciBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gc2V0IG9mIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLm1hdGNoZXMgPSBmdW5jdGlvbihhdHRycykge1xuICAgIHZhciBwYWlycyA9IF8ucGFpcnMoYXR0cnMpLCBsZW5ndGggPSBwYWlycy5sZW5ndGg7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gIWxlbmd0aDtcbiAgICAgIG9iaiA9IG5ldyBPYmplY3Qob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhaXIgPSBwYWlyc1tpXSwga2V5ID0gcGFpclswXTtcbiAgICAgICAgaWYgKHBhaXJbMV0gIT09IG9ialtrZXldIHx8ICEoa2V5IGluIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUnVuIGEgZnVuY3Rpb24gKipuKiogdGltZXMuXG4gIF8udGltZXMgPSBmdW5jdGlvbihuLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciBhY2N1bSA9IEFycmF5KE1hdGgubWF4KDAsIG4pKTtcbiAgICBpdGVyYXRlZSA9IGNyZWF0ZUNhbGxiYWNrKGl0ZXJhdGVlLCBjb250ZXh0LCAxKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykgYWNjdW1baV0gPSBpdGVyYXRlZShpKTtcbiAgICByZXR1cm4gYWNjdW07XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gYW5kIG1heCAoaW5jbHVzaXZlKS5cbiAgXy5yYW5kb20gPSBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgIGlmIChtYXggPT0gbnVsbCkge1xuICAgICAgbWF4ID0gbWluO1xuICAgICAgbWluID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG4gIH07XG5cbiAgLy8gQSAocG9zc2libHkgZmFzdGVyKSB3YXkgdG8gZ2V0IHRoZSBjdXJyZW50IHRpbWVzdGFtcCBhcyBhbiBpbnRlZ2VyLlxuICBfLm5vdyA9IERhdGUubm93IHx8IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfTtcblxuICAgLy8gTGlzdCBvZiBIVE1MIGVudGl0aWVzIGZvciBlc2NhcGluZy5cbiAgdmFyIGVzY2FwZU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmI3gyNzsnLFxuICAgICdgJzogJyYjeDYwOydcbiAgfTtcbiAgdmFyIHVuZXNjYXBlTWFwID0gXy5pbnZlcnQoZXNjYXBlTWFwKTtcblxuICAvLyBGdW5jdGlvbnMgZm9yIGVzY2FwaW5nIGFuZCB1bmVzY2FwaW5nIHN0cmluZ3MgdG8vZnJvbSBIVE1MIGludGVycG9sYXRpb24uXG4gIHZhciBjcmVhdGVFc2NhcGVyID0gZnVuY3Rpb24obWFwKSB7XG4gICAgdmFyIGVzY2FwZXIgPSBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgcmV0dXJuIG1hcFttYXRjaF07XG4gICAgfTtcbiAgICAvLyBSZWdleGVzIGZvciBpZGVudGlmeWluZyBhIGtleSB0aGF0IG5lZWRzIHRvIGJlIGVzY2FwZWRcbiAgICB2YXIgc291cmNlID0gJyg/OicgKyBfLmtleXMobWFwKS5qb2luKCd8JykgKyAnKSc7XG4gICAgdmFyIHRlc3RSZWdleHAgPSBSZWdFeHAoc291cmNlKTtcbiAgICB2YXIgcmVwbGFjZVJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UsICdnJyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgc3RyaW5nID0gc3RyaW5nID09IG51bGwgPyAnJyA6ICcnICsgc3RyaW5nO1xuICAgICAgcmV0dXJuIHRlc3RSZWdleHAudGVzdChzdHJpbmcpID8gc3RyaW5nLnJlcGxhY2UocmVwbGFjZVJlZ2V4cCwgZXNjYXBlcikgOiBzdHJpbmc7XG4gICAgfTtcbiAgfTtcbiAgXy5lc2NhcGUgPSBjcmVhdGVFc2NhcGVyKGVzY2FwZU1hcCk7XG4gIF8udW5lc2NhcGUgPSBjcmVhdGVFc2NhcGVyKHVuZXNjYXBlTWFwKTtcblxuICAvLyBJZiB0aGUgdmFsdWUgb2YgdGhlIG5hbWVkIGBwcm9wZXJ0eWAgaXMgYSBmdW5jdGlvbiB0aGVuIGludm9rZSBpdCB3aXRoIHRoZVxuICAvLyBgb2JqZWN0YCBhcyBjb250ZXh0OyBvdGhlcndpc2UsIHJldHVybiBpdC5cbiAgXy5yZXN1bHQgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xuICAgIHZhciB2YWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgcmV0dXJuIF8uaXNGdW5jdGlvbih2YWx1ZSkgPyBvYmplY3RbcHJvcGVydHldKCkgOiB2YWx1ZTtcbiAgfTtcblxuICAvLyBHZW5lcmF0ZSBhIHVuaXF1ZSBpbnRlZ2VyIGlkICh1bmlxdWUgd2l0aGluIHRoZSBlbnRpcmUgY2xpZW50IHNlc3Npb24pLlxuICAvLyBVc2VmdWwgZm9yIHRlbXBvcmFyeSBET00gaWRzLlxuICB2YXIgaWRDb3VudGVyID0gMDtcbiAgXy51bmlxdWVJZCA9IGZ1bmN0aW9uKHByZWZpeCkge1xuICAgIHZhciBpZCA9ICsraWRDb3VudGVyICsgJyc7XG4gICAgcmV0dXJuIHByZWZpeCA/IHByZWZpeCArIGlkIDogaWQ7XG4gIH07XG5cbiAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAgXy50ZW1wbGF0ZVNldHRpbmdzID0ge1xuICAgIGV2YWx1YXRlICAgIDogLzwlKFtcXHNcXFNdKz8pJT4vZyxcbiAgICBpbnRlcnBvbGF0ZSA6IC88JT0oW1xcc1xcU10rPyklPi9nLFxuICAgIGVzY2FwZSAgICAgIDogLzwlLShbXFxzXFxTXSs/KSU+L2dcbiAgfTtcblxuICAvLyBXaGVuIGN1c3RvbWl6aW5nIGB0ZW1wbGF0ZVNldHRpbmdzYCwgaWYgeW91IGRvbid0IHdhbnQgdG8gZGVmaW5lIGFuXG4gIC8vIGludGVycG9sYXRpb24sIGV2YWx1YXRpb24gb3IgZXNjYXBpbmcgcmVnZXgsIHdlIG5lZWQgb25lIHRoYXQgaXNcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXG4gIHZhciBub01hdGNoID0gLyguKV4vO1xuXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4gIC8vIHN0cmluZyBsaXRlcmFsLlxuICB2YXIgZXNjYXBlcyA9IHtcbiAgICBcIidcIjogICAgICBcIidcIixcbiAgICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICAgJ1xccic6ICAgICAncicsXG4gICAgJ1xcbic6ICAgICAnbicsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIHZhciBlc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nO1xuXG4gIHZhciBlc2NhcGVDaGFyID0gZnVuY3Rpb24obWF0Y2gpIHtcbiAgICByZXR1cm4gJ1xcXFwnICsgZXNjYXBlc1ttYXRjaF07XG4gIH07XG5cbiAgLy8gSmF2YVNjcmlwdCBtaWNyby10ZW1wbGF0aW5nLCBzaW1pbGFyIHRvIEpvaG4gUmVzaWcncyBpbXBsZW1lbnRhdGlvbi5cbiAgLy8gVW5kZXJzY29yZSB0ZW1wbGF0aW5nIGhhbmRsZXMgYXJiaXRyYXJ5IGRlbGltaXRlcnMsIHByZXNlcnZlcyB3aGl0ZXNwYWNlLFxuICAvLyBhbmQgY29ycmVjdGx5IGVzY2FwZXMgcXVvdGVzIHdpdGhpbiBpbnRlcnBvbGF0ZWQgY29kZS5cbiAgLy8gTkI6IGBvbGRTZXR0aW5nc2Agb25seSBleGlzdHMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICBfLnRlbXBsYXRlID0gZnVuY3Rpb24odGV4dCwgc2V0dGluZ3MsIG9sZFNldHRpbmdzKSB7XG4gICAgaWYgKCFzZXR0aW5ncyAmJiBvbGRTZXR0aW5ncykgc2V0dGluZ3MgPSBvbGRTZXR0aW5ncztcbiAgICBzZXR0aW5ncyA9IF8uZGVmYXVsdHMoe30sIHNldHRpbmdzLCBfLnRlbXBsYXRlU2V0dGluZ3MpO1xuXG4gICAgLy8gQ29tYmluZSBkZWxpbWl0ZXJzIGludG8gb25lIHJlZ3VsYXIgZXhwcmVzc2lvbiB2aWEgYWx0ZXJuYXRpb24uXG4gICAgdmFyIG1hdGNoZXIgPSBSZWdFeHAoW1xuICAgICAgKHNldHRpbmdzLmVzY2FwZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuaW50ZXJwb2xhdGUgfHwgbm9NYXRjaCkuc291cmNlLFxuICAgICAgKHNldHRpbmdzLmV2YWx1YXRlIHx8IG5vTWF0Y2gpLnNvdXJjZVxuICAgIF0uam9pbignfCcpICsgJ3wkJywgJ2cnKTtcblxuICAgIC8vIENvbXBpbGUgdGhlIHRlbXBsYXRlIHNvdXJjZSwgZXNjYXBpbmcgc3RyaW5nIGxpdGVyYWxzIGFwcHJvcHJpYXRlbHkuXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgc291cmNlID0gXCJfX3ArPSdcIjtcbiAgICB0ZXh0LnJlcGxhY2UobWF0Y2hlciwgZnVuY3Rpb24obWF0Y2gsIGVzY2FwZSwgaW50ZXJwb2xhdGUsIGV2YWx1YXRlLCBvZmZzZXQpIHtcbiAgICAgIHNvdXJjZSArPSB0ZXh0LnNsaWNlKGluZGV4LCBvZmZzZXQpLnJlcGxhY2UoZXNjYXBlciwgZXNjYXBlQ2hhcik7XG4gICAgICBpbmRleCA9IG9mZnNldCArIG1hdGNoLmxlbmd0aDtcblxuICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGVzY2FwZSArIFwiKSk9PW51bGw/Jyc6Xy5lc2NhcGUoX190KSkrXFxuJ1wiO1xuICAgICAgfSBlbHNlIGlmIChpbnRlcnBvbGF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGludGVycG9sYXRlICsgXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjtcbiAgICAgIH0gZWxzZSBpZiAoZXZhbHVhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJztcXG5cIiArIGV2YWx1YXRlICsgXCJcXG5fX3ArPSdcIjtcbiAgICAgIH1cblxuICAgICAgLy8gQWRvYmUgVk1zIG5lZWQgdGhlIG1hdGNoIHJldHVybmVkIHRvIHByb2R1Y2UgdGhlIGNvcnJlY3Qgb2ZmZXN0LlxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuICAgIHNvdXJjZSArPSBcIic7XFxuXCI7XG5cbiAgICAvLyBJZiBhIHZhcmlhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIHBsYWNlIGRhdGEgdmFsdWVzIGluIGxvY2FsIHNjb3BlLlxuICAgIGlmICghc2V0dGluZ3MudmFyaWFibGUpIHNvdXJjZSA9ICd3aXRoKG9ianx8e30pe1xcbicgKyBzb3VyY2UgKyAnfVxcbic7XG5cbiAgICBzb3VyY2UgPSBcInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIiArXG4gICAgICBcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIgK1xuICAgICAgc291cmNlICsgJ3JldHVybiBfX3A7XFxuJztcblxuICAgIHRyeSB7XG4gICAgICB2YXIgcmVuZGVyID0gbmV3IEZ1bmN0aW9uKHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonLCAnXycsIHNvdXJjZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZS5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIHZhciB0ZW1wbGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiByZW5kZXIuY2FsbCh0aGlzLCBkYXRhLCBfKTtcbiAgICB9O1xuXG4gICAgLy8gUHJvdmlkZSB0aGUgY29tcGlsZWQgc291cmNlIGFzIGEgY29udmVuaWVuY2UgZm9yIHByZWNvbXBpbGF0aW9uLlxuICAgIHZhciBhcmd1bWVudCA9IHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonO1xuICAgIHRlbXBsYXRlLnNvdXJjZSA9ICdmdW5jdGlvbignICsgYXJndW1lbnQgKyAnKXtcXG4nICsgc291cmNlICsgJ30nO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuXG4gIC8vIEFkZCBhIFwiY2hhaW5cIiBmdW5jdGlvbi4gU3RhcnQgY2hhaW5pbmcgYSB3cmFwcGVkIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLmNoYWluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGluc3RhbmNlID0gXyhvYmopO1xuICAgIGluc3RhbmNlLl9jaGFpbiA9IHRydWU7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xuXG4gIC8vIE9PUFxuICAvLyAtLS0tLS0tLS0tLS0tLS1cbiAgLy8gSWYgVW5kZXJzY29yZSBpcyBjYWxsZWQgYXMgYSBmdW5jdGlvbiwgaXQgcmV0dXJucyBhIHdyYXBwZWQgb2JqZWN0IHRoYXRcbiAgLy8gY2FuIGJlIHVzZWQgT08tc3R5bGUuIFRoaXMgd3JhcHBlciBob2xkcyBhbHRlcmVkIHZlcnNpb25zIG9mIGFsbCB0aGVcbiAgLy8gdW5kZXJzY29yZSBmdW5jdGlvbnMuIFdyYXBwZWQgb2JqZWN0cyBtYXkgYmUgY2hhaW5lZC5cblxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gY29udGludWUgY2hhaW5pbmcgaW50ZXJtZWRpYXRlIHJlc3VsdHMuXG4gIHZhciByZXN1bHQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4gPyBfKG9iaikuY2hhaW4oKSA6IG9iajtcbiAgfTtcblxuICAvLyBBZGQgeW91ciBvd24gY3VzdG9tIGZ1bmN0aW9ucyB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8ubWl4aW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICBfLmVhY2goXy5mdW5jdGlvbnMob2JqKSwgZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIGZ1bmMgPSBfW25hbWVdID0gb2JqW25hbWVdO1xuICAgICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbdGhpcy5fd3JhcHBlZF07XG4gICAgICAgIHB1c2guYXBwbHkoYXJncywgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5jYWxsKHRoaXMsIGZ1bmMuYXBwbHkoXywgYXJncykpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBBZGQgYWxsIG9mIHRoZSBVbmRlcnNjb3JlIGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlciBvYmplY3QuXG4gIF8ubWl4aW4oXyk7XG5cbiAgLy8gQWRkIGFsbCBtdXRhdG9yIEFycmF5IGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlci5cbiAgXy5lYWNoKFsncG9wJywgJ3B1c2gnLCAncmV2ZXJzZScsICdzaGlmdCcsICdzb3J0JywgJ3NwbGljZScsICd1bnNoaWZ0J10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9iaiA9IHRoaXMuX3dyYXBwZWQ7XG4gICAgICBtZXRob2QuYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKChuYW1lID09PSAnc2hpZnQnIHx8IG5hbWUgPT09ICdzcGxpY2UnKSAmJiBvYmoubGVuZ3RoID09PSAwKSBkZWxldGUgb2JqWzBdO1xuICAgICAgcmV0dXJuIHJlc3VsdC5jYWxsKHRoaXMsIG9iaik7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQWRkIGFsbCBhY2Nlc3NvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXG4gIF8uZWFjaChbJ2NvbmNhdCcsICdqb2luJywgJ3NsaWNlJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5jYWxsKHRoaXMsIG1ldGhvZC5hcHBseSh0aGlzLl93cmFwcGVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBFeHRyYWN0cyB0aGUgcmVzdWx0IGZyb20gYSB3cmFwcGVkIGFuZCBjaGFpbmVkIG9iamVjdC5cbiAgXy5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fd3JhcHBlZDtcbiAgfTtcblxuICAvLyBBTUQgcmVnaXN0cmF0aW9uIGhhcHBlbnMgYXQgdGhlIGVuZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFNRCBsb2FkZXJzXG4gIC8vIHRoYXQgbWF5IG5vdCBlbmZvcmNlIG5leHQtdHVybiBzZW1hbnRpY3Mgb24gbW9kdWxlcy4gRXZlbiB0aG91Z2ggZ2VuZXJhbFxuICAvLyBwcmFjdGljZSBmb3IgQU1EIHJlZ2lzdHJhdGlvbiBpcyB0byBiZSBhbm9ueW1vdXMsIHVuZGVyc2NvcmUgcmVnaXN0ZXJzXG4gIC8vIGFzIGEgbmFtZWQgbW9kdWxlIGJlY2F1c2UsIGxpa2UgalF1ZXJ5LCBpdCBpcyBhIGJhc2UgbGlicmFyeSB0aGF0IGlzXG4gIC8vIHBvcHVsYXIgZW5vdWdoIHRvIGJlIGJ1bmRsZWQgaW4gYSB0aGlyZCBwYXJ0eSBsaWIsIGJ1dCBub3QgYmUgcGFydCBvZlxuICAvLyBhbiBBTUQgbG9hZCByZXF1ZXN0LiBUaG9zZSBjYXNlcyBjb3VsZCBnZW5lcmF0ZSBhbiBlcnJvciB3aGVuIGFuXG4gIC8vIGFub255bW91cyBkZWZpbmUoKSBpcyBjYWxsZWQgb3V0c2lkZSBvZiBhIGxvYWRlciByZXF1ZXN0LlxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKCd1bmRlcnNjb3JlJywgW10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF87XG4gICAgfSk7XG4gIH1cbn0uY2FsbCh0aGlzKSk7XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcblxuQ0hBTkdFX0VWRU5UID0gJ1FVSVpfQ0hBTkdFJztcblxudmFyIENvbnN0YW50cyA9IHtcbiAgSU5UUk9EVUNUSU9OX1NURVA6ICdpbnRyb2R1Y3Rpb25fc3RlcCcsXG4gIFBMQVlfU1RFUDogJ3BsYXlfc3RlcCcsXG4gIFJFU1VMVF9TVEVQOiAncmVzdWx0X3N0ZXAnLFxuICBUSEFOS1NfU1RFUDogJ3RoYW5rc19zdGVwJ1xufTtcblxudmFyIE1lc3NhZ2VGb3JtYXQgPSByZXF1aXJlKCdtZXNzYWdlZm9ybWF0Jyk7XG52YXIgbWYgPSBuZXcgTWVzc2FnZUZvcm1hdCgnZW4nKTtcblxuLy8gVE9ETyBNb3ZlIHRoaXMgdG8gZW4uanNvblxudmFyIFQgPSB7XG4gIFwibG9hZGVyX21lc3NhZ2VcIjogXCJMb2FkaW5nLi4uXCIsXG4gIFwiZm9vdGVyX21lc3NhZ2VcIjogXCJCeSBwbGF5aW5nLCB5b3UgYWdyZWUgdG8ge3ByaXZhY3lfcG9saWN5fSBhbmQge3Rlcm1zX29mX3NlcnZpY2V9XCIsXG4gIFwiaW50cm9kdWN0aW9uX3RpdGxlXCI6IFwiTGV0J3MgUGxheVwiLFxuICBcImludHJvZHVjdGlvbl9zdWJ0aXRsZVwiOiBcIlBsYXkgdGhlIHF1aXpcIixcbiAgXCJwbGF5X2J1dHRvblwiOiBcIlBsYXlcIixcbiAgXCJwbGF5X3dpdGhfc2VydmljZV9idXR0b25cIjogXCJQbGF5IHdpdGgge3NlcnZpY2V9XCIsXG4gIFwibG9naW5nX2luX21lc3NhZ2VcIjogXCJXYWl0aW5nIGZvciBsb2dpbiB0byBjb21wbGV0ZS4uLlwiLFxuICBcInJlc3VsdF90aXRsZVwiOiBcIkJyYXZvXCIsXG4gIFwicmVzdWx0X3N1YnRpdGxlXCI6IFwiU2NvcmUge3Njb3JlfSBhZnRlciB7YXR0ZW1wdHMsIHBsdXJhbCwgb25le29uZSBhdHRlbXB0fSBvdGhlcnsjIGF0dGVtcHN9fS5cIixcbiAgXCJyZXBsYXlcIjogXCJSZXBsYXlcIixcbiAgXCJvcl9jb21wbGV0ZV95b3VyX3Byb2ZpbGVcIjogXCJvciBjb21wbGV0ZSB5b3VyIHByb2ZpbGUuXCIsXG4gIFwic2F2ZV9wcm9maWxlX2J1dHRvblwiOiBcIlNhdmUgcHJvZmlsZVwiLFxuICBcInRoYW5rc190aXRsZVwiOiBcIlRoYW5rcyBmb3IgcGxheWluZyFcIixcbiAgXCJ0aGFua3Nfc3VidGl0bGVcIjogXCJUaGFua3Mgc3VidGl0bGVcIlxufTtcblxuZnVuY3Rpb24gRW5naW5lKHVzZXIsIHNoaXApIHtcbiAgdGhpcy5fc2V0SW5pdGlhbFN0YXRlKHVzZXIsIHNoaXApO1xuICB0aGlzLl9jb21waWxlVHJhbnNsYXRpb25zKCk7XG5cbiAgSHVsbC5vbignaHVsbC5hdXRoLmxvZ291dCcsIHRoaXMucmVzZXQuYmluZCh0aGlzKSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBlLmRhdGE7XG4gICAgaWYgKG1lc3NhZ2UgJiYgbWVzc2FnZS5ldmVudCA9PT0gJ3NoaXAudXBkYXRlJykge1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSBtZXNzYWdlLnNoaXAuc2V0dGluZ3M7XG5cbiAgICAgIHRoaXMuX3RyYW5zbGF0aW9ucyA9IG1lc3NhZ2Uuc2hpcC50cmFuc2xhdGlvbnM7XG4gICAgICB0aGlzLl9jb21waWxlVHJhbnNsYXRpb25zKCk7XG5cbiAgICAgIHRoaXMuX2VtaXRDaGFuZ2UoKTtcbiAgICB9XG4gIH0uYmluZCh0aGlzKSwgZmFsc2UpO1xufVxuXG5FbmdpbmUucHJvdG90eXBlID0ge1xuICBfY29tcGlsZVRyYW5zbGF0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fY29tcGlsZWRUcmFuc2xhdGlvbnMgPSBfLnJlZHVjZShULCBmdW5jdGlvbihtLCB2LCBrKSB7XG4gICAgICBtW2tdID0gbWYuY29tcGlsZSh2KTtcbiAgICAgIHJldHVybiBtO1xuICAgIH0sIHt9LCB0aGlzKTtcbiAgfSxcblxuICBfZ2V0VHJhbnNsYXRpb25zOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9jb21waWxlZFRyYW5zbGF0aW9uc1sncmVzdWx0J11cbiAgfSxcblxuICBnZXRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNoaXA6IHRoaXMuX3NoaXAsXG4gICAgICB1c2VyOiB0aGlzLl91c2VyLFxuICAgICAgcXVpejogdGhpcy5fcXVpeixcbiAgICAgIGZvcm06IHRoaXMuX2Zvcm0sXG4gICAgICBiYWRnZTogdGhpcy5fYmFkZ2UsXG4gICAgICBzZXR0aW5nczogdGhpcy5fc2V0dGluZ3MsXG4gICAgICBxdWVzdGlvbnM6IHRoaXMuX3F1ZXN0aW9ucyxcbiAgICAgIGNvdW50ZG93bjogdGhpcy5fY291bnRkb3duLFxuICAgICAgY3VycmVudFN0ZXA6IHRoaXMuX2dldEN1cnJlbnRTdGVwKCksXG4gICAgICBjdXJyZW50UXVlc3Rpb246IHRoaXMuX2dldFF1ZXN0aW9uKHRoaXMuX2N1cnJlbnRRdWVzdGlvbkluZGV4KSxcbiAgICAgIGN1cnJlbnRRdWVzdGlvbkluZGV4OiB0aGlzLl9jdXJyZW50UXVlc3Rpb25JbmRleCxcbiAgICAgIG5leHRRdWVzdGlvbkluZGV4OiB0aGlzLl9nZXROZXh0UXVlc3Rpb25JbmRleCgpLFxuICAgICAgcHJldmlvdXNRdWVzdGlvbkluZGV4OiB0aGlzLl9nZXRQcmV2aW91c1F1ZXN0aW9uSW5kZXgoKSxcbiAgICAgIGFuc3dlcnM6IHRoaXMuX2Fuc3dlcnMsXG4gICAgICBxdWl6SXNTdGFydGVkOiB0aGlzLl9xdWl6SXNTdGFydGVkLFxuICAgICAgcXVpemlzRmluaXNoZWQ6IHRoaXMuX3F1aXpJc0ZpbmlzaGVkLFxuICAgICAgZm9ybUlzU3VibWl0ZWQ6IHRoaXMuX2Zvcm1Jc1N1Ym1pdGVkXG4gICAgfTtcbiAgfSxcblxuICBwbGF5OiBmdW5jdGlvbihwcm92aWRlcikge1xuICAgIGlmICh0aGlzLl91c2VyKSB7XG4gICAgICB0aGlzLl9zdGFydFF1aXooKTtcbiAgICB9IGVsc2UgaWYgKHByb3ZpZGVyKSB7XG4gICAgICB0aGlzLl9lbWl0Q2hhbmdlKHsgaXNMb2dpbmdJbjogdHJ1ZSB9KTtcblxuICAgICAgSHVsbC5sb2dpbihwcm92aWRlcikudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fdXNlciA9IEh1bGwuY3VycmVudFVzZXIoKTtcbiAgICAgICAgdGhpcy5fc3RhcnRRdWl6KCk7XG4gICAgICB9LmJpbmQodGhpcyksIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIHRoaXMuX2VtaXRDaGFuZ2UoeyBlcnJvcjogZXJyb3IgfSlcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93ICdwcm92aWRlciBpcyBtaXNzaW5nLi4uJztcbiAgICB9XG4gIH0sXG5cbiAgc2VsZWN0QW5zd2VyOiBmdW5jdGlvbihxdWVzdGlvbiwgYW5zd2VyKSB7XG4gICAgdGhpcy5fYW5zd2Vyc1txdWVzdGlvbi5yZWZdID0gYW5zd2VyLnJlZjtcbiAgICB0aGlzLl9uZXh0KCk7XG4gIH0sXG5cbiAgc2VsZWN0UXVlc3Rpb246IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLl9xdWVzdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UXVlc3Rpb25JbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy5fZW1pdENoYW5nZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyAnaW5kZXggbXVzdCBiZSBiZXR3ZWVuIDAgYW5kJyArICh0aGlzLl9xdWVzdGlvbnMubGVuZ3RoIC0gMSk7XG4gICAgfVxuICB9LFxuXG4gIGZpbmlzaFF1aXo6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2VtaXRDaGFuZ2UoeyBpc0xvYWRpbmc6ICdxdWl6JyB9KTtcblxuICAgIHRoaXMuX2NsZWFyVGlja2VyKCk7XG5cbiAgICB0aGlzLl9xdWl6RmluaXNoZWRBdCA9IG5ldyBEYXRlKCk7XG5cbiAgICBIdWxsLmFwaSh0aGlzLl9xdWl6LmlkICsgJy9hY2hpZXZlJyAsJ3Bvc3QnLCB7XG4gICAgICBhbnN3ZXJzOiB0aGlzLl9hbnN3ZXJzLFxuICAgICAgdGltaW5nOiB0aGlzLl9xdWl6RmluaXNoZWRBdCAtIHRoaXMuX3F1aXpTdGFydGVkQXRcbiAgICB9LCBmdW5jdGlvbihiYWRnZSkge1xuICAgICAgdGhpcy5fcXVpeklzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fYmFkZ2UgPSBiYWRnZTtcblxuICAgICAgdGhpcy5fZW1pdENoYW5nZSgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgc3VibWl0Rm9ybTogZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuX2VtaXRDaGFuZ2UoeyBpc0xvYWRpbmc6ICdmb3JtJyB9KTtcblxuICAgIHZhciByID0gSHVsbC5hcGkodGhpcy5fZm9ybS5pZCArICcvc3VibWl0JyAsJ3B1dCcsIHsgZGF0YTogZGF0YSB9KTtcbiAgICByLnRoZW4oZnVuY3Rpb24oZm9ybSkge1xuICAgICAgdGhpcy5fZm9ybSA9IGZvcm07XG4gICAgICB0aGlzLl9mb3JtSXNTdWJtaXRlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMuX2VtaXRDaGFuZ2UoKTtcbiAgICB9LmJpbmQodGhpcyksIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICB0aGlzLl9lbWl0Q2hhbmdlKHsgZXJyb3I6IGVycm9yIH0pO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgYWRkQ2hhbmdlTGlzdGVuZXI6IGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzIHx8IFtdO1xuXG4gICAgdmFyIGMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgbGlzdGVuZXIuYXBwbHkodW5kZWZpbmVkLCBhKTsgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGMpO1xuXG4gICAgSHVsbC5vbihDSEFOR0VfRVZFTlQsIGMpO1xuICB9LFxuXG4gIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9lbWl0Q2hhbmdlKHsgaXNMb2FkaW5nOiAncmVzZXQnIH0pO1xuXG4gICAgSHVsbC5hcGkodGhpcy5fc2hpcC5pZCkudGhlbihmdW5jdGlvbihzaGlwKSB7XG4gICAgICB0aGlzLl9zZXRJbml0aWFsU3RhdGUoSHVsbC5jdXJyZW50VXNlcigpLCBzaGlwKTtcblxuICAgICAgdGhpcy5fZW1pdENoYW5nZSgpO1xuICAgIH0uYmluZCh0aGlzKSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgIC8vIFRPRE8gaGFuZGxlIEFQSSBlcnJvcnMuXG4gICAgfSk7XG4gIH0sXG5cbiAgdHJhbnNsYXRlOiBmdW5jdGlvbihrZXksIGRhdGEpIHtcbiAgICB2YXIgdCA9IHRoaXMuX2NvbXBpbGVkVHJhbnNsYXRpb25zW2tleV1cbiAgICByZXR1cm4gdCA/IHQoZGF0YSB8fCB7fSkgOiAnTWlzc2luZyB0cmFuc2xhdGlvbiAnICsga2V5O1xuICB9LFxuXG4gIF9zZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKHVzZXIsIHNoaXApIHtcbiAgICB0aGlzLl9zaGlwID0gc2hpcDtcbiAgICB0aGlzLl91c2VyID0gdXNlcjtcbiAgICB0aGlzLl9xdWl6ID0gdGhpcy5fc2hpcC5yZXNvdXJjZXMucXVpejtcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fc2hpcC5yZXNvdXJjZXMuZm9ybTtcbiAgICB0aGlzLl9iYWRnZSA9IHRoaXMuX3VzZXIgJiYgdGhpcy5fc2hpcC5yZXNvdXJjZXMucXVpei5iYWRnO1xuICAgIHRoaXMuX3NldHRpbmdzID0gc2hpcC5zZXR0aW5ncztcbiAgICB0aGlzLl90cmFuc2xhdGlvbnMgPSBzaGlwLnRyYW5zbGF0aW9ucztcbiAgICB0aGlzLl9xdWVzdGlvbnMgPSB0aGlzLl9nZXRRdWVzdGlvbnMoKTtcbiAgICB0aGlzLl9jb3VudGRvd24gPSAodGhpcy5fc2V0dGluZ3MucXVpel9jb3VudGRvd24gPiAwKSAmJiB0aGlzLl9zZXR0aW5ncy5xdWl6X2NvdW50ZG93bjtcbiAgICB0aGlzLl9jdXJyZW50UXVlc3Rpb25JbmRleCA9IDA7XG4gICAgdGhpcy5fYW5zd2VycyA9IHt9O1xuICAgIHRoaXMuX3F1aXpJc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9xdWl6U3RhcnRlZEF0ID0gbnVsbDtcbiAgICB0aGlzLl9xdWl6SXNGaW5pc2hlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3F1aXpGaW5pc2hlZEF0ID0gbnVsbDtcbiAgICB0aGlzLl9mb3JtSXNTdWJtaXRlZCA9IGZhbHNlO1xuICB9LFxuXG4gIF9zdGFydFF1aXo6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3F1aXpJc1N0YXJ0ZWQgPSB0cnVlO1xuICAgIHRoaXMuX3F1aXpTdGFydGVkQXQgPSBuZXcgRGF0ZSgpO1xuXG4gICAgdGhpcy5fc3RhcnRUaWNrZXIoKTtcblxuICAgIHRoaXMuX2VtaXRDaGFuZ2UoKTtcbiAgfSxcblxuICBfbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9nZXROZXh0UXVlc3Rpb25JbmRleCgpO1xuICAgIGlmIChpKSB7XG4gICAgICB0aGlzLnNlbGVjdFF1ZXN0aW9uKGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpbmlzaFF1aXooKTtcbiAgICB9XG4gIH0sXG5cbiAgX2VtaXRDaGFuZ2U6IGZ1bmN0aW9uKHRlbXBvcmFyeSkge1xuICAgIHZhciBzdGF0ZSA9IF8uZXh0ZW5kKHt9LCAodGVtcG9yYXJ5IHx8IHt9KSwgdGhpcy5nZXRTdGF0ZSgpKTtcblxuICAgIEh1bGwuZW1pdChDSEFOR0VfRVZFTlQsIHN0YXRlKTtcbiAgfSxcblxuICBfZ2V0Q3VycmVudFN0ZXA6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5fdXNlciB8fCAhdGhpcy5fcXVpeklzU3RhcnRlZCkge1xuICAgICAgcmV0dXJuIENvbnN0YW50cy5JTlRST0RVQ1RJT05fU1RFUDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2Zvcm1Jc1N1Ym1pdGVkKSB7XG4gICAgICByZXR1cm4gQ29uc3RhbnRzLlRIQU5LU19TVEVQO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcXVpeklzRmluaXNoZWQpIHtcbiAgICAgIHJldHVybiBDb25zdGFudHMuUkVTVUxUX1NURVA7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9xdWl6SXNTdGFydGVkICYmICF0aGlzLl9xdWl6SXNGaW5pc2hlZCkge1xuICAgICAgcmV0dXJuIENvbnN0YW50cy5QTEFZX1NURVA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93ICdUaGlzIGlzIG5vdCBzdXBwb3NlZCB0byBoYXBwZW4uLi4nO1xuICAgIH1cbiAgfSxcblxuICBfZ2V0UXVlc3Rpb25zOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcXVlc3Rpb25zID0gdGhpcy5fc2hpcC5yZXNvdXJjZXMucXVpei5xdWVzdGlvbnM7XG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLnNhbXBsZV9xdWVzdGlvbnMgPiAwKSB7XG4gICAgICBxdWVzdGlvbnMgPSBfLnNhbXBsZShxdWVzdGlvbnMsIHRoaXMuX3NldHRpbmdzLnNhbXBsZV9xdWVzdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiBfLm1hcChxdWVzdGlvbnMsIGZ1bmN0aW9uKHEpIHtcbiAgICAgIHZhciBhbnN3ZXJzID0gcS5hbnN3ZXJzO1xuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLnNhbXBsZV9hbnN3ZXJzID4gMCkge1xuICAgICAgICBhbnN3ZXJzID0gXy5zYW1wbGUocS5hbnN3ZXJzLCB0aGlzLl9zZXR0aW5ncy5zYW1wbGVfYW5zd2Vycyk7XG4gICAgICB9XG4gICAgICBxLmFuc3dlcnMgPSBhbnN3ZXJzO1xuICAgICAgcS5jb3VudGRvd24gPSAodGhpcy5fc2V0dGluZ3MucXVlc3Rpb25fY291bnRkb3duID4gMCkgJiYgdGhpcy5fc2V0dGluZ3MucXVlc3Rpb25fY291bnRkb3duO1xuXG4gICAgICByZXR1cm4gcTtcbiAgICB9LCB0aGlzKTtcbiAgfSxcblxuICBfZ2V0UXVlc3Rpb246IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9uc1tpbmRleF07XG4gIH0sXG5cbiAgX2dldE5leHRRdWVzdGlvbkluZGV4OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKHRoaXMuX2N1cnJlbnRRdWVzdGlvbkluZGV4ICE9PSB0aGlzLl9xdWVzdGlvbnMubGVuZ3RoIC0gMSkgJiYgdGhpcy5fY3VycmVudFF1ZXN0aW9uSW5kZXggKyAxO1xuICB9LFxuXG4gIF9nZXRQcmV2aW91c1F1ZXN0aW9uSW5kZXg6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAodGhpcy5fY3VycmVudFF1ZXN0aW9uSW5kZXggPiAwKSAmJiB0aGlzLl9jdXJyZW50UXVlc3Rpb25JbmRleCAtIDE7XG4gIH0sXG5cbiAgX3N0YXJ0VGlja2VyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl90aWNrZXIgPSBzZXRJbnRlcnZhbCh0aGlzLl90aWNrLmJpbmQodGhpcyksIDEwMDApO1xuICB9LFxuXG4gIF9jbGVhclRpY2tlcjogZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aWNrZXIpO1xuICB9LFxuXG4gIF90aWNrOiBmdW5jdGlvbigpIHtcbiAgICAvLyBUT0RPIFRoaXMgaXMgbm90IHBlcmZlY3QuLi5cbiAgICB2YXIgZW1pdCA9IGZhbHNlO1xuXG4gICAgaWYgKF8uaXNOdW1iZXIodGhpcy5fY291bnRkb3duKSkge1xuICAgICAgaWYgKHRoaXMuX2NvdW50ZG93biA+IDApIHtcbiAgICAgICAgZW1pdCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NvdW50ZG93bi0tO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9jb3VudGRvd24gPT09IDApIHtcbiAgICAgICAgdGhpcy5maW5pc2hRdWl6KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHEgPSB0aGlzLl9nZXRRdWVzdGlvbih0aGlzLl9jdXJyZW50UXVlc3Rpb25JbmRleCk7XG4gICAgaWYgKF8uaXNOdW1iZXIocS5jb3VudGRvd24pKSB7XG4gICAgICBpZiAocS5jb3VudGRvd24gPiAwKSB7XG4gICAgICAgIGVtaXQgPSB0cnVlO1xuICAgICAgICBxLmNvdW50ZG93bi0tO1xuICAgICAgfSBlbHNlIGlmIChxLmNvdW50ZG93biA9PT0gMCkge1xuICAgICAgICB0aGlzLl9uZXh0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVtaXQpIHsgdGhpcy5fZW1pdENoYW5nZSgpOyB9XG4gIH1cbn07XG5cbkVuZ2luZS5Db25zdGFudHMgPSBDb25zdGFudHM7XG5cbm1vZHVsZS5leHBvcnRzID0gRW5naW5lO1xuXG4iLCJhbmd1bGFyLm1vZHVsZSgnc2NoZW1hRm9ybScpLmNvbmZpZyhcblsnc2NoZW1hRm9ybVByb3ZpZGVyJywgJ3NjaGVtYUZvcm1EZWNvcmF0b3JzUHJvdmlkZXInLCAnc2ZQYXRoUHJvdmlkZXInLFxuICBmdW5jdGlvbihzY2hlbWFGb3JtUHJvdmlkZXIsICBzY2hlbWFGb3JtRGVjb3JhdG9yc1Byb3ZpZGVyLCBzZlBhdGhQcm92aWRlcikge1xuXG4gICAgdmFyIGRhdGVwaWNrZXIgPSBmdW5jdGlvbihuYW1lLCBzY2hlbWEsIG9wdGlvbnMpIHtcbiAgICAgIGlmIChzY2hlbWEudHlwZSA9PT0gJ3N0cmluZycgJiYgKHNjaGVtYS5mb3JtYXQgPT09ICdkYXRlJyB8fCBzY2hlbWEuZm9ybWF0ID09PSAnZGF0ZS10aW1lJykpIHtcbiAgICAgICAgdmFyIGYgPSBzY2hlbWFGb3JtUHJvdmlkZXIuc3RkRm9ybU9iaihuYW1lLCBzY2hlbWEsIG9wdGlvbnMpO1xuICAgICAgICBmLmtleSAgPSBvcHRpb25zLnBhdGg7XG4gICAgICAgIGYudHlwZSA9ICdkYXRlcGlja2VyJztcbiAgICAgICAgb3B0aW9ucy5sb29rdXBbc2ZQYXRoUHJvdmlkZXIuc3RyaW5naWZ5KG9wdGlvbnMucGF0aCldID0gZjtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNjaGVtYUZvcm1Qcm92aWRlci5kZWZhdWx0cy5zdHJpbmcudW5zaGlmdChkYXRlcGlja2VyKTtcblxuICAgIC8vQWRkIHRvIHRoZSBGb3VuZGF0aW9uIGRpcmVjdGl2ZVxuICAgIHNjaGVtYUZvcm1EZWNvcmF0b3JzUHJvdmlkZXIuYWRkTWFwcGluZyhcbiAgICAgICdmb3VuZGF0aW9uRGVjb3JhdG9yJyxcbiAgICAgICdkYXRlcGlja2VyJyxcbiAgICAgICdkaXJlY3RpdmVzL2RlY29yYXRvcnMvZm91bmRhdGlvbi9kYXRlcGlja2VyLmh0bWwnXG4gICAgKTtcbiAgICBzY2hlbWFGb3JtRGVjb3JhdG9yc1Byb3ZpZGVyLmNyZWF0ZURpcmVjdGl2ZShcbiAgICAgICdkYXRlcGlja2VyJyxcbiAgICAgICdkaXJlY3RpdmVzL2RlY29yYXRvcnMvZm91bmRhdGlvbi9kYXRlcGlja2VyLmh0bWwnXG4gICAgKTtcbiAgfVxuXSk7XG4iLCJyZXF1aXJlKCcuL2ZvdW5kYXRpb24tZGVjb3JhdG9yLWRhdGVwaWNrZXInKTtcbmFuZ3VsYXIubW9kdWxlKCdzY2hlbWFGb3JtJykuY29uZmlnKFsnc2NoZW1hRm9ybURlY29yYXRvcnNQcm92aWRlcicsIGZ1bmN0aW9uKGRlY29yYXRvcnNQcm92aWRlcikge1xuICB2YXIgYmFzZSA9ICdkaXJlY3RpdmVzL2RlY29yYXRvcnMvZm91bmRhdGlvbi8nO1xuXG4gIGRlY29yYXRvcnNQcm92aWRlci5jcmVhdGVEZWNvcmF0b3IoJ2ZvdW5kYXRpb25EZWNvcmF0b3InLCB7XG4gICAgdGV4dGFyZWE6IGJhc2UgKyAndGV4dGFyZWEuaHRtbCcsXG4gICAgZmllbGRzZXQ6IGJhc2UgKyAnZmllbGRzZXQuaHRtbCcsXG4gICAgYXJyYXk6IGJhc2UgKyAnYXJyYXkuaHRtbCcsXG4gICAgdGFiYXJyYXk6IGJhc2UgKyAndGFiYXJyYXkuaHRtbCcsXG4gICAgdGFiczogYmFzZSArICd0YWJzLmh0bWwnLFxuICAgIHNlY3Rpb246IGJhc2UgKyAnc2VjdGlvbi5odG1sJyxcbiAgICBjb25kaXRpb25hbDogYmFzZSArICdzZWN0aW9uLmh0bWwnLFxuICAgIGFjdGlvbnM6IGJhc2UgKyAnYWN0aW9ucy5odG1sJyxcbiAgICBkYXRlcGlja2VyOiBiYXNlICsgJ2RhdGVwaWNrZXIuaHRtbCcsXG4gICAgc2VsZWN0OiBiYXNlICsgJ3NlbGVjdC5odG1sJyxcbiAgICBjaGVja2JveDogYmFzZSArICdjaGVja2JveC5odG1sJyxcbiAgICBjaGVja2JveGVzOiBiYXNlICsgJ2NoZWNrYm94ZXMuaHRtbCcsXG4gICAgbnVtYmVyOiBiYXNlICsgJ2RlZmF1bHQuaHRtbCcsXG4gICAgcGFzc3dvcmQ6IGJhc2UgKyAnZGVmYXVsdC5odG1sJyxcbiAgICBzdWJtaXQ6IGJhc2UgKyAnc3VibWl0Lmh0bWwnLFxuICAgIGJ1dHRvbjogYmFzZSArICdzdWJtaXQuaHRtbCcsXG4gICAgcmFkaW9zOiBiYXNlICsgJ3JhZGlvcy5odG1sJyxcbiAgICAncmFkaW9zLWlubGluZSc6IGJhc2UgKyAncmFkaW9zLWlubGluZS5odG1sJyxcbiAgICByYWRpb2J1dHRvbnM6IGJhc2UgKyAncmFkaW8tYnV0dG9ucy5odG1sJyxcbiAgICBoZWxwOiBiYXNlICsgJ2hlbHAuaHRtbCcsXG4gICAgJ2RlZmF1bHQnOiBiYXNlICsgJ2RlZmF1bHQuaHRtbCdcbiAgfSwgW1xuICAgIGZ1bmN0aW9uKGZvcm0pIHtcbiAgICAgIGlmIChmb3JtLnJlYWRvbmx5ICYmIGZvcm0ua2V5ICYmIGZvcm0udHlwZSAhPT0gJ2ZpZWxkc2V0Jykge1xuICAgICAgICByZXR1cm4gYmFzZSArICdyZWFkb25seS5odG1sJztcbiAgICAgIH1cbiAgICB9XG4gIF0sIHsgY2xhc3NOYW1lOiBcInJvd1wiIH0pO1xuXG4gIC8vbWFudWFsIHVzZSBkaXJlY3RpdmVzXG4gIGRlY29yYXRvcnNQcm92aWRlci5jcmVhdGVEaXJlY3RpdmVzKHtcbiAgICB0ZXh0YXJlYTogYmFzZSArICd0ZXh0YXJlYS5odG1sJyxcbiAgICBzZWxlY3Q6IGJhc2UgKyAnc2VsZWN0Lmh0bWwnLFxuICAgIGNoZWNrYm94OiBiYXNlICsgJ2NoZWNrYm94Lmh0bWwnLFxuICAgIGNoZWNrYm94ZXM6IGJhc2UgKyAnY2hlY2tib3hlcy5odG1sJyxcbiAgICBudW1iZXI6IGJhc2UgKyAnZGVmYXVsdC5odG1sJyxcbiAgICBzdWJtaXQ6IGJhc2UgKyAnc3VibWl0Lmh0bWwnLFxuICAgIGJ1dHRvbjogYmFzZSArICdzdWJtaXQuaHRtbCcsXG4gICAgdGV4dDogYmFzZSArICdkZWZhdWx0Lmh0bWwnLFxuICAgIGRhdGU6IGJhc2UgKyAnZGVmYXVsdC5odG1sJyxcbiAgICBwYXNzd29yZDogYmFzZSArICdkZWZhdWx0Lmh0bWwnLFxuICAgIGRhdGVwaWNrZXI6IGJhc2UgKyAnZGF0ZXBpY2tlci5odG1sJyxcbiAgICBpbnB1dDogYmFzZSArICdkZWZhdWx0Lmh0bWwnLFxuICAgIHJhZGlvczogYmFzZSArICdyYWRpb3MuaHRtbCcsXG4gICAgJ3JhZGlvcy1pbmxpbmUnOiBiYXNlICsgJ3JhZGlvcy1pbmxpbmUuaHRtbCcsXG4gICAgcmFkaW9idXR0b25zOiBiYXNlICsgJ3JhZGlvLWJ1dHRvbnMuaHRtbCcsXG4gIH0pO1xuXG59XSkuZGlyZWN0aXZlKCdzZkZpZWxkc2V0JywgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICBzY29wZTogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogJ2RpcmVjdGl2ZXMvZGVjb3JhdG9ycy9mb3VuZGF0aW9uL2ZpZWxkc2V0LXRyY2wuaHRtbCcsXG4gICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICBzY29wZS50aXRsZSA9IHNjb3BlLiRldmFsKGF0dHJzLnRpdGxlKTtcbiAgICB9XG4gIH07XG59KTtcbiJdfQ==
