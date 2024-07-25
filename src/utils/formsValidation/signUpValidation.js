import { z } from 'zod'

const signUpSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Your password needs to be at least 6 characters.'),
    confirmPassword: z.string(),
    confirmCheckbox: z.boolean().refine((value) => value, {
      message: 'You must agree to the processing of your personal information',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export default signUpSchema
