import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { tripLegs } from '../utils/geo'

function numberedIcon(n) {
  return L.divIcon({
    className: 'pin',
    html: `<span>${n}</span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })
}

function FitBounds({ places }) {
  const map = useMap()
  useEffect(() => {
    const pts = places.map((p) => [p.lat, p.lon])
    if (pts.length === 1) map.setView(pts[0], 14)
    else map.fitBounds(pts, { padding: [30, 30] })
  }, [map, places])
  return null
}

function MapView({ places }) {
  const positions = places.map((p) => [p.lat, p.lon])
  const { distance, minutes } = tripLegs(places)

  return (
    <div className="mapwrap">
      <div className="map">
        <MapContainer center={positions[0]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds places={places} />
          {positions.length > 1 && (
            <Polyline positions={positions} pathOptions={{ color: '#1d63f0', weight: 3, dashArray: '6 6' }} />
          )}
          {places.map((p, i) => (
            <Marker key={p.name} position={[p.lat, p.lon]} icon={numberedIcon(i + 1)}>
              <Popup>{p.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="stack">
        <div className="card">
          <p className="muted small">Total distance</p>
          <p className="kpi">{distance.toFixed(1)} km</p>
          <p className="muted small" style={{ marginTop: 8 }}>Estimated travel time</p>
          <p className="kpi">{minutes} min</p>
          <p className="hint">
            {places.length > 1
              ? 'An estimate: straight line distance times 1.3, at 25 km/h. Real roads can differ.'
              : 'Only one stop today.'}
          </p>
        </div>
        <div className="card">
          <h3>Stops</h3>
          <ol className="pack">
            {places.map((p) => <li key={p.name}>{p.name}</li>)}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default MapView