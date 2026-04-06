import { motion } from 'framer-motion'

const cards = [
  { id: 1, title: 'Smart Booking', color: 'from-white/20 to-white/5' },
  { id: 2, title: 'Instant Ticket', color: 'from-zinc-300/20 to-zinc-200/5' },
  { id: 3, title: 'Live Schedule', color: 'from-stone-300/20 to-stone-200/5' },
]

function FloatingStack() {
  const MotionCard = motion.div

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {cards.map((card, index) => (
        <MotionCard
          key={card.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.12 }}
          whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
          className={`h-36 rounded-2xl border border-white/20 bg-gradient-to-br ${card.color} p-4 shadow-2xl`}
        >
          <div className="h-full rounded-xl border border-white/20 bg-slate-950/45 p-3">
            <p className="text-xs text-zinc-200/80">Salood 3D Layer</p>
            <p className="mt-2 text-lg font-semibold text-white">{card.title}</p>
          </div>
        </MotionCard>
      ))}
    </div>
  )
}

export default FloatingStack
