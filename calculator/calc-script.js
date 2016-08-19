var finEquation = "";
var finVal;


$( document ).ready( function() {
	
	document.getElementById("display-box").innerHTML = "0";
});

function numClick( input ) {
	
	finEquation = finEquation + input.toString();

	document.getElementById("display-box").innerHTML = finEquation;
};

function opClick( input ) {
	
	finEquation = finEquation + input.toString();
	
	document.getElementById("display-box").innerHTML = finEquation;
};

function lParClick() {
	
	finEquation = finEquation + "(";
	
	document.getElementById("display-box").innerHTML = finEquation;
};
function rParClick() {
	
	finEquation = finEquation + ")";
	
	document.getElementById("display-box").innerHTML = finEquation;
};

function sqrClick() {
	
	sqr = "2"
	
	finEquation = finEquation + sqr.sup();
	
	document.getElementById("display-box").innerHTML = finEquation;
};
function sqrtClick() {
	
	sqrt = "1/2"
	
	finEquation = finEquation + sqrt.sup();
	
	document.getElementById("display-box").innerHTML = finEquation;
};


function clearEquation() {
	
	finEquation = "";
	finVal = "";
	
	document.getElementById("display-box").innerHTML = "0";
};

function equationEquals() {
	finVal = eval( finEquation );
	
	document.getElementById("display-box").innerHTML = finVal;
	
	finEquation = "";
};