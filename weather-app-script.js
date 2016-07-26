
var zipCode;
var startDate,endDate,currentDate;

var currDayTemp;
var currTempArray = [];

var weatherURL;
var weatherXmlHttp = new XMLHttpRequest();

var tempScript;


var url = "https://api.weathersource.com/v1/6bde010b79d7f87f0397/history_by_postal_code.json?period=day&postal_code_eq=22222&country_eq=US&timestamp_eq=2012-09-27&fields=tempAvg"


function dispTemp() {
	
	zipCode = document.getElementById("zipCode").value;
	
	startDate = new Date(document.getElementById("dateOne").value);
	endDate = new Date(document.getElementById("dateTwo").value);
	
	currentDate = startDate;
	
	for(currentDate.getDate(); currentDate.getDate() <= endDate.getDate(); currentDate.setDate(currentDate.getDate() + 1)) {
		
		weatherURL = "https://api.weathersource.com/v1/6bde010b79d7f87f0397/history_by_postal_code.json?_callback=readWeather&period=day&postal_code_eq=" + zipCode + "&country_eq=US&timestamp_eq=" + currentDate + "&fields=tempAvg";
		
		tempScript = document.createElement("script");
		tempScript.type = "text/javascript";
		tempScript.src = weatherURL;
		
		weatherXmlHttp.open("GET", weatherURL, true);
		weatherXmlHttp.send();
		
		function readWeather(weatherData) {
			
			document.body.removeChild(tempScript);
			tempScript = null;
			
			var tempObj = weatherData;
			
			currDayTemp = tempObj[0].tempAvg;
			
			currTempArray[currTempArray.length] = currDayTemp;
		}

		
		
	}
	
	document.getElementById("city-zip").innerHTML = zipCode;
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




