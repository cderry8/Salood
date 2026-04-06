import { useNavigate } from 'react-router-dom'
import TicketCard from '../../components/cards/TicketCard'
import GlowButton from '../../components/ui/GlowButton'
import PageMotion from '../../components/ui/PageMotion'
import { useBookingStore } from '../../hooks/useBookingStore'

function TicketPage() {
  const navigate = useNavigate()
  const { booking, clearBooking } = useBookingStore()

  if (!booking?.ticketId) return <p className="text-slate-300">No ticket generated yet.</p>

  const onClose = () => {
    clearBooking()
    navigate('/dashboard')
  }

  return (
    <PageMotion>
      <h1 className="text-4xl font-bold text-white">Payment Successful</h1>
      <p className="mt-2 text-slate-300">Your booking is confirmed. SMS sent to your phone (mock).</p>
      <div className="mt-6">
        <TicketCard ticket={booking} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" className="rounded-xl border border-white/20 px-4 py-2 text-sm">
          Download (UI only)
        </button>
        <button type="button" className="rounded-xl border border-white/20 px-4 py-2 text-sm">
          Save (UI only)
        </button>
        <GlowButton onClick={onClose} className="text-sm">Go to Dashboard</GlowButton>
      </div>
    </PageMotion>
  )
}

export default TicketPage
