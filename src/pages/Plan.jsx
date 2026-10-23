import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { planTrip } from '../api/client'

const STEPS = ['Finding the city', 'Searching for places', 'Checking the weather', 'Planning your days', 'Estimating the cost']

function errorMessage(e) {
  if (!e.status) return 'Could not reach the server. Is the backend running?'
  if (e.status === 404) {
    return e.detail === 'no places found'
      ? 'We found the city but no tourist places near it. Try a bigger city or a nearby town.'
      : "We couldn't find that city. Try adding the state, like Puri, Odisha."
  }
  if (e.status === 422) {
    const first = Array.isArray(e.detail) ? e.detail[0] : null
    return first ? `Please check your input: ${first.msg}` : 'Please check your input.'
  }
  if (e.status === 503) return 'The places service is busy right now. Please try again in a minute.'
  return 'Something went wrong. Please try again.'
}

function Plan() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [city, setCity] = useState(params.get('city') || '')
  const [days, setDays] = useState('3')
  const [perDay, setPerDay] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [step, setStep] = useState(0)
  const [apiError, setApiError] = useState('')

  const total = Number(days) * Number(perDay || 0)
  const loading = status === 'loading'

  useEffect(() => {
    if (!loading) return
    setStep(0)
    const id = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 1500)
    return () => clearInterval(id)
  }, [loading])

  const submit = async () => {
    const e = {}
    if (city.trim().length < 2) e.city = 'Enter a city name with at least 2 letters.'
    if (!(Number(perDay) > 0)) e.perDay = 'Enter a budget above 0.'
    setErrors(e)
    if (Object.keys(e).length > 0) return

    setApiError('')
    setStatus('loading')
    try {
      const trip = await planTrip({ destination: city.trim(), days: Number(days), budget: total })
      navigate('/itinerary', { state: { trip } })
    } catch (err) {
      setApiError(errorMessage(err))
      setStatus('idle')
    }
  }

  return (
    <div>
      <div className="head">
        <h2>Create your trip</h2>
        <p className="muted">Tell us where you want to go. We build a day by day plan.</p>
      </div>

      <div className="grid2">
        <section className="card">
          <div>
            <label className="label" htmlFor="city">City</label>
            <input id="city" className="input" placeholder="Puri, Odisha" value={city} onChange={(e) => setCity(e.target.value)} disabled={loading} />
            {errors.city ? <p className="error-text">{errors.city}</p> : <p className="hint">Use a city or town, and add the state for common names.</p>}
          </div>

          <div className="grid2 field">
            <div>
              <label className="label" htmlFor="days">Days</label>
              <select id="days" className="input" value={days} onChange={(e) => setDays(e.target.value)} disabled={loading}>
                {[1, 2, 3, 4, 5, 6, 7].map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="perDay">Budget per day</label>
              <input id="perDay" className="input" type="number" placeholder="4000" value={perDay} onChange={(e) => setPerDay(e.target.value)} disabled={loading} />
              {errors.perDay && <p className="error-text">{errors.perDay}</p>}
            </div>
          </div>
          <p className="hint">{total > 0 ? `Total for ${days} days: ₹${total.toLocaleString('en-IN')}` : 'We add this up for the full trip.'}</p>

          <div className="field">
            <button className="btn" onClick={submit} disabled={loading}>{loading ? 'Planning…' : 'Create trip'}</button>
          </div>

          {apiError && <div className="errbox" role="alert">{apiError}</div>}
        </section>

        <section className="card">
          {loading ? (
            <div aria-live="polite">
              <h3>Working on it</h3>
              <p className="muted small">This can take a few seconds, because we check live services.</p>
              <ul className="steps">
                {STEPS.map((s, i) => (
                  <li key={s} className={i < step ? 'done' : i === step ? 'now' : ''}>
                    <span className="dot" />{s}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h3>What you get</h3>
              <ul className="pack">
                <li>A plan for each day, with places close to each other</li>
                <li>The weather for each day</li>
                <li>A cost range, and whether your budget fits</li>
                <li>What to pack</li>
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Plan