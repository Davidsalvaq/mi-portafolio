import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Admin from './pages/Admin'
import LoadingScreen from './components/LoadingScreen'
import { LanguageProvider, useLang } from './context/LanguageContext'

function Footer() {
  const { lang } = useLang()
  return (
    <footer className="px-6 md:px-12 py-8 border-t border-[#1e1e1e] flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-xs text-[#6b6760]">© 2026 David Salvador Quijada García</p>
      <div className="flex items-center gap-4">
        <p className="text-xs text-[#6b6760]">
          {lang === 'es' ? 'Diseñado y construido por mí.' : 'Designed and built by me.'}
        </p>
        <a href="/admin" title="Admin" className="text-[#6b6760] hover:text-[#c9a96e] transition-colors duration-200">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </a>
      </div>
    </footer>
  )
}

function Portfolio() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://mi-portafolio-api-1.onrender.com/api/stats').catch(() => {})
  }, [])

  return (
    <LanguageProvider>
      <>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        <div
          className="bg-[#0a0a0a] text-white min-h-screen"
          style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.9s ease 0.1s' }}
        >
          <Navbar />
          <Hero />
          <Marquee />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </>
    </LanguageProvider>
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