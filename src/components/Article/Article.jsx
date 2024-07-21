import { useState } from 'react'
import { format } from 'date-fns'

import CustomLink from '../CustomLink/CustomLink'

function Article({ article }) {
  const {
    title = 'No title available',
    description = 'No description available',
    createdAt = new Date().toISOString(),
    tagList = [],
    favoritesCount = 0,
    author: { username = 'Anonymous>', image },
  } = article

  const formattedDate = format(new Date(createdAt), 'MMMM d, yyyy')
  const [active, setActive] = useState(false)
  const likeIcon = active ? '/src/public/img/LikeIcon--active.svg' : '/src/public/img/LikeIcon.svg'

  const handleClick = () => {
    setActive(!active)
  }

  return (
    <section className="article">
      <header className="article__header">
        <div className="article__info-left">
          <CustomLink to="/">
            <h5 className="article__title">{title}</h5>
          </CustomLink>
          {tagList.length > 0 && (
            <div className="article__tags">
              {tagList.map((tag) =>
                tag ? (
                  <span key={tag} className="article__tag">
                    {tag}
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
          <h5 className="article__author">{username}</h5>
          <p className="article__date">{formattedDate}</p>
        </div>
        {image && <img src={image} alt={`${username}'s avatar`} className="article__avatar" />}
      </header>
      <div className="article__body">
        <p className="article__description">{description}</p>
      </div>
    </section>
  )
}

export default Article
