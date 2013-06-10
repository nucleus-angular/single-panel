angular.module('nag.singlePanel', [
  'nag.core'
])
.directive('nagSinglePanel', [
  '$compile',
  'nagHelper',
  function($compile, nagHelper){
    return {
      restrict: 'EA',
      require: '?nagExpander',
      priority: 0,
      controller: [
        '$scope',
        function($scope) {
          //need to unbind the global events
          $scope.$on('$destroy', function() {
            $(document).unbind('click.' + $scope.id).unbind('keydown.' + $scope.id);
          });
        }
      ],
      compile: function(element, attributes, transclude) {
        return function(scope, element, attributes, nagExpanderCtrl) {
          //each panel needs a unique id in order to be able to handle events properly
          scope.id = nagHelper.generateId('single-panel');

          //map functionality exposed by the expander controller if it has it
          if(nagExpanderCtrl) {
            if(!_.isFunction(scope.hide)) {
              scope.hide = function() {
                nagExpanderCtrl.collapse();
              }
            }
            if(!_.isFunction(scope.hide)) {
              scope.hide = function() {
                nagExpanderCtrl.collapse();
              }
            }
          }

          //make sure the scope has a hide method
          if(!_.isFunction(scope.hide)) {
            throw new Error("There must be a hide method to use the single panel directive");
          }

          element.attr('data-single-panel-id', scope.id)
          .addClass('single-panel')
          //this is a custom event that can triggered to close the panel (used below)
          .bind('single-panel-close', function() {
            scope.$apply(function() {
              scope.hide();
            });
          });

          //the escape key should close the panel
          $(document).bind('keydown.' + scope.id, function(event) {
            scope.$apply(function() {
              if(event.which === 27) {
                scope.hide();
              }
            });
          });

          element.bind('click.' + scope.id, function(event) {
            //when clicking inside the element, we need to stop propagation as we don't wanted to close the panel we are clicking in
            event.stopPropagation();

            //close all other panel except the one that was just created
            $('.single-panel[data-single-panel-id!=' + scope.id + ']').trigger('single-panel-close');
          });

          //if we click outside of the panel, close it
          $(document).bind('click.' + scope.id, function(event) {
            scope.$apply(function() {
              scope.hide();
            });
          });
        };
      }
    };
  }
]);
