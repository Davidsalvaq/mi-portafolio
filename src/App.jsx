import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Admin from './pages/Admin'

function Portfolio() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <footer className="px-6 md:px-12 py-8 border-t border-[#1e1e1e] flex flex-col sm:flex-row justify-between items-center gap-4">
  <p className="text-xs text-[#6b6760]">© 2026 David Salvador Quijada García</p>
  <div className="flex items-center gap-4">
    <p className="text-xs text-[#6b6760]">Diseñado y construido por mí.</p>
    <a href="/admin" className="text-[#0a0a0a] hover:text-[#1e1e1e] transition-colors duration-200 select-none">·</a>
  </div>
</footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App