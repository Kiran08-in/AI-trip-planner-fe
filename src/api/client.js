const BASE_URL = 'http://127.0.0.1:8000'

export async function planTrip({ destination, days, budget }) {
  const response = await fetch(`${BASE_URL}/plan/trip`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ destination, days, budget }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error('Request failed')
    error.status = response.status
    error.detail = data.detail
    throw error
  }

  return data
}