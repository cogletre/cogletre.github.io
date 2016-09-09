// AngularJS code for Angular + jQuery + Bootstrap project

// define the application
var app = angular.module("todoListApp", []);

// function to determine if a task added to the list already exists
var taskExists = function(taskList, taskName) {
	var exists = false;
	
	for(x = 0; x < taskList.length; x++) {
		if( taskList[x]['name'].toLowerCase() === taskName.toLowerCase()) {
			exists = true;
		}
	}
	
	return exists;
}

var checkListName = function(newName, savedLists) {
	var nameExists = false;
	
	if (savedLists.length < 1) {
		return false;
	} else {
		for(var x = 0; x < savedLists.length; x++) {
			if (newName.toLowerCase() === savedLists[x].toLowerCase()) {
				nameExists = true;
			}
		}
	}
	return nameExists;
	
}

// sets controller for application, uses $scope and $timeout dependencies
app.controller("todoListCtrl", function($scope,$timeout) {
	$scope.taskList = [];
	$scope.taskName = "";
	$scope.saveOrLoadChoice = true;
	
	$scope.storedTaskNames = [];
	
	
	
	//confirm if local storage is supported by browser
	if (typeof(Storage) !== "undefined") {
		$scope.saveNotAllowed = false;
		// checks if local storage contains the list at all
		if(localStorage.storedNames){
			// if the list of names is not empty, retrieves the list from local storage and enables showListButton
			if(JSON.parse(localStorage.storedNames).length > 0) {
				$scope.storedTaskNames = JSON.parse(localStorage.storedNames);
				$scope.noSavedTasks = false;
			} else {
				// otherwise, disables showListButton
				$scope.noSavedTasks = true;
			}
		} else {
			// otherwise initializes an empty list for local storage to use
			localStorage.storedNames = JSON.stringify($scope.storedTaskNames);
			$scope.noSavedTasks = true;
		}
	} else {
		//otherwise, display a message about no storage available, and disable saveList and showListButton
		$scope.saveNotAllowed = true;
		$scope.noSavedTasks = true;
		document.getElementById("loadButton").innerHTML = "Cannot load";
		document.getElementById("saveStatus").innerHTML = "Cannot save";
	}
	
	$scope.createNew = false;
	$scope.loadSaved = false;
	
	$scope.createNewList = function() {
		$scope.createNew = true;
		$scope.loadSaved = false;
		$scope.saveOrLoadChoice = false;
	}
	$scope.loadSavedList = function() {
		$scope.createNew = false;
		$scope.loadSaved = true;
		$scope.saveOrLoadChoice = false;
	}
	
	$scope.taskListName = "";
	$scope.listStarted = false;
	
	$scope.startList = function () {
		if($scope.newListName !== "") {
			if(!checkListName($scope.newListName,$scope.storedTaskNames)) {
				$scope.taskListName = $scope.newListName;
				$scope.newListName = "";
				$scope.createNew = false;
				$scope.listStarted = true;
			} else {
				document.getElementById("listNameWarning").innerHTML = "Name already in use";
			}
		} else {
			document.getElementById("listNameWarning").innerHTML = "Please name your list";
		}
	}
	
	$scope.editListName = function () {
		var updateListName = prompt("Enter new list name:");
		
		if (updateListName === "") {
			document.getElementById("listTitleStatus").style.color = "red";
			document.getElementById("listTitleStatus").innerHTML = "Must enter a name for the list";
		} else if (checkListName(updateListName,$scope.storedTaskNames)) {
			document.getElementById("listTitleStatus").style.color = "red";
			document.getElementById("listTitleStatus").innerHTML = "Name already exists";
		} else {
			$scope.taskListName = updateListName;
			document.getElementById("listTitleStatus").style.color = "green";
			document.getElementById("listTitleStatus").innerHTML = "Name updated!";
		}
	}
	
	$scope.taskExists = false;
	// function to add an item to the list; sets name based on input and sets checked value to false
	$scope.addTask = function(){
		if (!$scope.taskName) {return;}
		if (!taskExists($scope.taskList,$scope.taskName)) {
			$scope.taskList.push({name:$scope.taskName,checked:false});
			$scope.taskExists = false;
		} else {
			$scope.taskExists = true;
		}
		// reset the taskName input field
		$scope.taskName = "";
	}
	
	// function to remove all items from the list
	$scope.removeAll = function(){
		$scope.taskList = [];
	}
	
	// removes selected item from list based on its index
	$scope.removeTask = function (taskIndex) {
        $scope.taskList.splice(taskIndex, 1);
    }
	
	// function for editing an item; prompts user for a new item name
	$scope.editTask = function (taskIndex) {
        var newTaskName = prompt("Enter new item name:",$scope.taskList[taskIndex].name);
		$scope.taskList[taskIndex].name = newTaskName;
    }
	
	// function for checkbox click, sets checked value of listItem to the opposite
	$scope.checkTask = function(taskIndex) {
		$scope.taskList[taskIndex].checked = !$scope.taskList[taskIndex].checked;
	}
	
	// remove all checked items from list
	$scope.removeChecked = function() {
		for (x = 0; x < $scope.taskList.length; x++) {
			if($scope.taskList[x].checked == true) {
				$scope.taskList.splice(x,1);
				x--;
			}
		}
	}
	
	// initialize saved lists to be hidden - not needed for this app
	//$scope.showSaved = false;
	// function to show/hide lists on button click - not needed for this app
	/*$scope.showTaskLists = function() {
		$scope.showSaved = !$scope.showSaved;
		
		if ($scope.showSaved === false) {
			document.getElementById("showListButton").style.background = "buttonface";
			document.getElementById("showListButton").innerHTML = "Show Saved Task Lists";
		} else {
			document.getElementById("showListButton").style.background = "rgb(175,175,175)";
			document.getElementById("showListButton").innerHTML = "Hide Saved Task Lists";
		}
	}*/
	
	//function to save list to localStorage in browser
	$scope.saveTaskList = function() {
		if ($scope.taskListName !== "") {
			var storeName = $scope.taskListName;
			
			if ($scope.storedTaskNames.indexOf(storeName) !== -1) {
				// update the stored list if it already exists
				localStorage.setItem(storeName, JSON.stringify($scope.taskList));
				
				// message if list is updated
				document.getElementById("saveStatus").style.color = "green";
				document.getElementById("saveStatus").innerHTML = "Updated: " + storeName;
				
				$scope.noSavedTasks = false;
			} else {
				// save the stored list if it doesn't already exist
				$scope.storedTaskNames.push(storeName);
				localStorage.setItem(storeName, JSON.stringify($scope.taskList));
				localStorage.setItem("storedNames", JSON.stringify($scope.storedTaskNames));
				
				// message if list is stored
				document.getElementById("saveStatus").style.color = "blue";
				document.getElementById("saveStatus").innerHTML = "Saved: " + storeName;
				$scope.noSavedTasks = false;
			}
			// clear the list of all items and the list name input field
			$scope.taskListName = "";
			$scope.taskList = [];
			
			// $timeout to remove the update/save messages after 2 seconds
			$timeout(function(){document.getElementById("saveStatus").innerHTML = ""},2000);
		} else {
			document.getElementById("saveStatus").style.color = "red";
			document.getElementById("saveStatus").innerHTML = "Please name your task list";
		}
	}
	
	$scope.listLoaded = false;
	//function to retrieve a saved list from localStorage
	$scope.getList = function(listName,$index) {
		$scope.listLoaded = true;
		$scope.loadSaved = false;
		$scope.taskListName = listName
		$scope.taskList = [];
		
		var parseList = JSON.parse(localStorage.getItem(listName));
		
		for(x in parseList) {
			$scope.taskList.push({name:parseList[x].name,checked:false});
		}
		// Message if list loaded successfully
		document.getElementById("listTitleStatus").style.color = "green";
		document.getElementById("listTitleStatus").innerHTML = "Loaded: " + listName;
		$timeout(function(){document.getElementById("listTitleStatus").innerHTML = ""},2000);
	}
	
	// function to delete a saved list from local storage and remove from the 
	$scope.deleteList = function(taskListName,listIndex) {
		localStorage.removeItem(taskListName);
		
		$scope.storedTaskNames.splice(listIndex,1);
		localStorage.storedNames = JSON.stringify($scope.storedTaskNames);
		
		document.getElementById("listTitleStatus").style.color = "red";
		document.getElementById("listTitleStatus").innerHTML = "Deleted: " + taskListName;
		
		if($scope.storedTaskNames.length === 0) {
			$scope.showSaved = false;
			$scope.noSavedTasks = true;
			document.getElementById("showListButton").style.background = "buttonface";
			document.getElementById("showListButton").innerHTML = "Show Saved Task Lists";
		}
		$timeout(function(){document.getElementById("listTitleStatus").innerHTML = ""},2000);
	}
	
	$scope.closeCurrentList = function() {
		$scope.taskList = [];
		$scope.taskName = "";
		$scope.listStarted = false;
		$scope.listLoaded = false;
		$scope.saveOrLoadChoice = true;
	}
});
