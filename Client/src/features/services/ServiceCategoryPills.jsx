import { Link } from 'react-router-dom'

function ServiceCategoryPills({ categories }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link key={category.id} to={`/services/${category.slug}`} className="rounded-full border border-white/20 px-4 py-1 text-sm text-slate-200 hover:bg-white/10">
          {category.icon ? `${category.icon} ` : ''}{category.name}
        </Link>
      ))}
    </div>
  )
}

export default ServiceCategoryPills
