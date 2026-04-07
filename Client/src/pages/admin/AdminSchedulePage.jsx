import { useState, useEffect } from 'react'
import { useSchedule } from '../../hooks/useSchedule'

function AdminSchedulePage() {
  const { schedule, loading, error, fetchSchedule, updateDaySchedule } = useSchedule()
  const [saving, setSaving] = useState(false)
  const [daySchedules, setDaySchedules] = useState({
    monday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
    tuesday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
    wednesday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
    thursday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
    friday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
    saturday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
    sunday: { isWorking: false, startTime: '09:00', endTime: '17:00' }
  })
  const [slotDuration, setSlotDuration] = useState(30)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchSchedule()
  }, [fetchSchedule])

  useEffect(() => {
    if (schedule) {
      setDaySchedules(schedule.schedule)
      setSlotDuration(schedule.slotDuration)
    }
  }, [schedule])

  const handleDayChange = (day, field, value) => {
    setDaySchedules(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }))
  }

  const handleSaveDay = async (day) => {
    setSaving(true)
    setSuccessMessage('')
    try {
      await updateDaySchedule(day, daySchedules[day])
      setSuccessMessage(`${day.charAt(0).toUpperCase() + day.slice(1)} schedule updated successfully`)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      console.error('Failed to save schedule:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-slate-300">Loading schedule...</div>
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  return (
    <div>
      <h2 className="text-xl font-semibold text-white">Manage Schedule</h2>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      {successMessage && <p className="mt-4 text-sm text-emerald-400">{successMessage}</p>}

      <div className="mt-6 space-y-4">
        {days.map(day => (
          <div key={day} className="rounded-2xl border border-white/15 bg-black/40 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={daySchedules[day]?.isWorking || false}
                  onChange={(e) => handleDayChange(day, 'isWorking', e.target.checked)}
                  className="h-4 w-4 cursor-pointer"
                />
                <label className="cursor-pointer font-medium text-white">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </label>
              </div>
            </div>

            {daySchedules[day]?.isWorking && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-slate-300">Start Time</label>
                  <input
                    type="time"
                    value={daySchedules[day]?.startTime || '09:00'}
                    onChange={(e) => handleDayChange(day, 'startTime', e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950/50 p-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300">End Time</label>
                  <input
                    type="time"
                    value={daySchedules[day]?.endTime || '17:00'}
                    onChange={(e) => handleDayChange(day, 'endTime', e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950/50 p-2 text-sm text-white"
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => handleSaveDay(day)}
              disabled={saving}
              className="mt-4 rounded-xl bg-cyan-400/20 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/30 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-white/15 bg-black/40 p-5">
        <h3 className="font-medium text-white">Booking Slot Duration</h3>
        <div className="mt-3">
          <label className="text-sm text-slate-300">Slot Duration (minutes)</label>
          <input
            type="number"
            value={slotDuration}
            onChange={(e) => setSlotDuration(Math.max(15, Math.min(240, Number(e.target.value))))}
            min="15"
            max="240"
            className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm"
          />
          <p className="mt-2 text-xs text-slate-400">This determines the interval between available booking slots (15-240 minutes)</p>
        </div>
      </div>
    </div>
  )
}

export default AdminSchedulePage
