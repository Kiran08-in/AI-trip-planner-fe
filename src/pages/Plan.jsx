import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Plan() {
  const [params] = useSearchParams();
  const [city, setCity] = useState(params.get("city") || "");
  const [days, setDays] = useState("3");
  const [perDay, setPerDay] = useState("");
  const [hotel, setHotel] = useState("");
  const [errors, setErrors] = useState({});
  const [body, setBody] = useState(null);

  const total = Number(days) * Number(perDay || 0);

  const submit = () => {
    const e = {};
    if (city.trim().length < 2)
      e.city = "Enter a city name with at least 2 letters.";
    if (!(Number(perDay) > 0)) e.perDay = "Enter a budget above 0.";
    if (hotel !== "" && !(Number(hotel) > 0))
      e.hotel = "Hotel price must be above 0, or leave it empty.";
    setErrors(e);

    if (Object.keys(e).length === 0) {
      setBody({
        destination: city.trim(),
        days: Number(days),
        budget: total,
        stay_per_night: hotel ? Number(hotel) : null,
      });
    }
  };

  return (
    <>
      <div className="head">
        <h2>Create your trip</h2>
        <p className="muted">
          Tell us where you want to go. We build a day by day plan.
        </p>
      </div>

      <div className="grid2">
        <section className="card">
          <div>
            <label className="label" htmlFor="city">
              City
            </label>
            <input
              id="city"
              className="input"
              placeholder="Puri, Odisha"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city ? (
              <p className="error-text">{errors.city}</p>
            ) : (
              <p className="hint">Add the state for common names.</p>
            )}
          </div>

          <div className="grid2 field">
            <div>
              <label className="label" htmlFor="days">
                Days
              </label>
              <select
                id="days"
                className="input"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="perDay">
                Budget per day
              </label>
              <input
                id="perDay"
                className="input"
                type="number"
                placeholder="4000"
                value={perDay}
                onChange={(e) => setPerDay(e.target.value)}
              />
              {errors.perDay && <p className="error-text">{errors.perDay}</p>}
            </div>
          </div>
          <p className="hint">
            {total > 0
              ? `Total for ${days} days: ₹${total.toLocaleString("en-IN")}`
              : "We add this up for the full trip."}
          </p>

          <div className="field">
            <label className="label" htmlFor="hotel">
              Hotel price per night (optional)
            </label>
            <input
              id="hotel"
              className="input"
              type="number"
              placeholder="2500"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
            />
            {errors.hotel ? (
              <p className="error-text">{errors.hotel}</p>
            ) : (
              <p className="hint">
                If you know it, the cost range gets narrower.
              </p>
            )}
          </div>

          <div className="field">
            <button className="btn" onClick={submit}>
              Create trip
            </button>
          </div>
        </section>

        <section className="card">
          <h3>What you get</h3>
          <ul className="pack">
            <li>A plan for each day, with places close to each other</li>
            <li>The weather for each day</li>
            <li>A cost range, and whether your budget fits</li>
            <li>What to pack</li>
          </ul>
          {body && (
            <div className="field">
              <p className="label">This is what we will send (temporary)</p>
              <pre className="pre">{JSON.stringify(body, null, 2)}</pre>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default Plan;
