function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-20 relative">

      {/* Grid de fondo */}
      <div className="absolute inset-0 pointer-events-none"
        
        style={{
          backgroundImage: 'linear-gradient(rgba(232,213,176,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,213,176,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)'
        }}
      />

      {/* Badge disponible */}
      <div className="absolute top-24 right-6 md:right-12 flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 border border-[#1e1e1e] bg-[#161616] text-[#6b6760] text-xs md:text-sm">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
        <span className="hidden sm:inline">Disponible para proyectos</span>
        <span className="sm:hidden">Disponible</span>
      </div>

      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-px bg-[#c9a96e]" />
        <span className="text-xs uppercase tracking-[0.15em] text-[#c9a96e]">Desarrollador Web · Honduras</span>
      </div>

      {/* Nombre */}
      <h1 className="font-black leading-none mb-8" style={{fontFamily: 'Syne, sans-serif', fontSize: 'clamp(40px, 12vw, 120px)', letterSpacing: '-2px'}}>
        David<br />
        <span className="text-transparent" style={{WebkitTextStroke: '1px rgba(240,236,228,0.3)'}}>Quijada</span>
      </h1>

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-8 sm:gap-4">
        <p className="text-[#6b6760] text-sm leading-relaxed max-w-sm">
          <span className="text-white">Computer Science Student — UNICAH.</span><br />
          Construyendo interfaces que combinan lógica y estética.
        </p>
        <div className="flex flex-col items-start sm:items-end gap-4">
          <button
  onClick={() => window.scrollTo({ top: document.getElementById('projects').offsetTop, behavior: 'smooth' })}
  className="flex items-center gap-3 bg-[#e8d5b0] text-[#0a0a0a] px-7 py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#c9a96e] transition-all duration-200 hover:-translate-y-0.5">
  Ver proyectos
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
</button>
          <span className="text-xs uppercase tracking-widest text-[#6b6760] opacity-60">↓ Scroll para explorar</span>
        </div>
      </div>

    </section>
  )
}

export default Hero