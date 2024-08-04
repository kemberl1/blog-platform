import PropTypes from 'prop-types'
import { Form, Button } from 'antd'

import FormController from '../FormController/FormController'

import formStyles from './Forms.module.scss'

function EditProfileForm({ control, handleSubmit, onSubmit, errors, isSubmitting }) {
  return (
    <Form layout="vertical" className={formStyles.form} onFinish={handleSubmit(onSubmit)}>
      <p className={formStyles.title}>Edit Profile</p>

      <Form.Item label="User Name" validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
        <FormController
          control={control}
          name="username"
          placeholder="User Name"
          autoComplete="username"
          disabled={isSubmitting}
        />
      </Form.Item>

      <Form.Item label="Email Address" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
        <FormController
          control={control}
          name="email"
          placeholder="Email Address"
          autoComplete="email"
          disabled={isSubmitting}
        />
      </Form.Item>

      <Form.Item label="New Password" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
        <FormController
          control={control}
          name="password"
          placeholder="New Password"
          autoComplete="new-password"
          type="password"
          disabled={isSubmitting}
        />
      </Form.Item>

      <Form.Item label="Avatar Image (URL)" validateStatus={errors.image ? 'error' : ''} help={errors.image?.message}>
        <FormController control={control} name="image" placeholder="Avatar Image (URL)" disabled={isSubmitting} />
      </Form.Item>

      <Form.Item>
        <Button disabled={isSubmitting} type="primary" htmlType="submit" className={formStyles.button} block>
          {isSubmitting ? 'Loading...' : 'Save'}
        </Button>
      </Form.Item>

      {errors.root && <p className={formStyles.errorMessage}>{errors.root.message}</p>}
    </Form>
  )
}

EditProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

export default EditProfileForm
