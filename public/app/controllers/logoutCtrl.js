/**
 * Created by mitrikyle on 5/3/16.
 */

angular.module('logoutCtrl', ['authService'])

.controller('logoutController', function($location, AuthService) {
        var vm = this;
        vm.logout = function() {

            // call logout from service
            AuthService.logout()
                .then(function() {
                    $location.path('/login');
                });
        };
    });

// TODO add all controllers to html