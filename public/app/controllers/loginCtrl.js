/**
 * Created by mitrikyle on 5/3/16.
 */

angular.module('loginCtrl', ['authService'])

.controller('loginController', function($location, $rootScope, AuthService) {
        var vm = this;
        vm.login = function () {
            console.log("ZOMG LOGIN");
            // intial values;
            vm.error = false;
            vm.disabled = true;

            // call login from service
            AuthService.login(vm.loginForm.email, vm.loginForm.password)

            // handle success
                .then(function() {
                    $location.path('/');
                    vm.disabled = false;
                    vm.loginForm = {};
                })

                // handle error
                .catch(function() {
                    vm.error = true;
                    vm.errorMessage = "Invlaid email and/or password";
                    vm.disabled = false;
                    vm.loginForm = {};
                });
        };

        $rootScope.$on('$routeChangeStart',
            function (event, next, current) {
                AuthService.getUserStatus()
                    .then(function () {
                        vm.isLoggedIn = AuthService.isLoggedIn();
                    })
            });

        vm.redirect = function(){
            $location.path('/login');
        }
    });
