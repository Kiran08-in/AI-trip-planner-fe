import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Home() {
  const [city, setCity] = useState('')
  const navigate = useNavigate()

  const goToPlan = () => {
    const q = city.trim()
    navigate(q ? `/plan?city=${encodeURIComponent(q)}` : '/plan')
  }

  return (
    <div className="land">
      <header className="land-nav">
        <span className="land-brand">TripBanao</span>
        <Link to="/plan" className="btn">Get started</Link>
      </header>

      <section className="land-hero">
        <h1>Plan a trip that fits your budget</h1>
        <p>
          Tell us the city, the days and the money you have. We find real places,
          check the weather and group them so you spend less time on the road.
        </p>
        <div className="searchbox">
          <input
            placeholder="Which city do you want to visit?"
            aria-label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && goToPlan()}
          />
          <button className="btn" onClick={goToPlan}>Plan my trip</button>
        </div>
      </section>

      <footer className="land-feats">
        <span>Real places from map data</span>
        <span>Weather for each day</span>
        <span>A cost range, not a guess</span>
      </footer>
    </div>
  )
}

export default Home