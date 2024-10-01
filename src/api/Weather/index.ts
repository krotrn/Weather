import { DataInterface } from "../../components/Default/DefaultData";
import conf from "../../conf/WeatherConf";
import memoizee from "memoizee"; 

const baseUrl: string = conf.apiUrl;
const apiKey: string = conf.apikey;  


const fetchWeatherData = async (query: string): Promise<DataInterface | null | undefined> => {
    try {
        const response: Response = await fetch(`${baseUrl}${apiKey}&q=${query}&aqi=yes`);
        console.log(response);
        

        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }

        const data: DataInterface = await response.json();
        

        if (!data || !data.location || !data.current) {
            throw new Error("Invalid data format received from the weather API.");
        }

        return data;
    } catch (error) {
        console.error("Error in fetchWeatherData:", error);
    }
};

export const getWeatherForCity = memoizee(async (city: string): Promise<DataInterface | null | undefined> => {
    if (!city) return null;
    return fetchWeatherData(city);
}, { promise: true, maxAge: 10 * 60 * 1000 });  

export const getWeatherForCoordinates = memoizee(async (latitude: number, longitude: number): Promise<DataInterface | null | undefined> => {
    if(isNaN(latitude) || isNaN(longitude)) return null; 
    const query = `${latitude},${longitude}`;
    return fetchWeatherData(query);
}, { promise: true, maxAge: 10 * 60 * 1000 });  

