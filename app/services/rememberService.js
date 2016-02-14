var rememberService = angular.module('rememberService', []);


rememberService.factory('Memory', function() {

	var learningStates = ['learning','soft-memory', 'strong-memory', 'learned'];



	function Memory(memoryData) {
		if (memoryData) {
			this.setData(memoryData);
		} else {
			this.word = '';
			this.meaning = '';
			this.status = learningStates[0];
			this.nextReview = new Date();		
		}
	}

	Memory.prototype = {

		setData: function(memoryData) {
			this.word = memoryData.word;
			this.meaning = memoryData.meaning;
			this.status = memoryData.status;
			this.nextReview = new Date(memoryData.nextReview);	

            // Alternately angular.extend(this, memoryData);
        },

        isLearned: function() {
        	return learningStates.indexOf(this.status) === learningStates.indexOf('learned');
        },

        timeToReview: function() {
        	var now = new Date();
        	return now >= this.nextReview;
        },

        readyToStudy: function() {
        	return (!this.isLearned() && this.timeToReview());
        },

        updateForSuccess: function() {
        	var curLearningState = learningStates.indexOf(this.status);
        	var hours = Math.pow(4, (curLearningState + 1));
        	var nextLearningState = Math.min(curLearningState + 1, learningStates.indexOf('learned'));
        	this.status = learningStates[nextLearningState];
        	this.setNextReview(hours);
        },

        updateForFailure: function() {
        	this.setNextReview(2);
        	this.status = learningStates[0];
        },

        setNextReview: function(hours) {
        	var now  = new Date();
        	var later = new Date(now);
        	later.setHours(now.getHours() + hours);
        	this.nextReview = later;
        }
    };

    return Memory;

});

rememberService.factory('memoryStore',['Memory', function(Memory) {
	'use strict';

	var STORAGE_ID = 'memory-storage.js';

	var store = {

		memories: [],

		_getFromLocalStorage: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		_saveToLocalStorage: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		},

		loadAllMemories: function () {
			store.memories = [];
			var allMemories = store._getFromLocalStorage();
			allMemories.forEach(function(memoryData) {
				var memory = new Memory(memoryData);
				store.memories.push(memory);
			});
		},


		put: function (memory, index) {
			store.memories[index] = memory;
			store._saveToLocalStorage(store.memories);
		},

		delete: function (memory) {
			store.memories.splice(store.memories.indexOf(memory), 1);
			store._saveToLocalStorage(store.memories);
		},

		insert: function(memory) {
			store.memories.push(memory);
			store._saveToLocalStorage(store.memories);
		}


	}

	return store;

}]);


