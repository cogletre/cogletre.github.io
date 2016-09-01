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
	$scope.addItem = function(){
		if (!$scope.itemName) {return;}
		if (!itemExists($scope.listItems,$scope.itemName)) {
			$scope.listItems.push({name:$scope.itemName,checked:false});
		}
		$scope.itemName = "";
	}
	$scope.removeAll = function(){
		$scope.listItems = [];
	}
	$scope.removeItem = function (x) {
        $scope.listItems.splice(x, 1);
    }
	$scope.checkItem = function(x) {
		$scope.listItems[x].checked = !$scope.listItems[x].checked;
	}
	$scope.removeChecked = function() {
		for (x=0; x<$scope.listItems.length;x++) {
			if($scope.listItems[x].checked == true) {
				$scope.listItems.splice(x,1);
				x--;
			}
		}
	}
	$scope.showSaved = false;
	$scope.showLists = function() {
		$scope.showSaved = !$scope.showSaved;
	}
	$scope.saveList = function() {
		if (typeof(Storage) !== "undefined") {
			// Store
			localStorage.setItem($scope.listName,$scope.listItems);
			// Retrieve
			document.getElementById("saveStatus").innerHTML = "Saved!";
		} else {
			document.getElementById("saveStatus").innerHTML = "Sorry, can't save your lists";
		}
	}
	$scope.getList = function(listName) {
		
	}
});
