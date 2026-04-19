import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import SearchHistory from './components/SearchHistory.jsx'
import './App.css'

const API_KEY = '84ab86d4468eeabfe966f48a1f33e825'

export const cityImages = {
  'goa': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
  'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80',
  'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80',
  'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
  'tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
  'agra': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
  'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
  'sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80',
  'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80',
  'mysore': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1200&q=80',
  'singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80',
  'mumbai': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80',
  'delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
  'kolkata': 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&q=80',
  'istanbul': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80',
  'amsterdam': 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1200&q=80',
  'berlin': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&q=80',
  'chicago': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80',
  'seoul': 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1200&q=80',
  'toronto': 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=1200&q=80',
}

export function getCityImage(cityName) {
  const key = cityName.toLowerCase().trim()
  for (const [k, v] of Object.entries(cityImages)) {
    if (key.includes(k) || k.includes(key)) return v
  }
  return 'https://images.unsplash.com/photo-1691811496862-6bdb5ea6462a?w=1200&q=80'
}

function getMockData(city) {
  const t = Math.floor(Math.random() * 25 + 5)
  const conditions = ['Clear sky', 'Partly cloudy', 'Light rain', 'Scattered clouds']
  return {
    name: city.charAt(0).toUpperCase() + city.slice(1),
    sys: { country: 'XX' },
    main: { temp: t,
            feels_like: t - 2, 
            humidity: Math.floor(Math.random() * 40 + 40) 
          },
    wind: { speed: (Math.random() * 8 + 1).toFixed(1) },
    weather: [{ description: conditions[Math.floor(Math.random() * conditions.length)], id: 800 }],
    timezone: 0,
  }
}

function App() {
  const [unit, setUnit] = useState('metric')
  const [weatherData, setWeather] = useState(null)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('weatherHistory')
    return saved ? JSON.parse(saved) : []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isPopup, setisPopup] = useState(false)

  useEffect(() => {
      localStorage.setItem('weatherHistory', JSON.stringify(history))
  }, [history])

  useEffect(() => {
    const defaults = ['New York', 'Tokyo', 'Agra', 'Bangalore'];
    defaults.forEach(c => fetchWeather(c, unit, true));
  }, [])

  function handleBackdropClick() {
    setisPopup(false)
  }

  // fetch weather data for a city, silent mode skips UI updates
  async function fetchWeather(city, currentUnit = unit, silent = false) {
    if (!silent) { setLoading(true); setError('') }

    try {
      let data
      if (!API_KEY) {
        await new Promise(r => setTimeout(r, 400))
        data = getMockData(city, currentUnit)
      } else {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
        )
        if (!res.ok) 
          throw new Error(res.status === 404 ? 'City not found' : 'Network error')
        data = await res.json()
      }

      if (!silent) {
        setWeather(data)
        setisPopup(true) 
      }

      setHistory(prev => {
        const filtered = prev.filter(d => d.name.toLowerCase() !== data.name.toLowerCase())
        return [data, ...filtered].slice(0,10)
      })

    } catch (err) {
      if (!silent) setError(err.message || 'Something went wrong')
    } finally {
      if (!silent) setLoading(false)
    }
  }

  function handleSearch(city) { fetchWeather(city, unit) }

  function handleUnitChange(newUnit) {
    setUnit(newUnit)
    if (weatherData) fetchWeather(weatherData.name, newUnit)
  }

  function handleHistoryClick(cityName) { fetchWeather(cityName, unit) }

  return (
    <div className="app">
      <Navbar unit={unit} onUnitChange={handleUnitChange} onSearch={handleSearch} />

      <main className="main-content">
        {!weatherData && !loading && (
          <div className="welcome">
            <div className="welcome-title">CITYSKIES</div>
            <div className="welcome-sub">Real-time weather from around the world</div>
          </div>
        )}

        {loading && <div className="status-msg">— Fetching atmospheric data...</div>}
        {error && <div className="status-msg error">{error}</div>}

        {history.length > 0 && (
          <>
            <div className="section-label">— Recent searches</div>
            <SearchHistory
              history={history}
              unit={unit}
              onCityClick={handleHistoryClick}
            />
          </>
        )}
      </main>

      {isPopup && weatherData && (
        <>
          <div className="temp-card-backdrop" onClick={handleBackdropClick} />

          <div className="temp-card-popup">
            <button className="temp-card-close" onClick={handleBackdropClick}>✕</button>
            <WeatherCard key={weatherData.name} data={weatherData} unit={unit} />
          </div>
        </>
      )}
    </div>
  )
}

export default App