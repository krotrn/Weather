import React, { useId } from 'react'
import { useWeather } from '../../../context/WeatherConf'

const Input = React.forwardRef(function Input({ placeholder, value, onChange, className }: { placeholder: string, value?: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, className: string }, ref: React.Ref<HTMLInputElement>) {
    const Weather = useWeather();
    console.log(Weather);
    const id = useId();

    return (
        <input placeholder={placeholder} type="text" value={value} onChange={onChange} id={id} ref={ref} className={`px-4 py-2 ${className}`} />
    )
})

export default Input