/**
 * Created by mitrikyle on 5/4/16.
 */

angular.module('registerCtrl', ['authService'])

.controller('registerController', function($location, AuthService) {
        var vm = this;
        vm.register = function(){
            // intial values
            vm.error = false;
            vm.disabled = true;

            // call register from service
            AuthService.register(vm.registerForm.email, vm.registerForm.password)

                // handle success
                .then(function () {
                    AuthService.login(vm.registerForm.email, vm.registerForm.password)
                    .then(function(){
                        $location.path('/');
                    });
                })

                // handle error
                .catch(function() {
                    vm.error = true;
                    vm.errorMessage = "Something went wrong!";
                    vm.disabled = false;
                    vm.registerForm = {};
                });
        };
    });