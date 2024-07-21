import { Outlet } from 'react-router-dom'

import Header from '../Header/Header'

function Layout() {
  return (
    <>
      <Header />
      <section className="main-content">
        <Outlet />
      </section>
    </>
  )
}

export default Layout
