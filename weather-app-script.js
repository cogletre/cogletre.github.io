
var zipCode;
var startDate,endDate,currentDate;

var currDayTemp;
var currTempArray = [];

var weatherURL;
var weatherXmlHttp = new XMLHttpRequest();

var tempScript;

function readWeather(weatherData) {
	
	var tempObj = weatherData;
	
	currDayTemp = tempObj["tempAvg"];
	
	currTempArray[currTempArray.length] = currDayTemp;
}


function dispTemp() {
	
	zipCode = document.getElementById("zipCode").value;
	
	startDate = new Date(document.getElementById("dateOne").value);
	endDate = new Date(document.getElementById("dateTwo").value);
	
	currentDate = startDate;
	
	for(currentDate.getDate(); currentDate.getDate() <= endDate.getDate(); currentDate.setDate(currentDate.getDate() + 1)) {
		
		weatherURL = "https://api.weathersource.com/v1/6bde010b79d7f87f0397/history_by_postal_code.json?_callback=readWeather&period=day&postal_code_eq=" + zipCode + "&country_eq=US&timestamp_eq=" + currentDate + "&fields=tempAvg";
		
		tempScript = document.createElement("script");
		tempScript.src = weatherURL;
		
		document.getElementsByTagName('head')[0].appendChild(tempScript);
	}
	
	document.getElementById("city-zip").innerHTML = zipCode;
	document.getElementById("avg-temp-output").innerHTML = calcAverage(dateRange);
}

function calcAverage (dateRange) {
	
	var totalTemps;
	
	for(var dayTemp in dateRange) {
		totalTemps += dayTemp;
	}
	
	var avgTemps = totalTemps / dateRange.length;
	
	return avgTemps;
}

/*
document.getElementById("city-zip").innerHTML = zipCode;
document.getElementById("avg-temp-output").innerHTML = calcAverage(dateRange);
*/




