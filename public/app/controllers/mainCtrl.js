/**
 * Created by mitrikyle on 4/2/16.
 */
angular.module('mainCtrl', ['dreamService'])

.controller('mainController',function($rootScope, Dream) {
        function custom_sort(a, b) {
            return new Date(b.date).getTime() - new Date(a.date).getTime() ;
        }
    var vm = this;


    // function to save dream
    vm.saveDream = function() {
        // call the dreamService function to post
        Dream.create(vm.dreamData)
            .success(function(data){
                vm.processing = true;
                // clear the form
                vm.dreamData = {};

                // get all dreams to updaet dreams
                Dream.all()
                    .success(function(data){
                        data.sort(custom_sort);
                        vm.processing = false;
                        $rootScope.dreams = data;
                    });
            });
    };
});