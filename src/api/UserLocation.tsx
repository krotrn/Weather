import { useEffect, useContext, useState, useCallback } from "react";
import { WeatherContext } from "../context/WeatherContext";

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

function useUserLocation() {
  const { setLatitude, setLongitude } = useContext(WeatherContext);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false); // Track if location fetch was successful

  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setIsFetching(true);
    setError(null); // Clear previous errors

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setIsFetching(false);
        setLocationSuccess(true);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Permission denied. Please allow location access.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location unavailable.");
            break;
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError("An unknown error occurred.");
        }
        setIsFetching(false);
        setLocationSuccess(false);
      },
      options
    );
  }, [setLatitude, setLongitude]);

  // Reset location success state when component unmounts or location fetch fails
  useEffect(() => {
    return () => {
      setLocationSuccess(false);
    };
  }, []);

  return {
    fetchLocation,
    error,
    isFetching,
    locationSuccess,
  };
}

export default useUserLocation;
