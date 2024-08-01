import PropTypes from 'prop-types'
import { Form, Button } from 'antd'
import classNames from 'classnames'

import FormController from '../FormController/FormController'
import CustomButton from '../CustomButton/CustomButton'

import formStyles from './Forms.module.scss'

function SignInForm({ control, handleSubmit, onSubmit, errors, isSubmitting, isSuccess }) {
  return (
    <Form
      layout="vertical"
      className={classNames(formStyles.form, 'edit-article-form')}
      onFinish={handleSubmit(onSubmit)}
    >
      {isSuccess && <p className={formStyles.successMessage}>Login successful!</p>}
      <p className={formStyles.title}>Sign In</p>

      <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
        <FormController control={control} name="email" placeholder="Email address" autoComplete="email" />
      </Form.Item>

      <Form.Item label="Password" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
        <FormController
          control={control}
          name="password"
          placeholder="Password"
          autoComplete="password"
          type="password"
        />
      </Form.Item>

      <Form.Item className={formStyles.submitButton}>
        <Button disabled={isSubmitting} type="primary" htmlType="submit" block >
          {isSubmitting ? 'Loading...' : 'Login'}
        </Button>
      </Form.Item>

      {errors.root && <p className={formStyles.errorMessage}>{`${errors.root.type} ${errors.root.message}`}</p>}
      <div className={formStyles.auth}>
        <p className={formStyles.authText}>Don’t have an account? </p>
        <CustomButton to="/sign-up" className={formStyles.authLink}>
          Sign Up
        </CustomButton>
      </div>
    </Form>
  )
}

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

export default SignInForm
