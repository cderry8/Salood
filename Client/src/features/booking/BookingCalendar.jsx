import { useMemo, useState } from 'react'

function toISO(date) {
  return date.toISOString().split('T')[0]
}

function BookingCalendar({ value, onChange }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const selected = value ? new Date(value) : null
  const monthStart = useMemo(
    () => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
    [currentMonth],
  )
  const monthEnd = useMemo(
    () => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0),
    [currentMonth],
  )

  const days = useMemo(() => {
    const startWeekday = monthStart.getDay()
    const total = monthEnd.getDate()
    const slots = Array.from({ length: startWeekday }, () => null)
    for (let day = 1; day <= total; day += 1) {
      slots.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
    }
    return slots
  }, [currentMonth, monthEnd, monthStart])

  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))

  return (
    <div className="rounded-2xl border border-white/15 bg-black/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-slate-200">Select Date</p>
        <div className="flex gap-2">
          <button type="button" onClick={prevMonth} className="rounded-md border border-white/20 px-2 py-1 text-xs">
            Prev
          </button>
          <button type="button" onClick={nextMonth} className="rounded-md border border-white/20 px-2 py-1 text-xs">
            Next
          </button>
        </div>
      </div>
      <p className="mb-3 text-sm font-medium text-white">
        {monthStart.toLocaleString('en', { month: 'long', year: 'numeric' })}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <span key={day} className="py-1">{day}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) return <span key={`empty-${index}`} className="h-9" />
          const iso = toISO(date)
          const isSelected = selected && toISO(selected) === iso
          return (
            <button
              key={iso}
              type="button"
              onClick={() => onChange(iso)}
              className={`h-9 rounded-lg text-sm transition ${
                isSelected
                  ? 'bg-white text-black'
                  : 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/15'
              }`}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BookingCalendar
