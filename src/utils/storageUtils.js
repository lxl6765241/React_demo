export const saveUser = (user) =>localStorage.setItem('user_key',JSON.stringify(user))
export const getUser = () =>JSON.parse(localStorage.getItem('user_key') || '{}')