const API_URL = 'https://mi-portafolio-api-1.onrender.com'

// ── Proyectos públicos ──────────────────────────────────────────
export const getProjects = async (category = '') => {
  const url = category
    ? `${API_URL}/api/projects?category=${category}`
    : `${API_URL}/api/projects`
  const response = await fetch(url)
  const data = await response.json()
  return data.data
}

// ── Auth ────────────────────────────────────────────────────────
export const login = async (password) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  })
  const data = await response.json()
  if (data.success) {
    localStorage.setItem('admin_token', data.token)
    return true
  }
  return false
}

export const logout = () => {
  localStorage.removeItem('admin_token')
}

export const getToken = () => localStorage.getItem('admin_token')

// ── Proyectos admin ─────────────────────────────────────────────
export const createProject = async (project) => {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(project)
  })
  return response.json()
}

export const updateProject = async (id, project) => {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(project)
  })
  return response.json()
}

export const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  })
  return response.json()
}
// ── Stats admin ─────────────────────────────────────────────────
export const updateStats = async (data) => {
  const response = await fetch(`${API_URL}/api/stats`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  })
  return response.json()
}