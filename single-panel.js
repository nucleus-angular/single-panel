/**
 * Make sure only one single element is active at one point in time
 *
 * This directive indicates an element as a single panel element and there can only be one single panel element active at any point in time.  This is usually for example, if you have a number of button dropd own elements but you only want one expanded at at point in time.
 *
 * EXAMPLES TODO
 *
 * @module nag.singlePanel.panel
 * @ngdirective nagSinglePanel
 *
 * @nghtmlattribute {null} nag-single-panel
 */
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
      priority: 399,
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
          /**
           * Unique id of the panel
           *
           * @ngscope
           * @property id
           * @type {string}
           */
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

          element.bind('mouseup.' + scope.id, function(event) {
            //when mouseup inside the element, we need to stop propagation as we don't wanted to close the panel we are clicking in
            event.stopPropagation();

            //close all other panel except the one that was just created
            //todo: research: I don't think that I should need a $timeout here for this code to work properly
            $timeout(function(){nagSinglePanelManager.closeAll(scope.id);}, 0);
          });

          nagSinglePanelManager.add(scope.id, scope.hide);
        };
      }
    };
  }
]);
