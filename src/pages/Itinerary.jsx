import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import WeatherBar from '../components/WeatherBar'
import PlaceCard from '../components/PlaceCard'
import { fmtDate } from '../utils/Format'

const TABS = [['itinerary', 'Itinerary'], ['map', 'Map'], ['details', 'Details']]
const SLOTS = ['09:00', '11:30', '14:00', '16:30']

function Itinerary() {
  const { state } = useLocation()
  const [tab, setTab] = useState('itinerary')
  const [d, setD] = useState(0)

  if (!state?.trip) {
    return (
      <div className="card">
        <h3>No trip yet</h3>
        <p className="muted" style={{ margin: '6px 0 14px' }}>Create a trip, and it will show up here.</p>
        <Link to="/plan" className="btn">Create trip</Link>
      </div>
    )
  }

  const { destination, plan, note } = state.trip
  const day = plan[d]

  return (
    <div>
      <div className="head">
        <h2>{plan.length} {plan.length === 1 ? 'day' : 'days'} in {destination}</h2>
        <p className="muted">Day {day.day} of {plan.length}</p>
      </div>

      {note && <p className="note">{note}</p>}

      <div className="tabs" role="tablist" aria-label="Trip sections">
        {TABS.map(([key, label]) => (
          <button key={key} role="tab" className="tab" aria-selected={tab === key} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      <div className="pills" role="group" aria-label="Days">
        {plan.map((x, i) => (
          <button key={x.day} className="pillb" aria-pressed={d === i} onClick={() => setD(i)}>
            Day {x.day}
            {x.weather && <small>{fmtDate(x.weather.date)}</small>}
          </button>
        ))}
      </div>

      {tab === 'itinerary' && (
        <div>
          <WeatherBar weather={day.weather} />
          <p className="hint" style={{ marginBottom: 10 }}>Times are suggested slots.</p>
          {day.places.map((p, i) => (
            <PlaceCard key={p.name} place={p} time={SLOTS[i] || ''} />
          ))}
        </div>
      )}

      {tab === 'map' && <div className="card"><p className="muted">The map comes in a later step.</p></div>}
      {tab === 'details' && <div className="card"><p className="muted">The cost and packing list come in a later step.</p></div>}
    </div>
  )
}

export default Itinerary