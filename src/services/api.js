const API_URL = 'https://mi-portafolio-api-1.onrender.com'

export const getProjects = async (category = '') => {
  const url = category 
    ? `${API_URL}/api/projects?category=${category}`
    : `${API_URL}/api/projects`
  
  const response = await fetch(url)
  const data = await response.json()
  return data.data
}