import { AnimatedSection, AnimatedItem } from './AnimatedSection'

function About() {
  const skills = [
    { category: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs'] },
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
              Soy estudiante de Ingeniería en Ciencias de la Computación en UNICAH, Honduras. Me especializo en desarrollo web full-stack, combinando diseño y funcionalidad para crear experiencias digitales que tienen impacto real.
            </p>
            <p className="text-[#6b6760] text-sm leading-loose">
              Cada proyecto que construyo es una oportunidad de aprender, iterar y mejorar. No solo escribo código — resuelvo problemas.
            </p>
          </AnimatedSection>
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