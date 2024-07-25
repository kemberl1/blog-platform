import PropTypes from 'prop-types'

import CustomLink from '../CustomLink/CustomLink'

function Header({ user = {}, onSignOut }) {
  const defaultAvatar = 'https://static.productionready.io/images/smiley-cyrus.jpg'
  return (
    <header className="header">
      <CustomLink to="/articles" className="header__title">
        Realworld Blog
      </CustomLink>

      {user ? (
        <>
          <CustomLink to="/create-article" className="button-create custom-link">
            Create Article
          </CustomLink>
          <CustomLink to="/profile" className="header__user-info">
            <img src={defaultAvatar} alt="User Avatar" className="header__avatar" />
            <span className="header__username">{user.username}</span>
          </CustomLink>
          <CustomLink onClick={onSignOut} className="button-auth custom-link">
            Log Out
          </CustomLink>
        </>
      ) : (
        <div className="header__auth-buttons">
          <CustomLink to="/sign-in" className="button-login">
            Sign In
          </CustomLink>
          <CustomLink to="/sign-up" className="button-auth custom-link sign-up">
            Sign Up
          </CustomLink>
        </div>
      )}
    </header>
  )
}

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  onSignOut: PropTypes.func.isRequired,
}

export default Header
