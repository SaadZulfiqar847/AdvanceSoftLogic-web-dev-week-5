const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getCoordinates(cityName) {
    const params = new URLSearchParams({
        name: cityName,
        count: 1,
        language: 'en',
        format: 'json'
    });

    const response = await fetch(`${GEOCODING_URL}?${params}`);

    if (!response.ok) {
        throw new Error('Something went wrong while searching for that city.');
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`No results found for "${cityName}".`);
    }

    const place = data.results[0];

    return {
        name: place.name,
        country: place.country,
        latitude: place.latitude,
        longitude: place.longitude
    };
}

export async function getWeather(latitude, longitude) {
    const params = new URLSearchParams({
        latitude,
        longitude,
        current: 'temperature_2m,wind_speed_10m,weather_code',
        daily: 'temperature_2m_max,temperature_2m_min,weather_code',
        timezone: 'auto'
    });

    const response = await fetch(`${WEATHER_URL}?${params}`);

    if (!response.ok) {
        throw new Error('Could not fetch weather data right now.');
    }

    return response.json();
}

export const WEATHER_CODES = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 61: 'Light rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Snow', 80: 'Rain showers', 95: 'Thunderstorm'
};

export const WEATHER_ICONS = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️',
    61: '🌦️', 63: '🌧️', 65: '🌧️',
    71: '❄️',
    80: '🌦️',
    95: '⛈️'
};