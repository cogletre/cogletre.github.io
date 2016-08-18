var finEquation = "";
var finVal;


$( document ).ready( function() {
});

function numClick( input ) {
	
	finEquation.push( input.toString() );
	
	$( "#display-box" ).innerHTML(finEquation);
};

function clearEquation() {
	
	finEquation = "";
	
	$( "#display-box" ).innerHTML( "0" );
};

function equationEquals() {
	finVal = eval( finEquation );
	
	$( "#display-box" ).innerHTML( finVal );
};