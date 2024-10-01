import { createContext, useState, useEffect, useCallback } from "react";
import { getWeatherForCity, getWeatherForCoordinates } from "../api/Weather/index";
import { DataInterface, DefaultData } from "../components/Default/DefaultData";

export interface WeatherContextType {
    data: DataInterface;
    searchCity: string;
    setSearchCity: React.Dispatch<React.SetStateAction<string>>;
    fetchDataForCity: () => Promise<void>;
    setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
    setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
    fetchDataForCoordinates: () => Promise<void>;
}

export const WeatherContext = createContext<WeatherContextType>({
    data: DefaultData,
    searchCity: "",
    setSearchCity: () => {},
    fetchDataForCity: async () => {},
    setLatitude: () => {},
    setLongitude: () => {},
    fetchDataForCoordinates: async () => {},
});

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<DataInterface>(DefaultData);
    const [searchCity, setSearchCity] = useState<string>("London");
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    /**
     * Fetch weather data based on current city
     */
    const fetchDataForCity = useCallback(async () => {
        try {
            if (!searchCity) return;

            const response = await getWeatherForCity(searchCity);
            if (response) {
                setData(response);
            } else {
                console.error("No data returned from the weather API.");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }, [searchCity]);

    /**
     * Fetch weather data based on latitude and longitude
     */
    const fetchDataForCoordinates = useCallback(async () => {
        try {
            if (latitude === null || longitude === null) return;

            const response = await getWeatherForCoordinates(latitude, longitude);
            if (response) {
                setData(response);
            } else {
                console.error("No data returned from the weather API.");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }, [latitude, longitude]);

    // Fetch data when the city changes
    useEffect(() => {
        fetchDataForCity();
    }, [searchCity, fetchDataForCity]);

    // Fetch data when the coordinates change
    useEffect(() => {
        fetchDataForCoordinates();
    }, [latitude, longitude, fetchDataForCoordinates]);

    return (
        <WeatherContext.Provider value={{ data, searchCity, setSearchCity, fetchDataForCity, setLatitude, setLongitude, fetchDataForCoordinates }}>
            {children}
        </WeatherContext.Provider>
    );
};
