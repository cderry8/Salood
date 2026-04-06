import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageMotion from '../../components/ui/PageMotion'
import { useBookingStore } from '../../hooks/useBookingStore'
import { formatCurrency, generateTicketId } from '../../utils/format'

function PaymentPage() {
  const navigate = useNavigate()
  const { booking, setBooking } = useBookingStore()
  const [method, setMethod] = useState('Mobile Money')

  if (!booking) return <p className="text-slate-300">No booking summary available.</p>

  const payNow = () => {
    setBooking({ ...booking, paymentMethod: method, ticketId: generateTicketId() })
    navigate('/ticket')
  }

  return (
    <PageMotion>
      <h1 className="text-4xl font-bold text-white">Payment</h1>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl p-5 glass">
          <h2 className="text-xl font-semibold text-white">Booking Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-slate-300">Service: <span className="text-white">{booking.serviceName}</span></p>
            <p className="text-slate-300">Date: <span className="text-white">{booking.date}</span></p>
            <p className="text-slate-300">Time: <span className="text-white">{booking.time}</span></p>
            <p className="text-slate-300">Total: <span className="text-emerald-300">{formatCurrency(booking.amount)}</span></p>
          </div>
        </div>
        <div className="rounded-2xl p-5 glass">
          <h3 className="text-lg font-semibold text-white">Payment Method</h3>
          <div className="mt-4 space-y-2 text-sm">
            {['Mobile Money', 'Card'].map((item) => (
              <button key={item} type="button" onClick={() => setMethod(item)} className={`w-full rounded-xl border p-3 text-left ${method === item ? 'border-cyan-400 bg-cyan-400/15 text-cyan-100' : 'border-white/15 text-slate-300 hover:bg-white/10'}`}>
                {item}
              </button>
            ))}
          </div>
          <button type="button" onClick={payNow} className="mt-6 w-full rounded-xl bg-indigo-400/25 p-3 font-medium text-indigo-100 hover:bg-indigo-400/35">
            Pay & Continue
          </button>
        </div>
      </div>
    </PageMotion>
  )
}

export default PaymentPage
