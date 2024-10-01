import { createContext, useState, useEffect, useCallback } from "react";
import { getWeatherForCity, getWeatherForCoordinates } from "../api/Weather/index";
import useFetchedData , { DataInterface, Default } from "../components/Default/DefaultData";

export interface WeatherContextType {
    data: DataInterface;
    searchCity: string;
    setSearchCity: React.Dispatch<React.SetStateAction<string>>;
    fetchDataForCity: () => Promise<void>;
    setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
    setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
    fetchDataForCoordinates: () => Promise<void>;
    latitude: number | null;
    longitude: number | null;
}

export const WeatherContext = createContext<WeatherContextType>({
    data: Default,
    searchCity: "",
    setSearchCity: () => {},
    fetchDataForCity: async () => {},
    setLatitude: () => {},
    setLongitude: () => {},
    fetchDataForCoordinates: async () => { },
    latitude: null,
    longitude: null,
});

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
    const DefaultData: DataInterface = useFetchedData();
    const [data, setData] = useState<DataInterface>(DefaultData);
    const [searchCity, setSearchCity] = useState<string>("");
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

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

    useEffect(() => {
        fetchDataForCity();
    }, [searchCity, fetchDataForCity]);

    useEffect(() => {
        fetchDataForCoordinates();
    }, [latitude, longitude, fetchDataForCoordinates]);

    return (
        <WeatherContext.Provider value={{ data, searchCity, setSearchCity, fetchDataForCity, setLatitude, setLongitude, fetchDataForCoordinates, latitude, longitude}}>
            {children}
        </WeatherContext.Provider>
    );
};
