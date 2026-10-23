export function km(a, b) {
  const R = 6371
  const t = (x) => (x * Math.PI) / 180
  const dLat = t(b.lat - a.lat)
  const dLon = t(b.lon - a.lon)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(t(a.lat)) * Math.cos(t(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export function tripLegs(places) {
  let distance = 0
  for (let i = 1; i < places.length; i++) {
    distance += km(places[i - 1], places[i]) * 1.3
  }
  const minutes = Math.round((distance / 25) * 60)
  return { distance, minutes }
}