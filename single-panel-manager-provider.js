/**
 * Manages all instances of single panel components
 *
 * This service is responsible for managing all the active instances of single panels.
 *
 * @module nag.singlePanel.manager
 * @ngservice nagSinglePanelManager
 */
angular.module('nag.singlePanel')
.provider('nagSinglePanelManager', [
  function() {
    var singlePanelDirectives = [];

    return {
      $get: [
        '$timeout',
        function($timeout) {
          var globalEventsAdded, panels, addGlobalEvents, closePanels, singlePanelManager;

          globalEventsAdded = false;
          panels = {};

          closePanels = function(excludeId) {
            _.forEach(panels, function(callback, panelId) {
              if(panelId !== excludeId) {
                callback();
              }
            });
          };

          addGlobalEvents = function() {
            //if we click outside of the panel, close it
            $(document).bind('mouseup.single-panel', function(event) {
              $timeout(function() {
                closePanels();
              }, 0);
            });

            //the escape key should close the panel
            $(document).bind('keyup.single-panel', function(event) {
              $timeout(function() {
                if(event.which === 27) {
                  closePanels();
                }
              }, 0);
            });

            globalEventsAdded = true;
          };

          singlePanelManager = {
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
            },

            getSinglePanelDirectives: function(directives) {
              //since only one of these is required, make them all optional
              return _.map(directives.concat(singlePanelDirectives), function(item) {
                return '?' + item;
              });
            }
          };

          return singlePanelManager;
        }
      ],
      setSinglePanelDirectives: function(directives) {
        singlePanelDirectives = directives;
      }
    };
  }
]);
