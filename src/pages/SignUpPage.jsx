import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

import showSuccessNotification from '../utils/notifications/showSuccessNotification'
import signUpSchema from '../utils/formsValidation/signUpValidation'
import { setUser } from '../redux/userSlice'
import { useRegisterUserMutation } from '../redux/ApiSlice'
import SignUpForm from '../components/Forms/SignUpForm'

function SignUpPage() {
  const dispatch = useDispatch()
  const [registerUser] = useRegisterUserMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      confirmCheckbox: false,
    },
  })
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await registerUser(data).unwrap()
      const { user } = response
      dispatch(setUser({ user, token: user.token }))
      localStorage.setItem('user', JSON.stringify({ user, token: user.token }))
      reset()
      showSuccessNotification('signUpSuccess', user.username)
      navigate(location.state?.from || '/', { replace: true })
    } catch (error) {
      if (error?.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, message]) => {
          setError(field, { type: 'manual', message })
        })
      } else {
        setError('apiError', { type: 'manual', message: 'Registration failed' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SignUpForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  )
}

export default SignUpPage
