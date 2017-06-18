(function(){
    "use strict"

    angular.module("common")
    .service('UserService', UserService);

    UserService.$inject = ["$http", 'ApiPath'];

    function UserService($http, ApiPath) {
        var service = this;

        service.storedUserProfile = {};

        service.saveUserProfile = function (user) {
           service.storedUserProfile = user; 
           console.log(service.storedUserProfile, 'Saved the profile infomration');
        }

        service.getUserProfile = function () {
            console.log(service.storedUserProfile);
            return service.storedUserProfile;
        }

    }
})();