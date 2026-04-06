import { Link, useParams } from 'react-router-dom'
import PageMotion from '../../components/ui/PageMotion'
import { services } from '../../data/mockData'
import { formatCurrency } from '../../utils/format'

function ServiceDetailsPage() {
  const { serviceId } = useParams()
  const service = services.find((item) => item.id === serviceId)

  if (!service) {
    return <p className="text-slate-300">Service not found.</p>
  }

  return (
    <PageMotion>
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/40 glow-border">
        <img src={service.image} alt={service.name} className="h-64 w-full object-cover" />
        <div className="p-6">
        <p className="text-xs uppercase tracking-wider text-cyan-300">{service.category}</p>
        <h1 className="mt-2 text-4xl font-bold text-white">{service.name}</h1>
        <p className="mt-4 max-w-2xl text-slate-300">{service.description}</p>
        <p className="mt-2 max-w-2xl text-slate-400">
          Includes consultation, premium products, and after-care guidance from our stylists.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-white/15 px-3 py-1">{formatCurrency(service.price)}</span>
          <span className="rounded-full border border-white/15 px-3 py-1">{service.duration} mins</span>
        </div>
        <div className="mt-8 flex gap-3">
          <Link to={`/booking/${service.id}`} className="rounded-xl bg-cyan-400/20 px-5 py-2 text-sm text-cyan-100 hover:bg-cyan-400/30">
            Book service
          </Link>
          <Link to="/services" className="rounded-xl border border-white/20 px-5 py-2 text-sm">
            Back
          </Link>
        </div>
        </div>
      </div>
    </PageMotion>
  )
}

export default ServiceDetailsPage
