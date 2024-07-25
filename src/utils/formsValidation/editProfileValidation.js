import { z } from 'zod'

const editProfileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  newPassword: z.string().min(8, 'Your password needs to be at least 6 characters').optional(),
  avatarImage: z.string().url('Invalid URL').optional(),
})

export default editProfileSchema
