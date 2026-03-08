import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../context/LanguageContext'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggle } = useLang()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const links = {
    es: [
      { label: 'Sobre mí', id: 'about' },
      { label: 'Proyectos', id: 'projects' },
      { label: 'Contacto', id: 'contact' },
    ],
    en: [
      { label: 'About', id: 'about' },
      { label: 'Projects', id: 'projects' },
      { label: 'Contact', id: 'contact' },
    ]
  }

  const navLinks = links[lang]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${
      scrolled ? 'border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-xl' : ''
    }`}>

      <motion.a
        href="#home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-black text-lg tracking-tight"
        style={{fontFamily: 'Syne, sans-serif'}}
      >
        D<span className="text-[#c9a96e]">.</span>Quijada
      </motion.a>

      {/* Links escritorio */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden md:flex gap-10 list-none items-center"
      >
        {navLinks.map(({ label, id }) => (
          <li key={id} className="relative group">
            <button
              onClick={() => scrollTo(id)}
              className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200"
            >
              {label}
            </button>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a96e] group-hover:w-full transition-all duration-300" />
          </li>
        ))}

        {/* Botón idioma */}
        <li>
          <button
            onClick={toggle}
            className="text-xs uppercase tracking-widest border border-[#1e1e1e] px-3 py-1.5 text-[#6b6760] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-200"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </li>
      </motion.ul>

      {/* Hamburguesa */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-5 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </motion.button>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#1e1e1e] px-6 py-6 flex flex-col gap-6"
          >
            {navLinks.map(({ label, id }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                onClick={() => scrollTo(id)}
                className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200 text-left"
              >
                {label}
              </motion.button>
            ))}
            <button
              onClick={toggle}
              className="text-xs uppercase tracking-widest border border-[#1e1e1e] px-3 py-1.5 text-[#6b6760] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-200 w-fit"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar