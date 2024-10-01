export interface DataInterface {
    "location": {
        "name": string,
        "region": string,
        "country": string,
        "lat": number,
        "lon": number,
        "tz_id": string,
        "localtime_epoch": number,
        "localtime": string | "2024-10-01 07:16"
    },
    "current": {
        "last_updated_epoch": number,
        "last_updated": string | "2024-10-01 07:15",
        "temp_c": number,
        "temp_f": number,
        "is_day": number,
        "condition": {
            "text": string,
            "icon": string,
            "code": number
        },
        "wind_mph": number,
        "wind_kph": number,
        "wind_degree": number,
        "wind_dir": string,
        "pressure_mb": number,
        "pressure_in": number,
        "precip_mm": number,
        "precip_in": number,
        "humidity": number,
        "cloud": number,
        "feelslike_c": number,
        "feelslike_f": number,
        "windchill_c": number,
        "windchill_f": number,
        "heatindex_c": number,
        "heatindex_f": number,
        "dewpoint_c": number,
        "dewpoint_f": number,
        "vis_km": number,
        "vis_miles": number,
        "uv": number,
        "gust_mph": number,
        "gust_kph": number,
        "air_quality": {
            "co": number,
            "no2": number,
            "o3": number,
            "so2": number,
            "pm2_5": number,
            "pm10": number,
            "us-epa-index": number,
            "gb-defra-index": number
        }
    }
}
export const DefaultData:DataInterface = {
    "location": {
        "name": "London",
        "region": "City of London, Greater London",
        "country": "United Kingdom",
        "lat": 51.52,
        "lon": -0.11,
        "tz_id": "Europe/London",
        "localtime_epoch": 1727763402,
        "localtime": "2024-10-01 07:16"
    },
    "current": {
        "last_updated_epoch": 1727763300,
        "last_updated": "2024-10-01 07:15",
        "temp_c": 12.3,
        "temp_f": 54.1,
        "is_day": 1,
        "condition": {
            "text": "Light rain",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/296.png",
            "code": 1183
        },
        "wind_mph": 10.5,
        "wind_kph": 16.9,
        "wind_degree": 274,
        "wind_dir": "W",
        "pressure_mb": 1008.0,
        "pressure_in": 29.77,
        "precip_mm": 0.01,
        "precip_in": 0.0,
        "humidity": 82,
        "cloud": 75,
        "feelslike_c": 10.6,
        "feelslike_f": 51.0,
        "windchill_c": 9.8,
        "windchill_f": 49.6,
        "heatindex_c": 11.7,
        "heatindex_f": 53.0,
        "dewpoint_c": 9.4,
        "dewpoint_f": 48.9,
        "vis_km": 10.0,
        "vis_miles": 6.0,
        "uv": 1.0,
        "gust_mph": 14.5,
        "gust_kph": 23.3,
        "air_quality": {
            "co": 323.75,
            "no2": 25.345,
            "o3": 46.0,
            "so2": 3.7,
            "pm2_5": 6.66,
            "pm10": 10.36,
            "us-epa-index": 1,
            "gb-defra-index": 1
        }
    }
}


