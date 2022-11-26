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
    console.log("invalid city");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      const container = document.querySelector(".result");
      container.style.display = "block";
      container.style.animation = "fadeIn 1s ease-out forwards";
      const weatherInfo = document.querySelector(".weather-info");
      const temperature = document.getElementById("temperature");
      const humidity = document.querySelector(".humidity span");
      const wind = document.querySelector(".wind span");
      let statImg = document.querySelector("#status-img");
      let status = document.querySelector("#status-container");

      if (json.cod === "404") {
        statImg.src = "images/404.png";
        weatherInfo.style.display = "none";
        status.innerHTML = "";
        return;
      } else if (json.cod[0] === "4") {
        console.log("an error happened Please try again");
        weatherInfo.style.display = "none";
        status.innerHTML = "";
        return;
      }

      document.querySelector("main .container").style.boxShadow =
        "0 0 1000px -2px rgba(0, 0, 0, 0.7)";
      weatherInfo.style.display = "flex";
      console.log(json);
      console.log("--- getting weather ---");
      let description = json.weather[0].main;
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

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});
