import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

import showSuccessNotification from '../utils/notifications/showSuccessNotification'
import { useUpdateUserMutation } from '../redux/ApiSlice'
import { updateUser } from '../redux/userSlice'
import editProfileSchema from '../utils/formsValidation/editProfileValidation'
import EditProfileForm from '../components/Forms/EditProfileForm'

function EditProfilePage() {
  const [updateUserApi] = useUpdateUserMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.user)
  const location = useLocation()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: userInfo?.username || '',
      email: userInfo?.email || '',
      image: userInfo?.image || '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    const userData = { ...data }
    if (userData.password === '') {
      delete userData.password
    }

    try {
      const response = await updateUserApi(userData).unwrap()
      const { user } = response
      dispatch(updateUser(user))
      localStorage.setItem('user', JSON.stringify({ user, token: user.token }))
      reset()
      showSuccessNotification('updateProfileSuccess')
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (error) {
      if (error?.data?.errors) {
        Object.keys(error.data.errors).forEach((field) => {
          setError(field, {
            type: 'manual',
            message: error.data.errors[field],
          })
        })
      } else {
        setError('root', { type: 'manual', message: 'Update failed' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <EditProfileForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  )
}

export default EditProfilePage
