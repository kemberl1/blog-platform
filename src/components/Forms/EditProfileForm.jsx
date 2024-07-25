import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import editProfileSchema from '../../utils/formsValidation/editProfileValidation'

import formStyles from './Forms.module.scss'

function EditProfileForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(editProfileSchema) })

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(() => resolve(data), 2000))
      reset()
    } catch (error) {
      setError('root', { type: 'manual', message: error.message })
    }
  }

  return (
    <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={formStyles.title}>Edit Profile</p>

      <label htmlFor="username" className={formStyles.inputLabel}>
        User Name
        <input
          id="username"
          type="text"
          placeholder="User Name"
          className={`${formStyles.input} ${errors.username ? formStyles.invalid : ''}`}
          {...register('username')}
        />
        {errors.username && <p className={formStyles.errorMessage}>{errors.username.message}</p>}
      </label>

      <label htmlFor="email" className={formStyles.inputLabel}>
        Email Address
        <input
          id="email"
          type="text"
          placeholder="Email Address"
          className={`${formStyles.input} ${errors.email ? formStyles.invalid : ''}`}
          {...register('email')}
          autoComplete="email"
        />
        {errors.email && <p className={formStyles.errorMessage}>{errors.email.message}</p>}
      </label>

      <label htmlFor="newPassword" className={formStyles.inputLabel}>
        New Password
        <input
          id="newPassword"
          type="password"
          placeholder="New Password"
          className={`${formStyles.input} ${errors.newPassword ? formStyles.invalid : ''}`}
          {...register('newPassword')}
          autoComplete="new-password"
        />
        {errors.newPassword && <p className={formStyles.errorMessage}>{errors.newPassword.message}</p>}
      </label>

      <label htmlFor="avatarImage" className={formStyles.inputLabel}>
        Avatar Image (URL)
        <input
          id="avatarImage"
          type="text"
          placeholder="Avatar Image (URL)"
          className={`${formStyles.input} ${errors.avatarImage ? formStyles.invalid : ''}`}
          {...register('avatarImage')}
        />
        {errors.avatarImage && <p className={formStyles.errorMessage}>{errors.avatarImage.message}</p>}
      </label>

      <button disabled={isSubmitting} type="submit" className={formStyles.button}>
        {isSubmitting ? 'Loading...' : 'Save'}
      </button>

      {errors.root && <p className={formStyles.errorMessage}>{errors.root.message}</p>}
    </form>
  )
}

export default EditProfileForm
