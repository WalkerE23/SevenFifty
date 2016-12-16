
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

$routeProvider

    // home page
    .when('/', {
        templateUrl: 'views/customerUI.html',
        controller: 'CustomerController'
    })

    .when('/admin', {
        templateUrl: 'views/adminUI.html',
        controller: 'AdminController'
    });

$locationProvider.html5Mode(true);

}]);