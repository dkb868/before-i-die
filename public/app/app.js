angular.module('dreamApp', ['app.routes', 'mainCtrl','dreamCtrl', 'loginCtrl', 'logoutCtrl', 'registerCtrl', 'userCtrl', 'userService', 'dreamService', 'authService', 'ngAnimate' ] )

.run(function ($rootScope, $location, $route, AuthService) {
        $rootScope.$on('$routeChangeStart',
            function (event, next, current) {
                AuthService.getUserStatus()
                    .then(function(){
                        if (next.access.restricted && !AuthService.isLoggedIn()){
                            $location.path('/login');
                            $route.reload();
                        }
                    });
            });
    });
