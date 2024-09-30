import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { WeatherProvider } from './context/WeatherContext'

function App() {

  return (
    <>
      <Header />
      < WeatherProvider>
        <Outlet />
      </WeatherProvider>
      <Footer />
    </>
  )
}

export default App
