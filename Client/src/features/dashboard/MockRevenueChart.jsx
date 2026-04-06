function MockRevenueChart() {
  return (
    <div className="mt-4 flex h-52 items-end gap-3">
      {[35, 45, 70, 55, 82, 62, 90].map((item, index) => (
        <div key={item} className="group flex flex-1 flex-col items-center gap-2">
          <div className="w-full rounded-t-lg bg-gradient-to-t from-cyan-400/30 to-indigo-400/60 transition group-hover:from-fuchsia-400/35" style={{ height: `${item}%` }} />
          <span className="text-xs text-slate-400">D{index + 1}</span>
        </div>
      ))}
    </div>
  )
}

export default MockRevenueChart
