import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CITY_LIST } from '../data/cities';
import { getCoordinates, getWeather, WEATHER_ICONS } from '../api/weatherApi';
import { useFavorites } from '../context/FavoritesContext';

function Cities() {
  const [cityWeather, setCityWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    let cancelled = false;

    async function loadAllCities() {
      setLoading(true);
      setError(null);

      try {
        // Promise.all runs every city's fetch concurrently instead of
        // one-by-one, which matters here since we're fetching 25 cities —
        // sequential awaits would take 25x as long.
        const results = await Promise.all(
          CITY_LIST.map(async (cityName) => {
            const location = await getCoordinates(cityName);
            const weather = await getWeather(location.latitude, location.longitude);
            return { location, weather };
          })
        );

        if (!cancelled) {
          setCityWeather(results);
        }
      } catch (err) {
       console.error('Cities fetch failed:', err);
        if (!cancelled) {
          setError('Could not load city weather data right now.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAllCities();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleToggleFavorite(location) {
    if (isFavorite(location)) {
      removeFavorite(location);
    } else {
      addFavorite(location);
    }
  }

  if (loading) {
    return <p className="page-status">Loading cities...</p>;
  }

  if (error) {
    return <p className="page-status error-message">{error}</p>;
  }

  return (
    <div className="cities-page">
      <h1>Cities</h1>
      <div className="city-grid">
        {cityWeather.map(({ location, weather }) => (
          <div className="city-card" key={`${location.name}-${location.country}`}>
            <button
              className={`star-btn ${isFavorite(location) ? 'favorited' : ''}`}
              onClick={() => handleToggleFavorite(location)}
              aria-label={isFavorite(location) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite(location) ? '★' : '☆'}
            </button>

            <Link to={`/cities/${encodeURIComponent(location.name)}`} className="city-card-link">
              <span className="city-icon">{WEATHER_ICONS[weather.current.weather_code] || '🌡️'}</span>
              <p className="city-name">{location.name}</p>
              <p className="city-temp">{Math.round(weather.current.temperature_2m)}°C</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cities;