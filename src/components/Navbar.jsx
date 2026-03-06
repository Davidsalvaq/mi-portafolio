import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-300 ${
      scrolled ? 'border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-xl' : ''
    }`}>
      <a href="#home" className="font-black text-lg tracking-tight" style={{fontFamily: 'Syne, sans-serif'}}>
        D<span className="text-[#c9a96e]">.</span>Quijada
      </a>

      {/* Links escritorio */}
      <ul className="hidden md:flex gap-10 list-none items-center">
        <li><a href="#about" className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">Sobre mí</a></li>
        <li><a href="#projects" className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">Proyectos</a></li>
        <li><a href="#contact" className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">Contacto</a></li>
      </ul>

      {/* Botón hamburguesa móvil */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`w-5 h-px bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-5 h-px bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-5 h-px bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#1e1e1e] px-6 py-6 flex flex-col gap-6">
          <a href="#about" onClick={closeMenu} className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">Sobre mí</a>
          <a href="#projects" onClick={closeMenu} className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">Proyectos</a>
          <a href="#contact" onClick={closeMenu} className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">Contacto</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
