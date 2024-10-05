import { DataInterface } from './DataInterface'
import React from 'react';
// Define the shape of the context
export interface WeatherContextType {
  data: DataInterface;
  searchCity: string;
  DefaultData: DataInterface;
  setSearchCity: React.Dispatch<React.SetStateAction<string>>;
  fetchDataForCity: () => Promise<void>;
  fetchDataForCoordinates: () => Promise<void>;
  setLatitude: React.Dispatch<React.SetStateAction<number | null>>;
  setLongitude: React.Dispatch<React.SetStateAction<number | null>>;
  latitude: number | null;
  longitude: number | null;
  setData: React.Dispatch<React.SetStateAction<DataInterface>>;
}
