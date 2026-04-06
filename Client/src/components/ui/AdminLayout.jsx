import { Bell, Calendar, CreditCard, LayoutDashboard, Scissors } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import FuturisticBackground from './FuturisticBackground'
import Navbar from './Navbar'

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { to: '/admin/services', label: 'Services', icon: <Scissors size={16} /> },
  { to: '/admin/bookings', label: 'Bookings', icon: <Calendar size={16} /> },
  { to: '/admin/schedule', label: 'Schedule', icon: <Calendar size={16} /> },
  { to: '/admin/payments', label: 'Payments', icon: <CreditCard size={16} /> },
]

function AdminLayout() {
  return (
    <div className="app-shell">
      <FuturisticBackground />
      <Navbar />
      <div className="mx-auto flex min-h-screen w-[95%] max-w-7xl gap-5 py-5">
        <aside className="hidden w-64 rounded-2xl p-4 glass lg:block">
          <Link to="/" className="mb-6 block text-xl font-semibold gradient-text">
            Salood Admin
          </Link>
          <div className="space-y-2">
            {adminLinks.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                    isActive ? 'bg-cyan-400/20 text-cyan-300' : 'text-slate-300 hover:bg-white/10'
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </div>
        </aside>
        <section className="flex-1 rounded-2xl p-4 md:p-6 glass">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <h1 className="text-2xl font-semibold text-white">Admin Panel</h1>
            <button type="button" className="rounded-xl p-2 text-slate-200 glass">
              <Bell size={18} />
            </button>
          </div>
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default AdminLayout
