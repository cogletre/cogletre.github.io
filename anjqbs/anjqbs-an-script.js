// AngularJS code for Angular + jQuery + Bootstrap project

// define the application
var app = angular.module("todoListApp", []);

// function to determine if a task added to the list already exists
var taskExists = function(taskList,taskName) {
	var exists = false;
	
	for(x = 0; x < taskList.length; x++) {
		if( taskList[x]['name'].toLowerCase() === taskName.toLowerCase()) {
			exists = true;
		}
	}
	
	return exists;
}

// sets controller for application, uses $scope and $timeout dependencies
app.controller("todoListCtrl", function($scope,$timeout) {
	$scope.taskList = [];
	$scope.taskName = "";
	$scope.taskExists = false;
	$scope.storedTaskNames = [];
	
	$scope.newLoadChosen = true;
	$scope.createNew = false;
	$scope.loadSaved = false;
	
	//confirm if local storage is supported by browser
	if (typeof(Storage) !== "undefined") {
		$scope.saveNotAllowed = false;
		
		// checks if local storage contains a list of names already
		if(localStorage.storedTasks){
			
			// if the list of names is not empty, retrieves the list from local storage and enables showListButton
			if(JSON.parse(localStorage.storedTasks).length > 0) {
				$scope.storedTaskNames = JSON.parse(localStorage.storedTasks);
				$scope.noSavedTasks = false;
			} else {
				// otherwise, disables showListButton
				$scope.noSavedTasks = true;
			}
		} else {
			// otherwise initializes an empty list for local storage to use
			localStorage.storedTasks = JSON.stringify($scope.storedTaskNames);
			$scope.noSavedTasks = true;
		}
	} else {
		//otherwise, display a message about no storage available, and disable saveList and showListButton
		$scope.saveNotAllowed = true;
		$scope.noSavedTasks = true;
		document.getElementById("saveStatus").innerHTML = "Sorry, you can't save your tasks";
	}
	
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
	
	// initialize saved lists to be hidden
	$scope.showSaved = false;
	// function to show/hide lists on button click
	$scope.showTaskLists = function() {
		$scope.showSaved = !$scope.showSaved;
		
		if ($scope.showSaved === false) {
			document.getElementById("showListButton").style.background = "buttonface";
			document.getElementById("showListButton").innerHTML = "Show Saved Task Lists";
		} else {
			document.getElementById("showListButton").style.background = "rgb(175,175,175)";
			document.getElementById("showListButton").innerHTML = "Hide Saved Task Lists";
		}
	}
	
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
	
	//function to retrieve a saved list from localStorage
	$scope.getList = function(taskListName) {
		$scope.taskList = [];
		
		var parseList = JSON.parse(localStorage.getItem(taskListName));
		
		for(x in parseList) {
			$scope.taskList.push({name:parseList[x].name,quantity:parseList[x].quantity,checked:false});
		}
		// Message if list loaded successfully
		document.getElementById("loadStatus").style.color = "green";
		document.getElementById("loadStatus").innerHTML = "Loaded: " + taskListName;
		$timeout(function(){document.getElementById("loadStatus").innerHTML = ""},2000);
	}
	
	// function to delete a saved list from local storage and remove from the 
	$scope.deleteList = function(taskListName,listIndex) {
		localStorage.removeItem(taskListName);
		
		$scope.storedTaskNames.splice(listIndex,1);
		localStorage.storedNames = JSON.stringify($scope.storedTaskNames);
		
		document.getElementById("loadStatus").style.color = "red";
		document.getElementById("loadStatus").innerHTML = "Deleted: " + taskListName;
		
		if($scope.storedTaskNames.length === 0) {
			$scope.showSaved = false;
			$scope.noSavedTasks = true;
			document.getElementById("showListButton").style.background = "buttonface";
			document.getElementById("showListButton").innerHTML = "Show Saved Task Lists";
		}
		$timeout(function(){document.getElementById("loadStatus").innerHTML = ""},2000);
	}
});
