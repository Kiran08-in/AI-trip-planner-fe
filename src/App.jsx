import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Plan from "./pages/Plan";
import Itinerary from "./pages/Itinerary";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AppLayout />}>
          <Route path="/plan" element={<Plan />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
