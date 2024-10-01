import Input from './Input'
import Button from '../Button'
import { useWeather } from '../../../context/WeatherConf';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import WeatherCard from '../Home/Card/WeatherCard';

function Search() {

  const { searchCity, fetchData, setSearchCity } = useWeather();
  const { handleSubmit } = useForm();

  const submit = useCallback(async() => {
    fetchData();
  }, [fetchData])
  


  return (
    <form onSubmit={handleSubmit(submit)} className='min-h-screen bg-blue-200 w-full'>
      <div className='h-16 pt-6 justify-between w-full px-24 py-2 flex'>
        <Input placeholder='Search' value={searchCity} onChange={(e) => setSearchCity(e.target.value)} className='border border-blue-400 w-[90%] rounded-md h-12' />
        <Button className='inline-block px-6 py-2 bg-blue-400 text-[#164b8f] hover:bg-[rgb(3,139,217)] hover:text-white duration-200 rounded-md' type="submit" >SEARCH</Button>
      </div>
      <div className='min-h-screen bg-blue-200 flex w-full'>
        <WeatherCard className='self-center' />
      </div>
    </form>
  )
}

export default Search