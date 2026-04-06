import { useMemo, useState } from 'react'
import { initialBookings, services } from '../../data/mockData'

function AdminBookingsPage() {
  const [rows, setRows] = useState(initialBookings)

  const mapped = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        serviceName: services.find((service) => service.id === row.serviceId)?.name || 'Unknown',
      })),
    [rows],
  )

  const updateStatus = (id, status) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)))
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white">Manage Bookings</h2>
      <div className="mt-5 space-y-2">
        {mapped.map((booking) => (
          <div key={booking.id} className="rounded-xl border border-white/15 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-medium text-white">{booking.serviceName}</p>
                <p className="text-sm text-slate-300">{booking.id} · {booking.date} {booking.time}</p>
              </div>
              <div className="flex gap-2 text-xs">
                <button type="button" onClick={() => updateStatus(booking.id, 'Approved')} className="rounded-lg bg-emerald-400/20 px-3 py-1 text-emerald-200">Approve</button>
                <button type="button" onClick={() => updateStatus(booking.id, 'Rejected')} className="rounded-lg bg-rose-400/20 px-3 py-1 text-rose-200">Reject</button>
                <button type="button" className="rounded-lg bg-indigo-400/20 px-3 py-1 text-indigo-100">Refund (UI)</button>
              </div>
            </div>
            <p className="mt-2 text-sm text-cyan-300">Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminBookingsPage
