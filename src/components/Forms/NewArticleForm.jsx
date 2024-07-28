import PropTypes from 'prop-types'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'

import formStyles from './Forms.module.scss'

function NewArticleForm({ register, handleSubmit, onSubmit, errors, isSubmitting, isSuccess, fields, append, remove }) {
  const addButton = (
    <button type="button" className={formStyles.addButton} onClick={() => append({ value: '' })}>
      Add Tag
    </button>
  )

  return (
    <form className={classNames(formStyles.form, 'new-article-form')} onSubmit={handleSubmit(onSubmit)}>
      <p className={formStyles.title}>Create new article</p>
      {isSuccess && <p className={formStyles.successMessage}>Create successfully!</p>}

      <label htmlFor="title" className={formStyles.inputLabel}>
        Title
        <input
          id="title"
          type="text"
          placeholder="Title"
          className={classNames(formStyles.input, { [formStyles.invalid]: errors.title })}
          {...register('title')}
        />
        {errors.title && <p className={formStyles.errorMessage}>{errors.title.message}</p>}
      </label>

      <label htmlFor="description" className={formStyles.inputLabel}>
        Short description
        <input
          id="description"
          type="text"
          placeholder="Short description"
          className={classNames(formStyles.input, { [formStyles.invalid]: errors.description })}
          {...register('description')}
        />
        {errors.description && <p className={formStyles.errorMessage}>{errors.description.message}</p>}
      </label>

      <label htmlFor="body" className={formStyles.inputLabel}>
        Text
        <TextareaAutosize
          id="body"
          placeholder="Text"
          className={classNames(formStyles.input, { [formStyles.invalid]: errors.body })}
          {...register('body')}
        />
        {errors.body && <p className={formStyles.errorMessage}>{errors.body.message}</p>}
      </label>

      <label htmlFor="tag" className={formStyles.inputLabel}>
        Tags
        <div className={formStyles.tags}>
          {fields.length === 0 && addButton}
          {fields.map((field, index) => (
            <div key={field.id} className={formStyles.tag}>
              <input type="text" placeholder="Tag" className={formStyles.input} {...register(`tags.${index}.value`)} />
              <button
                type="button"
                disabled={isSubmitting}
                className={formStyles.deleteButton}
                onClick={() => remove(index)}
              >
                Delete
              </button>
              {index === fields.length - 1 && addButton}
              {errors.tags?.[index]?.value && (
                <p className={formStyles.errorMessage}>{errors.tags[index].value.message}</p>
              )}
            </div>
          ))}
        </div>
        {errors.tags && !errors.tags[0]?.value && <p className={formStyles.errorMessage}>{errors.tags.root.message}</p>}
      </label>

      <button disabled={isSubmitting} type="submit" className={classNames(formStyles.button, 'new-article-button')}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>

      {errors.root && <p className={formStyles.errorMessage}>{errors.root.message}</p>}
    </form>
  )
}

NewArticleForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  append: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default NewArticleForm
