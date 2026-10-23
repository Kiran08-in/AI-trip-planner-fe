import { Star, Landmark, Waves, Mountain, Trees } from 'lucide-react'

const ICONS = { attraction: Star, temple: Landmark, beach: Waves, viewpoint: Mountain, park: Trees }
const LABELS = {
  attraction: 'Attraction',
  temple: 'Temple or church',
  beach: 'Beach',
  viewpoint: 'Viewpoint',
  park: 'Park',
}

function PlaceCard({ place, time }) {
  const Icon = ICONS[place.type] || Star

  return (
    <div className="stop">
      <span className="time">{time}</span>
      <div className="pcard">
        <div className="thumb"><Icon size={22} /></div>
        <div>
          <strong>{place.name}</strong>
          <div className="muted small">{LABELS[place.type] || 'Place'}</div>
        </div>
      </div>
    </div>
  )
}

export default PlaceCard