angular.module('app.home.home', [
  'app.core'
])
.config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('app.home.home', {
      url: '',
      views: {
        '': {
          templateUrl: '/app/components/home/assets/templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    });
  }
])
.controller('HomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.name = 'AngularJS Seed';
  $scope.testEvent = function() {
    $rootScope.$emit('NagSinglePanel[expander2]/show');
  }
}]);
