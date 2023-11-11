let weather = {
  apiKey: "6be7c910c4aafa2c9f52692955e11f22",
  fetchWeather: function (city) {
    // Fetch weather data from the OpenWeatherMap API
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          // Handle the case when no weather data is found
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        // Optionally display an error message to the user
        alert("Error fetching weather data. Please try again.");
      });
  },
  displayWeather: function (data) {
    // Extract relevant data from the API response
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    // Update the DOM elements with the weather information
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");

    // Set the background image of the body using Unsplash API with the city name
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
  },
  search: function () {
    // Triggered when the user searches for a city
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("karachi");
