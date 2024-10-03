// WeatherSuggestion.ts (or define at the top of Search.tsx)
export interface WeatherSuggestion {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}
