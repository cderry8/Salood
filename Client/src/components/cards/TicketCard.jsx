function TicketCard({ ticket }) {
  return (
    <div className="rounded-2xl p-6 glass glow-border">
      <p className="text-xs uppercase tracking-widest text-cyan-300">Digital Ticket</p>
      <h3 className="mt-2 text-xl font-semibold text-white">{ticket.serviceName}</h3>
      <div className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
        <div>
          <p className="text-slate-400">Date</p>
          <p className="text-white">{ticket.date}</p>
        </div>
        <div>
          <p className="text-slate-400">Time</p>
          <p className="text-white">{ticket.time}</p>
        </div>
        <div>
          <p className="text-slate-400">Ticket ID</p>
          <p className="font-medium text-emerald-300">{ticket.ticketId}</p>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
