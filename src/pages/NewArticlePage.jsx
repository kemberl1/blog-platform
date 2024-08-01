import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateArticleMutation } from '../redux/ApiSlice'
import articleSchema from '../utils/formsValidation/articleValidation'
import ArticleForm from '../components/Forms/ArticleForm'

function NewArticlePage() {
  const [createArticle] = useCreateArticleMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(articleSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const onSubmit = async (data) => {
    console.log('new article data', data)
    setIsSubmitting(true)
    try {
      const articleData = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tags.map((tag) => tag.value).filter((value) => value.trim() !== ''),
      }
      const response = await createArticle(articleData).unwrap()
      console.log('Article created:', response)
      reset()
      setIsSuccess(true)
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 2000)
    } catch (error) {
      console.error('Error creating article:', error)
      if (error?.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, message]) => {
          setError('root', { type: 'manual', message: `${field} ${message}` })
        })
      } else {
        setError('root', { type: 'manual', message: 'Create article failed' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  console.log('Form errors:', errors)

  return (
    <ArticleForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
      fields={fields}
      append={append}
      remove={remove}
    />
  )
}

export default NewArticlePage
