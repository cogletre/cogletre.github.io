var finEquation = "";
var finVal;


$( document ).ready( function() {
	
	document.getElementById("display-box").innerHTML = "0";
});

function numClick( input ) {
	
	if(!finVal) {
		finEquation = finEquation + input.toString();
	} else {
		finEquation = finVal + input.toString();
	}
	
	document.getElementById("display-box").innerHTML = finEquation;
};

function opClick( input ) {
	
	if(!finVal) {
		finEquation = finEquation + input.toString();
	} else {
		finEquation = finVal + input.toString();
	}
	
	document.getElementById("display-box").innerHTML = finEquation;
};

function clearEquation() {
	
	finEquation = "";
	
	document.getElementById("display-box").innerHTML = finEquation;
};

function equationEquals() {
	finVal = eval( finEquation );
	
	document.getElementById("display-box").innerHTML = finVal;
	
	finEquation = "";
};