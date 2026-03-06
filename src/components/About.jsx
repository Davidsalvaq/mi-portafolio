function About() {
  const stack = ['C / C++', 'HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git']

  return (
    <section id="about" className="px-6 md:px-12 py-24 md:py-36 border-t border-[#1e1e1e] grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

      {/* Izquierda */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#c9a96e]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#c9a96e]">Sobre mí</span>
        </div>
        <h2 className="font-black leading-tight tracking-tight mb-7 text-4xl md:text-5xl" style={{fontFamily: 'Syne, sans-serif'}}>
          Código con<br />propósito.
        </h2>
        <p className="text-[#6b6760] text-sm leading-loose mb-12">
          Tengo 19 años y estudio Ingeniería en Ciencias de la Computación en la UCAH.
          Desarrollo software en C, C++, JavaScript y web. Aplico buenas prácticas
          de ingeniería en cada proyecto que tomo.
        </p>
        <div className="grid grid-cols-2 gap-px bg-[#1e1e1e]">
          {[
            { num: '19', label: 'Años' },
            { num: '3+', label: 'Proyectos' },
            { num: '2023', label: 'Inicio carrera' },
            { num: 'ES/EN', label: 'Idiomas' },
          ].map(({ num, label }) => (
            <div key={label} className="bg-[#161616] px-6 py-5">
              <div className="font-black text-3xl text-[#e8d5b0] mb-1" style={{fontFamily: 'Syne, sans-serif'}}>{num}</div>
              <div className="text-xs uppercase tracking-widest text-[#6b6760]">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Derecha */}
      <div className="pt-2">
        <p className="text-xs uppercase tracking-[0.15em] text-[#6b6760] mb-5 font-medium">Stack & Herramientas</p>
        <div className="flex flex-wrap gap-2 mb-12">
          {stack.map(tech => (
            <span key={tech} className="text-xs tracking-wide text-white border border-[#1e1e1e] bg-[#161616] px-4 py-2 hover:border-[#c9a96e] hover:text-[#e8d5b0] transition-colors duration-200 cursor-default">
              {tech}
            </span>
          ))}
        </div>
        <p className="text-xs uppercase tracking-[0.15em] text-[#6b6760] mb-5 font-medium">Formación complementaria</p>
        <div className="flex flex-col">
          {[
            { name: 'Programación Web — HTML, CSS & JS', year: '2024' },
            { name: 'Bases de Datos', year: '2025' },
          ].map(({ name, year }) => (
            <div key={name} className="flex justify-between items-center py-4 border-b border-[#1e1e1e] gap-4">
              <span className="text-sm text-white">{name}</span>
              <span className="text-xs text-[#6b6760] tabular-nums shrink-0">{year}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default About
