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
            />
          )
        }
        if (type === 'password') {
          return <Input.Password placeholder={placeholder} autoComplete={autoComplete} {...field} />
        }

        if (as === TextArea) {
          return <TextArea placeholder={placeholder} {...field} className={className} autoSize={autoSize} />
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
          />
        )
      }}
    />
  )
}

export default FormController
