import { useState, useEffect, useCallback } from 'react'
import { login, logout, getToken, getProjects, createProject, updateProject, deleteProject } from '../services/api'

const TIMEOUT_MINUTES = 2
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
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [timeoutWarning, setTimeoutWarning] = useState(false)

  // Auto-cierre de sesión por inactividad
  const handleLogout = useCallback(() => {
    logout()
    setAuthed(false)
    setTimeoutWarning(false)
  }, [])

  useEffect(() => {
    if (!authed) return

    let warningTimer
    let logoutTimer

    const resetTimers = () => {
      clearTimeout(warningTimer)
      clearTimeout(logoutTimer)
      setTimeoutWarning(false)

      warningTimer = setTimeout(() => {
        setTimeoutWarning(true)
      }, (TIMEOUT_MINUTES * 60 - 30) * 1000) // 30 segundos antes avisa

      logoutTimer = setTimeout(() => {
        handleLogout()
      }, TIMEOUT_MINUTES * 60 * 1000)
    }

    const events = ['mousemove', 'keydown', 'click', 'scroll']
    events.forEach(e => window.addEventListener(e, resetTimers))
    resetTimers()

    return () => {
      clearTimeout(warningTimer)
      clearTimeout(logoutTimer)
      events.forEach(e => window.removeEventListener(e, resetTimers))
    }
  }, [authed, handleLogout])

  useEffect(() => {
    if (authed) fetchProjects()
  }, [authed])

  const fetchProjects = async () => {
    const data = await getProjects()
    setProjects(data)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const ok = await login(password)
    if (ok) { setAuthed(true); setLoginError('') }
    else setLoginError('Contraseña incorrecta')
  }

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

  // ── Login ──────────────────────────────────────────────────────
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
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors"
          />
          {loginError && <p className="text-red-400 text-xs">{loginError}</p>}
          <button type="submit" className="bg-[#e8d5b0] text-[#0a0a0a] px-7 py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#c9a96e] transition-all duration-200">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )

  // ── Panel ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 md:px-12 py-12">

      {/* Aviso de inactividad */}
      {timeoutWarning && (
        <div className="fixed top-4 right-4 bg-[#161616] border border-[#c9a96e] px-6 py-4 text-xs text-[#e8d5b0] uppercase tracking-widest z-50">
          ⚠️ Sesión cerrando por inactividad...
        </div>
      )}

      {/* Header */}
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

      {msg && <p className="mb-6 text-sm text-[#e8d5b0]">{msg}</p>}

      {/* Formulario */}
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
          <input placeholder="Tecnologías (separadas por coma: React, Node.js, MongoDB)" value={form.techs} onChange={e => setForm({...form, techs: e.target.value})}
            className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors md:col-span-2" />
          <input placeholder="URL de GitHub (opcional)" value={form.github_url} onChange={e => setForm({...form, github_url: e.target.value})}
            className="bg-[#161616] border border-[#1e1e1e] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c9a96e] transition-colors" />
          <input placeholder="URL del proyecto en vivo (opcional)" value={form.live_url} onChange={e => setForm({...form, live_url: e.target.value})}
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

      {/* Lista de proyectos */}
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