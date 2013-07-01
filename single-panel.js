angular.module('nag.singlePanel.panel', [
  'nag.core',
  'nag.singlePanel.manager'
])
.directive('nagSinglePanel', [
  '$compile',
  '$timeout',
  'nagHelper',
  'nagSinglePanelManager',
  function($compile, $timeout, nagHelper, nagSinglePanelManager){
    return {
      restrict: 'EA',
      require: ['?nagExpander'],
      priority: 0,
      controller: [
        '$scope',
        function($scope) {
          $scope.$on('$destroy', function() {
            //need to remove the panel
            nagSinglePanelManager.remove($scope.id);
          });
        }
      ],
      compile: function(element, attributes, transclude) {
        return function(scope, element, attributes, controllers) {
          //each panel needs a unique id in order to be able to handle events properly
          scope.id = nagHelper.generateId('single-panel');

          _.forEach(controllers, function(controller) {
            while(!_.isFunction(scope.hide)) {
              if(_.isFunction(controller.hide)) {
                scope.hide = controller.hide;
              }
            }
          });

          //make sure the scope has a hide method
          if(!_.isFunction(scope.hide)) {
            throw new Error("There must be a hide method to use the single panel directive");
          }

          element.attr('data-single-panel-id', scope.id)
          .addClass('single-panel');

          element.bind('click.' + scope.id, function(event) {
            //when clicking inside the element, we need to stop propagation as we don't wanted to close the panel we are clicking in
            event.stopPropagation();

            //close all other panel except the one that was just created
            //todo: fix: using timeout causing the massive amount of scope digests to be called, need to fix
            //todo: research: I don't think that I should need a $timeout here for this code to work properly
            $timeout(function(){nagSinglePanelManager.closeAll(scope.id);}, 0);
          });

          nagSinglePanelManager.add(scope.id, scope.hide);
        };
      }
    };
  }
]);
