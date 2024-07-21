import CustomLink from '../CustomLink/CustomLink'

function Header() {
  return (
    <header className="header">
      <p className="header__title">Realworld Blog</p>
      <CustomLink to="/login" className="header__button">
        Sign In
      </CustomLink>
      <CustomLink to="/join" className="custom-link">
        Sign Up
      </CustomLink>
    </header>
  )
}

export default Header
