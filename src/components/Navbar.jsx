import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-12 py-6 flex justify-between items-center transition-all duration-300 ${
      scrolled ? 'border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-xl' : ''
    }`}>
      <a href="#home" className="font-black text-lg tracking-tight" style={{fontFamily: 'Syne, sans-serif'}}>
        D<span className="text-[#c9a96e]">.</span>Quijada
      </a>
      <ul className="flex gap-10 list-none items-center">
        <li><a href="#about" className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">Sobre mí</a></li>
        <li><a href="#projects" className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">Proyectos</a></li>
        <li><a href="#contact" className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">Contacto</a></li>
      </ul>
    </nav>
  )
}

export default Navbar