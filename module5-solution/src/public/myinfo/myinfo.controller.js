(function () {
    "use strict";

    angular.module('public')
    .controller('MyinfoController', MyinfoController);

    MyinfoController.$inject = ['UserService','ApiPath'];

    function MyinfoController(UserService,ApiPath) {
        var $ctrl = this;
        $ctrl.profile =UserService.getUserProfile();
        $ctrl.basePath = ApiPath;
    }
})();