const apiKey = "ВАШ_API_КЛЮЧ"; // ← ВСТАВЬТЕ СЮДА СВОЙ API-КЛЮЧ
const daysOfWeek = [
  "Понедельник", "Вторник", "Среда",
  "Четверг", "Пятница", "Суббота", "Воскресенье"
];

async function fetchWeather() {
  const lat = 49.99;  // Харьков
  const lon = 36.23;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&lang=ru&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Ошибка загрузки данных: ${res.status}`);
  return await res.json();
}

async function init() {
  const weekDiv = document.getElementById('week');
  weekDiv.innerHTML = "Загрузка...";
  try {
    const data = await fetchWeather();
    weekDiv.innerHTML = "";

    data.daily.slice(0, 7).forEach((day, i) => {
      const date = new Date(day.dt * 1000);
      const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
      const dayName = daysOfWeek[dayIndex];
      const formattedDate = date.toLocaleDateString('ru-RU');
      const desc = `${Math.round(day.temp.day)}°C, ${day.weather[0].description}`;
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';
      dayDiv.innerHTML = `<strong>${dayName}</strong><br>${formattedDate}`;
      dayDiv.onclick = () => showDetails(dayName, formattedDate, desc);
      weekDiv.appendChild(dayDiv);
    });
  } catch (e) {
    console.error(e);
    weekDiv.innerHTML = "Не удалось загрузить прогноз погоды.";
  }
}

function showDetails(dayName, date, weather) {
  document.getElementById('week').style.display = 'none';
  document.getElementById('details').style.display = 'block';
  document.getElementById('day-name').textContent = `${dayName}, ${date}`;
  document.getElementById('weather-text').textContent = weather;
}

function showWeek() {
  document.getElementById('details').style.display = 'none';
  document.getElementById('week').style.display = 'flex';
}

init();