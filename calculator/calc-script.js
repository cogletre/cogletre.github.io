var finEquation = "0";
var finVal;


$( document ).ready( function() {
	$( "#display-equation" ).innerHTML = "0";
});

function numClick( input ) {
	
	finEquation = finEquation + input.toString();
	
	$( "#display-equation" ).innerHTML = finEquation;
};

function clearEquation() {
	
	finEquation = "0";
	
	$( "#display-equation" ).innerHTML = finEquation;
};

function equationEquals() {
	finVal = eval( finEquation );
	
	$( "#display-equation" ).innerHTML = finVal;
	
	finEquation = "0";
};