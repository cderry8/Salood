import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { formatCurrency, SERVICE_IMAGE_PLACEHOLDER } from '../../utils/format'

function ServiceCard({ service }) {
  const MotionArticle = motion.article
  const categoryLabel = service.categoryName || service.category

  return (
    <MotionArticle whileHover={{ y: -6 }} className="overflow-hidden rounded-2xl border border-white/15 bg-black/45">
      <img
        src={service.image || SERVICE_IMAGE_PLACEHOLDER}
        alt={service.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-5">
        <p className="mb-2 text-xs uppercase tracking-wider text-slate-300">{categoryLabel}</p>
        <h3 className="text-lg font-semibold text-white">
          {service.emoji ? <span className="mr-2">{service.emoji}</span> : null}
          {service.name}
        </h3>
        <p className="mt-2 text-sm text-slate-300">{service.description}</p>
      </div>
      <div className="mt-1 flex items-center justify-between px-5 text-sm text-slate-200">
        <span>{formatCurrency(service.price)}</span>
        <span>{service.duration} mins</span>
      </div>
      <div className="mt-4 flex gap-2 px-5 pb-5">
        <Link to={`/service/${service.id}`} className="rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/15">
          Details
        </Link>
        <Link to={`/booking/${service.id}`} className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20">
          Book
        </Link>
      </div>
    </MotionArticle>
  )
}

export default ServiceCard
