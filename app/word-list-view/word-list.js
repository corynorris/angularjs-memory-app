'use strict';

angular.module('rememberAll.wordList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/word-list', {
    templateUrl: 'word-list-view/word-list.html',
    controller: 'wordListController'
  });
}])

.controller('wordListController', ['$scope','Memory', 'memoryStore', function($scope, Memory, memoryStore) {
	'use strict';

	// Make sure we're always referencing the same thing
	memoryStore.loadAllMemories();
	$scope.memories =  memoryStore.memories;  

	/**
	 * Resets 'newMemory' so that the form is ready to be used
	 */
	function resetMemory() {
		$scope.newMemory = new Memory();
		$scope.$broadcast('show-validation-reset');
	}
	resetMemory();

	$scope.addMemory = function(formName) {
		
		// Check for valid formatting 
		if (!formName.$valid) {
			return;
		}

		// Save and reset memory
		memoryStore.insert($scope.newMemory);

		// Clear formatting on forms
		resetMemory();
	}

	$scope.removeMemory = function(memory) {
		memoryStore.delete(memory);
	}

}]);

