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
  var menuSearch = this;
  menuSearch.searchTerm = "";
  menuSearch.found      = [];
  menuSearch.nothingFoundMsg = "";


  menuSearch.findItems = function () {
    

    if(menuSearch.searchTerm === "") {
        menuSearch.found = []; // empty in case it´s not
        menuSearch.nothingFoundMsg = "Nothing found";
    } else {
      var promise = MenuSearchService.getMatchedMenuItems(menuSearch.searchTerm);

      promise.then(function (response) {
        menuSearch.found = response;

        if(menuSearch.found.length > 0) {
          menuSearch.nothingFoundMsg = "";
        } else {
          menuSearch.nothingFoundMsg = "Nothing found";
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
