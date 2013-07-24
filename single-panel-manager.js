/**
 * Manages all instances of single panel components
 *
 * @module nag.singlePanel.manager
 * @ngservice nagSinglePanelManager
 */
angular.module('nag.singlePanel.manager', [])
.factory('nagSinglePanelManager', [
  '$rootScope',
  function($rootScope) {
    var globalEventsAdded, panels, addGlobalEvents, closePanels;

    globalEventsAdded = false;
    panels = {};

    closePanels = function(excludeId) {
      _.forEach(panels, function(callback, panelId) {
        if(panelId !== excludeId) {
          callback()
        }
      });
    };

        addGlobalEvents = function() {
            //if we click outside of the panel, close it
            $(document).bind('mouseup.single-panel', function(event) {
                $rootScope.$apply(function() {
                    closePanels();
                });
            });

            //the escape key should close the panel
            $(document).bind('keyup.single-panel', function(event) {
                $rootScope.$apply(function() {
                    if(event.which === 27) {
              closePanels();
            }
        });
      });

      globalEventsAdded = true;
    };

    return {
      /**
       * Add a single panel instance
       *
       * @method add
       *
       * @param {string} panelId Single panel instance id
       * @param {function} callback Function to call when triggering the closing of a single panel instance
       */
      add: function(panelId, callback) {
        if(globalEventsAdded === false) {
          addGlobalEvents();
        }

        panels[panelId] = callback;
      },

      /**
       * Remove as single panel instance
       *
       * @method remove
       *
       * @param {string} panelId Single panel instance if to remove
       */
      remove: function(panelId) {
        delete panels[panelId];
      },

      /**
       * Close all single panel instances
       *
       * @method closeAll
       *
       * @param {string} [excludeId] Single panel instance id that should not be closed
       */
      closeAll: function(excludeId) {
        closePanels(excludeId);
      }
    };
  }
]);
