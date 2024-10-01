import { createContext, useContext, useState } from "react";
import { getWeatherForCity } from "../api/Weather";
import { DataInterface, DefaultData } from "../components/Default/DefaultData";

interface WeatherContextType {
    data: DataInterface;
    searchCity: string;
    setSearchCity: React.Dispatch<React.SetStateAction<string>>;
    fetchData: () => void;
}

const WeatherContext = createContext<WeatherContextType>({
    data: DefaultData,
    searchCity: "",
    setSearchCity: () => {},
    fetchData: () => {}
});

export const useWeather = () => {
    return useContext(WeatherContext);
}


export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData]: [data: DataInterface,setData:React.Dispatch<React.SetStateAction<DataInterface>>] = useState(DefaultData);
    const [searchCity, setSearchCity]:[searchCity:string,setSearchCity:React.Dispatch<React.SetStateAction<string>>] = useState("London");

    const fetchData = async () => {
        try {
            const response: DataInterface = await getWeatherForCity(searchCity);
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