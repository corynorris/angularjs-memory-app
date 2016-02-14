'use strict';

// Declare app level module which depends on views, and components
angular.module('rememberAll', [
  'ngRoute',
  'rememberService',
  'rememberAll.intro',
  'rememberAll.wordList',
  'rememberAll.wordPractice',
  'validators',
  'angularMoment'
  ]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/intro'});
}]);
