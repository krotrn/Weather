import { DataInterface } from "../../types/DataInterface";
import conf from "../../conf/WeatherConf";
import memoizee from "memoizee";
import useFetchedData from "../../components/Default/DefaultData";

const baseUrl: string = conf.apiUrl;
const apiKey: string = conf.apikey;  

const fetchWeatherData = async (query: string): Promise<DataInterface | null> => {
    try {
        const response: Response = await fetch(`${baseUrl}${apiKey}&q=${encodeURIComponent(query)}&aqi=yes`);

        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.status} - ${response.statusText}`);
        }

        const data: DataInterface = await response.json();

        if (!data || !data.location || !data.current) {
            throw new Error("Invalid data structure received from the weather API.");
        }

        return data;
    } catch (error) {
        console.error("Error in fetchWeatherData:", error);
        throw error; 
    }
};

export const getWeatherForCity = memoizee(async (city: string): Promise<DataInterface | null> => {
    if (!city) return useFetchedData();
    return fetchWeatherData(city);
}, { promise: true, maxAge: 10 * 60 * 1000 });  

export const getWeatherForCoordinates = memoizee(async (latitude: number, longitude: number): Promise<DataInterface | null> => {
    if (isNaN(latitude) || isNaN(longitude)) {
        console.warn("Invalid coordinates provided.");
        return useFetchedData();
    }
    const query = `${latitude},${longitude}`;
    return fetchWeatherData(query);
}, { promise: true, maxAge: 10 * 60 * 1000 });  

