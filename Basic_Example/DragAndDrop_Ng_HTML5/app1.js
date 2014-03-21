var app = angular.module('dnd', []);

function dndCtrl($scope) {
 
    $scope.model = [
        {
            "id": 1,
            "value": "Who the fuck is Arthur Digby Sellers?"
        },
        {
            "id": 2,
            "value": "I've seen a lot of spinals, Dude, and this guy is a fake. "
        },
        {
            "id": 3,
            "value": "But that is up to little Larry here. Isn't it, Larry?"
        },
        {
            "id": 4,
            "value": " I did not watch my buddies die face down in the mud so that this fucking strumpet."
        }
    ];
 
    // watch, use 'true' to also receive updates when values
    // change, instead of just the reference
    $scope.$watch("model", function(value) {
        console.log("Model: " + value.map(function(e){return e.id}).join(','));
    },true);
	
}

// directive for a single list
app.directive('dndList', function() {
 
    return function(scope, element, attrs) {
		// variables used for dnd
        var toUpdate;
        var startIndex = -1;
 
        // watch the model, so we always know what element
        // is at a specific position
        scope.$watch(attrs.dndList, function(value) {
			toUpdate = value;
        },true);
 
        // use jquery to make the element sortable (dnd). This is called
        // when the element is rendered
        $(element[0]).sortable({
            items:'li',
            start:function (event, ui) {
                // on start we define where the item is dragged from
				console.log(ui.item);
                startIndex = ($(ui.item).index());
            },
            stop:function (event, ui) {
                // on stop we determine the new index of the
                // item and store it there
                var newIndex = ($(ui.item).index());
                var toMove = toUpdate[startIndex];
                toUpdate.splice(startIndex,1);
                toUpdate.splice(newIndex,0,toMove);
 
                // we move items in the array, if we want
                // to trigger an update in angular use $apply()
                // since we're outside angulars lifecycle
                scope.$apply(scope.model);
            },
            axis:'y'
        })
    }
});
