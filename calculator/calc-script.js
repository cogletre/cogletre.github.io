
$( document ).ready( function() {
	
	var finEquation = "";
	
	var finVal;
	
	
	
	
});

function numClick( input ) {
		
		finEquation.pop( input.toString() );
		
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