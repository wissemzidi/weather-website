"use strict";

const searchBtn = document.querySelector("#search_btn");
window.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
searchBtn.addEventListener("click", () => {
  console.log("....");
  const APIKey = "7b05c9bceece29a17e816f92cac7cda8";
  let city = document.querySelector("#city").value;
  if (city === null || city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      const container = document.querySelector(".result");
      console.log(container);
      container.style.display = "block";
      container.style.animation = "fadeIn 1s ease-out forwards";
      const weatherInfo = document.querySelector(".weather-info");
      const temperature = document.getElementById("temperature");
      const humidity = document.querySelector(".humidity span");
      const wind = document.querySelector(".wind span");
      let statImg = document.getElementById("status-img");

      if (json.cod === "404" || json.cod[0] === "4") {
        document.body.style.backgroundColor = "rgba(75, 145, 192, 0.9)";
        hide_visibility(weatherInfo, temperature);
        statImg.src = "images/404.png";
        return;
      }

      reset_visibility(weatherInfo, temperature);
      document.body.style.backgroundColor = "rgba(75, 145, 192, 0.8)";
      weatherInfo.style.display = "flex";
      let description = json.weather[0].main;
      set_img(statImg, description);
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      console.log("all good");
    });
});

function set_img(statImg, description) {
  switch (description) {
    case "Clear":
      statImg.src = "images/clear.png";
      break;
    case "Rain":
      statImg.src = "images/rain.png";
      break;
    case "Snow":
      statImg.src = "images/snow.png";
      break;
    case "Clouds":
      statImg.src = "images/cloud.png";
      break;
    case "Haze":
      statImg.src = "images/mist.png";
      break;
    case "Mist":
      statImg.src = "images/mist.png";
      break;
    default:
      statImg.src = "images/clear.png";
  }
}

function hide_visibility(a, b) {
  a.style.visibility = "hidden";
  b.style.visibility = "hidden";
}

function reset_visibility(a, b) {
  a.style.visibility = "visible";
  b.style.visibility = "visible";
}
