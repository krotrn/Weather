import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Input from './Input';
import Button from '../Button';
import { useWeather } from '../../../context/WeatherConf';
import useUserLocation from '../../../api/UserLocation';
import Home from '../Home/Home';
import { WeatherSuggestion } from '../../../types/WeatherSuggestion';
import conf from '../../../conf/WeatherConf';

function Search() {
  const { fetchDataForCity, setSearchCity, DefaultData, setData } = useWeather();
  const [isFetching, setIsFetching] = useState(false);
  const { fetchLocation, error: locationError, isFetching: isLocating } = useUserLocation();
  const [suggestions, setSuggestions] = useState<WeatherSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [value, setValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null); // Track highlighted suggestion
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  // Reset data to Default value if input is empty
  useEffect(() => {
    if (!value) {
      setSuggestions([]);
      setData(DefaultData);
      setHighlightedIndex(null); // Reset highlighted suggestion
    }
  }, [value, setData, DefaultData]);

  // Fetch suggestions for cities based on user input
  const fetchSuggestions = useCallback(async (query: string) => {
    setIsLoadingSuggestions(true);
    try {
      const response = await fetch(`${conf.apiUrlsearch}${conf.apikey}&q=${query}`);
      const data: WeatherSuggestion[] = await response.json();
      setSuggestions(data);
      setHighlightedIndex(null); // Reset highlighted suggestion when new data comes in
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, []);

  // Handle city input change
  const handleCityChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value.trim()) {
      await fetchSuggestions(e.target.value.trim());
    } else {
      setSuggestions([]);
    }
  }, [fetchSuggestions]);

  // Handle form submit when user searches for a city
  const handleSearchSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setSearchCity(value);
    setIsFetching(true);
    await fetchDataForCity();
    setIsFetching(false);
    setSuggestions([]);
  }, [setSearchCity, fetchDataForCity, value]);

  // Handle clicking on a suggestion to auto-fill the input
  const handleSuggestionClick = (city: WeatherSuggestion) => {
    setValue(city.name);
    setSearchCity(city.name);
    setSuggestions([]);
  };

  // Handle keydown events for navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && suggestions.length > 0) {
      // Move down in suggestions
      setHighlightedIndex((prevIndex) => {
        if (prevIndex === null || prevIndex === suggestions.length - 1) {
          return 0; // Wrap around
        }
        return prevIndex + 1;
      });
    } else if (e.key === 'ArrowUp' && suggestions.length > 0) {
      // Move up in suggestions
      setHighlightedIndex((prevIndex) => {
        if (prevIndex === null || prevIndex === 0) {
          return suggestions.length - 1; // Wrap around
        }
        return prevIndex - 1;
      });
    } else if (e.key === 'Enter' && highlightedIndex !== null) {
      // Select highlighted suggestion
      const selectedSuggestion = suggestions[highlightedIndex];
      if (selectedSuggestion) {
        handleSuggestionClick(selectedSuggestion);
      }
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="min-h-screen bg-blue-200 w-full flex flex-col items-center">
      <div className="relative h-fit pt-6 justify-between w-full px-6 sm:px-24 sm:flex">
        {/* Search Input */}
        <div className="w-full">
          <Input
            ref={inputRef} // Attach ref to input
            placeholder="Search for a city"
            value={value}
            onChange={handleCityChange}
            className="border inline-block border-blue-400 w-full rounded-md h-12 mb-4 sm:mb-0"
            aria-label="Search for a city"
            onKeyDown={handleKeyDown} // Handle keyboard navigation
          />

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul
              ref={suggestionsRef}
              className="z-20 mx-12 bg-white border border-blue-300 rounded-md w-[90%] sm:w-[70%] mt-2 max-h-60 overflow-y-auto shadow-lg left-0"
            >
              {isLoadingSuggestions && (
                <div className="items-center p-4 text-sm text-gray-700 bg-white/30 backdrop-blur-md rounded-lg shadow-lg m-5 border border-white/20">
                  Loading suggestions...
                </div>
              )}
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`cursor-pointer px-4 py-2 w-full hover:bg-blue-100 transition-all duration-150
                    ${index === highlightedIndex ? 'bg-blue-200' : ''}`} // Highlighted suggestion
                >
                  {suggestion.name}, {suggestion.region}, {suggestion.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex p-0 justify-center">
          <Button
            className={`inline-block px-6 py-2 min-h-12 h-fit bg-blue-400 text-[#164b8f] hover:bg-[rgb(3,139,217)] mx-2 sm:mx-2 hover:text-white duration-200 rounded-md ${!value ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={!value || isFetching}
            aria-label="Search"
          >
            {isFetching ? 'SEARCHING' : 'SEARCH'}
          </Button>

          <Button
            className="inline-block px-6 py-2 min-h-12 h-fit bg-blue-400 text-[#164b8f] hover:bg-[rgb(3,139,217)] hover:text-white duration-200 rounded-md mx-2 sm:mx-2"
            type="button"
            onClick={fetchLocation}
            disabled={isLocating}
            aria-label="Use current location"
          >
            {isLocating ? 'Locating...' : 'Current'}
          </Button>
        </div>
      </div>

      {/* Location Error Display */}
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
          <span className="font-bold">Location Error:</span> <span className="font-medium">{locationError}</span>
        </div>
      )}

      {/* Weather Card */}
      <div className="flex items-center justify-center w-full">
        <Home className="my-24" />
      </div>
    </form>
  );
}

export default memo(Search);
