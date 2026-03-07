import { useEffect, useRef, useState } from 'react'
import { AnimatedSection, AnimatedItem } from './AnimatedSection'

const API_URL = 'https://mi-portafolio-api-1.onrender.com'

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start || typeof target === 'string') return
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target, start])
  return typeof target === 'string' ? target : count
}

function StatCard({ label, value, started, suffix = '' }) {
  const count = useCountUp(value, 2000, started)
  return (
    <div className="border border-[#1e1e1e] p-6 flex flex-col gap-2">
      <span className="font-black text-4xl text-white" style={{fontFamily: 'Syne, sans-serif'}}>
        {count}{suffix}
      </span>
      <span className="text-xs uppercase tracking-[0.2em] text-[#6b6760]">{label}</span>
    </div>
  )
}

function About() {
  const [stats, setStats] = useState({ projects: 0, years_coding: 2, commitment: '100%' })
  const [started, setStarted] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    fetch(`${API_URL}/api/stats`)
      .then(r => r.json())
      .then(d => { if (d.success) setStats(d.data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const skills = [
    { category: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs'] },
    { category: 'Lenguajes', items: ['JavaScript', 'Java', 'C++'] },
    { category: 'Herramientas', items: ['Git', 'GitHub', 'Vercel', 'Render'] },
  ]

  return (
    <section id="about" className="px-6 md:px-12 py-24 md:py-36 border-t border-[#1e1e1e]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#c9a96e]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#c9a96e]">Sobre mí</span>
            </div>
            <h2 className="font-black text-4xl md:text-5xl leading-tight tracking-tight mb-8" style={{fontFamily: 'Syne, sans-serif'}}>
              Construyo con propósito.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-[#6b6760] text-sm leading-loose mb-6">
              Estudio Ingeniería en Computación en UNICAH, Honduras. Mientras tanto construyo — interfaces, APIs, aplicaciones completas.
            </p>
            <p className="text-[#6b6760] text-sm leading-loose mb-10">
              Me importa que lo que hago funcione bien y tenga sentido para quien lo usa.
            </p>
          </AnimatedSection>

          {/* Stats animados */}
          <div ref={statsRef} className="grid grid-cols-3 gap-3">
            <StatCard label="Proyectos" value={stats.projects} started={started} />
            <StatCard label="Años coding" value={stats.years_coding} started={started} suffix="+" />
            <StatCard label="Compromiso" value={stats.commitment} started={started} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {skills.map(({ category, items }, i) => (
            <AnimatedItem key={category} delay={i * 0.1}>
              <div className="border border-[#1e1e1e] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span key={item} className="text-xs border border-[#1e1e1e] px-3 py-1.5 text-[#6b6760] hover:border-[#c9a96e] hover:text-white transition-all duration-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About