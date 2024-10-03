import React, { memo, useCallback, useEffect, useState } from 'react';
import Input from './Input';
import Button from '../Button';
import { useWeather } from '../../../context/WeatherConf';
import useUserLocation from '../../../api/UserLocation';
import Home from '../Home/Home';
import { WeatherSuggestion } from '../../../types/WeatherSuggestion';
import  conf  from '../../../conf/WeatherConf';

function Search() {
    const { searchCity, fetchDataForCity, setSearchCity } = useWeather();
    const [isFetching, setIsFetching] = useState(false);
    const { fetchLocation, error: locationError, isFetching: isLocating } = useUserLocation();
    const [suggestions, setSuggestions] = useState<WeatherSuggestion[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

    useEffect(() => {
        if (!searchCity) {
          setSuggestions([]);
          fetchLocation();
        }
    }, [searchCity, fetchLocation]);

  
    const fetchSuggestions =useCallback(async (query: string) => {
        setIsLoadingSuggestions(true);
        try {
          const response = await fetch(`${conf.apiUrlsearch}${conf.apikey}&q=${query}`);
          
            const data: WeatherSuggestion[] = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        } finally {
            setIsLoadingSuggestions(false);
        }
    }, []);
    const handleCityChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchCity(value);
      
      if (value.trim()) {
          await fetchSuggestions(value);
      } else {
          setSuggestions([]);
      }
  }, [fetchSuggestions, setSearchCity]);


    const handleSearchSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (!searchCity.trim()) return;

            setIsFetching(true);
            await fetchDataForCity();
            setIsFetching(false);
            setSuggestions([]);
        },
        [fetchDataForCity, searchCity]
    );

    const handleSuggestionClick = (city: WeatherSuggestion) => {
        setSearchCity(city.name); 
        setSuggestions([]); 
    };

    return (
        <form onSubmit={handleSearchSubmit} className='min-h-screen bg-blue-200 w-full flex flex-col items-center'>
            <div className='h-fit pt-6 justify-between w-full px-6 sm:px-24 sm:flex'>
                <Input
                    placeholder='Search for a city'
                    value={searchCity}
                    onChange={handleCityChange}
                    className='border inline-block border-blue-400 w-[90%] sm:w-[70%] rounded-md h-12 mb-4 sm:mb-0'
                    aria-label='Search for a city'
                />
                <div className='flex p-0 justify-center'>
                    <Button
                        className={`inline-block px-6 py-2 min-h-12 h-fit bg-blue-400 text-[#164b8f] hover:bg-[rgb(3,139,217)] mx-2 sm:mx-2 hover:text-white duration-200 rounded-md ${!searchCity ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={!searchCity || isFetching}
                        aria-label='Search'
                    >
                        {isFetching ? 'Searching...' : 'SEARCH'}
                    </Button>

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

            {locationError && (
                <div className="flex items-center p-4 my-24 md:my-4 text-sm text-red-700 bg-red-100/30 backdrop-blur-md rounded-lg shadow-lg m-5 border border-white/20" role="alert">
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2 text-red-700"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 8a1 1 0 00-1-1H3a1 1 0 000 2h14a1 1 0 001-1zM10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 110 12 6 6 0 010-12z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="font-medium">Location Error:</span> {locationError}
                </div>
            )}

            {/* Suggestions List */}
            {isLoadingSuggestions && <div>Loading suggestions...</div>}
            {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-blue-300 rounded-md w-[90%] sm:w-[70%] mt-2 max-h-60 overflow-y-auto shadow-lg">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)} 
                            className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                        >
                            {suggestion.name}, {suggestion.region}, {suggestion.country}
                        </li>
                    ))}
                </ul>
            )}

            {/* Weather card */}
            <div className='flex flex-col items-center justify-center w-full'>
                <Home className='my-24' />
            </div>
        </form>
    );
}

export default memo(Search);
