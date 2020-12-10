let lon;
let lat;
let url_pt1 = "http://api.openweathermap.org/data/2.5/weather?q=";
let url_pt2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial";
let url_pt3 = "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon;
let city = "stockton, ca, us," + "&units=imperial";
let apikey = "&appid=3bdbeade6189c91354f9f969824f70b6";

let cityArray = [];
let location1 = document.getElementById("location1");
let currentTemp = document.getElementById("currentTemp");
let locationIcon = document.querySelector('.weather-icon');

let todayFeelsLike = document.getElementById("todayFeelsLike");
let todayWindSpeed = document.getElementById("todayWindSpeed");
let todayHumidity = document.getElementById("todayHumidity");
let todayPressure = document.getElementById("todayPressure");
let todayAQI = document.getElementById("todayAQI");
let todayUVindex = document.getElementById("todayUVindex");
let todayVisibility = document.getElementById("todayVisibility");
let todayCloud = document.getElementById("todayCloud");

let day1 = document.getElementById("day1");
let day2 = document.getElementById("day2");
let day3 = document.getElementById("day3");
let day4 = document.getElementById("day4");
let day5 = document.getElementById("day5");
let day1Temp = document.getElementById("day1Temp");
let day2Temp = document.getElementById("day2Temp");
let day3Temp = document.getElementById("day3Temp");
let day4Temp = document.getElementById("day4Temp");
let day5Temp = document.getElementById("day5Temp");
let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");
let date3 = document.getElementById("date3");
let date4 = document.getElementById("date4");
let date5 = document.getElementById("date5");

let morningTemp = document.getElementById("morningTemp");
let afternoonTemp = document.getElementById("afternoonTemp");
let eveningTemp = document.getElementById("eveningTemp");
let addFavorites = document.getElementById("addFavroites")

// addFavorites.addEventListener('click',()=>{
//     saveToLocalStorage(location1.value);
//     location.innerText = location1.value;
// });

// function saveToLocalStorage(cityToSave){
//     cityArray.push(cityToSave);
//     localStorage.setItem("cities", JSON.stringify(cityArray));
// }

// function onLoad(){
//     let localStorageCity = JSON.parse(localStorage.getItem("cities"));
//     if(localStorageCity != null){
//         location1.innerText = localStorageCity;
//     }
//     else{
//         location1.innerText = "...";
//     }
// }
// onLoad();

let citySearch = document.getElementById("citySearch");
let executeSearch = document.getElementById("executeSearch");

citySearch.addEventListener("keypress", function (e) {
    if (e.code == "Enter") {
        city = citySearch.value + "&units=imperial";
        loadToday(url_pt1 + city + apikey);

        setTimeout(function () {
            oneCall(url_pt2 + apikey)
        }, 1250);

        setTimeout(function () {
            airPollution(url_pt3 + apikey)
        }, 2000);
        
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

    
    setTimeout(function () {
        airPollution(url_pt3 + apikey)
    }, 2000);
    

    e.preventDefault();
});

//Pulling current weather API
function loadToday(url) {
    fetch(url).then(
        todayForecast => todayForecast.json()
    ).then(data => {
        const { icon } = data.weather[0];
        console.log(data);
        console.log("City: " + data.name);
        console.log("Current Temp: " + data.main.temp + "°F, " + data.weather[0].main)
        lon = data.coord.lon;
        lat = data.coord.lat;
        url_pt2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial";
        url_pt3 = "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon;

        location1.innerHTML = data.name+", "+data.sys.country;
        currentTemp.innerHTML = data.main.temp + "°F"
        locationIcon.innerHTML = data.weather[0];
        todayFeelsLike.innerHTML = data.main.feels_like + "°F&nbsp;&nbsp;";
        todayWindSpeed.innerHTML = data.wind.speed + "mph&nbsp;&nbsp;";
        todayHumidity.innerHTML = data.main.humidity + "%&nbsp;&nbsp;";
        todayPressure.innerHTML = data.main.pressure + " hPa&nbsp;&nbsp;";
        todayVisibility.innerHTML = data.visibility + "mi&nbsp;&nbsp;" 
        todayCloud.innerHTML = data.clouds.all + "%&nbsp;&nbsp;";
    });

        }

//Pulling One Call API
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
        morningTemp.innerHTML = oneCallData.daily[0].temp.morn + "°F";
        afternoonTemp.innerHTML = oneCallData.daily[0].temp.day + "°F";
        eveningTemp.textContent = oneCallData.daily[0].temp.night + "°F";
        todayUVindex.innerHTML = oneCallData.current.uvi + "&nbsp;&nbsp;";
        day1Temp.innerHTML = oneCallData.daily[1].temp.day + "°F";
        day2Temp.innerHTML = oneCallData.daily[2].temp.day + "°F";
        day3Temp.innerHTML = oneCallData.daily[3].temp.day + "°F";
        day4Temp.innerHTML = oneCallData.daily[4].temp.day + "°F";
        day5Temp.innerHTML = oneCallData.daily[5].temp.day + "°F";
    });
}

//Pulling Air Pollution API
function airPollution(url) {
    fetch(url).then(
        currentAQI => currentAQI.json()
    ).then(aqiData =>{
        console.log(aqiData);
        console.log("AQI: "+ aqiData.list[0].main.aqi);
        if (aqiData.list[0].main.aqi == 1){
            todayAQI.className = "aqi noPadding text-end detailWeather";
            todayAQI.innerText = "Good\u00A0\u00A0";
        }
        if (aqiData.list[0].main.aqi == 2) {
            todayAQI.className = "yellow noPadding text-end detailWeather";
            todayAQI.innerText = "Fair\u00A0\u00A0";
        }
        if (aqiData.list[0].main.aqi == 3) {
            todayAQI.className = "orange noPadding text-end detailWeather";
            todayAQI.innerText = "Moderate\u00A0\u00A0";
        }
        if (aqiData.list[0].main.aqi == 4) {
            todayAQI.className = "red noPadding text-end detailWeather";
            todayAQI.innerText = "Poor\u00A0\u00A0";
        }
        if (aqiData.list[0].main.aqi == 5) {
            todayAQI.className = "purple noPadding text-end detailWeather";
            todayAQI.innerText = "Very Poor\u00A0";
        }
    });
}

