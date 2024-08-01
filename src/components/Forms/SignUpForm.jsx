import PropTypes from 'prop-types'
import { Form, Button } from 'antd'
import classNames from 'classnames'

import FormController from '../FormController/FormController'
import CustomButton from '../CustomButton/CustomButton'

import formStyles from './Forms.module.scss'

function SignUpForm({ control, handleSubmit, onSubmit, errors, isSubmitting }) {
  return (
    <Form
      layout="vertical"
      className={classNames(formStyles.form, 'edit-article-form')}
      onFinish={handleSubmit(onSubmit)}
    >
      <p className={formStyles.title}>Create a new account</p>

      <Form.Item label="Username" validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
        <FormController control={control} name="username" placeholder="Username" autoComplete="username" />
      </Form.Item>

      <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
        <FormController control={control} name="email" placeholder="Email address" autoComplete="email" />
      </Form.Item>

      <Form.Item label="Password" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
        <FormController
          control={control}
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          type="password"
        />
      </Form.Item>

      <Form.Item
        label="Repeat Password"
        validateStatus={errors.confirmPassword ? 'error' : ''}
        help={errors.confirmPassword?.message}
      >
        <FormController
          control={control}
          name="confirmPassword"
          placeholder="Password"
          autoComplete="new-password"
          type="password"
        />
      </Form.Item>

      <hr className={formStyles.divider} />

      <div className={formStyles.checkContainer}>
        <label htmlFor="confirmCheckbox">
          <FormController
            control={control}
            name="confirmCheckbox"
            type="checkbox"
            className={formStyles.checkInput}
            id="confirmCheckbox"
          />
          I agree to the processing of my personal information
        </label>
        {errors.confirmCheckbox && <p className={formStyles.errorMessage}>{errors.confirmCheckbox.message}</p>}
      </div>

      <Form.Item>
        <Button disabled={isSubmitting} type="primary" htmlType="submit" className={formStyles.submitButton} block>
          {isSubmitting ? 'Loading...' : 'Create'}
        </Button>
      </Form.Item>

      {errors.apiError && <p className={formStyles.errorMessage}>{errors.apiError.message}</p>}

      <div className={formStyles.auth}>
        <p className={formStyles.authText}>Already have an account? </p>
        <CustomButton to="/sign-in" className={formStyles.authLink}>
          Sign In
        </CustomButton>
      </div>
    </Form>
  )
}

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
}

export default SignUpForm
