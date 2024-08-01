import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice'
import { ApiSlice } from './ApiSlice'
import notificationsReducer from './notificationSlice'

const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    user: userReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware),
})

export default store
