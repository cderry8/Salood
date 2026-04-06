import { motion } from 'framer-motion'

function TestimonialCard({ item }) {
  const MotionArticle = motion.article

  return (
    <MotionArticle whileHover={{ y: -5 }} className="rounded-2xl p-5 glass">
      <p className="text-sm leading-relaxed text-slate-200">"{item.text}"</p>
      <div className="mt-4">
        <p className="text-sm font-semibold text-white">{item.name}</p>
        <p className="text-xs text-slate-400">{item.role}</p>
      </div>
    </MotionArticle>
  )
}

export default TestimonialCard
