import { useEffect, useState } from 'react'
import { useBookings } from '../../hooks/useBookings'
import { formatCurrency } from '../../utils/format'

function AdminBookingsPage() {
  const { bookings, loading, error, fetchAllBookings, updateBookingStatus } = useBookings()
  const [filters, setFilters] = useState({})
  const [statusUpdating, setStatusUpdating] = useState(false)
  const [statusError, setStatusError] = useState('')

  useEffect(() => {
    fetchAllBookings(filters)
  }, [filters, fetchAllBookings])

  const handleStatusChange = async (bookingId, newStatus) => {
    setStatusUpdating(true)
    setStatusError('')
    try {
      await updateBookingStatus(bookingId, newStatus)
    } catch (err) {
      setStatusError('Failed to update booking status')
      console.error('Failed to update booking status:', err)
    } finally {
      setStatusUpdating(false)
    }
  }

  if (loading) {
    return <div className="text-slate-300">Loading bookings...</div>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white">Manage Bookings</h2>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      {statusError && <p className="mb-4 text-sm text-red-400">{statusError}</p>}
        <div>
          <label className="text-sm text-slate-300">Filter by Status</label>
          <select
            value={filters.status || ''}
            onChange={(e) => setFilters({ ...filters, status: e.target.value || undefined })}
            className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950/50 p-2 text-sm text-white"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-300">Filter by Date</label>
          <input
            type="date"
            value={filters.date || ''}
            onChange={(e) => setFilters({ ...filters, date: e.target.value || undefined })}
            className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950/50 p-2 text-sm text-white"
          />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="rounded-xl border border-white/15 bg-black/40 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex-1">
                  <p className="font-medium text-white">{booking.service?.name}</p>
                  <p className="text-sm text-slate-300">{booking._id} · {booking.date} {booking.startTime} - {booking.endTime}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Client: {booking.user?.firstName} {booking.user?.lastName} ({booking.user?.email})
                  </p>
                  <p className="text-sm text-cyan-300">Price: {formatCurrency(booking.totalPrice)}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-medium text-slate-300">
                    Status: <span className={`${
                      booking.status === 'confirmed' ? 'text-emerald-400' :
                      booking.status === 'pending' ? 'text-yellow-400' :
                      booking.status === 'completed' ? 'text-blue-400' :
                      'text-red-400'
                    }`}>{booking.status.toUpperCase()}</span>
                  </div>
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    disabled={statusUpdating}
                    className="rounded-lg border border-white/20 bg-slate-950/50 px-2 py-1 text-xs text-white disabled:opacity-50"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              {booking.notes && (
                <p className="mt-2 text-sm text-slate-400">Notes: {booking.notes}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-slate-300">No bookings found</p>
        )}
      </div>
    </div>
  )
}

export default AdminBookingsPage
