export const getWeatherIcon = (weatherCode) => {
  // Гроза (200–299)
  if (weatherCode >= 200 && weatherCode < 300) return '⛈️';
  // Морось/Дождь (300–599)
  if (weatherCode >= 300 && weatherCode < 600) return '🌧️';
  // Снег (600–699)
  if (weatherCode >= 600 && weatherCode < 700) return '❄️';
  // Туман/Мгла (700–799)
  if (weatherCode >= 700 && weatherCode < 800) return '🌫️';
  // Ясно (800)
  if (weatherCode === 800) return '☀️';
  // Облачно (801–804)
  if (weatherCode > 800 && weatherCode <= 804) return '☁️';
  // По умолчанию
  return '🤷‍♂️';
};