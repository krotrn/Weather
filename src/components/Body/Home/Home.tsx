import WeatherCard from './Card/WeatherCard';
import useUserLocation from '../../../api/UserLocation';
import { memo } from 'react';


function Home({ className = '' }: {className?: string;}) {
  useUserLocation(); 

  return (
    <div className={`min-h-screen bg-blue-200 flex justify-center max-w-screen-2xl min-w-[300px] w-full ${className}`}>
      <WeatherCard className="self-center" />
    </div>
  );
}

export default memo(Home);
