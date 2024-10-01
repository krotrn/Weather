import { DataInterface } from "../../components/Default/DefaultData"

const baseUrl: string = 'https://api.weatherapi.com/v1/current.json?key='
const key: string = ""

export const getWeatherForCity = async (city: string) => {
    const response: Response = await fetch(`${baseUrl}${key}&q=${city}&aqi=yes`)
    const data: DataInterface = await response.json()
    return data;
}

