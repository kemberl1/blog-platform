import { Outlet } from 'react-router-dom'

import Header from '../Header/Header'

function Layout() {
  return (
    <div className='layout'>
      <Header />
      <section className="main-content">
        <Outlet />
      </section>
    </div>
  )
}

export default Layout
