import React, { useCallback, useState } from 'react';
import Input from './Input';
import Button from '../Button';
import { useWeather } from '../../../context/WeatherConf';
import WeatherCard from '../Home/Card/WeatherCard';
import useUserLocation from '../../../api/UserLocation';

function Search() {
  const { searchCity, fetchDataForCity, setSearchCity } = useWeather();
  const [isFetching, setIsFetching] = useState(false);
  const { fetchLocation, error: locationError, isFetching: isLocating } = useUserLocation();

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCity(value);
  };

  const handleSearchSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchCity.trim()) return;
      setIsFetching(true);
      await fetchDataForCity();
      setIsFetching(false);
    },
    [fetchDataForCity, searchCity]
  );

  return (
    <form onSubmit={handleSearchSubmit} className='min-h-screen bg-blue-200 w-full flex flex-col items-center'>
      <div className='h-16 pt-6 justify-between w-full px-6 sm:px-24 sm:flex'>
        {/* Input field for search */}
        <Input
          placeholder='Search for a city'
          value={searchCity}
          onChange={handleCityChange}
          className='border inline-block border-blue-400 w-[90%] sm:w-[70%] rounded-md h-12 mb-4 sm:mb-0'
          aria-label='Search for a city'
        />
        <div className='flex p-0 justify-center'>
          {/* Search button */}
          <Button
            className={`inline-block px-6 py-2 min-h-12 h-fit bg-blue-400 text-[#164b8f] hover:bg-[rgb(3,139,217)] mx-2 sm:mx-2 hover:text-white duration-200 rounded-md ${!searchCity ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={!searchCity || isFetching}
            aria-label='Search'
          >
            {isFetching ? 'Searching...' : 'SEARCH'}
          </Button>

          {/* Current Location button */}
          <Button
            className='inline-block px-6 py-2 min-h-12 h-fit bg-blue-400 text-[#164b8f] hover:bg-[rgb(3,139,217)] hover:text-white duration-200 rounded-md mx-2 sm:mx-2'
            type="button"
            onClick={fetchLocation}
            disabled={isLocating}
            aria-label='Use current location'
          >
            {isLocating ? 'Locating...' : 'Current'}
          </Button>
        </div>
      </div>

      {/* Display any errors from location fetching */}
      
      {locationError && <p className='text-red-600 m-5'>{locationError}</p>}

      {/* Weather card */}
      <div className='flex flex-col items-center justify-center w-full'> 
        <div className="w-full flex justify-center">
          <WeatherCard className='mx-4 p-6 bg-white shadow-lg rounded-lg z-10 my-24' />
        </div>
      </div>
    </form>
  );
}

export default Search;
