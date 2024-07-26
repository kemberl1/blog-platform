import { z } from 'zod'

const editProfileSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .regex(/^[a-z0-9]+$/, 'You can only use lowercase English letters and numbers'),
  email: z
    .string()
    .email('Invalid email address')
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 6, {
      message: 'New password needs to be at least 6 characters long',
    }),
  image: z.string().url('Invalid URL').optional().nullable(),
})

export default editProfileSchema
