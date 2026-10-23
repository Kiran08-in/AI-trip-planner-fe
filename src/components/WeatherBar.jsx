import { fmtDate } from '../utils/Format'

function WeatherBar({ weather }) {
  if (!weather) {
    return (
      <div className="wx">
        <span className="muted">Weather is not available for this day.</span>
      </div>
    )
  }

  return (
    <div className="wx">
      <strong>{fmtDate(weather.date)}</strong>
      <span>{weather.temp_min}° to {weather.temp_max}°C</span>
      <span>{weather.rain_chance}% chance of rain</span>
    </div>
  )
}

export default WeatherBar