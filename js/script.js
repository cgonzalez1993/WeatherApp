let lon;
let lat;
let url_pt1 = "http://api.openweathermap.org/data/2.5/weather?q=";
let url_pt2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon" + lon + "&units=imperial";
let city = "stockton, ca, us," + "&units=imperial";
let apikey = "&appid=3bdbeade6189c91354f9f969824f70b6";

let citySearch = document.getElementById("citySearch");
let executeSearch = document.getElementById("executeSearch");

citySearch.addEventListener("keypress", function (e) {
    if (e.code == "Enter") {
        city = citySearch.value + "&units=imperial";
        loadToday(url_pt1 + city + apikey);
        setTimeout(function () {
            oneCall(url_pt2 + apikey)
        }, 1250);
        if (citySearch.value == "" || citySearch.value == " ") {
            alert("Please enter the name of a city.");
        }
        else if (citySearch.value == "the name of a city") {
            alert("You don't deserve to know.");
        }
        e.preventDefault();
    }
});

executeSearch.addEventListener("click", function (e) {
    if(citySearch.value == "" || citySearch.value == " "){
        alert("Please enter the name of a city.");
    }
    else if(citySearch.value == "the name of a city"){
        alert("You don't deserve to know.")
    }
    city = citySearch.value + "&units=imperial";
    loadToday(url_pt1 + city + apikey);
    setTimeout(function () {
        oneCall(url_pt2 + apikey)
    }, 1250);
    e.preventDefault();
});

//Pulling Hourly Forecast
function loadToday(url) {
    fetch(url).then(
        todayForecast => todayForecast.json()
    ).then(data => {
        console.log(data);
        console.log("City: " + data.name);
        console.log("Current Temp: " + data.main.temp + "°F, " + data.weather[0].main)
        lon = data.coord.lon;
        lat = data.coord.lat;
        url_pt2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial";
        console.log(url_pt2);
    });

}

//Pulling one call API
function oneCall(url) {
    fetch(url).then(
        oneCallForecast => oneCallForecast.json()
    ).then(oneCallData => {
        console.log("Morning Temp: " + oneCallData.daily[0].temp.morn + "°F");
        console.log("Afternoon Temp: " + oneCallData.daily[0].temp.day + "°F");
        console.log("Evening Temp: " + oneCallData.daily[0].temp.night + "°F");
        console.log("Thursday Temp: " + oneCallData.daily[1].temp.day + "°F");
        console.log("Friday Temp: " + oneCallData.daily[2].temp.day + "°F");
        console.log("Saturday Temp: " + oneCallData.daily[3].temp.day + "°F");
        console.log("Sunday Temp: " + oneCallData.daily[4].temp.day + "°F");
        console.log("Monday Temp: " + oneCallData.daily[5].temp.day + "°F");
        console.log(oneCallData);
    });
}

