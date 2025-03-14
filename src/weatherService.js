// src/services/weatherService.js
import axios from 'axios';

const API_KEY = 'fe1e098bd3a0d210cbd624269dfdb236';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherData(city) {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'en'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw error;
  }
}

export async function getUVIndex(lat, lon) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return response.data.value;
  } catch (error) {
    console.error('Failed to fetch UV index:', error);
    const hour = new Date().getHours();
    if (hour >= 10 && hour <= 16) {
      return 7; 
    } else if (hour >= 7 && hour <= 19) {
      return 3; 
    }
    return 0; 
  }
}

