const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}/weather?${query}&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch current weather data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const fetchForecast = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}/forecast?${query}&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};