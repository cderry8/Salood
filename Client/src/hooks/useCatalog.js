import { useCallback, useEffect, useMemo, useState } from 'react'
import { categories as fallbackCategories, services as fallbackServices } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'

const normalizeCategory = (item) => ({
  id: String(item._id ?? item.id ?? ''),
  slug: item.slug || String(item._id || item.id || ''),
  name: item.name,
  icon: item.icon || '',
  serviceCount: item.serviceCount ?? 0,
})

const normalizeService = (item) => {
  const categoryObj = item.category && typeof item.category === 'object'
    ? item.category
    : null

  const categorySlug = categoryObj?.slug || item.category
  const rawCategoryId = categoryObj?._id || item.categoryId || item.category || null
  const categoryId = rawCategoryId != null ? String(rawCategoryId) : null

  const rawId = item._id ?? item.id
  return {
    id: rawId != null ? String(rawId) : '',
    name: item.name,
    description: item.description || '',
    price: Number(item.price) || 0,
    duration: Number(item.duration) || 0,
    image: item.image || '',
    emoji: item.emoji || '',
    category: categorySlug || '',
    categoryId,
    categoryName: categoryObj?.name || categorySlug || '',
    categoryIcon: categoryObj?.icon || '',
  }
}

export function useCatalog() {
  const { api } = useAuth()
  const [categories, setCategories] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCatalog = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const [categoriesResponse, servicesResponse] = await Promise.all([
        api.get('/categories'),
        api.get('/services'),
      ])

      const incomingCategories = categoriesResponse?.data?.data?.categories ?? []
      const incomingServices = servicesResponse?.data?.data?.services ?? []

      setCategories(incomingCategories.map(normalizeCategory))
      setServices(incomingServices.map(normalizeService))
    } catch (requestError) {
      // Keep app usable in frontend-only mode if API is unavailable.
      setCategories(fallbackCategories.map(normalizeCategory))
      setServices(fallbackServices.map(normalizeService))
      setError(requestError?.response?.data?.message || 'Using local demo data')
    } finally {
      setLoading(false)
    }
  }, [api])

  useEffect(() => {
    loadCatalog()
  }, [loadCatalog])

  const categoriesBySlug = useMemo(
    () => new Map(categories.map((category) => [category.slug, category])),
    [categories]
  )

  return {
    categories,
    categoriesBySlug,
    services,
    loading,
    error,
    reloadCatalog: loadCatalog,
  }
}
