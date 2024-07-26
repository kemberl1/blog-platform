import { z } from 'zod'

const signInSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .transform((val) => val.toLowerCase()),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export default signInSchema
