import { createSlice } from '@reduxjs/toolkit'

const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user')
    if (serializedUser === null) {
      return { user: null, token: null }
    }
    return JSON.parse(serializedUser)
  } catch (e) {
    console.warn('Error loading user from localStorage:', e)
    return { user: null, token: null }
  }
}

const { user, token } = loadUserFromLocalStorage()

const initialState = {
  user,
  token,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('user', JSON.stringify({ user: state.user, token: state.token }))
      console.log('User data saved to localStorage:', { user: state.user, token: state.token })
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      state.token = action.payload.token
      localStorage.setItem('user', JSON.stringify({ user: state.user, token: state.token }))
      console.log('User data updated and saved to localStorage:', { user: state.user, token: state.token })
    },
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('user')
      console.log('User data removed from localStorage')
    },
  },
})

export const { setUser, updateUser, logout } = userSlice.actions
export default userSlice.reducer
