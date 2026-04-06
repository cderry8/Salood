import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageMotion from '../../components/ui/PageMotion'
import { initialBookings, salonInfo, services } from '../../data/mockData'
import { formatCurrency } from '../../utils/format'

function UserDashboardPage() {
  const [bookings, setBookings] = useState(initialBookings)
  const [review, setReview] = useState('')

  const mapped = useMemo(
    () =>
      bookings.map((booking) => ({
        ...booking,
        serviceName: services.find((service) => service.id === booking.serviceId)?.name || 'Service',
      })),
    [bookings],
  )

  const upcoming = mapped.filter((booking) => booking.status === 'Upcoming')
  const past = mapped.filter((booking) => booking.status !== 'Upcoming')

  const cancelBooking = (id) => {
    setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status: 'Cancelled' } : booking)))
  }

  return (
    <PageMotion>
      <h1 className="text-4xl font-bold text-white">My Dashboard</h1>
      <p className="mt-2 text-slate-300">Track bookings, manage your profile, and contact support fast.</p>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-white/15 bg-black/40 p-4">
          <p className="text-xs uppercase text-slate-400">Upcoming</p>
          <p className="mt-2 text-3xl font-semibold text-white">{upcoming.length}</p>
        </article>
        <article className="rounded-2xl border border-white/15 bg-black/40 p-4">
          <p className="text-xs uppercase text-slate-400">Total spent</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {formatCurrency(mapped.reduce((sum, item) => sum + item.amount, 0))}
          </p>
        </article>
        <article className="rounded-2xl border border-white/15 bg-black/40 p-4">
          <p className="text-xs uppercase text-slate-400">Need help?</p>
          <p className="mt-2 text-xl font-semibold text-white">{salonInfo.phone}</p>
        </article>
      </section>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/15 bg-black/40 p-5">
          <h2 className="text-xl font-semibold text-white">Upcoming bookings</h2>
          <div className="mt-4 space-y-3">
            {upcoming.map((booking) => (
              <div key={booking.id} className="overflow-hidden rounded-xl border border-white/15 bg-black/30">
                <img
                  src={services.find((service) => service.id === booking.serviceId)?.image}
                  alt={booking.serviceName}
                  className="h-32 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-white">{booking.serviceName}</p>
                    <span className="rounded-full border border-white/20 px-2 py-0.5 text-xs text-slate-200">
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-300">{booking.date} · {booking.time}</p>
                  <p className="text-sm text-slate-300">{formatCurrency(booking.amount)}</p>
                  <button type="button" onClick={() => cancelBooking(booking.id)} className="mt-3 rounded-lg border border-white/25 bg-white/10 px-3 py-1 text-xs text-white">
                    Cancel booking
                  </button>
                </div>
              </div>
            ))}
            {!upcoming.length && <p className="text-sm text-slate-400">No upcoming booking yet.</p>}
          </div>
        </section>

        <section className="rounded-2xl border border-white/15 bg-black/40 p-5">
          <h2 className="text-xl font-semibold text-white">Booking history</h2>
          <div className="mt-4 space-y-3">
            {past.map((booking) => (
              <div key={booking.id} className="rounded-xl border border-white/15 bg-black/30 p-4 text-sm">
                <p className="font-medium text-white">{booking.serviceName}</p>
                <p className="text-slate-300">{booking.date} · {booking.time}</p>
                <p className="text-slate-300">{formatCurrency(booking.amount)} · {booking.status}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/15 bg-black/40 p-5">
          <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/services" className="rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm">
              Book New Service
            </Link>
            <Link to="/profile" className="rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm">
              Edit Profile
            </Link>
            <a href={`tel:${salonInfo.phone}`} className="rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm">
              Call Support
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-white/15 bg-black/40 p-5">
          <h2 className="text-xl font-semibold text-white">Leave a quick review</h2>
          <textarea
            rows="4"
            value={review}
            onChange={(event) => setReview(event.target.value)}
            placeholder="How was your last visit?"
            className="mt-4 w-full rounded-xl border border-white/15 bg-black/30 p-3 text-sm"
          />
          <button type="button" className="mt-3 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm">
            Submit Review (UI only)
          </button>
        </section>
      </div>
    </PageMotion>
  )
}

export default UserDashboardPage
