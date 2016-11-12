(function () {
'use strict';

angular.module('MenuApp')
.controller('itemsController', itemsController);

itemsController.$inject = ['items'];
function itemsController(items) {
  var ctrl = this;
  ctrl.items = items;   
}

})();
