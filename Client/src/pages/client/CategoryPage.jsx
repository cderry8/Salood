import { Link, useParams } from 'react-router-dom'
import ServiceCard from '../../components/cards/ServiceCard'
import PageMotion from '../../components/ui/PageMotion'
import { useCatalog } from '../../hooks/useCatalog'

function CategoryPage() {
  const { category } = useParams()
  const { categories, services } = useCatalog()
  const selected = categories.find((item) => item.slug === category || item.id === category)
  const categoryServices = services.filter((item) => item.category === category)

  return (
    <PageMotion>
      <h1 className="text-4xl font-bold text-white">
        {selected?.name || 'Category'} Services
      </h1>
      <Link to="/services" className="mt-2 inline-block text-sm text-cyan-300">
        Back to all services
      </Link>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categoryServices.length === 0 ? (
          <p className="text-sm text-slate-300">No services in this category yet.</p>
        ) : null}
        {categoryServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </PageMotion>
  )
}

export default CategoryPage
