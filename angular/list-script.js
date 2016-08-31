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
});

