import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection, AnimatedItem, AnimatedFade } from './AnimatedSection'
import { useLang } from '../context/LanguageContext'
import { getProjects } from '../services/api'

const easing = [0.22, 1, 0.36, 1]

const t = {
  es: {
    label: 'Proyectos',
    title: 'Lo que he construido.',
    categories: [
      { value: '', label: 'Todos' },
      { value: 'web', label: 'Web' },
      { value: 'mobile', label: 'Móvil' },
      { value: 'desktop', label: 'Escritorio' },
    ],
    featured: 'Destacado',
    empty: 'En construcción',
    emptyDesc: 'Los proyectos aparecerán aquí pronto.',
    github: 'GitHub',
    live: 'Ver proyecto',
  },
  en: {
    label: 'Projects',
    title: 'What I have built.',
    categories: [
      { value: '', label: 'All' },
      { value: 'web', label: 'Web' },
      { value: 'mobile', label: 'Mobile' },
      { value: 'desktop', label: 'Desktop' },
    ],
    featured: 'Featured',
    empty: 'Coming soon',
    emptyDesc: 'Projects will appear here soon.',
    github: 'GitHub',
    live: 'View project',
  }
}

function Projects() {
  const { lang } = useLang()
  const tx = t[lang]
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setLoading(true)
    getProjects(filter)
      .then(data => setProjects(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [filter])

  return (
    <section id="projects" className="px-6 md:px-12 py-24 md:py-36 border-t border-[#1e1e1e]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-16 gap-6">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#c9a96e]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#c9a96e]">{tx.label}</span>
          </div>
          <h2 className="font-black text-4xl md:text-5xl leading-tight tracking-tight" style={{fontFamily: 'Syne, sans-serif'}}>
            {tx.title}
          </h2>
        </AnimatedSection>

        <AnimatedFade delay={0.2}>
          <div className="flex gap-2 flex-wrap">
            {tx.categories.map(({ value, label }) => (
              <button key={value} onClick={() => setFilter(value)}
                className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
                  filter === value
                    ? 'border-[#c9a96e] text-[#e8d5b0] bg-[#161616]'
                    : 'border-[#1e1e1e] text-[#6b6760] hover:border-[#c9a96e] hover:text-[#e8d5b0]'
                }`}>
                {label}
              </button>
            ))}
          </div>
        </AnimatedFade>
      </div>

      {loading && (
        <div className="border border-[#1e1e1e] p-20 flex items-center justify-center">
          <div className="w-px h-16 bg-[#c9a96e] animate-pulse" />
        </div>
      )}

      {!loading && projects.length === 0 && (
        <AnimatedFade>
          <div className="border border-[#1e1e1e] p-10 md:p-20 flex flex-col items-center justify-center text-center">
            <div className="w-px h-16 bg-[#1e1e1e] mb-8" />
            <p className="text-xs uppercase tracking-[0.2em] text-[#6b6760] mb-3">{tx.empty}</p>
            <p className="text-sm text-[#6b6760] max-w-xs leading-relaxed">{tx.emptyDesc}</p>
          </div>
        </AnimatedFade>
      )}

      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1e1e]">
          <AnimatePresence>
            {projects.map((project, i) => (
              <AnimatedItem key={project._id} delay={i * 0.08}>
                <motion.div
                  className="bg-[#0a0a0a] p-8 flex flex-col gap-4 group cursor-default h-full"
                  whileHover={{ backgroundColor: '#111111' }}
                  transition={{ duration: 0.3 }}
                >
                  {project.image && (
                    <div className="overflow-hidden">
                      <motion.img src={project.image} alt={lang === 'es' ? project.title_es : project.title_en}
                        className="w-full h-48 object-cover"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.5, ease: easing }}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#c9a96e]">{project.category}</span>
                    {project.featured && <span className="text-xs uppercase tracking-widest text-[#6b6760]">{tx.featured}</span>}
                  </div>
                  <h3 className="font-black text-xl text-white group-hover:text-[#e8d5b0] transition-colors duration-300" style={{fontFamily: 'Syne, sans-serif'}}>
                    {lang === 'es' ? project.title_es : (project.title_en || project.title_es)}
                  </h3>
                  <p className="text-sm text-[#6b6760] leading-relaxed">
                    {lang === 'es' ? project.description_es : (project.description_en || project.description_es)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techs.map(tech => (
                      <span key={tech} className="text-xs border border-[#1e1e1e] px-3 py-1 text-[#6b6760]">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-2">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">{tx.github} →</a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">{tx.live} →</a>
                    )}
                  </div>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}

export default Projects