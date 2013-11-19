angular.module('app', [
  'app.core',
  'app.home',
  'nag.expander',
  'nag.singlePanel'
])
.config([
  '$locationProvider',
  '$urlRouterProvider',
  'nagSinglePanelManagerProvider',
  function($locationProvider, $urlRouterProvider, nagSinglePanelManagerProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/home');

    nagSinglePanelManagerProvider.setSinglePanelDirectives(['customDirective']);
  }
])
.run([
  '$state',
  '$rootScope',
  function($state, $rootScope) {
  }
]);
