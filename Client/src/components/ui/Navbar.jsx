import { Link, NavLink } from 'react-router-dom'
import GlowButton from './GlowButton'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/dashboard', label: 'My Dashboard' },
  { to: '/profile', label: 'Profile' },
  { to: '/admin', label: 'Admin' },
]

function Navbar() {
  return (
    <nav className="sticky top-4 z-20 mx-auto mt-4 w-[95%] max-w-6xl rounded-2xl px-5 py-3 glass">
      <div className="flex items-center justify-between gap-3">
        <Link to="/" className="text-xl font-semibold tracking-tight gradient-text">
          Salood
        </Link>
        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link to="/auth/login" className="text-sm text-slate-300 hover:text-white">
            Login
          </Link>
          <Link to="/auth/register">
            <GlowButton className="px-3 py-1.5 text-sm">Get Started</GlowButton>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
