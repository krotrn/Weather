const baseUrl:string = 'https://api.weatherapi.com/v1/current.json?key='
const key:string = ""

export const getWeatherForCity = async (city: string) => {
    const response:Response = await fetch(`${baseUrl}${key}&q=${city}&aqi=yes`)
    const data:JSON = await response.json()
    return data;
}

