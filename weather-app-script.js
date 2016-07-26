
var zipCode;
var dateRange = [];
var startDate,endDate,currentDate;
var currDayTemp;
var weatherURL;

var weatherXmlHttp = new XMLHttpRequest();



var uri = "https://api.weathersource.com/v1/6bde010b79d7f87f0397/history_by_postal_code.json?period=day&postal_code_eq=22222&country_eq=US&timestamp_eq=2012-09-27&fields=tempAvg"



document.getElementById("displayTemp").onclick = function() {
	
	zipCode = document.getElementById("zipCode");
	
	startDate = new Date(document.getElementById("dateOne"));
	endDate = new Date(document.getElementById("dateTwo"));
	
	currentDate = startDate;
	
	for(currentDate.getDate(); currentDate.getDate() <= endDate.getDate(); currentDate.setDate(currentDate.getDate() + 1)) {
		
		weatherURL = "https://api.weathersource.com/v1/6bde010b79d7f87f0397/history_by_postal_code.json?period=day&postal_code_eq=" + zipCode + "&country_eq=US&timestamp_eq=" + currentDate + "&fields=tempAvg";
		
		weatherXmlHttp.open("GET", weatherURL, true);
		weatherXmlHttp.send();
		
		var arr = JSON.parse(weatherXmlHttp.responseText);
		
		
		
		dateRange[dateRange.length] = currDayTemp;
		
	}
}

function calcAverage (dateRange) {
	
	var totalTemps;
	
	for(var dayTemp in dateRange) {
		totalTemps += dayTemp;
	}
	
	var avgTemps = totalTemps / dateRange.length;
	
	return avgTemps;
}


document.getElementById("city-zip").innerHTML = zipCode;
document.getElementById("avg-temp-output").innerHTML = calcAverage(dateRange);
