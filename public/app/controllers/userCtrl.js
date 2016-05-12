/**
 * Created by mitrikyle on 5/7/16.
 */

angular.module('userCtrl', ['userService','authService'])

.controller('userController', function(User,AuthService) {
        var vm = this;
        var id;
        // get user id
        AuthService.getId()
            .success(function(data){
                id = data.id;

                console.log("USER ID:" + id);
                // get all the users dreams on page load
                User.savedDreams(id)
                    .success(function(data){
                        vm.dreams = data.dreams;
                    });
            });




    });