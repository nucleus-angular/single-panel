angular.module('nag.singlePanel')
.controller('NagSinglePanelDCtrl', [
  '$scope',
  function($scope) {
    $scope.$on('$destroy', function() {
      //need to remove the panel
      nagSinglePanelManager.remove($scope.id);
    });
  }
]);
