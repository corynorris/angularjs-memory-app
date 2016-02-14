var validators = angular.module('validators', []);

/**
 * Compares against a given variable in the scope
 */
 validators.directive('unique', function() {
 	'use strict';

 	return {
		restrict: 'A', // Attribute only (default, but here for clarity)
		require: 'ngModel', // We need ngModel
		link: function(scope, elm, attrs, ctrl) {

			ctrl.$validators.unique = function(modelValue, viewValue) {

				var isValid = true;

				angular.forEach(scope[attrs.unique], function(el, index) {
					if (el[attrs.name] === modelValue) {
						isValid = false;
					}
				});

				return isValid;
			}		
		},

	}

});

validators.directive('showValidation', function() {
	'use strict';

	return {
		restrict: 'A',
		require:  '^form',

		link: function (scope, el, attrs, formCtrl) {
			// Get the contained element
			var inputEl = el[0].querySelector("[name]");
			var inputNgEl = angular.element(inputEl);

			// Get the name of the element in the form
			var inputName = inputNgEl.attr('name');

			inputNgEl.bind('blur', function() {
				if (inputNgEl.val() !== '') {
					el.toggleClass('has-error', formCtrl[inputName].$invalid);
					el.toggleClass('has-success', formCtrl[inputName].$valid);
				}


			});

			scope.$on('show-validation-reset', function() {			
			    el.removeClass('has-error');
				el.removeClass('has-success');
			  
			});

	  	}
	}
});