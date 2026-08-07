import { useState, useEffect } from 'react';
import { getCoordinates, getWeather } from '../api/weatherApi';

export function useWeather(city) {
    const [location, setLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!city) {
            setLocation(null);
            setWeatherData(null);
            setError(null);
            return;
        }

        let cancelled = false;

        async function fetchWeather() {
            setLoading(true);
            setError(null);

            try {
                const loc = await getCoordinates(city);
                const weather = await getWeather(loc.latitude, loc.longitude);

                if (!cancelled) {
                    setLocation(loc);
                    setWeatherData(weather);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                    setLocation(null);
                    setWeatherData(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchWeather();

        return () => {
            cancelled = true;
        };
    }, [city]);

    return { location, weatherData, loading, error };
}