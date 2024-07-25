import PropTypes from 'prop-types'

import CustomLink from '../CustomLink/CustomLink'

import formStyles from './Forms.module.scss'

function Form({ register, handleSubmit, onSubmit, errors, isSubmitting, isSuccess }) {
  return (
    <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={formStyles.title}>Create a new account</p>
      {isSuccess && <p className={formStyles.successMessage}>Registration successful!</p>}
      <label htmlFor="username" className={formStyles.inputLabel}>
        Username
        <input
          id="username"
          type="text"
          placeholder="Username"
          className={`${formStyles.input} ${errors.username ? formStyles.invalid : ''}`}
          {...register('username')}
          autoComplete="username"
        />
        {errors.username && <p className={formStyles.errorMessage}>{errors.username.message}</p>}
      </label>

      <label htmlFor="email" className={formStyles.inputLabel}>
        Email
        <input
          id="email"
          type="text"
          placeholder="Email"
          className={`${formStyles.input} ${errors.email ? formStyles.invalid : ''}`}
          {...register('email')}
          autoComplete="email"
        />
        {errors.email && <p className={formStyles.errorMessage}>{errors.email.message}</p>}
      </label>

      <label htmlFor="password" className={formStyles.inputLabel}>
        Password
        <input
          id="password"
          type="password"
          placeholder="Password"
          className={`${formStyles.input} ${errors.password ? formStyles.invalid : ''}`}
          {...register('password')}
          autoComplete="new-password"
        />
        {errors.password && <p className={formStyles.errorMessage}>{errors.password.message}</p>}
      </label>

      <label htmlFor="confirmPassword" className={formStyles.inputLabel}>
        Repeat Password
        <input
          id="confirmPassword"
          type="password"
          placeholder="Repeat password"
          className={`${formStyles.input} ${errors.confirmPassword ? formStyles.invalid : ''}`}
          {...register('confirmPassword')}
          autoComplete="new-password"
        />
        {errors.confirmPassword && <p className={formStyles.errorMessage}>{errors.confirmPassword.message}</p>}
      </label>

      <hr className={formStyles.divider} />

      <label htmlFor="confirmCheckbox" className={formStyles.confirmLabel}>
        <input
          id="confirmCheckbox"
          type="checkbox"
          className={formStyles.confirmCheckbox}
          {...register('confirmCheckbox')}
        />
        <span className={formStyles.checkboxCustom} />
        <span>I agree to the processing of my personal information</span>
      </label>
      {errors.confirmCheckbox && <p className={formStyles.errorMessage}>{errors.confirmCheckbox.message}</p>}

      <button disabled={isSubmitting} type="submit" className={formStyles.button}>
        {isSubmitting ? 'Loading...' : 'Create'}
      </button>

      {errors.root && <p className={formStyles.errorMessage}>{errors.root.message}</p>}

      <div className={formStyles.auth}>
        <p className={formStyles.authText}>Already have an account? </p>
        <CustomLink to="/sign-in" className={formStyles.authLink}>
          Sign In
        </CustomLink>
      </div>
    </form>
  )
}

Form.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
}

export default Form
