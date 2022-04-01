const weather = document.querySelector("#weather div:first-child");
const city = document.querySelector("#weather div:last-child");

const API_KEY = "9f7feb05b3873b42ad9b9178641c8060";

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = `현재 장소: ${data.name}`;
      weather.innerText = `현재 날씨: ${data.weather[0].main} 
       현재 온도: ${data.main.temp}`;
    });
}

function onGeoError() {
  alert("can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
