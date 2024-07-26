import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ApiSlice = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().user
      if (token) {
        headers.set('Authorization', `Token ${token}`)
        console.log('Authorization header set with token:', token)
      } else {
        console.log('No token found, Authorization header not set')
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: ({ page = 1, limit = 10 }) => `articles?limit=${limit}&offset=${(page - 1) * limit}`,
    }),
    getArticle: build.query({
      query: (slug) => `articles/${slug}`,
    }),
    registerUser: build.mutation({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: { user: userData },
      }),
    }),
    loginUser: build.mutation({
      query: (userData) => ({
        url: 'users/login',
        method: 'POST',
        body: { user: userData },
      }),
    }),
    updateUser: build.mutation({
      query: (userData) => ({
        url: 'user',
        method: 'PUT',
        body: { user: userData },
      }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetArticleQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
} = ApiSlice
