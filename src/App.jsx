import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Admin from './pages/Admin'

function Portfolio() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Contact />
      <footer className="px-6 md:px-12 py-8 border-t border-[#1e1e1e] flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[#6b6760]">© 2026 David Salvador Quijada García</p>
        <div className="flex items-center gap-4">
          <p className="text-xs text-[#6b6760]">Diseñado y construido por mí.</p>
          <a href="/admin" title="Admin" className="text-[#6b6760] hover:text-[#c9a96e] transition-colors duration-200">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}

function App() {
  const isAdmin = window.location.pathname.startsWith('/admin')

  if (isAdmin) {
    return <Admin />
  }

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