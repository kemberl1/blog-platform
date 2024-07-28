import { z } from 'zod'

const signInSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email cannot be empty')
    .transform((val) => val.toLowerCase()),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export default signInSchema
