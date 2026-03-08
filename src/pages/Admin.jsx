import { useState, useEffect, useCallback } from 'react'
import { login, logout, getToken, getProjects, createProject, updateProject, deleteProject, updateStats } from '../services/api'

const API_URL = 'https://mi-portafolio-api-1.onrender.com'
const MAX_ATTEMPTS = 5
const LOCKOUT_KEY = 'admin_lockout'
const ATTEMPTS_KEY = 'admin_attempts'
const INACTIVITY_LIMIT = 2 * 60 * 1000

const emptyForm = {
  title_es: '', title_en: '',
  description_es: '', description_en: '',
  category: 'web',
  image: '',
  techs: '',
  github_url: '',
  live_url: '',
  featured: false,
  order: 0
}

function Admin() {
  const [authed, setAuthed] = useState(!!getToken())
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [attempts, setAttempts] = useState(() => parseInt(localStorage.getItem(ATTEMPTS_KEY) || '0'))
  const [lockedOut, setLockedOut] = useState(() => {
    const lockout = localStorage.getItem(LOCKOUT_KEY)
    return lockout ? Date.now() < parseInt(lockout) : false
  })
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [years, setYears] = useState(2)
  const [projectsOverride, setProjectsOverride] = useState(0)
  const [statsMsg, setStatsMsg] = useState('')
  const [statsLoading, setStatsLoading] = useState(false)

  const resetTimer = useCallback(() => {
    if (!authed) return
    clearTimeout(window._adminTimer)
    window._adminTimer = setTimeout(() => {
      logout()
      setAuthed(false)
    }, INACTIVITY_LIMIT)
  }, [authed])

  useEffect(() => {
    if (!authed) return
    const events = ['mousemove', 'keydown', 'click', 'scroll']
    events.forEach(e => window.addEventListener(e, resetTimer))
    resetTimer()
    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer))
      clearTimeout(window._adminTimer)
    }
  }, [authed, resetTimer])

  useEffect(() => {
    if (authed) {
      fetchProjects()
      fetch(`${API_URL}/api/stats`)
        .then(r => r.json())
        .then(d => {
          if (d.success) {
            setYears(d.data.years_coding)
          }
        })
        .catch(() => {})
    }
  }, [authed])

  const fetchProjects = async () => {
    const data = await getProjects()
    setProjects(data)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (lockedOut) return
    const ok = await login(password)
    if (ok) {
      setAuthed(true)
      setLoginError('')
      setAttempts(0)
      localStorage.removeItem(ATTEMPTS_KEY)
      localStorage.removeItem(LOCKOUT_KEY)
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      localStorage.setItem(ATTEMPTS_KEY, newAttempts)
      if (newAttempts >= MAX_ATTEMPTS) {
        const lockUntil = Date.now() + 24 * 60 * 60 * 1000
        localStorage.setItem(LOCKOUT_KEY, lockUntil)
        setLockedOut(true)
        setLoginError('locked')
      } else {
        setLoginError(`Contraseña incorrecta. ${MAX_ATTEMPTS - newAttempts} intento${MAX_ATTEMPTS - newAttempts === 1 ? '' : 's'} restante${MAX_ATTEMPTS - newAttempts === 1 ? '' : 's'}.`)
      }
    }
  }

  const handleLogout = () => { logout(); setAuthed(false) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = {
      ...form,
      techs: form.techs.split(',').map(t => t.trim()).filter(Boolean)
    }
    try {
      if (editing) {
        await updateProject(editing, payload)
        setMsg('✅ Proyecto actualizado')
      } else {
        await createProject(payload)
        setMsg('✅ Proyecto creado')
      }
      setForm(emptyForm)
      setEditing(null)
      fetchProjects()
    } catch (err) {
      setMsg('❌ Error al guardar')
    }
    setLoading(false)
    setTimeout(() => setMsg(''), 3000)
  }

  const handleEdit = (project) => {
    setEditing(project._id)
    setForm({ ...project, techs: project.techs.join(', ') })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Borrar este proyecto?')) return
    await deleteProject(id)
    fetchProjects()
  }

  const handleUpdateStats = async (e) => {
    e.preventDefault()
    setStatsLoading(true)
    try {
      await updateStats({
        years_coding: parseInt(years),
        projects_override: parseInt(projectsOverride)
      })
      setStatsMsg('✅ Estadísticas actualizadas')
    } catch {
      setStatsMsg('❌ Error al actualizar')
    }
    setStatsLoading(false)
    setTimeout(() => setStatsMsg(''), 3000)
  }

  if (!authed) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-6 h-px bg-[#c9a96e]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#c9a96e]">Panel Admin</span>
        </div>
        <h1 className="font-black text-4xl mb-8 text-white" style={{fontFamily: 'Syne, sans-serif'}}>
          Acceso<br />restringido.
        </h1>
        {lockedOut ? (
          <div className="border border-red-900 bg-red-950/30 p-6">
            <p className="text-red-400 text-xs leading-relaxed uppercase tracking-widest mb-2">Acceso bloqueado</p>
            <p className="text-[#e8d5b0] text-sm leading-relaxed">
              Has alcanzado el límite de intentos. Podrás intentarlo de nuevo en <span className="text-white font-bold">2,000 años</span> — ¡aproximadamente el mismo tiempo que tardó en construirse la Gran Muralla China!
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
            />
            {loginError && loginError !== 'locked' && (
              <p className="text-red-400 text-xs">{loginError}</p>
            )}
            <button type="submit" className="bg-[#e8d5b0] text-[#0a0a0a] px-7 py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#c9a96e] transition-all duration-200">
              Entrar
            </button>
            {attempts > 0 && (
              <div className="flex gap-1 mt-1">
                {Array.from({length: MAX_ATTEMPTS}).map((_, i) => (
                  <div key={i} className={`h-0.5 flex-1 ${i < attempts ? 'bg-red-500' : 'bg-[#1e1e1e]'}`} />
                ))}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 md:px-12 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-[#c9a96e]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#c9a96e]">Admin</span>
          </div>
          <h1 className="font-black text-3xl text-white" style={{fontFamily: 'Syne, sans-serif'}}>Panel de proyectos</h1>
        </div>
        <div className="flex gap-4 items-center">
          <a href="/" className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors">← Portafolio</a>
          <button onClick={handleLogout} className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-white transition-colors">Cerrar sesión</button>
        </div>
      </div>

      {/* Sección estadísticas */}
      <div className="border border-[#1e1e1e] p-8 mb-12">
        <h2 className="font-black text-xl text-white mb-2" style={{fontFamily: 'Syne, sans-serif'}}>Estadísticas</h2>
        <p className="text-xs text-[#6b6760] mb-6">Proyectos en portafolio: <span className="text-white">{projects.length}</span> — Si dejas el override en 0, se muestra el conteo real automático.</p>
        {statsMsg && <p className="mb-4 text-sm text-[#e8d5b0]">{statsMsg}</p>}
        <form onSubmit={handleUpdateStats} className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-[#6b6760]">Años coding</label>
            <input
              type="number" min="0"
              value={years}
              onChange={e => setYears(e.target.value)}
              className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors w-32"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-[#6b6760]">Proyectos (override)</label>
            <input
              type="number" min="0"
              value={projectsOverride}
              onChange={e => setProjectsOverride(e.target.value)}
              className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors w-32"
            />
          </div>
          <button type="submit" disabled={statsLoading}
            className="bg-[#e8d5b0] text-[#0a0a0a] px-7 py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#c9a96e] transition-all duration-200 disabled:opacity-50">
            {statsLoading ? 'Guardando...' : 'Actualizar'}
          </button>
        </form>
      </div>

      {msg && <p className="mb-6 text-sm text-[#e8d5b0]">{msg}</p>}

      <div className="border border-[#1e1e1e] p-8 mb-12">
        <h2 className="font-black text-xl text-white mb-6" style={{fontFamily: 'Syne, sans-serif'}}>
          {editing ? 'Editar proyecto' : 'Agregar proyecto'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required placeholder="Título (español)" value={form.title_es} onChange={e => setForm({...form, title_es: e.target.value})}
            className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors" />
          <input required placeholder="Title (English)" value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})}
            className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors" />
          <textarea required placeholder="Descripción (español)" value={form.description_es} onChange={e => setForm({...form, description_es: e.target.value})}
            className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors md:col-span-2 h-24 resize-none" />
          <textarea required placeholder="Description (English)" value={form.description_en} onChange={e => setForm({...form, description_en: e.target.value})}
            className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors md:col-span-2 h-24 resize-none" />
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
            className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors">
            <option value="web">Web</option>
            <option value="mobile">Móvil</option>
            <option value="desktop">Escritorio</option>
            <option value="tool">Herramienta</option>
          </select>
          <input placeholder="URL de imagen" value={form.image} onChange={e => setForm({...form, image: e.target.value})}
            className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors" />
          <input placeholder="Tecnologías (separadas por coma)" value={form.techs} onChange={e => setForm({...form, techs: e.target.value})}
            className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors md:col-span-2" />
          <input placeholder="URL de GitHub" value={form.github_url} onChange={e => setForm({...form, github_url: e.target.value})}
            className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors" />
          <input placeholder="URL del proyecto en vivo" value={form.live_url} onChange={e => setForm({...form, live_url: e.target.value})}
            className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors" />
          <div className="flex items-center gap-3 md:col-span-2">
            <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} />
            <label htmlFor="featured" className="text-xs uppercase tracking-widest text-[#6b6760]">Proyecto destacado</label>
          </div>
          <div className="flex gap-4 md:col-span-2">
            <button type="submit" disabled={loading}
              className="bg-[#e8d5b0] text-[#0a0a0a] px-7 py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#c9a96e] transition-all duration-200 disabled:opacity-50">
              {loading ? 'Guardando...' : editing ? 'Actualizar' : 'Guardar proyecto'}
            </button>
            {editing && (
              <button type="button" onClick={() => { setEditing(null); setForm(emptyForm) }}
                className="border border-[#1e1e1e] text-[#6b6760] px-7 py-3 text-xs uppercase tracking-widest hover:border-[#c9a96e] hover:text-white transition-all duration-200">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 className="font-black text-xl text-white mb-6" style={{fontFamily: 'Syne, sans-serif'}}>
        Proyectos ({projects.length})
      </h2>
      {projects.length === 0 ? (
        <p className="text-sm text-[#6b6760]">No hay proyectos aún.</p>
      ) : (
        <div className="flex flex-col gap-px bg-[#1e1e1e]">
          {projects.map(project => (
            <div key={project._id} className="bg-[#0a0a0a] px-6 py-5 flex justify-between items-center">
              <div>
                <p className="text-sm text-white font-medium">{project.title_es}</p>
                <p className="text-xs text-[#6b6760] uppercase tracking-widest mt-1">{project.category}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleEdit(project)} className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-[#e8d5b0] transition-colors">Editar</button>
                <button onClick={() => handleDelete(project._id)} className="text-xs uppercase tracking-widest text-[#6b6760] hover:text-red-400 transition-colors">Borrar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Admin