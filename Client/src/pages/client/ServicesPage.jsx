import ServiceCard from '../../components/cards/ServiceCard'
import PageMotion from '../../components/ui/PageMotion'
import ServiceCategoryPills from '../../features/services/ServiceCategoryPills'
import { useCatalog } from '../../hooks/useCatalog'

function ServicesPage() {
  const { categories, services, loading } = useCatalog()

  return (
    <PageMotion>
      <h1 className="text-4xl font-bold text-white">All Services</h1>
      <ServiceCategoryPills categories={categories} />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {!loading && services.length === 0 ? (
          <p className="text-sm text-slate-300">No services available yet.</p>
        ) : null}
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </PageMotion>
  )
}

export default ServicesPage
