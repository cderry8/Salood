import { useState } from 'react'
import { schedule } from '../../data/mockData'

function AdminSchedulePage() {
  const [openHours, setOpenHours] = useState(schedule.openHours)
  const [slotDuration, setSlotDuration] = useState(schedule.slotDuration)

  return (
    <div>
      <h2 className="text-xl font-semibold text-white">Manage Schedule</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl p-4 glass">
          <label className="text-sm text-slate-300">Open Hours</label>
          <input value={openHours} onChange={(event) => setOpenHours(event.target.value)} className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm" />
        </div>
        <div className="rounded-2xl p-4 glass">
          <label className="text-sm text-slate-300">Time Slot Interval</label>
          <input value={slotDuration} onChange={(event) => setSlotDuration(event.target.value)} className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm" />
        </div>
      </div>
      <div className="mt-5 rounded-2xl p-4 glass">
        <h3 className="font-medium text-white">Current setup</h3>
        <p className="mt-2 text-sm text-slate-300">Open hours: {openHours}</p>
        <p className="text-sm text-slate-300">Slot duration: {slotDuration}</p>
        <button type="button" className="mt-4 rounded-xl bg-cyan-400/20 px-4 py-2 text-sm text-cyan-100">Save schedule (UI only)</button>
      </div>
    </div>
  )
}

export default AdminSchedulePage
