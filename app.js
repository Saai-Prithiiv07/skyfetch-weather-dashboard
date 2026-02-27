const apiKey = "9a0ad39e78ddadef67745a682a13337e";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  fetchWeather(city);
});

async function fetchWeather(city) {
  errorEl.innerText = "";

  if (!city) {
    errorEl.innerText = "Please enter a city name.";
    return;
  }

  try {
    loadingEl.style.display = "block";

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = response.data;

    document.getElementById("city").innerText = data.name;
    document.getElementById("temperature").innerText =
      `Temperature: ${data.main.temp}°C`;
    document.getElementById("description").innerText =
      data.weather[0].description;
    document.getElementById("icon").src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  } catch (error) {
    errorEl.innerText = "City not found. Please enter a valid city name.";
  } finally {
    loadingEl.style.display = "none";
  }
}