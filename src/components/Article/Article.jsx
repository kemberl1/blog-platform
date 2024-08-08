import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { uid } from 'uid'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import CustomPopconfirm from '../CustomPopconfirm/CustomPopconfirm'
import MarkdownRenderer from '../../utils/markdownUtils'
import CustomButton from '../CustomButton/CustomButton'
import {
  validateTitle,
  validateDescription,
  truncateText,
  validateTagList,
  validateUsername,
  truncateTag,
} from '../../utils/articleValidation'

import articleStyles from './Article.module.scss'

function Article({ article, showBody = false, handleDelete, handleEditClick, handleLike, handleUnlike }) {
  const user = useSelector((state) => state.user.user)

  if (!article) {
    return <Navigate to="*" />
  }

  const {
    title = '',
    description = '',
    body = '',
    createdAt = new Date().toISOString(),
    tagList = [],
    favoritesCount = 0,
    author = {},
    slug,
    favorited,
  } = article

  const { username = '', image = '' } = author

  const validatedTitle = validateTitle(title)
  const validatedDescription = validateDescription(description)
  const validatedTagList = validateTagList(tagList)
  const validatedUsername = validateUsername(username)

  const formattedDate = format(new Date(createdAt), 'MMMM d, yyyy')
  const displayedTags = validatedTagList.slice(0, 5)

  const handleClick = () => {
    if (favorited) {
      handleUnlike()
    } else {
      handleLike()
    }
  }

  return (
    <section className="article">
      <header className="article__header">
        <div className="article__info-left">
          <div className="article__title-favorites">
            <CustomButton to={`/articles/${slug}`}>
              <h5 className="article__title">{truncateText(validatedTitle, 70)}</h5>
            </CustomButton>
            <CustomButton onClick={handleClick} className="like-container" type="text">
              {favorited ? <HeartFilled className="red-like" /> : <HeartOutlined className="like" />}
              <p className="article__favorites-count">{favoritesCount}</p>
            </CustomButton>
          </div>
          {displayedTags.length > 0 && (
            <div className="article__tags">
              {displayedTags.map((tag) =>
                tag ? (
                  <span key={uid()} className="article__tag">
                    {truncateTag(tag)}
                  </span>
                ) : null
              )}
            </div>
          )}
        </div>
        <div className="article__info-right">
          <h5 className="article__author">{validatedUsername}</h5>
          <p className="article__date">{formattedDate}</p>
        </div>
        {image && <img src={image} alt={`${validatedUsername}'s avatar`} className="article__avatar" />}
      </header>
      <div className="article__text">
        <div className="article__text-container">
          <p className="article__text-description">{truncateText(validatedDescription)}</p>
          <div className="article__text-buttons">
            {showBody && user && (
              <>
                <CustomPopconfirm
                  title="Are you sure to delete this article?"
                  handleDelete={handleDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <CustomButton danger className={articleStyles.deleteButton}>
                    Delete
                  </CustomButton>
                </CustomPopconfirm>
                <CustomButton className={articleStyles.editButton} onClick={handleEditClick}>
                  Edit
                </CustomButton>
              </>
            )}
          </div>
        </div>
        {showBody && (
          <div className="article__text-body">
            <MarkdownRenderer markdownContent={body} />
          </div>
        )}
      </div>
    </section>
  )
}

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
    favoritesCount: PropTypes.number.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
    }),
    body: PropTypes.string,
    slug: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleUnlike: PropTypes.func.isRequired,
}

export default Article
