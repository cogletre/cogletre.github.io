var app = angular.module("shoppingList", []);

var itemExists = function(list,item) {
	for(x = 0; x < list.length; x++) {
		if(list[x]['name'] === item) {
			return true;
		} else {
			return false;
		}
	}
}


app.controller("listCtrl", function($scope) {
	$scope.listItems = [];
	$scope.listName = "";
	$scope.itemExists = false;
	$scope.hasItems = false;
	//add item to list
	$scope.addItem = function(){
		if (!$scope.itemName) {return;}
		if (!itemExists($scope.listItems,$scope.itemName)) {
			$scope.listItems.push({name:$scope.itemName,checked:false});
			$scope.itemExists = false;
		} else {
			$scope.itemExists = true;
		}
		$scope.itemName = "";
	}
	//clears the list
	$scope.removeAll = function(){
		$scope.listItems = [];
	}
	//removes selected item from list
	$scope.removeItem = function (x) {
        $scope.listItems.splice(x, 1);
    }
	//function to toggle checkboxes
	$scope.checkItem = function(x) {
		$scope.listItems[x].checked = !$scope.listItems[x].checked;
	}
	//remove all checked items from list
	$scope.removeChecked = function() {
		for (x=0; x<$scope.listItems.length;x++) {
			if($scope.listItems[x].checked == true) {
				$scope.listItems.splice(x,1);
				x--;
			}
		}
	}
	//check length list to see if worth saving
	if ($scope.listItems.length > 0) {
		$scope.hasItems = true;
	} else {
		$scope.hasItems = false;
	}
	//function to display saved lists or not, based on click
	$scope.showSaved = false;
	$scope.showLists = function() {
		$scope.showSaved = !$scope.showSaved;
		if ($scope.showSaved = true) {
			document.getElementById("showListButton").innerHTML = "Show Saved Lists";
		} else {
			document.getElementById("showListButton").innerHTML = "Hide Saved Lists";
		}
	}
	//function to save list to localStorage in browser
	$scope.saveList = function() {
		if (typeof(Storage) !== "undefined") {
			// Store
			localStorage.setItem($scope.listName,$scope.listItems);
			// Message if stored successfully
			document.getElementById("saveStatus").innerHTML = "Saved!";
		} else {
			// Message is storage is not supported
			document.getElementById("saveStatus").innerHTML = "Sorry, can't save your lists";
		}
	}
	//function to retrieve a saved list from localStorage
	$scope.getList = function(listName) {
		
	}
});

