import { useLocation, Link } from 'react-router-dom'

function Itinerary() {
  const { state } = useLocation()

  if (!state?.trip) {
    return (
      <div className="card">
        <h3>No trip yet</h3>
        <p className="muted" style={{ margin: '6px 0 14px' }}>Create a trip, and it will show up here.</p>
        <Link to="/plan" className="btn">Create trip</Link>
      </div>
    )
  }

  return <pre className="pre">{JSON.stringify(state.trip, null, 2)}</pre>
}

export default Itinerary