import PropTypes from 'prop-types'

import formStyles from './Forms.module.scss'

function EditProfileForm({ register, handleSubmit, onSubmit, errors, isSubmitting, isSuccess }) {
  return (
    <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={formStyles.title}>Edit Profile</p>
      {isSuccess && <p className={formStyles.successMessage}>Edited successfully!</p>}
      <label htmlFor="username" className={formStyles.inputLabel}>
        User Name
        <input
          id="username"
          type="text"
          placeholder="User Name"
          className={`${formStyles.input} ${errors.username ? formStyles.invalid : ''}`}
          {...register('username')}
          autoComplete="username"
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

      <label htmlFor="password" className={formStyles.inputLabel}>
        New Password
        <input
          id="password"
          type="password"
          placeholder="New Password"
          className={`${formStyles.input} ${errors.password ? formStyles.invalid : ''}`}
          {...register('password')}
          autoComplete="new-password"
        />
        {errors.password && <p className={formStyles.errorMessage}>{errors.password.message}</p>}
      </label>

      <label htmlFor="image" className={formStyles.inputLabel}>
        Avatar Image (URL)
        <input
          id="image"
          type="text"
          placeholder="Avatar Image (URL)"
          className={`${formStyles.input} ${errors.image ? formStyles.invalid : ''}`}
          {...register('image')}
        />
        {errors.image && <p className={formStyles.errorMessage}>{errors.image.message}</p>}
      </label>

      <button disabled={isSubmitting} type="submit" className={formStyles.button}>
        {isSubmitting ? 'Loading...' : 'Save'}
      </button>

      {errors.root && <p className={formStyles.errorMessage}>{errors.root.message}</p>}
    </form>
  )
}

EditProfileForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
}

export default EditProfileForm
