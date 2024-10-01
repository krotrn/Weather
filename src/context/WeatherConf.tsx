import { useContext } from "react";
import { WeatherContext, WeatherContextType } from "./WeatherContext";

// Enhanced useWeather hook with error handling and type safety
export const useWeather = (): WeatherContextType => {
    const context = useContext(WeatherContext);

    if (context === undefined) {
        throw new Error("useWeather must be used within a WeatherProvider");
    }

    return context;
};
