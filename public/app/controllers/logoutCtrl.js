/**
 * Created by mitrikyle on 5/3/16.
 */

angular.module('logoutCtrl', ['authService'])

.controller('logoutController', function($location, $rootScope, $route, AuthService) {
        var vm = this;
        vm.logout = function() {

            // call logout from service
            AuthService.logout()
                .then(function() {
                    $location.path('/login');
                });
        };
        $rootScope.$on('$routeChangeStart',
            function (event, next, current) {
                AuthService.getUserStatus()
                    .then(function () {
                        vm.isLoggedIn = AuthService.isLoggedIn();
                    })
            });
    });

// TODO add all controllers to html