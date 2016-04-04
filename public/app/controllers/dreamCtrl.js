/**
 * Created by mitrikyle on 4/2/16.
 */
function custom_sort(a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime() ;
}



angular.module('dreamCtrl', ['dreamService'])

.controller('dreamController', function($routeParams,$rootScope, Dream) {
        var vm = this;

        // grab all the dreams at page load
        Dream.all()
            .success(function(data){
                // bind the dreams that come back to vm.dreams
                $rootScope.dreams = data;
            });

        // function to save dream
        vm.saveDream = function() {
            // call the dreamService function to post
            Dream.create(vm.dreamData)
                .success(function(data){
                    // clear the form
                    vm.dreamData = {};

                    // get all dreams to updaet dreams
                    Dream.all()
                        .success(function(data){
                            $rootScope.dreams = data;
                        });
                });
        };
        vm.voted = null;
        vm.upvote = function(id) {
            Dream.upvote(id)
                .success(function(data){
                    // mark user as voted
                    vm.voted = 'up';
                    // get all dreams to updaet dreams
                    Dream.all()
                        .success(function(data){
                            $rootScope.dreams = data;
                        });
                })
        };

        vm.downvote = function(id) {
            Dream.downvote(id)
                .success(function(data){
                    // mark user as voted
                    vm.voted = 'down';
                    // get all dreams to updaet dreams
                    Dream.all()
                        .success(function(data){
                            $rootScope.dreams = data;
                        });
                })
        };

        // function to upvote/downvote
    })

    .controller('newDreamController', function($rootScope, $routeParams,Dream) {
        var vm = this;


        // grab all the dreams at page load
        Dream.all()
            .success(function(data){
                // sort data
                data.sort(custom_sort);
                // bind the dreams that come back to vm.dreams
                $rootScope.dreams = data;
            });

        // function to save dream
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
        vm.voted = null;
        vm.upvote = function(id) {
            Dream.upvote(id)
                .success(function(data){
                    // mark user as voted
                    vm.voted = 'up';
                    // get all dreams to updaet dreams
                    Dream.all()
                        .success(function(data){
                            data.sort(custom_sort);
                            $rootScope.dreams = data;
                        });
                })
        };

        vm.downvote = function(id) {
            Dream.downvote(id)
                .success(function(data){
                    // mark user as voted
                    vm.voted = 'down';
                    // get all dreams to updaet dreams
                    Dream.all()
                        .success(function(data){
                            data.sort(custom_sort);
                            $rootScope.dreams = data;
                        });
                })
        };

        // function to upvote/downvote
    });