export const isAuthenticated = () => {
  return Boolean(localStorage.getItem('user'))
}

export const logout = () => {
  localStorage.removeItem('user')
}
