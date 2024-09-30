import React from 'react'
import { useWeather } from '../../../context/WeatherContext'

function Input({ placeholder, value, onChange, className }: { placeholder: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, className?: string }) {
    const Weather = useWeather();
    console.log(Weather);
    

    return (
        <input placeholder={placeholder} type="text" value={value} onChange={onChange} className={`px-4 py-2 ${className}`} />
    )
}

export default Input