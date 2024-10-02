import WeatherCard from './Card/WeatherCard'
import useUserLocation from '../../../api/UserLocation'
import { memo } from 'react';

function Home({className}: {className?: React.ReactNode}) {
  useUserLocation();
  return (
    <>
      <div className='min-h-screen bg-blue-200 flex min-w-full w-fit'>
        <WeatherCard className={`self-center ${className}`} />
      </div>
    </>
  )
}

export default memo(Home)