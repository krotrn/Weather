import { DataInterface } from "../../components/Default/DefaultData";
import conf from "../../conf/WeatherConf";
import memoizee from "memoizee"; // To cache results

const baseUrl: string = conf.apiUrl;
const apiKey: string = conf.apikey;  // Assuming the API key is stored in conf

/**
 * Internal function to fetch weather data from the API.
 * Accepts a query parameter that can be either a city name or coordinates.
 */
const fetchWeatherData = async (query: string): Promise<DataInterface | null> => {
    try {
        const response: Response = await fetch(`${baseUrl}${apiKey}&q=${query}&aqi=yes`);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }

        // Parse the JSON data
        const data: DataInterface = await response.json();
        

        // Ensure the data is valid before returning
        if (!data || !data.location || !data.current) {
            throw new Error("Invalid data format received from the weather API.");
        }

        return data;
    } catch (error) {
        console.error("Error in fetchWeatherData:", error);
        return null;  // Return null in case of failure
    }
};

/**
 * Fetch weather data for a city name. Memoized to avoid redundant network calls.
 */
export const getWeatherForCity = memoizee(async (city: string): Promise<DataInterface | null> => {
    if (!city) return null;
    return fetchWeatherData(city);
}, { promise: true, maxAge: 10 * 60 * 1000 });  // Cache result for 10 minutes

/**
 * Fetch weather data for specific latitude and longitude coordinates. Memoized.
 */
export const getWeatherForCoordinates = memoizee(async (latitude: number, longitude: number): Promise<DataInterface | null> => {
    if(isNaN(latitude) || isNaN(longitude)) return null; 
    const query = `${latitude},${longitude}`;
    return fetchWeatherData(query);
}, { promise: true, maxAge: 10 * 60 * 1000 });  // Cache result for 10 minutes

