import { createContext, useState, useCallback, useEffect } from "react";
import { getWeatherForCity, getWeatherForCoordinates } from "../api/Weather/index";
import useFetchedData, { DataInterface, Default } from "../components/Default/DefaultData";

// Define the shape of the context
export interface WeatherContextType {
  data: DataInterface;
  searchCity: string;
  setSearchCity: React.Dispatch<React.SetStateAction<string>>;
  fetchDataForCity: () => Promise<void>;
  fetchDataForCoordinates: () => Promise<void>;
  setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
  setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
  latitude: number | null;
  longitude: number | null;
  setData: React.Dispatch<React.SetStateAction<DataInterface>>;
}

// Create default values for the context
export const WeatherContext = createContext<WeatherContextType>({
  data: Default,
  searchCity: "",
  setSearchCity: () => {},
  fetchDataForCity: async () => {},
  fetchDataForCoordinates: async () => {},
  setLatitude: () => {},
  setLongitude: () => { },
  setData: () => {},
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
        console.error(null); // Clear any previous errors
      } else {
        console.error("No data returned from the weather API.");
      }
    } catch (error) {
      console.error("Error fetching weather data for the city:", error);
    }
  }, [searchCity]);

  // Function to fetch weather data for the user's current coordinates
  const fetchDataForCoordinates = useCallback(async () => {
    if (latitude === null || longitude === null) return; // Ensure coordinates are available

    try {
      const response = await getWeatherForCoordinates(latitude, longitude);
      if (response) {
        setData(response);
        console.error(null); // Clear any previous errors
      } else {
        console.error("No data returned from the weather API.");
      }
    } catch (error) {
      console.error("Error fetching weather data for the coordinates:", error);
    }
  }, [latitude, longitude]);

  // Automatically fetch weather data when a city is entered
  useEffect(() => {
    if (searchCity) {
      fetchDataForCity();
    }
  }, [searchCity, fetchDataForCity]);

  // Automatically fetch weather data when coordinates are available
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
        setData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
