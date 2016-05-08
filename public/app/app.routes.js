angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
        $routeProvider

            // home page route
            .when('/', {
                templateUrl: 'app/views/pages/all.html',
                controller: 'newDreamController',
                controllerAs: 'dream',
                access : {restricted: false},
                activeTab: 'new'
            })


            .when('/top', {
                templateUrl: 'app/views/pages/all.html',
                controller: 'dreamController',
                controllerAs: 'dream',
                access : {restricted: false},
                activeTab: 'top'
            })

            .when('/user', {
                templateUrl: 'app/views/pages/user.html',
                controller: 'userController',
                controllerAs: 'user',
                access : {restricted: true},
                activeTab: 'user'
            })

            .when('/login' , {
                templateUrl : 'app/views/pages/login.html',
                controller: 'loginController',
                controllerAs: 'login',
                access : {restricted: false},
                activeTab: 'login'
            })

            .when('/logout', {
                controller: 'logoutController',
                access : {restricted: true}
            })

            .when('/register', {
                templateUrl : 'app/views/pages/register.html',
                controller: 'registerController',
                controllerAs: 'register',
                access : {restricted: false},
                activeTab: 'register'
            })

            .otherwise({
                redirectTo: '/'
            });

        // get rid of the hash in the URL
        $locationProvider.html5Mode(true);
    });