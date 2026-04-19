export function convertTemp(celsius, unit) {
    if (unit === 'metric') {
      return Math.round(celsius)
    }
    return Math.round((celsius * 9/5) + 32)

  }
  
  export function tempLabel(unit) {
    return unit === 'imperial' ? '°F' : '°C'
  }