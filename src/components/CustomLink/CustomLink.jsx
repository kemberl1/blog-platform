import { Link } from 'react-router-dom'

function CustomLink({ children, to, ...props }) {
  const { className, onClick, style } = props
  return (
    <Link to={to} className={className} onClick={onClick} style={style}>
      {children}
    </Link>
  )
}

export default CustomLink
