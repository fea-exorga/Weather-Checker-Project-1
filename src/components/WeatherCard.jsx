import React from 'react'
import { convertTemp, tempLabel } from '../utils/temperature.js'
import { getCityImage } from '../App.jsx'
import './WeatherCard.css'

function getCityTime(timezoneOffset) {
  const now = new Date()
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000)
  const cityTime = new Date(utcTime + (timezoneOffset * 1000))

  const dateOptions = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }
  const hours = String(cityTime.getHours()).padStart(2, '0')
  const minutes = String(cityTime.getMinutes()).padStart(2, '0')

  return {
    date: cityTime.toLocaleDateString('en-US', dateOptions),
    time: `${hours}:${minutes}`
  }
}

function WeatherCard({ data, unit }) {
  if (!data) return null

  const { date, time } = getCityTime(data.timezone)
  const bgImage = getCityImage(data.name)
  const windUnit = unit === 'metric' ? 'm/s' : 'mph'
  // const tempunit = unit === 'metric' ? '℃' : '℉'

  return (
    <div className="card-container" style={{ backgroundImage: `url(${bgImage})` }}>

      <div className="stat-temp">
        <div className="weather-stats">
          <div className="stat-item">
            <span className="stat-label">Humidity</span>
            <span className="stat-val">{data.main.humidity}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Wind</span>
            <span className="stat-val">{data.wind.speed} {windUnit}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Feels like</span>
            <span className="stat-val">  {convertTemp(data.main.feels_like, unit)}{tempLabel(unit)}</span>
          </div>
        </div>

        <div className="weather-temp">
          <img className="weather-icon" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description}/>
          <div className="card-temp">{convertTemp(data.main.temp, unit)}{tempLabel(unit)}</div>
          <div className="condition">{data.weather[0].description}</div>
        </div>
      </div>

      <div className="city-section">
        <div className="city-row">
          <div>
          <div className="accent">{data.sys.country}</div>
            <div className="city-name">
              {data.name}<span className="location-dot"></span>
            </div>
            <div className="real-date">{date}</div>
          </div>
          <div className="real-time">{time}</div>
        </div>
      </div>

    </div>
  )
}

export default WeatherCard