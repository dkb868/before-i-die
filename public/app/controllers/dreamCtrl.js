/**
 * Created by mitrikyle on 4/2/16.
 */
function custom_sort(a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime() ;
}

// TODO, use angualr sortign instead of two controllers -_-


angular.module('dreamCtrl', ['dreamService','authService'])

.controller('dreamController', function($scope,$routeParams,$rootScope, $location, Dream, AuthService) {
        var vm = this;

        // grab all the dreams at page load
        Dream.all()
            .success(function(data){
                // bind the dreams that come back to vm.dreams
                $rootScope.dreams = data;
            });

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
                        // clear the form
                        vm.dreamData = {};

                        // get all dreams to updaet dreams
                        Dream.all()
                            .success(function (data) {
                                $rootScope.dreams = data;
                            });
                    });
            }
        };
        vm.voted = null;        // function to upvote/downvote

        vm.upvote = function(id) {

            console.log("User logged in: " + AuthService.isLoggedIn());
            // if not logged in, redirect to login page
            if (!AuthService.isLoggedIn()){
                $location.path('/login');
            } else {
                Dream.upvote(id)
                    .success(function (data) {
                        // mark user as voted
                        vm.voted = 'up';
                        // get all dreams to updaet dreams
                        Dream.all()
                            .success(function (data) {
                                $rootScope.dreams = data;
                            });
                    })
            }
        };

        vm.downvote = function(id) {

            console.log("User logged in: " + AuthService.isLoggedIn());
            // if not logged in, redirect to login page
            if (!AuthService.isLoggedIn()){
                $location.path('/login');
            } else {
                Dream.downvote(id)
                    .success(function (data) {
                        // mark user as voted
                        vm.voted = 'down';
                        // get all dreams to updaet dreams
                        Dream.all()
                            .success(function (data) {
                                $rootScope.dreams = data;
                            });
                    })
            }
        };

        vm.addToList = function(id){

            console.log("User logged in: " + AuthService.isLoggedIn());
            // if not logged in, redirect to login page
            if (!AuthService.isLoggedIn()){
                $location.path('/login');
            } else {
                Dream.addToList(id)
                    .success(function (data) {
                        console.log("Succesfully added to list");
                        $location.path('/user');

                    });
            }
        };

    })

    .controller('newDreamController', function($rootScope,$location, $routeParams,Dream,AuthService) {
        var vm = this;


        // grab all the dreams at page load
        Dream.all()
            .success(function(data){
                // sort data
                data.sort(custom_sort);
                // bind the dreams that come back to vm.dreams
                $rootScope.dreams = data;
            });

        // function to save dream TODO delete useless function or figure out how to do it proeprly
        vm.saveDream = function() {
            // call the dreamService function to post
            Dream.create(vm.dreamData)
                .success(function(data){
                    // clear the form
                    vm.dreamData = {};

                    // get all dreams to updaet dreams
                    Dream.all()
                        .success(function(data){
                            // sort data
                            data.sort(custom_sort);
                            $rootScope.dreams = data;
                        });
                });
        };

        // function to upvote/downvote

        vm.voted = null;
        vm.upvote = function(id) {

            console.log("User logged in: " + AuthService.isLoggedIn());
            // if not logged in, redirect to login page
            if (!AuthService.isLoggedIn()){
                $location.path('/login');
            } else {
                Dream.upvote(id)
                    .success(function (data) {
                        // mark user as voted
                        vm.voted = 'up';
                        // get all dreams to updaet dreams
                        Dream.all()
                            .success(function (data) {
                                data.sort(custom_sort);
                                $rootScope.dreams = data;
                            });
                    })
            }
        };

        vm.downvote = function(id) {


            console.log("User logged in: " + AuthService.isLoggedIn());
            // if not logged in, redirect to login page
            if (!AuthService.isLoggedIn()){
                $location.path('/login');
            } else {

                Dream.downvote(id)
                    .success(function (data) {
                        // mark user as voted
                        vm.voted = 'down';
                        // get all dreams to updaet dreams
                        Dream.all()
                            .success(function (data) {
                                data.sort(custom_sort);
                                $rootScope.dreams = data;
                            });
                    })
            }
        };

        vm.addToList = function(id){

            console.log("User logged in: " + AuthService.isLoggedIn());
            // if not logged in, redirect to login page
            if (!AuthService.isLoggedIn()){
                $location.path('/login');
            } else {
                Dream.addToList(id)
                    .success(function (data) {
                        console.log("Succesfully added to list");
                        $location.path('/user');
                    });
            }
        };
    });