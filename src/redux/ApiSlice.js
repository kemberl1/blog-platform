import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ApiSlice = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: ({ page = 1, limit = 10 }) => `articles?limit=${limit}&offset=${(page - 1) * limit}`,
    }),
    getArticle: build.query({
      query: (slug) => `articles/${slug}`,
    }),
  }),
})

export const { useGetPostsQuery, useGetArticleQuery } = ApiSlice
