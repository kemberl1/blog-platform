import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import signInSchema from '../../utils/formsValidation/signInValidation'
import CustomLink from '../CustomLink/CustomLink'

import formStyles from './Forms.module.scss'

function Form() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signInSchema) })

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
      <p className={formStyles.title}>SignUp</p>

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

export default Form
