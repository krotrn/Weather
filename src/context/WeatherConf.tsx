import { useContext } from "react";
import { WeatherContext } from "./WeatherContext";

export const useWeather = () => {
    return useContext(WeatherContext);
}