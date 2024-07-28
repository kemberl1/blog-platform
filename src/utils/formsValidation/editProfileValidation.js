import { z } from 'zod'

const editProfileSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .regex(/^[a-z0-9]+$/, 'You can only use lowercase English letters and numbers'),
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email cannot be empty')
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .optional()
    .refine((value) => !value || (value.length >= 6 && value.length <= 40), {
      message: 'New password needs to be between 6 and 40 characters long',
    }),
  image: z
    .string()
    .transform((val) => (val === '' ? null : val))
    .refine((val) => val === null || z.string().url().safeParse(val).success, {
      message: 'Invalid URL',
    })
    .nullable()
    .optional(),
})

export default editProfileSchema
