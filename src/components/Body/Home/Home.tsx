import WeatherCard from './Card/WeatherCard'
import useUserLocation from '../../../api/UserLocation'

function Home() {
  useUserLocation();
  return (
    <>
      <div className='min-h-screen bg-blue-200 flex w-full'>
        <WeatherCard className='self-center' />
      </div>
    </>
  )
}

export default Home