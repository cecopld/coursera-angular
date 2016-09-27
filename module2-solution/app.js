(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getItems();

  showList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };

  
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemBought = this;
  itemBought.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsBought = [];
  var items = [
    {
      quantity: 10,
      name: "Eggs"
    },
    {
      quantity: 1,
      name: "Bread"
    },
    {
      quantity: 2,
      name: "Mild"
    },
    {
      quantity: 3,
      name: "Icecream"
    },
    {
      quantity: 4,
      name: "Water"
    }

  ];

  service.getItemsToBuy = function () {
    return items;
  };

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsBought.push(item);
  };

  service.removeItem = function (itemIdex) {
    service.addItem(items[itemIdex].name, items[itemIdex].quantity);
    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.getBoughtItems = function () {
    return itemsBought;
  };
}

})();