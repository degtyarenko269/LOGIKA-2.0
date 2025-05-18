const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
const today = new Date();

function generateWeek() {
    const weekDiv = document.getElementById('week');

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date();
        dayDate.setDate(today.getDate() + i);
        const dayName = daysOfWeek[dayDate.getDay() === 0 ? 6 : dayDate.getDay() - 1];

        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerHTML = `<strong>${dayName}</strong><br>${dayDate.toLocaleDateString()}`;
        dayDiv.onclick = () => openWeatherPage(dayDate);
        weekDiv.appendChild(dayDiv);
    }
}

function openWeatherPage(date) {
    // Здесь открытие второй страницы (заглушка)
    window.location.href = `weather.html?date=${date.toISOString()}`;
}

generateWeek();