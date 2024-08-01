import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice'
import { ApiSlice } from './ApiSlice'

const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware),
})

export default store
