import { Controller } from 'react-hook-form'
import { Input, Checkbox } from 'antd'

const { TextArea } = Input

function FormController({
  control,
  name,
  placeholder,
  autoComplete,
  type = 'text',
  as = Input,
  className,
  autoSize,
  id,
  disabled,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        if (type === 'checkbox') {
          return (
            <Checkbox
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className={className}
              id={id}
              disabled={disabled}
            />
          )
        }
        if (type === 'password') {
          return (
            <Input.Password
              placeholder={placeholder}
              autoComplete={autoComplete}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={disabled}
            />
          )
        }

        if (as === TextArea) {
          return (
            <TextArea
              placeholder={placeholder}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className={className}
              autoSize={autoSize}
              disabled={disabled}
            />
          )
        }

        return (
          <Input
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            className={className}
            disabled={disabled}
          />
        )
      }}
    />
  )
}

export default FormController
