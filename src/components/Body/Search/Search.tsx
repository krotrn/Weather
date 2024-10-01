import Input from './Input';
import Button from '../Button';
import { useWeather } from '../../../context/WeatherConf';
import { useCallback, useState } from 'react';
import WeatherCard from '../Home/Card/WeatherCard';

function Search() {
  const { searchCity, fetchDataForCity, setSearchCity, fetchDataForCoordinates } = useWeather();
  const [isFetching, setIsFetching] = useState(false);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCity(value);
    // Automatically fetch current location if the input is cleared
    if (!value) {
      fetchDataForCoordinates();
    }
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

  const handleCurrentLocation = useCallback(async () => {
    setIsFetching(true);
    await fetchDataForCoordinates();
    setIsFetching(false);
  }, [fetchDataForCoordinates]);

  return (
    <form onSubmit={handleSearchSubmit} className='min-h-screen bg-blue-200 w-full'>
      <div className='h-16 pt-6 justify-between w-full px-24 sm:flex'>
        {/* Input field for search */}
        <Input
          placeholder='Search for a city'
          value={searchCity}
          onChange={handleCityChange}
          className='border inline-block border-blue-400 w-[90%] rounded-md h-12'
          aria-label='Search for a city'
        />
        <div className='flex p-0 justify-center'>
          {/* Search button */}
          <Button
            className={`inline-block px-6 py-2 min-h-12 h-fit bg-blue-400 text-[#164b8f] hover:bg-[rgb(3,139,217)] mx-2 sm:mx-2 hover:text-white duration-200 rounded-md ${!searchCity ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={!searchCity || isFetching} // Disable when input is empty or fetching
            aria-label='Search'
          >
            {isFetching ? 'Searching...' : 'SEARCH'}
          </Button>

          {/* Current Location button */}
          <Button
            className='inline-block px-6 py-2 min-h-12 h-fit bg-blue-400 text-[#164b8f] hover:bg-[rgb(3,139,217)] hover:text-white duration-200 rounded-md mx-2 sm:mx-2'
            type="button"
            onClick={handleCurrentLocation}
            disabled={isFetching}
            aria-label='Use current location'
          >
            {isFetching ? 'Locating...' : 'Current'}
          </Button>
        </div>
      </div>
      <div className='min-h-screen bg-blue-200 flex w-full'>
        {<WeatherCard className='self-center' />}
      </div>
    </form>
  );
}

export default Search;
