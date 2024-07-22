export const validateTitle = (title) => {
  return title?.trim().length ? title : 'No title available';
}

export const validateDescription = (description) => {
  return description?.trim().length ? description : 'No description available';
}

export function truncateText(description, maxLength = 260) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength - 3) + '...';
  }
  return description;
}

export function validateTagList(tags) {
  return tags.filter(tag => (tag && tag.trim() !== ''));
}

export const validateUsername = (username) => {
  return username?.trim().length ? username : 'Anonymous';
}
