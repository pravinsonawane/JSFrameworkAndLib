		var App = angular.module('App', []);
		 
		// Set up a controller and define a model, list1 and list2 (empty)
		App.controller('dndCtrl', function($scope) {
		  $scope.technologies = [
			{name: 'AngularJS', id:1, reject: true},
			{name: 'Backbone', id:2},
			{name: 'CanJS', id:3}
		  ];
		  
		  $scope.oldTechnologies = [
			{name: 'Flex', id:4}
		  ];
		  
		 // $scope.draggedItem = null;
		  
		  
		});
		 
		// This makes any element draggable
		// Usage: <div draggable>Foobar</div>
		App.directive('draggable', function() {
			return {
				// A = attribute, E = Element, C = Class and M = HTML Comment
				restrict:'A',
				//The link function is responsible for registering DOM listeners as well as updating the DOM.
				link: function(scope, element, attrs) {
					//scope.draggedItem = angular.copy(element);
					element.draggable({
						revert:true
					});
				}
			};
		});
		 
		// This makes any element droppable
		// Usage: <div droppable></div>
		App.directive('droppable', function($compile) {
		  return {
			restrict: 'A',
			link: function(scope,element,attrs){
			  //This makes an element Droppable
				element.droppable({
					drop:function(event,ui) {
						var dragIndex = angular.element(ui.draggable).data('index'),
							id = angular.element(ui.draggable).data('id'),
							dragEl = angular.element(ui.draggable),
							dropEl = angular.element(this);
							
						scope.oldTechnologies.push(scope.technologies[dragIndex]);	

						scope.$apply();
					}
				});
			}
		  };
		}); 