let lon;
let lat;
let url_pt1 = "http://api.openweathermap.org/data/2.5/weather?q=";
let url_pt2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial";
let url_pt3 = "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon;
let city = "manteca, ca, us," + "&units=imperial";
let apikey = "&appid=3bdbeade6189c91354f9f969824f70b6";

let currentTemp = document.getElementById("currentTemp");
let todayDate = document.getElementById("todayDate");
let todayFeelsLike = document.getElementById("todayFeelsLike");
let todayWindSpeed = document.getElementById("todayWindSpeed");
let todayHumidity = document.getElementById("todayHumidity");
let todayPressure = document.getElementById("todayPressure");
let todayAQI = document.getElementById("todayAQI");
let todayUVindex = document.getElementById("todayUVindex");
let todayVisibility = document.getElementById("todayVisibility");
let todayCloud = document.getElementById("todayCloud");
let todaySR = document.getElementById("todaySR");
let todaySS = document.getElementById("todaySS");

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

let cityArray = [];
let citySearch = document.getElementById("citySearch");
let executeSearch = document.getElementById("executeSearch");
let addFavorites = document.getElementById("addFavorites")
let addFavsToModal = document.getElementById("addFavsToModal");
let yourCity = document.getElementById("yourCity");
let FavoritesModal = document.getElementById("FavoritesModal");

let data = JSON.parse(localStorage.getItem("Cities"));
console.log(data);

addFavorites.addEventListener('click', () => {
    saveToLocalStorage(yourCity.innerText);
});

FavoritesModal.addEventListener('click', () => {
    localStorage.setItem("Cities", JSON.stringify(cityArray));
});

function saveToLocalStorage(cityToSave) {

    let localStorageCity = JSON.parse(localStorage.getItem("Cities"));
    if (localStorageCity != null) {
        let cityArray = localStorageCity;
        cityArray.push(cityToSave);
        console.log(cityArray);
        localStorage.setItem("Cities", JSON.stringify(cityArray));
        appenedElements(cityArray);
    }
    else {
        console.log("empty");
        cityArray.push(cityToSave);
        localStorage.setItem("Cities", JSON.stringify(cityArray));
        appenedElements(cityArray);
    }
}

function appenedElements(attach) {
    addFavsToModal.innerText = "";
    attach.forEach(angel => {
        console.log(angel);
        let cityToSave = angel;
        let aElement = document.createElement("a");
        aElement.innerText = cityToSave;
        aElement.className = "list-group-item list-group-item-action list-group-item-secondary center";
        aElement.addEventListener("click", () => {
            console.log(aElement.innerText);
            loadToday(url_pt1 + aElement.innerText + apikey + "&units=imperial");
            setTimeout(function () {
                oneCall(url_pt2 + apikey + "&units=imperial")
            }, 1250);

            setTimeout(function () {
                airPollution(url_pt3 + apikey + "&units=imperial")
            }, 1250);

        });
        let deleteMe = document.createElement("p");
        deleteMe.classList.add("px-3", "fas", "black", "fa-trash");

        // deleteMe.addEventListener("click", (e) => {
        //     console.log(cityArray);
        //     console.log(e.toElement.parentElement.firstChild.textContent);
        //     console.log(localStorageCity);
        //     let locationName = localStorageCity.indexOf(e.toElement.parentElement.firstChild.textContent);
        //     console.log(locationName);
        //     localStorageCity.splice(locationName, 1);
        //     localStorage.setItem("Cities", JSON.stringify(localStorageCity));
        //     aElement.remove();
        //     console.log(localStorageCity);
        // });
        // aElement.appendChild(deleteMe);
        // addFavsToModal.appendChild(aElement);
    })
}

function onLoad() {
    let localStorageCity = JSON.parse(localStorage.getItem("Cities"));
    if (localStorageCity != null) {
        localStorageCity.forEach(angel => {
            console.log(angel);
            let cityToSave = angel;
            //addFavsToModal.innerText += cityToSave;
            let aElement = document.createElement("p");
            aElement.innerText = cityToSave;
            aElement.className = "list-group-item list-group-item-action list-group-item-secondary center";
            aElement.addEventListener("click", () => {
                console.log(aElement.innerText);
                loadToday(url_pt1 + aElement.innerText + apikey + "&units=imperial");
                setTimeout(function () {
                    oneCall(url_pt2 + apikey + "&units=imperial")
                }, 1250);

                setTimeout(function () {
                    airPollution(url_pt3 + apikey + "&units=imperial")
                }, 1250);

            });

            let deleteMe = document.createElement("p");
            deleteMe.classList.add("px-3", "fas", "black", "fa-trash");

            deleteMe.addEventListener("click", (e) => {
                console.log(cityArray);
                console.log(e.toElement.parentElement.firstChild.textContent);
                console.log(localStorageCity);
                let locationName = localStorageCity.indexOf(e.toElement.parentElement.firstChild.textContent);
                console.log(locationName);
                localStorageCity.splice(locationName, 1);
                localStorage.setItem("Cities", JSON.stringify(localStorageCity));
                aElement.remove();
                console.log(localStorageCity);
            });
            aElement.appendChild(deleteMe);
            addFavsToModal.appendChild(aElement);
        })
    }
}
onLoad();


loadToday(url_pt1 + city + apikey);

setTimeout(function () {
    oneCall(url_pt2 + apikey)
}, 1250);

setTimeout(function () {
    airPollution(url_pt3 + apikey)
}, 1250);

citySearch.addEventListener("keypress", function (e) {
    if (e.code == "Enter") {
        city = citySearch.value + "&units=imperial";
        loadToday(url_pt1 + city + apikey);

        setTimeout(function () {
            oneCall(url_pt2 + apikey)
        }, 1250);

        setTimeout(function () {
            airPollution(url_pt3 + apikey)
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
    if (citySearch.value == "" || citySearch.value == " ") {
        alert("Please enter the name of a city.");
    }
    else if (citySearch.value == "the name of a city") {
        alert("You don't deserve to know.")
    }
    city = citySearch.value + "&units=imperial";

    loadToday(url_pt1 + city + apikey);

    setTimeout(function () {
        oneCall(url_pt2 + apikey)
    }, 1250);

    setTimeout(function () {
        airPollution(url_pt3 + apikey)
    }, 1250);

    e.preventDefault();
});

//Pulling Current Weather API
function loadToday(url) {
    fetch(url).then(
        todayForecast => todayForecast.json()
    ).then(data => {
        console.log("City: " + data.name);
        console.log("Current Temp: " + data.main.temp + "°F, " + data.weather[0].main)
        console.log(data);
        lon = data.coord.lon;
        lat = data.coord.lat;
        url_pt2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial";
        url_pt3 = "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon;

        yourCity.innerHTML = data.name + ", " + data.sys.country;
        currentTemp.innerHTML = Math.trunc(data.main.temp) + "°F"

        todayFeelsLike.innerHTML = Math.trunc(data.main.feels_like) + "°F&nbsp;&nbsp;";
        todayWindSpeed.innerHTML = (data.wind.speed) + "mph&nbsp;&nbsp;";
        todayHumidity.innerHTML = data.main.humidity + "%&nbsp;&nbsp;";
        todayPressure.innerHTML = data.main.pressure + " hPa&nbsp;&nbsp;";
        todayVisibility.innerHTML = Math.trunc(data.visibility / 1609.34) + " mi&nbsp;&nbsp;"
        todayCloud.innerHTML = data.clouds.all + "%&nbsp;&nbsp;";

        myDate = new Date(data.dt * 1000);
        mySR = new Date(data.sys.sunrise * 1000);
        mySS = new Date(data.sys.sunset * 1000);

        if (data.weather[0].icon == "01d") {
            document.getElementById("weather-icon").src = "icons/01d.png";
            body.className = "dayTimeBG";
        }
        else if (data.weather[0].icon == "01n") {
            document.getElementById("weather-icon").src = "icons/01n.png";
            body.className = "nightTimeBG";
        }
        else if (data.weather[0].icon == "02d") {
            document.getElementById("weather-icon").src = "icons/02d.png";
            body.className = "dayTimeBG";
        }
        else if (data.weather[0].icon == "02n") {
            document.getElementById("weather-icon").src = "icons/02n.png";
            body.className = "nightTimeBG";
        }
        else if (data.weather[0].icon == "03d") {
            document.getElementById("weather-icon").src = "icons/03d.png";
            body.className = "dayTimeBG";
        }
        else if (data.weather[0].icon == "03n") {
            document.getElementById("weather-icon").src = "icons/03n.png";
            body.className = "nightTimeBG";
        }
        else if (data.weather[0].icon == "04d") {
            document.getElementById("weather-icon").src = "icons/04d.png";
            body.className = "dayTimeBG";
        }
        else if (data.weather[0].icon == "04n") {
            document.getElementById("weather-icon").src = "icons/04n.png";
            body.className = "nightTimeBG";
        }
        else if (data.weather[0].icon == "09d") {
            document.getElementById("weather-icon").src = "icons/09d.png";
            body.className = "stormyBG";
        }
        else if (data.weather[0].icon == "09n") {
            document.getElementById("weather-icon").src = "icons/09n.png";
            body.className = "stormyBG";
        }
        else if (data.weather[0].icon == "10d") {
            document.getElementById("weather-icon").src = "icons/10d.png";
            body.className = "stormyBG";
        }
        else if (data.weather[0].icon == "10n") {
            document.getElementById("weather-icon").src = "icons/10n.png";
            body.className = "stormyBG";
        }
        else if (data.weather[0].icon == "11d") {
            document.getElementById("weather-icon").src = "icons/11d.png";
            body.className = "stormyBG";
        }
        else if (data.weather[0].icon == "11n") {
            document.getElementById("weather-icon").src = "icons/11n.png";
            body.className = "stormyBG";
        }
        else if (data.weather[0].icon == "13d") {
            document.getElementById("weather-icon").src = "icons/13d.png";
            body.className = "stormyBG";
        }
        else if (data.weather[0].icon == "13n") {
            document.getElementById("weather-icon").src = "icons/13n.png";
            body.className = "stormyBG";
        }
        else if (data.weather[0].icon == "50d") {
            document.getElementById("weather-icon").src = "icons/50d.png";
            body.className = "stormyBG";
        }
        else if (data.weather[0].icon == "50n") {
            document.getElementById("weather-icon").src = "icons/50n.png";
            body.className = "stormyBG";
        }
        else
            document.getElementById("weather-icon").src = "icons/unknown.png";

        let month;
        switch (myDate.getMonth()) {
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "April";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                break;
            case 6:
                month = "July";
                break;
            case 7:
                month = "August";
                break;
            case 8:
                month = "September";
                break;
            case 9:
                month = "October";
                break;
            case 10:
                month = "November";
                break;
            default:
                month = "December";
                break;
        }

        let currentDay;
        switch (myDate.getDay()) {
            case 0:
                currentDay = "Sunday";
                break;
            case 1:
                currentDay = "Monday";
                break;
            case 2:
                currentDay = "Tuesday";
                break;
            case 3:
                currentDay = "Wednesday";
                break;
            case 4:
                currentDay = "Thursday";
                break;
            case 5:
                currentDay = "Friday";
                break;
            default:
                currentDay = "Saturday";
                break;
        }

        let currentHour;
        switch (myDate.getHours()) {
            case 0:
                currentHour = "12";
                break;
            case 1:
                currentHour = "1";
                break;
            case 2:
                currentHour = "2";
                break;
            case 3:
                currentHour = "3";
                break;
            case 4:
                currentHour = "4";
                break;
            case 5:
                currentHour = "5";
                break;
            case 6:
                currentHour = "6";
                break;
            case 7:
                currentHour = "7";
                break;
            case 8:
                currentHour = "8";
                break;
            case 9:
                currentHour = "9";
                break;
            case 10:
                currentHour = "10";
                break;
            case 11:
                currentHour = "11";
                break;
            case 12:
                currentHour = "12";
                break;
            case 13:
                currentHour = "1";
                break;
            case 14:
                currentHour = "2";
                break;
            case 15:
                currentHour = "3";
                break;
            case 16:
                currentHour = "4";
                break;
            case 17:
                currentHour = "5";
                break;
            case 18:
                currentHour = "6";
                break;
            case 19:
                currentHour = "7";
                break;
            case 20:
                currentHour = "8";
                break;
            case 21:
                currentHour = "9";
                break;
            case 22:
                currentHour = "10";
                break;
            case 23:
                currentHour = "11";
                break;
            default:
                currentHour = "12";
                break;
        }

        let currentHour1;
        switch (mySR.getHours()) {
            case 0:
                currentHour1 = "12";
                break;
            case 1:
                currentHour1 = "1";
                break;
            case 2:
                currentHour1 = "2";
                break;
            case 3:
                currentHour1 = "3";
                break;
            case 4:
                currentHour1 = "4";
                break;
            case 5:
                currentHour1 = "5";
                break;
            case 6:
                currentHour1 = "6";
                break;
            case 7:
                currentHour1 = "7";
                break;
            case 8:
                currentHour1 = "8";
                break;
            case 9:
                currentHour1 = "9";
                break;
            case 10:
                currentHour1 = "10";
                break;
            case 11:
                currentHour1 = "11";
                break;
            case 12:
                currentHour1 = "12";
                break;
            case 13:
                currentHour1 = "1";
                break;
            case 14:
                currentHour1 = "2";
                break;
            case 15:
                currentHour1 = "3";
                break;
            case 16:
                currentHour1 = "4";
                break;
            case 17:
                currentHour1 = "5";
                break;
            case 18:
                currentHour1 = "6";
                break;
            case 19:
                currentHour1 = "7";
                break;
            case 20:
                currentHour1 = "8";
                break;
            case 21:
                currentHour1 = "9";
                break;
            case 22:
                currentHour1 = "10";
                break;
            case 23:
                currentHour1 = "11";
                break;
            default:
                currentHour1 = "12";
                break;
        }

        let currentHour2;
        switch (mySS.getHours()) {
            case 0:
                currentHour2 = "12";
                break;
            case 1:
                currentHour2 = "1";
                break;
            case 2:
                currentHour2 = "2";
                break;
            case 3:
                currentHour2 = "3";
                break;
            case 4:
                currentHour2 = "4";
                break;
            case 5:
                currentHour2 = "5";
                break;
            case 6:
                currentHour2 = "6";
                break;
            case 7:
                currentHour2 = "7";
                break;
            case 8:
                currentHour2 = "8";
                break;
            case 9:
                currentHour2 = "9";
                break;
            case 10:
                currentHour2 = "10";
                break;
            case 11:
                currentHour2 = "11";
                break;
            case 12:
                currentHour2 = "12";
                break;
            case 13:
                currentHour2 = "1";
                break;
            case 14:
                currentHour2 = "2";
                break;
            case 15:
                currentHour2 = "3";
                break;
            case 16:
                currentHour2 = "4";
                break;
            case 17:
                currentHour2 = "5";
                break;
            case 18:
                currentHour2 = "6";
                break;
            case 19:
                currentHour2 = "7";
                break;
            case 20:
                currentHour2 = "8";
                break;
            case 21:
                currentHour2 = "9";
                break;
            case 22:
                currentHour2 = "10";
                break;
            case 23:
                currentHour2 = "11";
                break;
            default:
                currentHour2 = "12";
                break;
        }
        todayDate.innerText = currentDay + ", " + month + " " + myDate.getDate() + ", " + myDate.getFullYear() + " " + currentHour + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() + `${myDate.getHours > 12 ? " PM" : " AM"}`;
    });
}

//Pulling One Call API
function oneCall(url) {
    fetch(url).then(
        oneCallForecast => oneCallForecast.json()
    ).then(oneCallData => {
        console.log(oneCallData);
        let date = new Date(oneCallData.current.sunrise * 1000);
        let date11 = new Date(oneCallData.current.sunset * 1000);
        console.log(date.toLocaleString("en-US", { timeZone: oneCallData.timezone }));
        console.log(date11.toLocaleString("en-US", { timeZone: oneCallData.timezone }));
        let currentHour1;
        switch (mySR.getHours()) {
            case 0:
                currentHour1 = "12";
                break;
            case 1:
                currentHour1 = "1";
                break;
            case 2:
                currentHour1 = "2";
                break;
            case 3:
                currentHour1 = "3";
                break;
            case 4:
                currentHour1 = "4";
                break;
            case 5:
                currentHour1 = "5";
                break;
            case 6:
                currentHour1 = "6";
                break;
            case 7:
                currentHour1 = "7";
                break;
            case 8:
                currentHour1 = "8";
                break;
            case 9:
                currentHour1 = "9";
                break;
            case 10:
                currentHour1 = "10";
                break;
            case 11:
                currentHour1 = "11";
                break;
            case 12:
                currentHour1 = "12";
                break;
            case 13:
                currentHour1 = "1";
                break;
            case 14:
                currentHour1 = "2";
                break;
            case 15:
                currentHour1 = "3";
                break;
            case 16:
                currentHour1 = "4";
                break;
            case 17:
                currentHour1 = "5";
                break;
            case 18:
                currentHour1 = "6";
                break;
            case 19:
                currentHour1 = "7";
                break;
            case 20:
                currentHour1 = "8";
                break;
            case 21:
                currentHour1 = "9";
                break;
            case 22:
                currentHour1 = "10";
                break;
            case 23:
                currentHour1 = "11";
                break;
            default:
                currentHour1 = "12";
                break;
        }

        let currentHour2;
        switch (mySS.getHours()) {
            case 0:
                currentHour2 = "12";
                break;
            case 1:
                currentHour2 = "1";
                break;
            case 2:
                currentHour2 = "2";
                break;
            case 3:
                currentHour2 = "3";
                break;
            case 4:
                currentHour2 = "4";
                break;
            case 5:
                currentHour2 = "5";
                break;
            case 6:
                currentHour2 = "6";
                break;
            case 7:
                currentHour2 = "7";
                break;
            case 8:
                currentHour2 = "8";
                break;
            case 9:
                currentHour2 = "9";
                break;
            case 10:
                currentHour2 = "10";
                break;
            case 11:
                currentHour2 = "11";
                break;
            case 12:
                currentHour2 = "12";
                break;
            case 13:
                currentHour2 = "1";
                break;
            case 14:
                currentHour2 = "2";
                break;
            case 15:
                currentHour2 = "3";
                break;
            case 16:
                currentHour2 = "4";
                break;
            case 17:
                currentHour2 = "5";
                break;
            case 18:
                currentHour2 = "6";
                break;
            case 19:
                currentHour2 = "7";
                break;
            case 20:
                currentHour2 = "8";
                break;
            case 21:
                currentHour2 = "9";
                break;
            case 22:
                currentHour2 = "10";
                break;
            case 23:
                currentHour2 = "11";
                break;
            default:
                currentHour2 = "12";
                break;
        }

        todaySR.innerText = "Sunrise - " + currentHour1 + ":" + date.getMinutes() + `${date.getHours() > 12 ? "pm" : "am"}`;

        todaySS.innerText = "Sunset - " + currentHour2 + ":" + date11.getMinutes() + `${date11.getHours() > 12 ? "pm" : "am"}`;

        morningTemp.innerHTML = Math.trunc(oneCallData.daily[0].temp.morn) + "°F";
        afternoonTemp.innerHTML = Math.trunc(oneCallData.daily[0].temp.day) + "°F";
        eveningTemp.textContent = Math.trunc(oneCallData.daily[0].temp.night) + "°F";
        todayUVindex.innerHTML = oneCallData.current.uvi + "&nbsp;&nbsp;";
        day1Temp.innerHTML = Math.trunc(oneCallData.daily[1].temp.day) + "°F";
        day2Temp.innerHTML = Math.trunc(oneCallData.daily[2].temp.day) + "°F";
        day3Temp.innerHTML = Math.trunc(oneCallData.daily[3].temp.day) + "°F";
        day4Temp.innerHTML = Math.trunc(oneCallData.daily[4].temp.day) + "°F";
        day5Temp.innerHTML = Math.trunc(oneCallData.daily[5].temp.day) + "°F";

        myDate1 = new Date(oneCallData.daily[1].dt * 1000);
        myDate2 = new Date(oneCallData.daily[2].dt * 1000);
        myDate3 = new Date(oneCallData.daily[3].dt * 1000);
        myDate4 = new Date(oneCallData.daily[4].dt * 1000);
        myDate5 = new Date(oneCallData.daily[5].dt * 1000);

        myDay1 = new Date(oneCallData.daily[1].dt * 1000);
        myDay2 = new Date(oneCallData.daily[2].dt * 1000);
        myDay3 = new Date(oneCallData.daily[3].dt * 1000);
        myDay4 = new Date(oneCallData.daily[4].dt * 1000);
        myDay5 = new Date(oneCallData.daily[5].dt * 1000);

        let currentDay1;
        switch (myDay1.getDay()) {
            case 0:
                currentDay1 = "Sun.";
                break;
            case 1:
                currentDay1 = "Mon.";
                break;
            case 2:
                currentDay1 = "Tues.";
                break;
            case 3:
                currentDay1 = "Weds.";
                break;
            case 4:
                currentDay1 = "Thurs.";
                break;
            case 5:
                currentDay1 = "Fri.";
                break;
            case 6:
                currentDay1 = "Sat.";
                break;
            default:
                currentDay1 = "Sun.";
                break;
        }

        let currentDay2;
        switch (myDay2.getDay()) {
            case 0:
                currentDay2 = "Sun.";
                break;
            case 1:
                currentDay2 = "Mon.";
                break;
            case 2:
                currentDay2 = "Tues.";
                break;
            case 3:
                currentDay2 = "Weds.";
                break;
            case 4:
                currentDay2 = "Thurs.";
                break;
            case 5:
                currentDay2 = "Fri.";
                break;
            case 6:
                currentDay2 = "Sat.";
                break;
            default:
                currentDay2 = "Sun.";
                break;
        }

        let currentDay3;
        switch (myDay3.getDay()) {
            case 0:
                currentDay3 = "Sun.";
                break;
            case 1:
                currentDay3 = "Mon.";
                break;
            case 2:
                currentDay3 = "Tues.";
                break;
            case 3:
                currentDay3 = "Weds.";
                break;
            case 4:
                currentDay3 = "Thurs.";
                break;
            case 5:
                currentDay3 = "Fri.";
                break;
            case 6:
                currentDay3 = "Sat.";
                break;
            default:
                currentDay3 = "Sun.";
                break;
        }

        let currentDay4;
        switch (myDay4.getDay()) {
            case 0:
                currentDay4 = "Sun.";
                break;
            case 1:
                currentDay4 = "Mon.";
                break;
            case 2:
                currentDay4 = "Tues.";
                break;
            case 3:
                currentDay4 = "Weds.";
                break;
            case 4:
                currentDay4 = "Thurs.";
                break;
            case 5:
                currentDay4 = "Fri.";
                break;
            case 6:
                currentDay4 = "Sat.";
                break;
            default:
                currentDay4 = "Sun.";
                break;
        }

        let currentDay5;
        switch (myDay5.getDay()) {
            case 0:
                currentDay5 = "Sun.";
                break;
            case 1:
                currentDay5 = "Mon.";
                break;
            case 2:
                currentDay5 = "Tues.";
                break;
            case 3:
                currentDay5 = "Weds.";
                break;
            case 4:
                currentDay5 = "Thurs.";
                break;
            case 5:
                currentDay5 = "Fri.";
                break;
            case 6:
                currentDay5 = "Sat.";
                break;
            default:
                currentDay5 = "Sun.";
                break;
        }

        date1.innerText = (myDate1.getMonth() + 1) + "/" + myDate1.getDate() + "/" + myDate1.getFullYear();
        date2.innerText = (myDate2.getMonth() + 1) + "/" + myDate2.getDate() + "/" + myDate2.getFullYear();
        date3.innerText = (myDate3.getMonth() + 1) + "/" + myDate3.getDate() + "/" + myDate3.getFullYear();
        date4.innerText = (myDate4.getMonth() + 1) + "/" + myDate4.getDate() + "/" + myDate4.getFullYear();
        date5.innerText = (myDate5.getMonth() + 1) + "/" + myDate5.getDate() + "/" + myDate5.getFullYear();

        day1.innerText = currentDay1;
        day2.innerText = currentDay2;
        day3.innerText = currentDay3;
        day4.innerText = currentDay4;
        day5.innerText = currentDay5;

        //Morning Weather Icon
        if (oneCallData.hourly[5].weather[0].icon == "01d") {
            document.getElementById("weather-icon1").src = "icons/01d.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "01n") {
            document.getElementById("weather-icon1").src = "icons/01n.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "02d") {
            document.getElementById("weather-icon1").src = "icons/02d.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "02n") {
            document.getElementById("weather-icon1").src = "icons/02n.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "03d") {
            document.getElementById("weather-icon1").src = "icons/03d.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "03n") {
            document.getElementById("weather-icon1").src = "icons/03n.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "04d") {
            document.getElementById("weather-icon1").src = "icons/04d.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "04n") {
            document.getElementById("weather-icon1").src = "icons/04n.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "09d") {
            document.getElementById("weather-icon1").src = "icons/09d.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "09n") {
            document.getElementById("weather-icon1").src = "icons/09n.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "10d") {
            document.getElementById("weather-icon1").src = "icons/10d.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "10n") {
            document.getElementById("weather-icon1").src = "icons/10n.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "11d") {
            document.getElementById("weather-icon1").src = "icons/11d.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "11n") {
            document.getElementById("weather-icon1").src = "icons/11n.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "13d") {
            document.getElementById("weather-icon1").src = "icons/13d.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "13n") {
            document.getElementById("weather-icon1").src = "icons/13n.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "50d") {
            document.getElementById("weather-icon1").src = "icons/50d.png";
        }
        else if (oneCallData.hourly[5].weather[0].icon == "50n") {
            document.getElementById("weather-icon1").src = "icons/50n.png";
        }
        else
            document.getElementById("weather-icon1").src = "icons/unknown.png";

        //Afternoon Weather Icon
        if (oneCallData.hourly[13].weather[0].icon == "01d") {
            document.getElementById("weather-icon2").src = "icons/01d.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "01n") {
            document.getElementById("weather-icon2").src = "icons/01n.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "02d") {
            document.getElementById("weather-icon2").src = "icons/02d.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "02n") {
            document.getElementById("weather-icon2").src = "icons/02n.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "03d") {
            document.getElementById("weather-icon2").src = "icons/03d.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "03n") {
            document.getElementById("weather-icon2").src = "icons/03n.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "04d") {
            document.getElementById("weather-icon2").src = "icons/04d.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "04n") {
            document.getElementById("weather-icon2").src = "icons/04n.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "09d") {
            document.getElementById("weather-icon2").src = "icons/09d.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "09n") {
            document.getElementById("weather-icon2").src = "icons/09n.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "10d") {
            document.getElementById("weather-icon2").src = "icons/10d.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "10n") {
            document.getElementById("weather-icon2").src = "icons/10n.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "11d") {
            document.getElementById("weather-icon2").src = "icons/11d.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "11n") {
            document.getElementById("weather-icon2").src = "icons/11n.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "13d") {
            document.getElementById("weather-icon2").src = "icons/13d.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "13n") {
            document.getElementById("weather-icon2").src = "icons/13n.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "50d") {
            document.getElementById("weather-icon2").src = "icons/50d.png";
        }
        else if (oneCallData.hourly[13].weather[0].icon == "50n") {
            document.getElementById("weather-icon2").src = "icons/50n.png";
        }
        else
            document.getElementById("weather-icon2").src = "icons/unknown.png";

        //Evening Weather Icon
        if (oneCallData.hourly[21].weather[0].icon == "01d") {
            document.getElementById("weather-icon3").src = "icons/01d.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "01n") {
            document.getElementById("weather-icon3").src = "icons/01n.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "02d") {
            document.getElementById("weather-icon3").src = "icons/02d.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "02n") {
            document.getElementById("weather-icon3").src = "icons/02n.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "03d") {
            document.getElementById("weather-icon3").src = "icons/03d.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "03n") {
            document.getElementById("weather-icon3").src = "icons/03n.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "04d") {
            document.getElementById("weather-icon3").src = "icons/04d.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "04n") {
            document.getElementById("weather-icon3").src = "icons/04n.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "09d") {
            document.getElementById("weather-icon3").src = "icons/09d.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "09n") {
            document.getElementById("weather-icon3").src = "icons/09n.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "10d") {
            document.getElementById("weather-icon3").src = "icons/10d.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "10n") {
            document.getElementById("weather-icon3").src = "icons/10n.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "11d") {
            document.getElementById("weather-icon3").src = "icons/11d.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "11n") {
            document.getElementById("weather-icon3").src = "icons/11n.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "13d") {
            document.getElementById("weather-icon3").src = "icons/13d.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "13n") {
            document.getElementById("weather-icon3").src = "icons/13n.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "50d") {
            document.getElementById("weather-icon3").src = "icons/50d.png";
        }
        else if (oneCallData.hourly[21].weather[0].icon == "50n") {
            document.getElementById("weather-icon3").src = "icons/50n.png";
        }
        else
            document.getElementById("weather-icon3").src = "icons/unknown.png";

        //Day 1 Weather Icon
        if (oneCallData.daily[1].weather[0].icon == "01d") {
            document.getElementById("weather-icon4").src = "icons/01d.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "01n") {
            document.getElementById("weather-icon4").src = "icons/01n.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "02d") {
            document.getElementById("weather-icon4").src = "icons/02d.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "02n") {
            document.getElementById("weather-icon4").src = "icons/02n.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "03d") {
            document.getElementById("weather-icon4").src = "icons/03d.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "03n") {
            document.getElementById("weather-icon4").src = "icons/03n.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "04d") {
            document.getElementById("weather-icon4").src = "icons/04d.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "04n") {
            document.getElementById("weather-icon4").src = "icons/04n.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "09d") {
            document.getElementById("weather-icon4").src = "icons/09d.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "09n") {
            document.getElementById("weather-icon4").src = "icons/09n.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "10d") {
            document.getElementById("weather-icon4").src = "icons/10d.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "10n") {
            document.getElementById("weather-icon4").src = "icons/10n.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "11d") {
            document.getElementById("weather-icon4").src = "icons/11d.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "11n") {
            document.getElementById("weather-icon4").src = "icons/11n.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "13d") {
            document.getElementById("weather-icon4").src = "icons/13d.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "13n") {
            document.getElementById("weather-icon4").src = "icons/13n.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "50d") {
            document.getElementById("weather-icon4").src = "icons/50d.png";
        }
        else if (oneCallData.daily[1].weather[0].icon == "50n") {
            document.getElementById("weather-icon4").src = "icons/50n.png";
        }
        else
            document.getElementById("weather-icon4").src = "icons/unknown.png";

        //Day 2 Weather Icon
        if (oneCallData.daily[2].weather[0].icon == "01d") {
            document.getElementById("weather-icon5").src = "icons/01d.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "01n") {
            document.getElementById("weather-icon5").src = "icons/01n.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "02d") {
            document.getElementById("weather-icon5").src = "icons/02d.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "02n") {
            document.getElementById("weather-icon5").src = "icons/02n.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "03d") {
            document.getElementById("weather-icon5").src = "icons/03d.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "03n") {
            document.getElementById("weather-icon5").src = "icons/03n.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "04d") {
            document.getElementById("weather-icon5").src = "icons/04d.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "04n") {
            document.getElementById("weather-icon5").src = "icons/04n.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "09d") {
            document.getElementById("weather-icon5").src = "icons/09d.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "09n") {
            document.getElementById("weather-icon5").src = "icons/09n.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "10d") {
            document.getElementById("weather-icon5").src = "icons/10d.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "10n") {
            document.getElementById("weather-icon5").src = "icons/10n.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "11d") {
            document.getElementById("weather-icon5").src = "icons/11d.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "11n") {
            document.getElementById("weather-icon5").src = "icons/11n.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "13d") {
            document.getElementById("weather-icon5").src = "icons/13d.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "13n") {
            document.getElementById("weather-icon5").src = "icons/13n.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "50d") {
            document.getElementById("weather-icon5").src = "icons/50d.png";
        }
        else if (oneCallData.daily[2].weather[0].icon == "50n") {
            document.getElementById("weather-icon5").src = "icons/50n.png";
        }
        else
            document.getElementById("weather-icon5").src = "icons/unknown.png";

        //Day 3 Weather Icon
        if (oneCallData.daily[3].weather[0].icon == "01d") {
            document.getElementById("weather-icon6").src = "icons/01d.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "01n") {
            document.getElementById("weather-icon6").src = "icons/01n.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "02d") {
            document.getElementById("weather-icon6").src = "icons/02d.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "02n") {
            document.getElementById("weather-icon6").src = "icons/02n.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "03d") {
            document.getElementById("weather-icon6").src = "icons/03d.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "03n") {
            document.getElementById("weather-icon6").src = "icons/03n.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "04d") {
            document.getElementById("weather-icon6").src = "icons/04d.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "04n") {
            document.getElementById("weather-icon6").src = "icons/04n.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "09d") {
            document.getElementById("weather-icon6").src = "icons/09d.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "09n") {
            document.getElementById("weather-icon6").src = "icons/09n.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "10d") {
            document.getElementById("weather-icon6").src = "icons/10d.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "10n") {
            document.getElementById("weather-icon6").src = "icons/10n.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "11d") {
            document.getElementById("weather-icon6").src = "icons/11d.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "11n") {
            document.getElementById("weather-icon6").src = "icons/11n.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "13d") {
            document.getElementById("weather-icon6").src = "icons/13d.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "13n") {
            document.getElementById("weather-icon6").src = "icons/13n.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "50d") {
            document.getElementById("weather-icon6").src = "icons/50d.png";
        }
        else if (oneCallData.daily[3].weather[0].icon == "50n") {
            document.getElementById("weather-icon6").src = "icons/50n.png";
        }
        else
            document.getElementById("weather-icon6").src = "icons/unknown.png";

        //Day 4 Weather Icon
        if (oneCallData.daily[4].weather[0].icon == "01d") {
            document.getElementById("weather-icon7").src = "icons/01d.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "01n") {
            document.getElementById("weather-icon7").src = "icons/01n.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "02d") {
            document.getElementById("weather-icon7").src = "icons/02d.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "02n") {
            document.getElementById("weather-icon7").src = "icons/02n.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "03d") {
            document.getElementById("weather-icon7").src = "icons/03d.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "03n") {
            document.getElementById("weather-icon7").src = "icons/03n.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "04d") {
            document.getElementById("weather-icon7").src = "icons/04d.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "04n") {
            document.getElementById("weather-icon7").src = "icons/04n.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "09d") {
            document.getElementById("weather-icon7").src = "icons/09d.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "09n") {
            document.getElementById("weather-icon7").src = "icons/09n.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "10d") {
            document.getElementById("weather-icon7").src = "icons/10d.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "10n") {
            document.getElementById("weather-icon7").src = "icons/10n.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "11d") {
            document.getElementById("weather-icon7").src = "icons/11d.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "11n") {
            document.getElementById("weather-icon7").src = "icons/11n.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "13d") {
            document.getElementById("weather-icon7").src = "icons/13d.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "13n") {
            document.getElementById("weather-icon7").src = "icons/13n.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "50d") {
            document.getElementById("weather-icon7").src = "icons/50d.png";
        }
        else if (oneCallData.daily[4].weather[0].icon == "50n") {
            document.getElementById("weather-icon7").src = "icons/50n.png";
        }
        else
            document.getElementById("weather-icon7").src = "icons/unknown.png";

        //Day 5 Weather Icon
        if (oneCallData.daily[5].weather[0].icon == "01d") {
            document.getElementById("weather-icon8").src = "icons/01d.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "01n") {
            document.getElementById("weather-icon8").src = "icons/01n.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "02d") {
            document.getElementById("weather-icon8").src = "icons/02d.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "02n") {
            document.getElementById("weather-icon8").src = "icons/02n.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "03d") {
            document.getElementById("weather-icon8").src = "icons/03d.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "03n") {
            document.getElementById("weather-icon8").src = "icons/03n.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "04d") {
            document.getElementById("weather-icon8").src = "icons/04d.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "04n") {
            document.getElementById("weather-icon8").src = "icons/04n.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "09d") {
            document.getElementById("weather-icon8").src = "icons/09d.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "09n") {
            document.getElementById("weather-icon8").src = "icons/09n.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "10d") {
            document.getElementById("weather-icon8").src = "icons/10d.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "10n") {
            document.getElementById("weather-icon8").src = "icons/10n.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "11d") {
            document.getElementById("weather-icon8").src = "icons/11d.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "11n") {
            document.getElementById("weather-icon8").src = "icons/11n.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "13d") {
            document.getElementById("weather-icon8").src = "icons/13d.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "13n") {
            document.getElementById("weather-icon8").src = "icons/13n.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "50d") {
            document.getElementById("weather-icon8").src = "icons/50d.png";
        }
        else if (oneCallData.daily[5].weather[0].icon == "50n") {
            document.getElementById("weather-icon8").src = "icons/50n.png";
        }
        else
            document.getElementById("weather-icon8").src = "icons/unknown.png";
    });
}

//Pulling Air Pollution API
function airPollution(url) {
    fetch(url).then(
        currentAQI => currentAQI.json()
    ).then(aqiData => {
        console.log(aqiData);
        // console.log("AQI: "+ aqiData.list[0].main.aqi);
        if (aqiData.list[0].main.aqi == 1) {
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
