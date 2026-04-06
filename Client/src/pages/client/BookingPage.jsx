import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageMotion from '../../components/ui/PageMotion'
import { services, timeSlots } from '../../data/mockData'
import BookingCalendar from '../../features/booking/BookingCalendar'
import TimeSlotPicker from '../../features/booking/TimeSlotPicker'
import { useBookingStore } from '../../hooks/useBookingStore'
import { formatCurrency } from '../../utils/format'

function BookingPage() {
  const navigate = useNavigate()
  const { serviceId } = useParams()
  const { setBooking } = useBookingStore()
  const service = services.find((item) => item.id === serviceId)
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')

  if (!service) {
    return <p className="text-slate-300">Service not found.</p>
  }

  const onConfirm = () => {
    if (!date || !slot) return
    setBooking({ serviceId: service.id, serviceName: service.name, date, time: slot, amount: service.price })
    navigate('/payment')
  }

  return (
    <PageMotion>
      <h1 className="text-4xl font-bold text-white">Booking Flow</h1>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/40">
          <img src={service.image} alt={service.name} className="h-48 w-full object-cover" />
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
          <TimeSlotPicker slots={timeSlots} value={slot} onChange={setSlot} />
          <button type="button" onClick={onConfirm} className="mt-6 w-full rounded-xl bg-emerald-400/20 p-3 font-medium text-emerald-100 hover:bg-emerald-400/30 disabled:opacity-50" disabled={!slot || !date}>
            Confirm Booking
          </button>
        </div>
      </div>
    </PageMotion>
  )
}

export default BookingPage
