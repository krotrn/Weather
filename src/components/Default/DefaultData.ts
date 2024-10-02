import { useCallback, useContext, useEffect, useState } from "react";
import { getWeatherForCity, getWeatherForCoordinates } from "../../api/Weather";
import { WeatherContext } from "../../context/WeatherContext";

export interface DataInterface {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: number;
        localtime: string;
    };
    current: {
        last_updated_epoch: number;
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
            text: string;
            icon: string;
            code: number;
        };
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        precip_mm: number;
        precip_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        windchill_c: number;
        windchill_f: number;
        heatindex_c: number;
        heatindex_f: number;
        dewpoint_c: number;
        dewpoint_f: number;
        vis_km: number;
        vis_miles: number;
        uv: number;
        gust_mph: number;
        gust_kph: number;
        air_quality: {
            co: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            'us-epa-index': number;
            'gb-defra-index': number;
        };
    };
}

// Default structure but no actual data. Will be replaced dynamically when fetched.
export const Default: DataInterface = {
    location: {
        name: "--",
        region: "--",
        country: "--",
        lat: 0,
        lon: 0,
        tz_id: "--",
        localtime_epoch: 0,
        localtime: "--",
    },
    current: {
        last_updated_epoch: 0,
        last_updated: "--",
        temp_c: 0,
        temp_f: 0,
        is_day: 0,
        condition: {
            text: "--",
            icon: "",
            code: 0,
        },
        wind_mph: 0,
        wind_kph: 0,
        wind_degree: 0,
        wind_dir: "--",
        pressure_mb: 0,
        pressure_in: 0,
        precip_mm: 0,
        precip_in: 0,
        humidity: 0,
        cloud: 0,
        feelslike_c: 0,
        feelslike_f: 0,
        windchill_c: 0,
        windchill_f: 0,
        heatindex_c: 0,
        heatindex_f: 0,
        dewpoint_c: 0,
        dewpoint_f: 0,
        vis_km: 0,
        vis_miles: 0,
        uv: 0,
        gust_mph: 0,
        gust_kph: 0,
        air_quality: {
            co: 0,
            no2: 0,
            o3: 0,
            so2: 0,
            pm2_5: 0,
            pm10: 0,
            'us-epa-index': 0,
            'gb-defra-index': 0,
        },
    },
};

const useFetchedData = () => {
    const { latitude, longitude, searchCity } = useContext(WeatherContext);
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