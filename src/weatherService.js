// src/services/weatherService.js
import axios from 'axios';

const API_KEY = '71c5f9f96e0b44c2942125302251403';
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getWeatherData(city) {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: city,
        aqi: 'no'
      }
    });
    
    const data = response.data;
    return {
      temperature: data.current.temp_c,
      uv: data.current.uv,
      localTime: data.location.localtime,
      condition: data.current.condition.text,
      icon: data.current.condition.icon
    };
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw error;
  }
}

