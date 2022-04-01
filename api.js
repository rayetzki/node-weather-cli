import { fetch } from 'undici';
import { printError } from './logger.js';

async function getWeather(city) {
  const apiUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
  const token = process.env.TOKEN;
  apiUrl.searchParams.set('q', city);
  apiUrl.searchParams.set('appid', token);
  apiUrl.searchParams.set('lang', 'ru');
  apiUrl.searchParams.set('units', 'metrics');

  try {
    const weather = await fetch(apiUrl).then(response => response.json());

    if (weather.cod !== 200) {
      if (weather.cod === 401) {
        printError('Неверный токен');
      } else if (weather.cod === 404) {
        printError('Неверный город')
      };
    };

    return weather;
  } catch (error) {
    if (error instanceof Error) {
      printError(error.message)
    } else throw error;
  }
}

function getIcon(icon) {
  switch (icon.at(-1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
  }  
} 

export { getWeather, getIcon };