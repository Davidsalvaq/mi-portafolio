function Contact() {
  const links = [
    { name: 'GitHub', handle: 'Davidsalvaq', url: 'https://github.com/Davidsalvaq' },
    { name: 'LinkedIn', handle: 'David Quijada', url: 'https://www.linkedin.com/in/david-quijada-242775380/' },
    { name: 'Instagram', handle: '@davi_sqg', url: 'https://www.instagram.com/davi_sqg/' },
  ]

  return (
    <section id="contact" className="px-6 md:px-12 py-24 md:py-36 border-t border-[#1e1e1e] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#c9a96e]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#c9a96e]">Contacto</span>
        </div>
        <h2 className="font-black leading-none tracking-tight mb-6" style={{fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 5vw, 80px)'}}>
          Hablemos.<br />
          <span className="text-transparent" style={{WebkitTextStroke: '1px rgba(240,236,228,0.2)'}}>Construyamos.</span>
        </h2>
        <p className="text-[#6b6760] text-sm leading-loose mb-10 md:mb-12">
          ¿Tienes un proyecto en mente o quieres colaborar? Estoy disponible.
        </p>
        <div className="flex flex-col">
          {links.map(({ name, handle, url }) => (
            <a key={name} href={url} target="_blank"
              className="flex justify-between items-center py-5 border-b border-[#1e1e1e] group hover:pl-3 transition-all duration-200">
              <span className="text-sm text-white group-hover:text-[#e8d5b0] transition-colors duration-200">{name}</span>
              <span className="text-xs uppercase tracking-widest text-[#6b6760]">{handle} →</span>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-[#161616] border border-[#1e1e1e] p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.15em] text-[#6b6760] mb-4">Correo directo</p>
        <p className="font-bold text-base md:text-lg text-[#e8d5b0] mb-8 break-all" style={{fontFamily: 'Syne, sans-serif'}}>
          salvadorenginneer@gmail.com
        </p>
        <a href="mailto:salvadorenginneer@gmail.com"
          className="flex items-center gap-3 bg-[#e8d5b0] text-[#0a0a0a] px-7 py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#c9a96e] transition-all duration-200 w-fit">
          Enviar mensaje
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  )
}

export default Contact

