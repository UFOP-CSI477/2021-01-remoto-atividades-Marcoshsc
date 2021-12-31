import axios from 'axios'

export const login = async (email, password) => {
  const response = await axios.post('http://localhost:3001/auth/login', { email, password }, { withCredentials: true })
  return response.data
}

export const fetchUserInfo = async () => {
  const response = await axios.get('http://localhost:3001/user/me', { withCredentials: true })
  return response.data
}

export const logout = async () => {
  await axios.post('http://localhost:3001/auth/logout', undefined, { withCredentials: true })
}

export const signup = async (user) => {
  await axios.post('http://localhost:3001/auth/signup', user, { withCredentials: true })
}