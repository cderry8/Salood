import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import FuturisticBackground from './FuturisticBackground'
import Navbar from './Navbar'

function MainLayout() {
  return (
    <div className="app-shell">
      <FuturisticBackground />
      <Navbar />
      <main className="mx-auto w-[95%] max-w-6xl pb-12 pt-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
