const daysOfWeek = [
  "Понедельник", "Вторник", "Среда",
  "Четверг", "Пятница", "Суббота", "Воскресенье"
];

const weatherDescriptions = [
  "☀️ Солнечно, +25°C",
  "🌤 Переменная облачность, +22°C",
  "🌧 Дождь, +18°C",
  "🌩 Гроза, +20°C",
  "☁️ Пасмурно, +19°C",
  "🌬 Ветрено, +21°C",
  "❄️ Снег, 0°C"
];

const today = new Date();

function generateWeek() {
  const weekDiv = document.getElementById('week');

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date();
    dayDate.setDate(today.getDate() + i);

    const dayIndex = dayDate.getDay() === 0 ? 6 : dayDate.getDay() - 1;
    const dayName = daysOfWeek[dayIndex];
    const formattedDate = dayDate.toLocaleDateString('ru-RU');

    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.innerHTML = `<strong>${dayName}</strong><br>${formattedDate}`;
    dayDiv.onclick = () => showDetails(dayName, formattedDate, weatherDescriptions[dayIndex]);

    weekDiv.appendChild(dayDiv);
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

generateWeek();