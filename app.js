function WeatherApp() {
  this.apiKey = "YOUR_API9a0ad39e78ddadef67745a682a13337e_KEY";

  this.cityInput = document.getElementById("cityInput");
  this.searchBtn = document.getElementById("searchBtn");
  this.errorEl = document.getElementById("error");

  this.searchBtn.addEventListener(
    "click",
    this.handleSearch.bind(this)
  );
}

/* Handle Search */
WeatherApp.prototype.handleSearch = function () {
  const city = this.cityInput.value.trim();
  this.errorEl.innerText = "";

  if (!city) {
    this.errorEl.innerText = "Please enter a city name.";
    return;
  }

  this.fetchWeatherData(city);
};

/* Fetch Current + Forecast Together */
WeatherApp.prototype.fetchWeatherData = async function (city) {
  try {
    const currentURL =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;

    const forecastURL =
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`;

    const [currentRes, forecastRes] = await Promise.all([
      axios.get(currentURL),
      axios.get(forecastURL)
    ]);

    this.displayCurrentWeather(currentRes.data);
    this.displayForecast(forecastRes.data);

  } catch (error) {
    this.errorEl.innerText = "City not found. Please try again.";
  }
};

/* Display Current Weather */
WeatherApp.prototype.displayCurrentWeather = function (data) {
  document.getElementById("city").innerText = data.name;
  document.getElementById("temperature").innerText =
    `Temperature: ${data.main.temp}°C`;
  document.getElementById("description").innerText =
    data.weather[0].description;
  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
};

/* Display 5-Day Forecast */
WeatherApp.prototype.displayForecast = function (data) {
  const forecastEl = document.getElementById("forecast");
  forecastEl.innerHTML = "";

  const dailyForecast = data.list.filter((item, index) => index % 8 === 0);

  dailyForecast.forEach(day => {
    const card = document.createElement("div");
    card.className = "forecast-card";

    card.innerHTML = `
      <h4>${new Date(day.dt_txt).toDateString()}</h4>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
      <p>${day.main.temp}°C</p>
      <p>${day.weather[0].description}</p>
    `;

    forecastEl.appendChild(card);
  });
};

/* Initialize App */
new WeatherApp();