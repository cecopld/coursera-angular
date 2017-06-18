(function () {
    "use strict";

    angular.module('public')
    .controller('SignupController', SignupController);

    SignupController.$inject= ['MenuService','UserService'];

    function SignupController(MenuService,UserService) {
        var $ctrl = this;
        $ctrl.user = {};
        $ctrl.completed = false;
        $ctrl.validShortName = true;
        
        $ctrl.submit = function(){
            if(!$ctrl.user.shortname){ return; } // early out

            MenuService.getFavoriteMenuItems($ctrl.user.shortname).then(function(data){
                if (!data.short_name && (data.short_name !== $ctrl.user.shortname)) { 
                    $ctrl.validShortName = false;
                    $ctrl.completed = false;
                    return; 
                } // early out
                
                $ctrl.validShortName = true;
                $ctrl.user.itemname = data.name;
                $ctrl.user.description = data.description;
                UserService.saveUserProfile($ctrl.user);
                $ctrl.completed = true;
            });
        }
        $ctrl.reset = function(){
            $ctrl.user = {};
            return;
        }
    }


})();