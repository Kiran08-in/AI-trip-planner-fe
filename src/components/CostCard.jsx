import { rupee } from '../utils/Format'

const VERDICTS = {
  'likely not enough': { text: 'Likely not enough', className: 'v-bad' },
  'may fit': { text: 'May fit', className: 'v-mid' },
  comfortable: { text: 'Comfortable', className: 'v-good' },
}

function CostCard({ cost }) {
  const max = Math.max(cost.high * 1.15, cost.budget * 1.1)
  const pct = (v) => Math.min((v / max) * 100, 98)
  const verdict = VERDICTS[cost.verdict] || VERDICTS['may fit']

  return (
    <section className="card">
      <div className="cost-top">
        <h3>Estimated cost: {rupee(cost.low)} to {rupee(cost.high)}</h3>
        <span className={`vpill ${verdict.className}`}>{verdict.text}</span>
      </div>

      <div className="track">
        <div className="rng" style={{ left: pct(cost.low) + '%', width: pct(cost.high) - pct(cost.low) + '%' }} />
        <div className="mk" style={{ left: pct(cost.budget) + '%' }}>
          <span>Your budget {rupee(cost.budget)}</span>
        </div>
      </div>

      <div className="scale">
        <span>Low {rupee(cost.low)}</span>
        <span>High {rupee(cost.high)}</span>
      </div>

      <p className="hint">
        Price tier {cost.tier}. This is a {cost.confidence}, not a quote. Real prices can differ.
      </p>
    </section>
  )
}

export default CostCard