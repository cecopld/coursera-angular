(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&',
      nothingFoundMsg: '<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
 
}

function FoundItemsDirectiveController() { }


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu_search = this;
  menu_search.searchTerm = "";
  menu_search.found      = [];
  menu_search.nothingFoundMsg = "";


  menu_search.findItems = function () {
    

    if(menu_search.searchTerm === "") {
        menu_search.found = []; // empty in case it´s not
        menu_search.nothingFoundMsg = "Nothing found";
    } else {
      var promise = MenuSearchService.getMatchedMenuItems(menu_search.searchTerm);

      promise.then(function (response) {
        menu_search.found = response;

        if(menu_search.found.length > 0) {
          menu_search.nothingFoundMsg = "";
        } else {
          menu_search.nothingFoundMsg = "Nothing found";
        }


      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });

    }


  };

  menu_search.removeItem = function(index) {
      menu_search.found.splice(index, 1);
  };



}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {

  var service = this;

  service.getMatchedMenuItems = function (searchTerm){
    // searchTerm
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result){

      return result.data["menu_items"].filter(function (elem) {
        return elem.description.indexOf(searchTerm) !== -1;
      });

    });


  };


}

})();
