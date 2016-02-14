'use strict';

angular.module('rememberAll.intro', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/intro', {
    templateUrl: 'intro-view/intro.html',
    controller: 'introController'
  });
}])

.controller('introController', [function() {

}]);