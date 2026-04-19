import React, { useState } from 'react'
import './Navbar.css'

function Navbar({ unit, onUnitChange, onSearch }) {
  const [inputVal, setInputVal] = useState('')

  function handleSearch() {
    if (inputVal.trim()) {
      onSearch(inputVal.trim())
      setInputVal('')
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <header className="navbar">
      <div className="logo">VILL<span>ANIMU</span>S</div>

      <div className="search-area">
        <input type="text" className="search-input" placeholder="ENTER CITY..." value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <button className="search-btn" onClick={handleSearch}>SEARCH</button>
      </div>

      <div className="unit-toggle">
        <button
          className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
          onClick={() => onUnitChange('metric')}
        >°C</button>
        <button
          className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
          onClick={() => onUnitChange('imperial')}
        >°F</button>
      </div>
    </header>
  )
}

export default Navbar