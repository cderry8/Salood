import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageMotion from '../../components/ui/PageMotion'
import BookingCalendar from '../../features/booking/BookingCalendar'
import TimeSlotPicker from '../../features/booking/TimeSlotPicker'
import { useBookingStore } from '../../hooks/useBookingStore'
import { useCatalog } from '../../hooks/useCatalog'
import { useBookings } from '../../hooks/useBookings'
import { formatCurrency, SERVICE_IMAGE_PLACEHOLDER } from '../../utils/format'

function BookingPage() {
  const navigate = useNavigate()
  const { serviceId } = useParams()
  const { setBooking } = useBookingStore()
  const { services } = useCatalog()
  const service = services.find((item) => item.id === serviceId)
  const { availableSlots, loading, error, fetchAvailableSlots, createBooking } = useBookings()
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState('')

  // Fetch available slots when date changes
  useEffect(() => {
    if (date && serviceId) {
      fetchAvailableSlots(serviceId, date)
      setSlot('') // Reset slot when date changes
    }
  }, [date, serviceId, fetchAvailableSlots])

  if (!service) {
    return <p className="text-slate-300">Service not found.</p>
  }

  const onConfirm = async () => {
    if (!date || !slot) return

    setSubmitting(true)
    setBookingError('')

    try {
      const booking = await createBooking({
        serviceId,
        date,
        startTime: slot.startTime,
        notes
      })

      setBooking({
        serviceId: service.id,
        serviceName: service.name,
        date,
        time: slot.startTime,
        amount: service.price,
        bookingId: booking._id
      })
      navigate('/payment')
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Failed to create booking')
    } finally {
      setSubmitting(false)
    }
  }

  const slotStrings = availableSlots.map(s => `${s.startTime} - ${s.endTime}`)

  return (
    <PageMotion>
      <h1 className="text-4xl font-bold text-white">Booking Flow</h1>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/40">
          <img
            src={service.image || SERVICE_IMAGE_PLACEHOLDER}
            alt={service.name}
            className="h-48 w-full object-cover"
          />
          <div className="p-5">
            <h2 className="text-xl font-semibold text-white">{service.name}</h2>
            <p className="mt-2 text-slate-300">{service.description}</p>
            <p className="mt-4 text-sm text-slate-200">{formatCurrency(service.price)} · {service.duration} mins</p>
            <div className="mt-5">
              <BookingCalendar value={date} onChange={setDate} />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/15 bg-black/40 p-5">
          <h3 className="text-lg font-semibold text-white">Select Time Slot</h3>
          {date ? (
            <>
              {loading ? (
                <p className="mt-4 text-sm text-slate-300">Loading available slots...</p>
              ) : availableSlots.length > 0 ? (
                <>
                  <TimeSlotPicker slots={slotStrings} value={slot ? `${slot.startTime} - ${slot.endTime}` : ''} onChange={(val) => {
                    const selected = availableSlots.find(s => `${s.startTime} - ${s.endTime}` === val)
                    setSlot(selected)
                  }} />
                  <div className="mt-4">
                    <label className="text-sm text-slate-300">Notes (optional)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special requests?"
                      className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm text-white placeholder:text-slate-500"
                      rows="3"
                    />
                  </div>
                </>
              ) : (
                <p className="mt-4 text-sm text-slate-300">No available slots for this date</p>
              )}
            </>
          ) : (
            <p className="mt-4 text-sm text-slate-300">Select a date to view available times</p>
          )}
          {bookingError && <p className="mt-3 text-sm text-red-400">{bookingError}</p>}
          <button
            type="button"
            onClick={onConfirm}
            disabled={!slot || !date || submitting || loading}
            className="mt-6 w-full rounded-xl bg-emerald-400/20 p-3 font-medium text-emerald-100 hover:bg-emerald-400/30 disabled:opacity-50"
          >
            {submitting ? 'Creating Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </PageMotion>
  )
}

export default BookingPage
