import { WEATHER_CODES, WEATHER_ICONS } from '../api/weatherApi';
import { useFavorites } from '../context/FavoritesContext';

function WeatherResult({ location, weatherData, unit, onToggleUnit }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const rawTemp = weatherData.current.temperature_2m;
  const displayTemp = unit === 'celsius' ? Math.round(rawTemp) : celsiusToFahrenheit(rawTemp);
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';
  const weatherCode = weatherData.current.weather_code;
  const favorited = isFavorite(location);

  function handleToggleFavorite() {
    if (favorited) {
      removeFavorite(location);
    } else {
      addFavorite(location);
    }
  }

  return (
    <section className="weather-result">
      <div className="weather-result-top">
        <button className="unit-toggle" onClick={onToggleUnit}>
          Switch to {unit === 'celsius' ? '°F' : '°C'}
        </button>
        <button
          className={`star-btn large ${favorited ? 'favorited' : ''}`}
          onClick={handleToggleFavorite}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorited ? '★' : '☆'}
        </button>
      </div>

      <span className="weather-icon">{WEATHER_ICONS[weatherCode] || '🌡️'}</span>
      <h2>{location.name}, {location.country}</h2>
      <p className="temperature-readout">{displayTemp}{unitSymbol}</p>
      <p className="conditions-label">{WEATHER_CODES[weatherCode] || 'Unknown'}</p>
      <p className="wind-readout">Wind: {weatherData.current.wind_speed_10m} km/h</p>
    </section>
  );
}

function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

export default WeatherResult;