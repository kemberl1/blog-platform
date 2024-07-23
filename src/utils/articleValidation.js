export const validateTitle = (title) => (title?.trim().length ? title : 'No title available')

export const validateDescription = (description) =>
  description?.trim().length ? description : 'No description available'

export function truncateText(description, maxLength = 260) {
  if (description.length > maxLength) {
    return `${description.substring(0, maxLength - 3)}...`
  }
  return description
}

export function validateTagList(tags) {
  return tags.filter((tag) => tag && tag.trim() !== '')
}

export const validateUsername = (username) => (username?.trim().length ? username : 'Anonymous')

export const truncateTag = (tag) => {
  if (tag.length > 25) {
    return `${tag.substring(0, 25)}...`
  }
  return tag
}
