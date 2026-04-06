import ServiceCard from '../../components/cards/ServiceCard'
import PageMotion from '../../components/ui/PageMotion'
import { categories, services } from '../../data/mockData'
import ServiceCategoryPills from '../../features/services/ServiceCategoryPills'

function ServicesPage() {
  return (
    <PageMotion>
      <h1 className="text-4xl font-bold text-white">All Services</h1>
      <ServiceCategoryPills categories={categories} />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </PageMotion>
  )
}

export default ServicesPage
