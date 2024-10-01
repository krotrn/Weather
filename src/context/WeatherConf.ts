import { useContext } from "react";
import { WeatherContext, WeatherContextType } from "./WeatherContext";


export const useWeather = (): WeatherContextType => {
    const context = useContext(WeatherContext);

    if (context === undefined) {
        throw new Error("useWeather must be used within a WeatherProvider");
    }

    return context;
};
