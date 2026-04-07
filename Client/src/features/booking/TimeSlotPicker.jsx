function TimeSlotPicker({ slots, value, onChange }) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      {slots.map((time) => (
        <button
          key={time}
          type="button"
          onClick={() => onChange(time)}
          className={`rounded-lg border px-3 py-2 text-xs transition ${
            value === time
              ? 'border-cyan-400 bg-cyan-400/25 text-cyan-100'
              : 'border-white/15 text-slate-300 hover:bg-white/10'
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  )
}

export default TimeSlotPicker
