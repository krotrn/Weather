import { useEffect, useState, useCallback } from 'react';
import { getWeatherForCoordinates, getWeatherForCity } from '../api/Weather/index';
import { useWeather } from '../context/WeatherConf';

const useUserLocation = () => {
    const { setData } = useWeather();
    const [error, setError] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [locationSuccess, setLocationSuccess] = useState<boolean>(false);

    {/* set Default Weather Data */}
    const fetchDefaultLocation = useCallback(async () => {
        try {
            const weatherData = await getWeatherForCity("Delhi, India");
            if (weatherData) {
                setData(weatherData); // Fallback to Delhi, India weather data
                setLocationSuccess(true);
            } else {
                setLocationSuccess(false);
                setError("Failed to fetch weather data for default location.");
            }
        } catch (fetchError) {
            console.error("Error fetching weather data for default location:", fetchError);
            setError("Error fetching weather data for default location.");
        } finally {
            setIsFetching(false);
        }
    }, [setData]);

    {/* set User Location's Weather */}
    const fetchLocation = useCallback(() => {
        setIsFetching(true);
        setError(null);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        const weatherData = await getWeatherForCoordinates(latitude, longitude);
                        if (weatherData) {
                            setData(weatherData);
                            setLocationSuccess(true);
                        } else {
                            setLocationSuccess(false);
                            setError("Failed to fetch weather data.");
                        }
                    } catch (fetchError) {
                        console.error("Error fetching weather data:", fetchError);
                        setError("Error fetching weather data.");
                    } finally {
                        setIsFetching(false);
                    }
                },
                (err) => {
                    console.error("Error getting location:", err);
                    setLocationSuccess(false);
                    switch (err.code) {
                        case err.PERMISSION_DENIED:
                            setError("User denied the request for Geolocation.");
                            break;
                        case err.POSITION_UNAVAILABLE:
                            setError("Location information is unavailable.");
                            break;
                        case err.TIMEOUT:
                            setError("The request to get user location timed out.");
                            break;
                        default:
                            setError("An unknown error occurred.");
                            break;
                    }
                    fetchDefaultLocation();
                    setIsFetching(false);
                }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
            setError("Geolocation is not supported by this browser.");
            fetchDefaultLocation();
            setIsFetching(false);
        }
    }, [fetchDefaultLocation, setData]);

    useEffect(() => {
        fetchLocation();
    }, [fetchLocation]);

    return {
        fetchLocation,
        error,
        isFetching,
        locationSuccess,
    };
};

export default useUserLocation;
