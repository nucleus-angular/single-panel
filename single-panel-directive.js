/**
 * Make sure only one single element is active at one point in time
 *
 * This directive indicates an element as a single panel element and there can only be one single panel element active at any point in time.  This is usually for example, if you have a number of button dropd own elements but you only want one expanded at at point in time.
 *
 * EXAMPLES TODO
 *
 * @module nag.singlePanel
 * @ngdirective nagSinglePanel
 *
 * @nghtmlattribute {null} nag-single-panel
 * @nghtmlattribute {mixed} data-id
 */
angular.module('nag.singlePanel')
.directive('nagSinglePanel', [
  '$compile',
  '$timeout',
  '$rootScope',
  'nagHelper',
  'nagSinglePanelManager',
  function($compile, $timeout, $rootScope, nagHelper, nagSinglePanelManager){
    return {
      restrict: 'EA',
      require: nagSinglePanelManager.getSinglePanelDirectives([
        'nagExpander',
        'nagTooltip'
      ]),
      priority: 399,
      controller: 'NagSinglePanelDCtrl',
      compile: function(element, attributes, transclude) {
        if(!attributes.id) {
          throw new Error("Must provide data-id attribute for single panel");
        }

        return function(scope, element, attributes, controllers) {
          //each panel needs a unique id in order to be able to handle events properly
          var uniqueId = attributes.id.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
          var hideHandler;
          var showHandler;

          _.forEach(controllers, function(controller) {
            if(!_.isFunction(hideHandler) && !_.isUndefined(controller)) {
              if(_.isFunction(controller.hide)) {
                hideHandler = controller.hide;
              }
            }
            if(!_.isFunction(showHandler) && !_.isUndefined(controller)) {
              if(_.isFunction(controller.show)) {
                showHandler = controller.show;
              }
            }
          });

          //make sure the scope has a hide method
          if(!_.isFunction(hideHandler) || !_.isFunction(showHandler)) {
            throw new Error("There must be a hide and show method to use the single panel directive");
          }

          element.attr('data-single-panel-id', uniqueId)
          .addClass('single-panel');

          element.bind('mouseup.' + uniqueId, function(event) {
            //when mouseup inside the element, we need to stop propagation as we don't wanted to close the panel we are clicking in
            event.stopPropagation();

            //close all other panel except the one that was just created
            //todo: research: I don't think that I should need a $timeout here for this code to work properly
            $timeout(function(){nagSinglePanelManager.closeAll(uniqueId);}, 0);
          });

          $rootScope.$on('NagSinglePanel[' + uniqueId + ']/show', function() {
            //TODO: research: I don't think that I should need a $timeout here for this code to work properly
            $timeout(function(){nagSinglePanelManager.closeAll(uniqueId);showHandler();}, 0);
          });

          nagSinglePanelManager.add(uniqueId, hideHandler);
        };
      }
    };
  }
]);
