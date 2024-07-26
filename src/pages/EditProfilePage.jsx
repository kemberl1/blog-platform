import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { useUpdateUserMutation } from '../redux/ApiSlice'
import { updateUser, logout } from '../redux/userSlice'
import editProfileSchema from '../utils/formsValidation/editProfileValidation'
import EditProfileForm from '../components/Forms/EditProfileForm'

function EditProfilePage() {
  const [updateUserApi] = useUpdateUserMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      if (storedUser) {
        console.log('Dispatching updateUser with stored user data:', storedUser.user)
        dispatch(updateUser(storedUser.user))
      } else {
        console.log('No stored user data found')
      }
    }
  }, [dispatch, user])

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      image: user?.image,
      password: '',
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    const userData = { ...data }
    if (!userData.password) {
      delete userData.password
    }

    try {
      const response = await updateUserApi({ user: userData }).unwrap()
      console.log('Update user response:', response)
      dispatch(updateUser(response.user))
      localStorage.setItem('user', JSON.stringify({ user: response.user, token: response.user.token }))
      console.log('User data saved to localStorage:', response.user)
      setIsSuccess(true)
      reset()
      setTimeout(() => {
        navigate(location.state?.from?.pathname || '/', { replace: true })
      }, 2000)
    } catch (error) {
      console.error('Error updating user:', error)
      if (error?.data?.errors) {
        const errorMessage = error.data.errors.message || 'Update failed'
        setError('root', { type: 'manual', message: errorMessage })
        if (error.status === 401) {
          dispatch(logout())
          navigate('/login')
        }
      } else {
        setError('root', { type: 'manual', message: error.data.errors.message })
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <EditProfileForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      isSuccess={isSuccess}
    />
  )
}

export default EditProfilePage
