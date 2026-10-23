import { Shirt } from 'lucide-react'

function PackingCard({ day }) {
  return (
    <section className="card">
      <h3 className="row"><Shirt size={20} /> What to pack for day {day.day}</h3>
      {day.packing.length === 0 ? (
        <p className="muted" style={{ marginTop: 8 }}>Nothing special for this day.</p>
      ) : (
        <ul className="pack">
          {day.packing.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}
    </section>
  )
}

export default PackingCard