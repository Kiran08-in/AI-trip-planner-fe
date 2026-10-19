import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EXAMPLES = [
  { city: "Goa", detail: "4 days, ₹50,000, beaches and food" },
  { city: "Jaipur", detail: "3 days, ₹15,000, forts and markets" },
  { city: "Manali", detail: "5 days, ₹25,000, mountains and cafes" },
];
function Home() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const goToPlan = (name) => {
    const q = name.trim();
    navigate(q ? `/plan?city=${encodeURIComponent(q)}` : "/plan");
  };
  return (
    <>
      <h1>Welcome to the Home Page</h1>
      <main className="page">
        <h1 className="hero-title">Plan a trip that fits your budget</h1>
        <p className="hero-text">
          Tell us the city, the days and the money you have. We find real
          places, check the weather, and group them so you spend less time on
          the road.
        </p>

        <div className="search">
          <input
            className="input"
            placeholder="Where do you want to go?"
            aria-label="Destination"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goToPlan(city)}
          />
          <button className="btn" onClick={() => goToPlan(city)}>
            Plan my trip
          </button>
        </div>
        <section className="examples" aria-label="Example trips">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.city}
              className="example"
              onClick={() => goToPlan(ex.city)}>
              <strong>{ex.city}</strong>
              <span>{ex.detail}</span>
            </button>
          ))}
        </section>
      </main>
    </>
  );
}
export default Home;
