
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { WEATHER_ICONS } from '../api/weatherApi';
import { useState, useEffect } from 'react';
import { getWeather } from '../api/weatherApi';

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const [weatherByCity, setWeatherByCity] = useState({});
  const [loading, setLoading] = useState(true);

  // Favorites only stores { name, country, latitude, longitude } —
  // we still need a fresh weather reading for each one to show
  // icon/temp here, so we fetch just the weather (not geocoding again,
  // since we already have coordinates saved).
  useEffect(() => {
    let cancelled = false;

    async function loadWeatherForFavorites() {
      setLoading(true);

      const entries = await Promise.all(
        favorites.map(async (city) => {
          try {
            const weather = await getWeather(city.latitude, city.longitude);
            return [`${city.name}-${city.country}`, weather];
          } catch {
            return [`${city.name}-${city.country}`, null];
          }
        })
      );

      if (!cancelled) {
        setWeatherByCity(Object.fromEntries(entries));
        setLoading(false);
      }
    }

    if (favorites.length > 0) {
      loadWeatherForFavorites();
    } else {
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <div className="page-status">
        <p>No favorites yet.</p>
        <Link to="/cities">Browse cities to add some</Link>
      </div>
    );
  }

  if (loading) {
    return <p className="page-status">Loading favorites...</p>;
  }

  return (
    <div className="cities-page">
      <h1>Favorites</h1>
      <div className="city-grid">
        {favorites.map((city) => {
          const key = `${city.name}-${city.country}`;
          const weather = weatherByCity[key];

          return (
            <div className="city-card" key={key}>
              <button
                className="star-btn favorited"
                onClick={() => removeFavorite(city)}
                aria-label={`Remove ${city.name} from favorites`}
              >
                ★
              </button>

              <Link to={`/cities/${encodeURIComponent(city.name)}`} className="city-card-link">
                <span className="city-icon">
                  {weather ? (WEATHER_ICONS[weather.current.weather_code] || '🌡️') : '—'}
                </span>
                <p className="city-name">{city.name}</p>
                <p className="city-temp">
                  {weather ? `${Math.round(weather.current.temperature_2m)}°C` : 'N/A'}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;