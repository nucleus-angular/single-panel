angular.module('nag.singlePanel.manager', [])
.factory('nagSinglePanelManager', [
    '$rootScope',
    function($rootScope) {
        var globalEventsAdded, panels, addGlobalEvents, closeAllPanels;

        globalEventsAdded = false;
        panels = {};

        closeAllPanels = function() {
            _.forEach(panels, function(callback) {
                callback();
            });
        };

        addGlobalEvents = function() {
            //if we click outside of the panel, close it
            $(document).bind('click.single-panel', function(event) {
                $rootScope.$apply(function() {
                    closeAllPanels();
                });
            });

            //the escape key should close the panel
            $(document).bind('keydown.single-panel', function(event) {
                $rootScope.$apply(function() {
                    if(event.which === 27) {
                        closeAllPanels();
                    }
                });
            });

            globalEventsAdded = true;
        };

        return {
            add: function(panelId, callback) {
                if(globalEventsAdded === false) {
                    addGlobalEvents();
                }

                panels[panelId] = callback;
            },
            remove: function(panelId) {
                delete panels[panelId];
            },
            closeAll: function() {
                closeAllPanels();
            }
        };
    }
]);