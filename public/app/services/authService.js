/**
 * Created by mitrikyle on 5/3/16.
 */
angular.module('authService', [])

    .factory('AuthService', function ($q, $timeout, $http) {

        // create user variable
        var user = null;

        // function to check if user is logged in
        function isLoggedIn() {
            return !!user;
        }

        function getUserStatus() {
            return $http.get('api/auth/status')
                // handle success
                .success(function (data) {
                    if(data.status){
                        user = true;
                    } else {
                        user = false;
                    }
                })
                // handle error
                .error(function (data) {
                    user = false;
                });
        }


        // TODO return http status code in auth routes
        function login(email, password) {
            // create a new instance of deferred
            var deffered = $q.defer();

            // send a post request to the server
            $http.post('/api/auth/login',
                {email: email, password: password})
            // handle success
                .success(function (data, status) {
                    if(status === 200 && data.status) {
                        user = true;
                        deffered.resolve();
                    } else {
                        user = false;
                        deffered.reject();
                    }
                })

                // handle error
                .error(function (data) {
                    user = false;
                    deffered.reject();
                });

            return deffered.promise;
        }

        function logout() {
            // create a new instance of deffered
            var deffered = $q.defer();

            // send a get request to the erver
            $http.get('/api/auth/logout')
                // handle success
                .success(function(data) {
                    user = false;
                    deffered.resolve();
                })

                // handle error
                .error(function (data) {
                    user = false;
                    deffered.reject();
                });

            // return promise object
            return deffered.promise;
        }


        function register(email, password) {
            // create new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post('/api/users/createAccount',
                {email: email, password: password})

                // handle success
                .success(function (data, status) {
                    if(status === 200 && data.status){
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                // handle error
                .error(function (data) {
                    deferred.reject();
                });

            // return a promise object
            return deferred.promise;
        }

        // return available funtiosn for sue in the controllers
        return ({
            isLoggedIn: isLoggedIn,
            getUserStatus: getUserStatus,
            login: login,
            logout: logout,
            register: register
        });
    });