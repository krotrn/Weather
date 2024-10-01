import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const options = {
    enableHighAccuracy: true,  // Ask for the most accurate location possible (may take more time and use more battery)
    timeout: 5000,             // Timeout in milliseconds
    maximumAge: 0              // Cache duration for the location
};

function useUserLocation() {
    // Check if Geolocation API is supported
    const {setLatitude, setLongitude} = useContext(WeatherContext);
    if (navigator.geolocation) {
        // Request the user's current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (error) => {
                // Handle errors
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                    default:
                        alert("An unknown error occurred.");
                        break;
                }
            },
            options
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

export default useUserLocation;


