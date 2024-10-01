import Input from './Input';
import Button from '../Button';
import { useWeather } from '../../../context/WeatherConf';
import { useCallback } from 'react';
import WeatherCard from '../Home/Card/WeatherCard';

function Search() {
  const { searchCity, fetchDataForCity, setSearchCity, fetchDataForCoordinates } = useWeather();

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCity(value);

    if (value === "") {
      fetchDataForCoordinates(); 
    } else {
      fetchDataForCity();
    }
  };

  const handleSearchSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault(); 
      fetchDataForCity(); 
    },
    [fetchDataForCity]
  );

  const handleCurrentLocation = useCallback(() => {
    fetchDataForCoordinates();
  }, [fetchDataForCoordinates]);

  return (
    <form onSubmit={handleSearchSubmit} className='min-h-screen bg-blue-200 w-full'>
      <div className='h-16 pt-6 justify-between w-full px-24 sm:flex'>
        <Input
          placeholder='Search'
          value={searchCity}
          onChange={handleCityChange}
          className='border inline-block border-blue-400 w-[90%] rounded-md h-12'
        />
        <div className='flex p-0 justify-center'>
          <Button
            className='inline-block px-6 py-2 min-h-12 h-fit bg-blue-400 text-[#164b8f] hover:bg-[rgb(3,139,217)] mx-2 sm:mx-2 hover:text-white duration-200 rounded-md'
            type="submit"
          >
            SEARCH
          </Button>
          <Button
            className='inline-block px-6 py-2 min-h-12 h-fit bg-blue-400 text-[#164b8f] hover:bg-[rgb(3,139,217)] hover:text-white duration-200 rounded-md mx-2 sm:mx-2'
            type="button"
            onClick={handleCurrentLocation}
          >
            Current
          </Button>
        </div>
      </div>
      <div className='min-h-screen bg-blue-200 flex w-full'>
        <WeatherCard className='self-center' />
      </div>
    </form>
  );
}

export default Search;
