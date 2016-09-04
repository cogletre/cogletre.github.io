var app = angular.module("todoListApp", []);


app.controller("todoListCtrl", function($scope) {
	$scope.taskList = [];

	//add item to list
	$scope.addTask = function(){
		if (!$scope.taskName) {return;}
		$scope.taskList.push({name:$scope.taskName,checked:false});		
		$scope.taskName = "";
	}
	
	//clears the list
	$scope.removeAll = function(){
		$scope.taskList = [];
	}
	
	//removes selected item from list
	$scope.removeTask = function (ind) {
        $scope.taskList.splice(ind, 1);
    }
	
	$scope.editTask = function (ind) {
        var newItemName = prompt("Enter new item name:");
		$scope.taskList[ind].name = newItemName;
    }
	
	//function to toggle checkboxes
	$scope.checkTask = function(ind) {
		$scope.taskList[ind].checked = !$scope.taskList[x].checked;
	}
	
	//remove all checked items from list
	$scope.removeChecked = function() {
		for (x=0; x<$scope.taskList.length;x++) {
			if($scope.taskList[x].checked == true) {
				$scope.taskList.splice(x,1);
				x--;
			}
		}
	}
});

