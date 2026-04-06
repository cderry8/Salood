function StatCard({ label, value, accent = 'text-cyan-300' }) {
  return (
    <div className="rounded-2xl p-5 glass">
      <p className="text-xs uppercase tracking-widest text-slate-400">{label}</p>
      <p className={`mt-3 text-2xl font-semibold ${accent}`}>{value}</p>
    </div>
  )
}

export default StatCard
