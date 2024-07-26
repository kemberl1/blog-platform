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
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await loginUser(data).unwrap()
      const { user, token } = response.user
      dispatch(setUser({ user: response.user, token: response.user.token }))
      localStorage.setItem('user', JSON.stringify({ user, token }))
      reset()
      setIsSuccess(true)
      setTimeout(() => {
        navigate(location.state?.from?.pathname || '/', { replace: true })
      }, 2000)
    } catch (error) {
      if (error?.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, message]) => {
          setError('root', { type: 'manual', message: `${field} ${message}` })
        })
      } else {
        setError('root', { type: 'manual', message: 'Login failed' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SignInForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
    />
  )
}

export default SignInPage
