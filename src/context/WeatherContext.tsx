import { createContext, useState, useCallback } from "react";
import { getWeatherForCity, getWeatherForCoordinates } from "../api/Weather/index";
import useFetchedData from "../components/Default/DefaultData";
import { DataInterface } from "../types/DataInterface";
import { WeatherContextType } from '../types/WeatherContextType.ts'
import { Default } from "../components/Default/EmptyData.ts";

// Create default values for the context
export const WeatherContext = createContext<WeatherContextType>({
  data: Default,
  searchCity: "",
  DefaultData: Default,
  setSearchCity: () => { },
  fetchDataForCity: async () => { },
  fetchDataForCoordinates: async () => { },
  setLatitude: () => { },
  setLongitude: () => { },
  setData: () => { },
  latitude: null,
  longitude: null,
});

// The provider component to wrap around the parts of the app needing weather data
export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const DefaultData: DataInterface = useFetchedData();
  const [data, setData] = useState<DataInterface>(DefaultData);
  const [searchCity, setSearchCity] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // Function to fetch weather data for a city name
  const fetchDataForCity = useCallback(async () => {
    if (!searchCity) return;

    try {
      const response = await getWeatherForCity(searchCity);
      if (response) {
        setData(response);
        console.error(null);
      } else {
        console.error("No data returned from the weather API.");
      }
    } catch (error) {
      console.error("Error fetching weather data for the city:", error);
    }
  }, [searchCity]);

  // Function to fetch weather data for the user's current coordinates
  const fetchDataForCoordinates = useCallback(async () => {
    if (latitude === null || longitude === null) return;

    try {
      const response = await getWeatherForCoordinates(latitude, longitude);
      if (response) {
        setData(response);
        console.error(null);
      } else {
        console.error("No data returned from the weather API.");
      }
    } catch (error) {
      console.error("Error fetching weather data for the coordinates:", error);
    }
  }, [latitude, longitude]);

  return (
    <WeatherContext.Provider
      value={{
        data,
        searchCity,
        setSearchCity,
        fetchDataForCity,
        setLatitude,
        setLongitude,
        fetchDataForCoordinates,
        latitude,
        longitude,
        setData,
        DefaultData
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
