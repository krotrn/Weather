import { useCallback, useEffect, useState } from "react";
import { getWeatherForCity, getWeatherForCoordinates } from "../../api/Weather";
import { DataInterface } from "../../types/DataInterface";
import { useWeather } from "../../context/WeatherConf";
import { Default } from "./EmptyData";



const useFetchedData = () => {
    const { latitude, longitude, searchCity } = useWeather();
    const [data, setData] = useState<DataInterface>(Default); // Initialize with Default to wait for API response

    const fetchDataForCity = useCallback(async (city: string) => {
        try {
            const response = await getWeatherForCity(city);
            if (response) {
                setData(response);
            }
        } catch (error) {
            console.error(`Error fetching weather data for ${city}:`, error);
        }
    }, []);

    const fetchDataForCoordinates = useCallback(async () => {
        try {
            if (!latitude || !longitude) return fetchDataForCity("Delhi, India"); // Default to Delhi, India if no coordinates
            const response = await getWeatherForCoordinates(latitude, longitude);
            if (response) {
                setData(response);
            }
        } catch (error) {
            console.error("Error fetching weather data by coordinates:", error);
        }
    }, [latitude, longitude, fetchDataForCity]);

    useEffect(() => {
        if (latitude && longitude) {
            fetchDataForCoordinates();
        } else if (searchCity) {
            fetchDataForCity(searchCity);
        } else {
            fetchDataForCity("Delhi, India"); // Fetch weather for Delhi, India by default
        }
    }, [fetchDataForCity, fetchDataForCoordinates, latitude, longitude, searchCity]);

    return data;
};

export default useFetchedData;