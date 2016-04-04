angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
        $routeProvider

            // home page route
            .when('/', {
                templateUrl: 'app/views/pages/all.html',
                controller: 'newDreamController',
                controllerAs: 'dream'
            })

            .when('/top', {
                templateUrl: 'app/views/pages/all.html',
                controller: 'dreamController',
                controllerAs: 'dream'
            });
        // get rid of the has in the URL
        $locationProvider.html5Mode(true);
    });