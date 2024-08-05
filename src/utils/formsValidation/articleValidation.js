import { z } from 'zod'

const uniqueTags = (tags) => {
  const tagValues = tags.map((tag) => tag.value.toLowerCase().trim())
  return new Set(tagValues).size === tagValues.length
}

const articleSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description cannot be empty')
    .max(400, 'Description must be less than 400 characters'),
  body: z.string().min(1, 'Body cannot be empty').max(5000, 'Text must be less than 5000 characters'),
  tags: z
    .array(
      z.object({
        value: z.string().min(1, 'Tag cannot be empty').max(25, 'Tag must be less than 25 characters'),
      })
    )
    .max(5, 'You can add up to 5 tags')
    .optional()
    .refine(uniqueTags, { message: 'Tags must be unique' })
})

export default articleSchema