import { useState, useEffect } from 'react'
import { getProjects } from '../services/api'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects(filter)
        setProjects(data)
      } catch (error) {
        console.error('Error cargando proyectos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [filter])

  const categories = [
    { value: '', label: 'Todos' },
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Móvil' },
    { value: 'desktop', label: 'Escritorio' },
  ]

  return (
    <section id="projects" className="px-6 md:px-12 py-24 md:py-36 border-t border-[#1e1e1e]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#c9a96e]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#c9a96e]">Proyectos</span>
          </div>
          <h2 className="font-black text-4xl md:text-5xl leading-tight tracking-tight" style={{fontFamily: 'Syne, sans-serif'}}>
            Lo que he construido.
          </h2>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                filter === value
                  ? 'border-[#c9a96e] text-[#e8d5b0] bg-[#161616]'
                  : 'border-[#1e1e1e] text-[#6b6760] hover:border-[#c9a96e] hover:text-[#e8d5b0]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="border border-[#1e1e1e] p-20 flex items-center justify-center">
          <div className="w-px h-16 bg-[#c9a96e] animate-pulse" />
        </div>
      )}

      {/* Sin proyectos */}
      {!loading && projects.length === 0 && (
        <div className="border border-[#1e1e1e] p-10 md:p-20 flex flex-col items-center justify-center text-center">
          <div className="w-px h-16 bg-[#1e1e1e] mb-8" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6b6760] mb-3">En construcción</p>
          <p className="text-sm text-[#6b6760] max-w-xs leading-relaxed">
            Los proyectos aparecerán aquí pronto.
          </p>
        </div>
      )}

      {/* Grid de proyectos */}
      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1e1e]">
          {projects.map((project) => (
            <div key={project._id} className="bg-[#0a0a0a] p-8 flex flex-col gap-4 group hover:bg-[#161616] transition-colors duration-200">
              {project.image && (
                <img src={project.image} alt={project.title_es} className="w-full h-48 object-cover" />
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#c9a96e]">{project.category}</span>
                {project.featured && <span className="text-xs uppercase tracking-widest text-[#6b6760]">Destacado</span>}
              </div>
              <h3 className="font-black text-xl text-white" style={{fontFamily: 'Syne, sans-serif'}}>{project.title_es}</h3>
              <p className="text-sm text-[#6b6760] leading-relaxed">{project.description_es}</p>
              <div className="flex flex-wrap gap-2">
                {project.techs.map(tech => (
                  <span key={tech} className="text-xs border border-[#1e1e1e] px-3 py-1 text-[#6b6760]">{tech}</span>
                ))}
              </div>
              <div className="flex gap-4 mt-2">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">GitHub →</a>
                )}
                {project.live_url && (
                  <a href={project.live_url} target="_blank" className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors duration-200">Ver proyecto →</a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Projects
