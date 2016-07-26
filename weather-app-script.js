
var zipCode;
var dateRange;
var dateOne,dateTwo;

var apiKEY = "6bde010b79d7f87f0397";

var weatherURI = "https://api.weathersource.com/v1/6bde010b79d7f87f0397/history_by_postal_code.json?period=day&postal_code_eq=" + zipCode + "&timestamp_eq=2012-02-10T00:00:00-05:00&fields=tempAvg";



zipCode = document.getElementById("zipCode");

dateOne = document.getElementById("");

function calcAverage (dateRange) {
	
	var totalTemps;
	
	for(var dayTemp in dateRange) {
		totalTemps += dayTemp;
	}
	
	var avgTemps = totalTemps / dateRange.length;
	
	return avgTemps;
}

