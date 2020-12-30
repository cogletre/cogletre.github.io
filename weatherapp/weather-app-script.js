
var zipcode;
var numDays;
var dayOne,dayTwo,dayThree,dayFour,dayFive;



var weatherCall="api.openweathermap.org/data/2.5/weather?zip=";
var forecastCall="api.openweathermap.org/data/2.5/forecast?zip="
var weatherXmlHttp=new XMLHttpRequest();

var tempScript = null;

var totalTemp = 0;
var totalDays = 0;

var avgTemp;


//Callback function for JSONP request to WeatherSource.com API
function readWeather(weatherData) {
	
	if(tempScript){
		document.getElementsByTagName('head')[0].removeChild(tempScript);
		tempScript = null;
	}

	var tempObj = weatherData[0];

	currDayTemp = parseInt(tempObj.tempAvg);
		
	totalTemp += currDayTemp;
	totalDays++;
	
	avgTemp = parseInt(totalTemp/totalDays);
	
	document.getElementById("avg-temp-output").innerHTML = avgTemp + "&deg;";
}



function getForecast() {
	
	zipcode=document.getElementById("zipcode").value;
	numDays=document.getElementById("forecastLength").value;
	
	switch (numDays) {
		case 'one-day':
			weatherCall+=zipcode;
			document.getElementById("num-days").innerHTML="1-Day";
			break;
		case 'three-day':
			forecastCall+=zipcode;
			document.getElementById("num-days").innerHTML="3-Day";
			break;
		case 'five-day':
			forecastCall+=zipcode;
			document.getElementById("num-days").innerHTML="5-Day";
			break;
		default:
			weatherCall+=zipcode;
			document.getElementById("num-days").innerHTML="1-Day";
			break;
	}
	document.getElementById("zip-fill").innerHTML=zipcode;
	
	
	while(currentDate.getDate() <= endDate.getDate()){
		currDateStr=currentDate.toDateString();
		
		apiCall=;
		
		tempScript = document.createElement("script");
		tempScript.src = weatherURL;
		
		document.getElementsByTagName('head')[0].appendChild(tempScript);
		
		currentDate.setDate(currentDate.getDate() + 1);
	}
	
	
}