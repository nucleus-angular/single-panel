angular.module('app.home.customDirective', [
  'nag.core'
])
.directive('customDirective', [
  'nagHelper',
  function(nagHelper) {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: nagHelper.templateUrl,
      controller: [
        '$scope',
        function($scope) {
          this.hide = function() {
            $scope.hide();
          }
          this.show = function() {
            $scope.show();
          }
        }
      ],
      compile: function(element) {
        element.addClass('custom');

        element.find('> .h').attr('ng-mouseup', 'toggle()');
        element.find('> .h').attr('ng-class', "{'is-active': showIt}");
        element.find('> .c').attr('ng-class', "{'is-active': showIt}");

        return function($scope, eleemnt) {
          $scope.showIt = false;

          $scope.show = function() {
            $scope.showIt = true;
          };

          $scope.hide = function() {
            $scope.showIt = false;
          };

          $scope.toggle = function() {
            $scope.showIt = !$scope.showIt;
          };
        }
      }
    }
  }
])
