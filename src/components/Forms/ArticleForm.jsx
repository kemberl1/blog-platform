import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Form, Button, Input } from 'antd'

import FormController from '../FormController/FormController'

import formStyles from './Forms.module.scss'

const { TextArea } = Input

function ArticleForm({ control, handleSubmit, onSubmit, errors, isSubmitting,  fields, append, remove }) {
  const addButton = (
    <Button className={formStyles.addButton} onClick={() => append({ value: '' })} block>
      Add Tag
    </Button>
  )

  return (
    <Form
      layout="vertical"
      className={classNames(formStyles.form, 'edit-article-form')}
      onFinish={handleSubmit(onSubmit)}
      style={{ width: '100%' }}
    >
      <p className={formStyles.title}>Edit article</p>

      <Form.Item label="Title" validateStatus={errors.title ? 'error' : ''} help={errors.title?.message}>
        <FormController control={control} name="title" placeholder="Title" />
      </Form.Item>

      <Form.Item
        label="Short description"
        validateStatus={errors.description ? 'error' : ''}
        help={errors.description?.message}
      >
        <FormController
          control={control}
          name="description"
          placeholder="Short description"
          as={TextArea}
          autoSize={{ minRows: 1, maxRows: 4 }}
        />
      </Form.Item>

      <Form.Item label="Text" validateStatus={errors.body ? 'error' : ''} help={errors.body?.message}>
        <FormController
          control={control}
          name="body"
          placeholder="Text"
          as={TextArea}
          autoSize={{ minRows: 5, maxRows: 200 }}
        />
      </Form.Item>

      <Form.Item label="Tags" validateStatus={errors.tags ? 'error' : ''} help={errors.tags?.root?.message}>
        <div className={formStyles.tags}>
          {fields.length === 0 && addButton}
          {fields.map((field, index) => (
            <div key={field.id} className={formStyles.tag}>
              <FormController
                control={control}
                name={`tags.${index}.value`}
                placeholder="Tag"
                className={formStyles.tagInput}
              />
              <Button
                danger
                disabled={isSubmitting}
                className={formStyles.deleteButton}
                onClick={() => remove(index)}
                block
              >
                Delete
              </Button>
              {index === fields.length - 1 && addButton}
              {errors.tags?.[index]?.value && (
                <p className={formStyles.errorMessage}>{errors.tags[index].value.message}</p>
              )}
            </div>
          ))}
        </div>
      </Form.Item>
      {errors.root && (
        <p className={formStyles.errorMessage} style={{ textAlign: 'left' }}>
          {errors.root.message}
        </p>
      )}
      <Form.Item>
        <Button disabled={isSubmitting} type="primary" htmlType="submit" block className={formStyles.submitButton}>
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </Form.Item>
    </Form>
  )
}

ArticleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  append: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default ArticleForm
