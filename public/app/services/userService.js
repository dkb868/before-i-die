/**
 * Created by mitrikyle on 5/7/16.
 */

// deal with user things like:
// getting all a user's dreams

angular.module('userService', [])

.factory('User', function($http) {
        var userFactory = {};

        // get all a user's dreams, created or saved to their list
        userFactory.savedDreams = function(id) {
            return $http.get('/api/users/dreams/' + id);
        };

        return userFactory;
    });