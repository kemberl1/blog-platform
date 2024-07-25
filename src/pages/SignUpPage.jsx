import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRegisterUserMutation } from '../redux/ApiSlice'
import { setUser } from '../redux/userSlice'
import signUpSchema from '../utils/formsValidation/signUpValidation'
import Form from '../components/Forms/SignUpForm'

function SignUpPage() {
  const dispatch = useDispatch()
  const [registerUser] = useRegisterUserMutation()
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
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = (data) => {
    setIsSubmitting(true)
    registerUser(data)
      .unwrap()
      .then((response) => {
        dispatch(setUser({ user: response.user, token: response.user.token }))
        reset()
        setIsSuccess(true)
        setTimeout(() => {
          navigate(location.state?.from || '/', { replace: true })
        }, 2000)
      })
      .catch((error) => {
        if (error?.data?.errors) {
          Object.entries(error.data.errors).forEach(([field, message]) => {
            setError(field, { type: 'manual', message })
          })
        } else {
          setError('root', { type: 'manual', message: 'Registration failed' })
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <Form
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
    />
  )
}

export default SignUpPage
