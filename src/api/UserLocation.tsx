import { useEffect, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const options = {
    enableHighAccuracy: false,  
    timeout: 5000,
};

function useUserLocation() {
    const { setLatitude, setLongitude } = useContext(WeatherContext);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLatitude(latitude);
                    setLongitude(longitude);
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.log("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.log("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            console.log("The request to get user location timed out.");
                            break;
                        default:
                            console.log("An unknown error occurred.");
                            break;
                    }
                },
                options
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []); // Only runs on component mount

    return null; // Hook doesn't return JSX
}

export default useUserLocation;