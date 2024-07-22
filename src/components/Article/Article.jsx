import { useState } from 'react'
import { format } from 'date-fns'

import CustomLink from '../CustomLink/CustomLink'
import {validateTitle, validateDescription, truncateText, validateTagList, validateUsername} from '../../utils/articleValidation'
import PropTypes from 'prop-types';

function Article({ article = {} }) {
  const {
    title,
    description,
    createdAt = new Date().toISOString(),
    tagList,
    favoritesCount = 0,
    author,
  } = article

  const {
    username,
    image,
  } = author

  const validatedTitle = validateTitle(title)
  const validatedDescription = validateDescription(description)
  const validatedTagList = validateTagList(tagList)
  const validatedUsername = validateUsername(username)
  
  const formattedDate = format(new Date(createdAt), 'MMMM d, yyyy')
  const displayedTags = validatedTagList.slice(0, 4)
  const [active, setActive] = useState(false)
  const likeIcon = active ? '/src/public/img/LikeIcon--active.svg' : '/src/public/img/LikeIcon.svg'

  const handleClick = () => {
    setActive(!active)
  }

  const truncateTag = (tag) => {
    if (tag.length > 25) {
      return `${tag.substring(0, 25)}...`
    }
    return tag
  }

  return (
    <section className="article">
      <header className="article__header">
        <div className="article__info-left">
          <CustomLink to="/">
            <h5 className="article__title">{truncateText(validatedTitle, 70)}</h5>
          </CustomLink>
          {displayedTags.length > 0 && (
            <div className="article__tags">
              {displayedTags.map((tag) =>
                tag ? (
                  <span key={tag} className="article__tag">
                    {truncateTag(tag)}
                  </span>
                ) : null
              )}
            </div>
          )}
        </div>
        <div className="article__favorites">
          <CustomLink onClick={handleClick} className="like-link">
            <img src={likeIcon} alt="like icon" className="like-icon" />
          </CustomLink>
          <p className="article__favorites-count">{favoritesCount}</p>
        </div>
        <div className="article__info-right">
          <h5 className="article__author">{validatedUsername}</h5>
          <p className="article__date">{formattedDate}</p>
        </div>
        {image && <img src={image} alt={`${validatedUsername}'s avatar`} className="article__avatar" />}
      </header>
      <div className="article__body">
        <p className="article__description">{truncateText(validatedDescription)}</p>
      </div>
    </section>
  )
}

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    favoritesCount: PropTypes.number,
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
    }),
  }),
};


export default Article
