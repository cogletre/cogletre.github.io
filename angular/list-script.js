var app = angular.module("shoppingList", []);

var itemExists = function(list,item) {
	for(x = 0; x < list.length; x++) {
		if(list[x]['name'].toLowerCase() === item.toLowerCase()) {
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
	$scope.savedLists = [];
	$scope.storedListNames = [];
	//confirm if local storage is supported by browser
	if (typeof(Storage) !== "undefined") {
		$scope.saveNotAllowed = false;
		if(localStorage.storedNames){
			$scope.storedListNames = JSON.parse(localStorage.storedNames);
			$noSavedLists = false;
		} else {
			localStorage.storedNames = JSON.stringify($scope.storedListNames);
			$noSavedLists = true;
		}
	} else {
		$scope.saveNotAllowed = true;
		$scope.noSavedLists = true;
		document.getElementById("saveStatus").innerHTML = "Sorry, you can't save your lists";
	}
	
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
	
	$scope.editItem = function (x) {
        var newItemName = prompt("Enter new item name:");
		$scope.listItems[x].name = newItemName;
    }
	//function to toggle checkboxes
	$scope.checkItem = function(x) {
		$scope.listItems[x].checked = !$scope.listItems[x].checked;
		if ($scope.listItems[x].checked) {
			
		}
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
	//function to display saved lists or not, based on click
	$scope.showSaved = false;
	
	$scope.showLists = function() {
		//if($scope.noSavedLists === false) {
			$scope.showSaved = !$scope.showSaved;
		//} else {
		//	$scope.showSaved = false;
		//}
		
		if ($scope.showSaved === false) {
			document.getElementById("showListButton").style.background = "buttonface";
			document.getElementById("showListButton").innerHTML = "Show Saved Lists";
		} else {
			document.getElementById("showListButton").style.background = "rgb(175,175,175)";
			document.getElementById("showListButton").innerHTML = "Hide Saved Lists";
		}
	}
	//function to save list to localStorage in browser
	$scope.saveList = function() {
		if ($scope.listName !== "") {
			var storeName = $scope.listName;
			if ($scope.storedListNames.indexOf(storeName) !== -1) {
				localStorage.setItem(storeName, JSON.stringify($scope.listItems));
				//message if list is updated
				document.getElementById("saveStatus").style.color = "green";
				document.getElementById("saveStatus").innerHTML = "Updated!";
				$scope.noSavedLists = false;
			} else {
				$scope.storedListNames.push(storeName);
				/*if($scope.storedListNames.indexOf(storeName) == -1) {
					$scope.storedListNames.push(storeName);
				}*/
				localStorage.setItem(storeName, JSON.stringify($scope.listItems));
				localStorage.setItem("storedNames", JSON.stringify($scope.storedListNames));
				
				//message if list is stored
				document.getElementById("saveStatus").style.color = "blue";
				document.getElementById("saveStatus").innerHTML = "Saved!";
				$scope.noSavedLists = false;
			}
			$scope.listName = "";
			
		} else {
			document.getElementById("saveStatus").style.color = "red";
			document.getElementById("saveStatus").innerHTML = "Please name your list";
		}
	}
	
	//function to retrieve a saved list from localStorage
	$scope.getList = function(listName) {
		$scope.listItems = [];
		
		var parseList = JSON.parse(localStorage.getItem(listName));
		
		for(x in parseList) {
			$scope.listItems.push({name:parseList[x].name,checked:false});
		}
		// Message if list loaded successfully
		document.getElementById("saveStatus").style.color = "blue";
		document.getElementById("saveStatus").innerHTML = "Loaded: " + listName;
	}
	
	$scope.deleteList = function(listName,listIndex) {
		localStorage.removeItem(listName);
		
		$scope.storedListNames.splice(listIndex,1);
		
		/*if($scope.storedListNames.length === 0) {
			$scope.showSaved = false;
			$scope.noSavedLists = true;
			document.getElementById("showListButton").style.background = "buttonface";
			document.getElementById("showListButton").innerHTML = "Show Saved Lists";
		}*/
	}
});
