import { useEffect, useState } from 'react'
import { AnimatedSection, AnimatedItem } from './AnimatedSection'
import { useLang } from '../context/LanguageContext'

const API_URL = 'https://mi-portafolio-api-1.onrender.com'

const t = {
  es: {
    label: 'Sobre mí',
    title: 'Construyo con propósito.',
    p1: 'Estudio Ingeniería en Computación en UNICAH, Honduras. Mientras tanto construyo — interfaces, APIs, aplicaciones completas.',
    p2: 'Me importa que lo que hago funcione bien y tenga sentido para quien lo usa.',
    projects: 'Proyectos',
    years: 'Años coding',
    commitment: 'Compromiso',
    skills: [
      { category: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'] },
      { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs'] },
      { category: 'Lenguajes', items: ['JavaScript', 'Java', 'C++'] },
      { category: 'Herramientas', items: ['Git', 'GitHub', 'Vercel', 'Render'] },
    ]
  },
  en: {
    label: 'About me',
    title: 'I build with purpose.',
    p1: 'I study Computer Engineering at UNICAH, Honduras. Meanwhile I build — interfaces, APIs, full applications.',
    p2: 'I care that what I make works well and makes sense for whoever uses it.',
    projects: 'Projects',
    years: 'Years coding',
    commitment: 'Commitment',
    skills: [
      { category: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'] },
      { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs'] },
      { category: 'Languages', items: ['JavaScript', 'Java', 'C++'] },
      { category: 'Tools', items: ['Git', 'GitHub', 'Vercel', 'Render'] },
    ]
  }
}

function StatCard({ label, value, suffix = '' }) {
  return (
    <div className="border border-[#1e1e1e] p-4 flex flex-col gap-2">
      <span className="font-black text-3xl text-white" style={{fontFamily: 'Syne, sans-serif'}}>
        {value}{suffix}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-[#6b6760] leading-tight">{label}</span>
    </div>
  )
}

function About() {
  const { lang } = useLang()
  const tx = t[lang]
  const [projects, setProjects] = useState(0)
  const [years, setYears] = useState(2)

  useEffect(() => {
    fetch(`${API_URL}/api/stats`)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setProjects(d.data.projects)
          setYears(d.data.years_coding)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="about" className="px-6 md:px-12 py-24 md:py-36 border-t border-[#1e1e1e]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#c9a96e]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#c9a96e]">{tx.label}</span>
            </div>
            <h2 className="font-black text-4xl md:text-5xl leading-tight tracking-tight mb-8" style={{fontFamily: 'Syne, sans-serif'}}>
              {tx.title}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-[#6b6760] text-sm leading-loose mb-6">{tx.p1}</p>
            <p className="text-[#6b6760] text-sm leading-loose mb-10">{tx.p2}</p>
          </AnimatedSection>

          <div className="grid grid-cols-3 gap-3">
            <StatCard label={tx.projects} value={projects} />
            <StatCard label={tx.years} value={years} suffix="+" />
            <StatCard label={tx.commitment} value={100} suffix="%" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {tx.skills.map(({ category, items }, i) => (
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