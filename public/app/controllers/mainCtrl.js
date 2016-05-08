/**
 * Created by mitrikyle on 4/2/16.
 */
angular.module('mainCtrl', ['dreamService','authService'])

.controller('mainController',function($rootScope,$location,Dream, AuthService) {
        function custom_sort(a, b) {
            return new Date(b.date).getTime() - new Date(a.date).getTime() ;
        }
    var vm = this;


    // function to save dream
    vm.saveDream = function() {

        console.log("User logged in: " + AuthService.isLoggedIn());
        // if not logged in, redirect to login page
        if (!AuthService.isLoggedIn()){
            $location.path('/login');
        } else {
            // call the dreamService function to post
            Dream.create(vm.dreamData)
                .success(function (data) {
                    vm.processing = true;
                    // clear the form
                    vm.dreamData = {};

                    // get all dreams to updaet dreams
                    Dream.all()
                        .success(function (data) {
                            data.sort(custom_sort);
                            vm.processing = false;
                            $rootScope.dreams = data;
                        });
                });
        }
    };
});