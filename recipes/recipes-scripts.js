/* Recipes page scripts */

// Load recipe JSON file

function loadRecipes(callback) {
	var xhttp=new XMLHttpRequest();
	xhttp.overrideMimeType("application/json");
	xhttp.open('GET','https://cogletre.github.io/recipes/recipe-structure.json',true);
	xhttp.onreadystatechange=function() {
		if(this.readyState==4 && this.status==200) {
			callback(xhttp.responseText);
		}
	};
	xhttp.send(null);
}