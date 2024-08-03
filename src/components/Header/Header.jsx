import PropTypes from 'prop-types'

import CustomButton from '../CustomButton/CustomButton'

function Header({ user = {}, onSignOut }) {
  const defaultAvatar = 'https://static.productionready.io/images/smiley-cyrus.jpg'

  return (
    <header className="header">
      <CustomButton to="/articles" className="header__title">
        Realworld Blog
      </CustomButton>

      {user ? (
        <>
          <CustomButton to="/new-article" className="button-create">
            Create Article
          </CustomButton>
          <CustomButton to="/profile" className="header__user-info">
            <img src={user.image || defaultAvatar} alt="User Avatar" className="header__avatar" />
            <span className="header__username">{user.username}</span>
          </CustomButton>
          <CustomButton onClick={onSignOut} className="button-auth">
            Log Out
          </CustomButton>
        </>
      ) : (
        <div className="header__auth-buttons">
          <CustomButton to="/sign-in" className="sign-in">
            Sign In
          </CustomButton>
          <CustomButton to="/sign-up" className="sign-up">
            Sign Up
          </CustomButton>
        </div>
      )}
    </header>
  )
}

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string,
  }),
  onSignOut: PropTypes.func.isRequired,
}

export default Header
