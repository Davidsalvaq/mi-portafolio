import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <footer className="px-12 py-8 border-t border-[#1e1e1e] flex justify-between items-center">
        <p className="text-xs text-[#6b6760]">© 2026 David Salvador Quijada García</p>
        <p className="text-xs text-[#6b6760]">Diseñado y construido por mí.</p>
      </footer>
    </div>
  )
}

export default App