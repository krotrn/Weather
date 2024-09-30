import React from 'react'
import Input from './Input'
import Button from '../Button'
import { useWeather } from '../../../context/WeatherContext';

function Search() {

  const { searchCity, fetchData, setSearchCity } = useWeather();

  const handleSearch = () => {
    console.log('searching...')
  }


  return (
    <div className='min-h-screen bg-blue-200 flex w-full'>
      <div className='h-16 mt-6 justify-between w-full px-24 py-2 flex'>
        <Input placeholder='Search' value={searchCity} onChange={(e) => setSearchCity(e.target.value)} className='border border-blue-400 w-[90%] rounded-md h-12' />
        <Button className='inline-block px-6 py-2 bg-blue-400 text-[#164b8f] hover:bg-[rgb(3,139,217)] hover:text-white duration-200 rounded-md' onClick={fetchData} >Search</Button>
      </div>
    </div>
  )
}

export default Search