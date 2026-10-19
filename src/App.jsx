
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Plan from './pages/Plan'
import Itinerary from './pages/Itinerary'
import Navbar from './components/Navbar'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/itinerary" element={<Itinerary />} />
    </Routes>
    </>
  )
}

export default App
