import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUpdateArticleMutation, useGetArticleQuery } from '../redux/ApiSlice'
import articleSchema from '../utils/formsValidation/articleValidation'
import ArticleForm from '../components/Forms/ArticleForm'
import showErrorNotification from '../utils/notifications/showErrorNotification'

function EditArticlePage() {
  const { slug } = useParams()
  const { data: article, error: fetchError, isLoading: isFetching, refetch } = useGetArticleQuery(slug)
  const [updateArticle] = useUpdateArticleMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tags: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  useEffect(() => {
    if (article) {
      reset({
        title: article.article.title,
        description: article.article.description,
        body: article.article.body,
        tags: article.article.tagList.map((tag) => ({ value: tag })),
      })
    }
  }, [article, reset])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const articleData = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tags.map((tag) => tag.value).filter((value) => value.trim() !== ''),
      }
      await updateArticle({ slug, article: articleData }).unwrap()
      setIsSuccess(true)
      refetch()
      navigate(`/articles/${slug}`, { replace: true })
    } catch (error) {
      if (error.originalStatus === 403) {
        showErrorNotification('articleEditError', 'error')
      } else if (error?.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, message]) => {
          setError('root', { type: 'manual', message: `${field} ${message}` })
        })
      } else {
        setError('root', { type: 'manual', message: 'Update article failed' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isFetching) return <div>Loading...</div>
  if (fetchError) return <div>Error loading article</div>

  return (
    <ArticleForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      fields={fields}
      append={append}
      remove={remove}
    />
  )
}

export default EditArticlePage
