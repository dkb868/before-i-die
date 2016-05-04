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
                    $location.path('/login');
                    vm.disabled = false;
                    vm.registerForm = {};
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