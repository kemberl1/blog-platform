import PropTypes from 'prop-types'

import CustomLink from '../CustomLink/CustomLink'

import formStyles from './Forms.module.scss'

function SignInForm({ register, handleSubmit, onSubmit, errors, isSubmitting, isSuccess }) {
  return (
    <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
      {isSuccess && <p className={formStyles.successMessage}>Login successful!</p>}
      <p className={formStyles.title}>Sign In</p>
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
      <button disabled={isSubmitting} type="submit" className={formStyles.button}>
        {isSubmitting ? 'Loading...' : 'Login'}
      </button>
      {errors.root && <p className={formStyles.errorMessage}>{errors.root.message}</p>}
      <div className={formStyles.auth}>
        <p className={formStyles.authText}>Don’t have an account? </p>
        <CustomLink to="/sign-up" className={formStyles.authLink}>
          Sign Up
        </CustomLink>
      </div>
    </form>
  )
}

SignInForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

export default SignInForm
