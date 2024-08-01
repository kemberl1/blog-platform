import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useLoginUserMutation } from '../redux/ApiSlice'
import { setUser } from '../redux/userSlice'
import signInSchema from '../utils/formsValidation/signInValidation'
import SignInForm from '../components/Forms/SignInFrom'

function SignInPage() {
  const dispatch = useDispatch()
  const [loginUser] = useLoginUserMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    console.log('sign in data', data)
    console.log('sign in errors', errors)
    setIsSubmitting(true)
    try {
      const response = await loginUser(data).unwrap()
      const { user } = response
      dispatch(setUser({ user, token: user.token }))
      localStorage.setItem('user', JSON.stringify({ user, token: user.token }))
      reset()
      setIsSuccess(true)
      setTimeout(() => {
        navigate(location.state?.from?.pathname || '/', { replace: true })
      }, 2000)
    } catch (error) {
      if (error?.data?.errors) {
        const errorEntries = Object.entries(error.data.errors)
        if (errorEntries.length > 0) {
          const [field, message] = errorEntries[0]
          setError('root', { type: field, message })
        } else {
          setError('root', { type: 'manual', message: 'Login failed' })
        }
      } else {
        setError('root', { type: 'manual', message: 'Login failed' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SignInForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
    />
  )
}

export default SignInPage
