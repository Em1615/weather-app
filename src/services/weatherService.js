import { OPENWEATHER_API_KEY } from '@env';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=ru`
    );
    
    if (!response.ok) {
      throw new Error('Город не найден');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
};