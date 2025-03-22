export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const get = async (endpoint: string) => {
    try {
      const response = await fetch(`${apiBase}${endpoint}`)
      if (!response.ok) throw new Error('Network response was not ok')
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  const post = async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`${apiBase}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Network response was not ok')
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  const put = async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`${apiBase}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Network response was not ok')
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  const del = async (endpoint: string) => {
    try {
      const response = await fetch(`${apiBase}${endpoint}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Network response was not ok')
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  return {
    get,
    post,
    put,
    del,
    apiBase,
  }
} 