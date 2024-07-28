import { createSlice } from '@reduxjs/toolkit'

const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user')
    if (!serializedUser) return { user: null, token: null }
    return JSON.parse(serializedUser)
  } catch (error) {
    return { user: null, token: null }
  }
}

const initialState = loadUserFromLocalStorage()

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      localStorage.setItem('user', JSON.stringify({ user, token }))
    },
    updateUser: (state, action) => {
      const { token } = action.payload
      state.user = { ...state.user, ...action.payload }
      if (token) {
        state.token = token
      }
      localStorage.setItem('user', JSON.stringify({ user: state.user, token: state.token }))
    },
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('user')
    },
  },
})

export const { setUser, updateUser, logout } = userSlice.actions
export default userSlice.reducer
