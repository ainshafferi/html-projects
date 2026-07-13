const apiKey = "77d40b4313fd423c5521dbcbfee3cb37";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherBg = document.querySelector(".card");

const http = new XMLHttpRequest();
const result = document.querySelector("#output")

document.querySelector("#locationBtn").addEventListener(
    "click", () => {
        findMyCoordinates()
    }
)

function findMyCoordinates() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition
            ((position) => {
                const bdcAPI = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
                getAPI(bdcAPI)
            })
    } else {
        alert("not supported")
    }
}

async function getAPI(bdcAPI) {
    const response = await fetch(bdcAPI);
    const results = await response.json();

    console.log(results.city);
    checkWeather(results.city)
}

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        weatherIcon.src = `images/${data.weather[0].main}.png`;

        if (data.weather[0].main == "Clouds") {
            weatherBg.style.background = "linear-gradient(135deg, #757F9A, #D7DDE8)";
        }
        else if (data.weather[0].main == "Clear") {
            weatherBg.style.background = "linear-gradient(135deg, #56CCF2, #2F80ED)";
        }
        else if (data.weather[0].main == "Rain") {
            weatherBg.style.background = "linear-gradient(135deg, #232526, #414345)";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherBg.style.background = "linear-gradient(135deg, #4B79A1, #283E51)";
        }
        else if (data.weather[0].main == "Mist") {
            weatherBg.style.background = "linear-gradient(135deg, #BDC3C7, #2C3E50)";
        }
        else if (data.weather[0].main == "Snow") {
            weatherBg.style.background = "linear-gradient(135deg, #E6DADA, #274046)";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }


}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

