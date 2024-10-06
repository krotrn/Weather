import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { WeatherProvider } from './context/WeatherContext'
import { memo } from 'react'

function App() {

  return (
    <>
      <Header />
      <WeatherProvider>
        <Outlet />
      </WeatherProvider>
      <Footer />
    </>
  )
}

export default memo(App)
