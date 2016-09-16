(function () {
'use strict';

angular.module('LunchApp', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];

function LunchController($scope) {
  var messages = {
				  	tooMuch: "Too much!",
				  	enjoy: "Enjoy!",
				  	enterData: "Please enter data first"
				  };
  	  

  $scope.userData = "";
  $scope.message = "";
  $scope.messageCssClass = "";

  $scope.checkData = function () {
  	var listArray = [];

  	if (!$scope.userData.length) {
  		$scope.message = messages.enterData;
  		$scope.messageCssClass = "alert-danger";
  		return;
  	}

  	listArray = $scope.userData.split(",");
	listArray = removeEmptyItemsFromArray(listArray);
	if (listArray.length > 3) {
		$scope.message = messages.tooMuch;
		$scope.messageCssClass = "alert-warning";
	} else {
		$scope.message = messages.enjoy;
		$scope.messageCssClass = "alert-success";
	}
  };

  $scope.hideMessage = function () {
  	$scope.message = "";
  	$scope.messageCssClass = "";
  };

  function removeEmptyItemsFromArray(arrayToProcess) {
  	for (var i = 0; i < arrayToProcess.length; i++) {
  		arrayToProcess[i] = arrayToProcess[i].trim();
        if (arrayToProcess[i].length === 0) {
            arrayToProcess.splice(i,1);
            i--;
        }
    }
    return arrayToProcess;
  }
}

})();
