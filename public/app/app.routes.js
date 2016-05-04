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
            })

            .when('/login' , {
                templateUrl : 'app/views/pages/login.html',
                controller: 'loginController'
            })

            .when('/logout', {
                controller: 'logoutController'
            })

            .when('/register', {
                templateUrl : 'app/views/pages/register.html',
                controller: 'registerController'
            })

            .otherwise({
                redirectTo: '/'
            });

        // get rid of the hash in the URL
        $locationProvider.html5Mode(true);
    });