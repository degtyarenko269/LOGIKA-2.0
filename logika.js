const apiKey = "998f1de14d102a3ecb424a40e38f0608";

const daysOfWeek = [
  "Понеділок", "Вівторок", "Середа",
  "Четвер", "П’ятниця", "Субота", "Неділя"
];

function generateFiveDayForecastWithGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const cityName = await getCityName(lat, lon);
        document.getElementById("city-name").textContent = Ваше місто: ${cityName};

        const weatherData = await getForecastWeather(lat, lon);
        if (!weatherData) {
          document.getElementById("week").innerHTML = "<p>Не вдалося завантажити прогноз.</p>";
          return;
        }

        renderForecast(weatherData);
      },
      (error) => {
        console.error("Помилка геолокації:", error);
        document.getElementById("week").innerHTML = "<p>Не вдалося отримати геолокацію.</p>";
        document.getElementById("city-name").textContent = "Місто не визначено";
      }
    );
  } else {
    document.getElementById("city-name").textContent = "Браузер не підтримує геолокацію";
  }
}

async function getForecastWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=uk&appid=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.list) throw new Error("Невірні дані з API");
    const dailyForecasts = [];
    const seenDates = new Set();

    for (let item of data.list) {
      const date = item.dt_txt.split(" ")[0];
      if (!seenDates.has(date)) {
        seenDates.add(date);
        dailyForecasts.push(item);
      }
      if (dailyForecasts.length === 5) break;
    }

    return dailyForecasts;
  } catch (e) {
    console.error("Помилка при отриманні погоди:", e.message);
    return null;
  }
}

async function getCityName(lat, lon) {
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[0]?.name || "Невідоме місто";
  } catch (e) {
    return "Невідоме місто";
  }
}

function renderForecast(forecastArray) {
  const weekDiv = document.getElementById("week");
  weekDiv.innerHTML = "";

  forecastArray.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayIndex = date.getDay(); // 0 — неділя, 6 — субота
    const dayName = daysOfWeek[dayIndex === 0 ? 6 : dayIndex - 1];
    const formattedDate = date.toLocaleDateString("uk-UA");

    const temp = Math.round(item.main.temp);
    const description = item.weather[0].description;
    const weatherText = ${description}, ${temp}°C;

    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.innerHTML = <strong>${dayName}</strong><br>${formattedDate};
    dayDiv.onclick = () => showDetails(dayName, formattedDate, weatherText);

    weekDiv.appendChild(dayDiv);
  });
}

function showDetails(dayName, date, weather) {
  document.getElementById("week").style.display = "none";
  document.getElementById("details").style.display = "block";
  document.getElementById("day-name").textContent = ${dayName}, ${date};
  document.getElementById("weather-text").textContent = weather;
}

function showWeek() {
  document.getElementById("details").style.display = "none";
  document.getElementById("week").style.display = "flex";
}

generateFiveDayForecastWithGeolocation();