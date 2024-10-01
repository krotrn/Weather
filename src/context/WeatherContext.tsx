import { createContext, useState, useEffect, useCallback } from "react";
import { getWeatherForCity, getWeatherForCoordinates } from "../api/Weather/index";
import useFetchedData, { DataInterface, Default } from "../components/Default/DefaultData";

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
  fetchDataForCoordinates: async () => {},
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
      console.error("Error fetching weather data for the city.", error);
    }
  }, [searchCity]);

  const fetchDataForCoordinates = useCallback(async () => {
    if (latitude === null || longitude === null) return; // Check if coordinates are available

    try {
      const response = await getWeatherForCoordinates(latitude, longitude);
      if (response) {
        setData(response);
        console.error(null); // Clear any previous errors
      } else {
        console.error("No data returned from the weather API.");
      }
    } catch (error) {
      console.error("Error fetching weather data for the coordinates.", error);
    }
  }, [latitude, longitude]);

  // Auto-fetch when searchCity changes
  useEffect(() => {
    if (searchCity) {
      fetchDataForCity();
    }
  }, [searchCity, fetchDataForCity]);

  // Auto-fetch when coordinates change
  useEffect(() => {
    if (latitude && longitude) {
      fetchDataForCoordinates();
    }
  }, [latitude, longitude, fetchDataForCoordinates]);

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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
