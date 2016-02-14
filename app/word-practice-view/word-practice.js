'use strict';

angular.module('rememberAll.wordPractice', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/word-practice', {
    templateUrl: 'word-practice-view/word-practice.html',
    controller: 'wordPracticeController'
  });
}])

.controller('wordPracticeController', ['$scope', 'Memory', 'memoryStore', function($scope, Memory, memoryStore) {
	'use strict';

	// Make sure we're always referencing the same thing
	memoryStore.loadAllMemories();

	// get a subset of memories for studying
	$scope.memories = memoryStore.memories.filter(function(memory) {
		return memory.readyToStudy();
	});

	// Keep track of success
	$scope.completedCount = 0;
	$scope.totalCount = $scope.memories.length;
	$scope.curMemory = $scope.memories[$scope.completedCount];
	$scope.guess = '';

	function loadNextMemory() {
		$scope.guess = '';
		$scope.completedCount++;
		$scope.curMemory = $scope.memories[$scope.completedCount];
	}

	// Progress through memories
	$scope.nextMemory = function() {

		// Check answer
		if ($scope.guess === $scope.curMemory.meaning) {
			$scope.curMemory.updateForSuccess();
		} else {
			$scope.curMemory.updateForFailure();
		}
		
		// save the changes
		var index = memoryStore.memories.indexOf($scope.curMemory);
		memoryStore.put($scope.curMemory, index);


		// Load next memory (unless we're done)  
		loadNextMemory();		
	}

	$scope.hasRemaining = function() {
		return $scope.totalCount - $scope.completedCount > 0;
	}

	$scope.listCreated = function() {
		return memoryStore.memories.length > 0;
	}

	$scope.nextSession = function() {
		if (!$scope.listCreated()) {
			return "No list created yet";
		}
		var lowest = memoryStore.memories[0].nextReview;
		for (var i = 0; i < memoryStore.memories.length; i++) {
			 if (memoryStore.memories[i].nextReview < lowest) {
			 	lowest = memoryStore.memories[i].nextReview;
			 }
		}
		return lowest;
	}


}]);