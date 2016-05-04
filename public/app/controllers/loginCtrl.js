/**
 * Created by mitrikyle on 5/3/16.
 */

angular.module('loginCtrl', ['$scope', '$location', 'AuthService'])

.controller('loginController', function($scope, $location, AuthService) {
        var vm = this;
        vm.login = function () {

            // intial values;
            vm.error = false;
            vm.disabled = true;

            // call login from service
            AuthService.login(vm.loginForm.username, vm.loginForm.password)

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
    });
