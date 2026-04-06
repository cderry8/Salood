import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './components/ui/MainLayout'
import AdminLayout from './components/ui/AdminLayout'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminBookingsPage from './pages/admin/AdminBookingsPage'
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage'
import AdminSchedulePage from './pages/admin/AdminSchedulePage'
import AdminServicesPage from './pages/admin/AdminServicesPage'
import BookingPage from './pages/client/BookingPage'
import CategoryPage from './pages/client/CategoryPage'
import LandingPage from './pages/client/LandingPage'
import PaymentPage from './pages/client/PaymentPage'
import ServiceDetailsPage from './pages/client/ServiceDetailsPage'
import ServicesPage from './pages/client/ServicesPage'
import TicketPage from './pages/client/TicketPage'
import UserDashboardPage from './pages/client/UserDashboardPage'
import ProfilePage from './pages/client/ProfilePage'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:category" element={<CategoryPage />} />
          <Route path="/service/:serviceId" element={<ServiceDetailsPage />} />
          <Route path="/booking/:serviceId" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="schedule" element={<AdminSchedulePage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
