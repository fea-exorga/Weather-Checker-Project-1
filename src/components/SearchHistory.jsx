import React from 'react'
import { convertTemp, tempLabel } from '../utils/temperature.js'
import { getCityImage } from '../App.jsx'
import './SearchHistory.css'

function getCityTime() {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

function SearchHistory({ history, unit, onCityClick }) {
  if (!history || history.length === 0) return null

  return (
    <div className="history-grid">
      {history.map((data, i) => (
        <div
          key={data.name + i}
          className="history-card"
          style={{
            backgroundImage: `url(${getCityImage(data.name)})`,
            animationDelay: `${i * 80}ms`
          }}
          onClick={() => onCityClick(data.name)}
        >
          <div className="history-overlay" />

          <div className="history-content">
            <div className="history-top">
              <div className="history-time-block">
                <div className="h-time">{getCityTime()}</div>
                <div className="h-city-label">{data.name}</div>
              </div>
              <img className="weather-icon" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description}/>
            </div>

            <div className="history-bottom">
              <div>
                <div className="h-country">{data.sys.country}</div>
                <div className="h-city">{data.name}</div>
              </div>
              <div className="h-right">
                <div className="h-temp">
                {convertTemp(data.main.temp, unit)}{tempLabel(unit)}
                </div>
                <div className="h-condition">{data.weather[0].description}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchHistory