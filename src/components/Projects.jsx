function Projects() {
  return (
    <section id="projects" className="px-6 md:px-12 py-24 md:py-36 border-t border-[#1e1e1e]">
      <div className="flex justify-between items-end mb-12 md:mb-16">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#c9a96e]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#c9a96e]">Proyectos</span>
          </div>
          <h2 className="font-black text-4xl md:text-5xl leading-tight tracking-tight" style={{fontFamily: 'Syne, sans-serif'}}>
            Lo que he construido.
          </h2>
        </div>
      </div>

      <div className="border border-[#1e1e1e] p-10 md:p-20 flex flex-col items-center justify-center text-center">
        <div className="w-px h-16 bg-[#1e1e1e] mb-8" />
        <p className="text-xs uppercase tracking-[0.2em] text-[#6b6760] mb-3">En construcción</p>
        <p className="text-sm text-[#6b6760] max-w-xs leading-relaxed">
          Los proyectos aparecerán aquí pronto.
        </p>
      </div>
    </section>
  )
}

export default Projects