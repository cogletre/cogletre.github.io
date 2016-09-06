// define the application
var app = angular.module("shoppingList", []);

// function to determine if an item added to the list already exists
var itemExists = function(list,item) {
	for(x = 0; x < list.length; x++) {
		if(list[x]['name'].toLowerCase() === item.toLowerCase()) {
			return true;
		} else {
			return false;
		}
	}
}

// sets controller for application, uses $scope and $timeout dependencies
app.controller("listCtrl", function($scope,$timeout) {
	$scope.listItems = [];
	$scope.listName = "";
	$scope.itemExists = false;
	$scope.storedListNames = [];
	
	//confirm if local storage is supported by browser
	if (typeof(Storage) !== "undefined") {
		$scope.saveNotAllowed = false;
		
		// checks if local storage contains a list of names already
		if(localStorage.storedNames){
			
			// if the list of names is not empty, retrieves the list from local storage and enables showListButton
			if(JSON.parse(localStorage.storedNames).length > 0) {
				$scope.storedListNames = JSON.parse(localStorage.storedNames);
				$scope.noSavedLists = false;
			} else {
				// otherwise, disables showListButton
				$scope.noSavedLists = true;
			}
		} else {
			// otherwise initializes an empty list for local storage to use
			localStorage.storedNames = JSON.stringify($scope.storedListNames);
			$scope.noSavedLists = true;
		}
	} else {
		//otherwise, display a message about no storage available, and disable saveList and showListButton
		$scope.saveNotAllowed = true;
		$scope.noSavedLists = true;
		document.getElementById("saveStatus").innerHTML = "Sorry, you can't save your lists";
	}
	
	// function to add an item to the list; sets name based on input and sets checked value to false
	$scope.addItem = function(){
		if (!$scope.itemName) {return;}
		if (!itemExists($scope.listItems,$scope.itemName)) {
			//var capItemName = $scope.itemName.charAt(0).toUpperCase() + $scope.itemName.slice(1);
			$scope.listItems.push({name:$scope.itemName,checked:false});
			$scope.itemExists = false;
		} else {
			$scope.itemExists = true;
		}
		// reset the itemName input field
		$scope.itemName = "";
	}
	
	// function to remove all items from the list
	$scope.removeAll = function(){
		$scope.listItems = [];
	}
	
	// removes selected item from list based on its index
	$scope.removeItem = function (itemIndex) {
        $scope.listItems.splice(itemIndex, 1);
    }
	
	// function for editing an item; prompts user for a new item name
	$scope.editItem = function (itemIndex) {
        var newItemName = prompt("Enter new item name:");
		$scope.listItems[itemIndex].name = newItemName;
    }
	
	// function for checkbox click, sets checked value of listItem to the opposite
	$scope.checkItem = function(x) {
		$scope.listItems[x].checked = !$scope.listItems[x].checked;
	}
	
	// remove all checked items from list
	$scope.removeChecked = function() {
		for (x=0; x<$scope.listItems.length;x++) {
			if($scope.listItems[x].checked == true) {
				$scope.listItems.splice(x,1);
				x--;
			}
		}
	}
	
	// initialize saved lists to be hidden
	$scope.showSaved = false;
	// function to show/hide lists on button click
	$scope.showLists = function() {
		$scope.showSaved = !$scope.showSaved;
		
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
				// update the stored list if it already exists
				localStorage.setItem(storeName, JSON.stringify($scope.listItems));
				
				// message if list is updated
				document.getElementById("saveStatus").style.color = "green";
				document.getElementById("saveStatus").innerHTML = "Updated: " + storeName;
				
				$scope.noSavedLists = false;
			} else {
				// save the stored list if it doesn't already exist
				$scope.storedListNames.push(storeName);
				localStorage.setItem(storeName, JSON.stringify($scope.listItems));
				localStorage.setItem("storedNames", JSON.stringify($scope.storedListNames));
				
				// message if list is stored
				document.getElementById("saveStatus").style.color = "blue";
				document.getElementById("saveStatus").innerHTML = "Saved: " + storeName;
				$scope.noSavedLists = false;
			}
			// clear the list of all items and the list name input field
			$scope.listName = "";
			$scope.listItems = [];
			
			// $timeout to remove the update/save messages after 2 seconds
			$timeout(function(){document.getElementById("saveStatus").innerHTML = ""},2000);
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
		document.getElementById("loadStatus").style.color = "green";
		document.getElementById("loadStatus").innerHTML = "Loaded: " + listName;
		$timeout(function(){document.getElementById("loadStatus").innerHTML = ""},2000);
	}
	
	// function to delete a saved list from local storage and remove from the 
	$scope.deleteList = function(listName,listIndex) {
		localStorage.removeItem(listName);
		
		$scope.storedListNames.splice(listIndex,1);
		localStorage.storedNames = JSON.stringify($scope.storedListNames);
		
		document.getElementById("loadStatus").style.color = "red";
		document.getElementById("loadStatus").innerHTML = "Deleted: " + listName;
		
		if($scope.storedListNames.length === 0) {
			$scope.showSaved = false;
			$scope.noSavedLists = true;
			document.getElementById("showListButton").style.background = "buttonface";
			document.getElementById("showListButton").innerHTML = "Show Saved Lists";
		}
		$timeout(function(){document.getElementById("loadStatus").innerHTML = ""},2000);
	}
});
