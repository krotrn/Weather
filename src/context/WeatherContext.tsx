import { createContext, useContext, useState } from "react";
import { getWeatherForCity } from "../api/Weather";

const WeatherContext = createContext({});

export const useWeather = () => {
    return useContext(WeatherContext);
}

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState({});
    const [searchCity, setSearchCity] = useState("London");

    const fetchData = async () => {
        try {
            const response = await getWeatherForCity(searchCity);
            setData(response);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <WeatherContext.Provider value={{ searchCity, data, setSearchCity, fetchData }}>
            {children}
        </WeatherContext.Provider>
    );
}