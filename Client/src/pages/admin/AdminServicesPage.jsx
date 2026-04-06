import { useMemo, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useCatalog } from '../../hooks/useCatalog'
import { API_BASE_URL } from '../../config/api'
import { formatCurrency, SERVICE_IMAGE_PLACEHOLDER } from '../../utils/format'

function AdminServicesPage() {
  const { api } = useAuth()
  const { categories, services, reloadCatalog, error } = useCatalog()
  const [busy, setBusy] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)

  const [categoryForm, setCategoryForm] = useState({ name: '', icon: '' })
  const [editingCategoryId, setEditingCategoryId] = useState('')

  const [serviceForm, setServiceForm] = useState({
    name: '',
    categoryId: '',
    price: '15000',
    duration: '45',
    description: '',
    image: '',
    emoji: '',
  })
  const [editingServiceId, setEditingServiceId] = useState('')

  const selectedCategoryInForm = useMemo(
    () => categories.find((item) => item.id === serviceForm.categoryId),
    [categories, serviceForm.categoryId]
  )

  const resetCategoryForm = () => {
    setCategoryForm({ name: '', icon: '' })
    setEditingCategoryId('')
  }

  const resetServiceForm = () => {
    setServiceForm({
      name: '',
      categoryId: '',
      price: '15000',
      duration: '45',
      description: '',
      image: '',
      emoji: '',
    })
    setEditingServiceId('')
  }

  const uploadServiceImageFile = async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    const token = localStorage.getItem('token')
    const base = (api.defaults.baseURL || API_BASE_URL).replace(/\/$/, '')
    const res = await fetch(`${base}/upload/service-image`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to upload image')
    }
    return data.data.url
  }

  const onServiceImageFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    try {
      const url = await uploadServiceImageFile(file)
      setServiceForm((prev) => ({ ...prev, image: url }))
    } catch (requestError) {
      window.alert(requestError?.message || 'Failed to upload image')
    } finally {
      setImageUploading(false)
      event.target.value = ''
    }
  }

  const upsertCategory = async () => {
    if (!categoryForm.name.trim()) return
    setBusy(true)
    try {
      if (editingCategoryId) {
        await api.put(`/categories/${editingCategoryId}`, categoryForm)
      } else {
        await api.post('/categories', categoryForm)
      }
      resetCategoryForm()
      await reloadCatalog()
    } catch (requestError) {
      window.alert(requestError?.response?.data?.message || 'Failed to save category')
    } finally {
      setBusy(false)
    }
  }

  const onEditCategory = (category) => {
    setEditingCategoryId(category.id)
    setCategoryForm({
      name: category.name,
      icon: category.icon || '',
    })
  }

  const onDeleteCategory = async (categoryId) => {
    setBusy(true)
    try {
      await api.delete(`/categories/${categoryId}`)
      await reloadCatalog()
    } catch (requestError) {
      window.alert(requestError?.response?.data?.message || 'Failed to delete category')
    } finally {
      setBusy(false)
    }
  }

  const upsertService = async () => {
    if (!serviceForm.name.trim() || !serviceForm.categoryId) return
    setBusy(true)
    try {
      const payload = {
        ...serviceForm,
        price: Number(serviceForm.price),
        duration: Number(serviceForm.duration),
      }

      if (editingServiceId) {
        await api.put(`/services/${editingServiceId}`, payload)
      } else {
        await api.post('/services', payload)
      }

      resetServiceForm()
      await reloadCatalog()
    } catch (requestError) {
      window.alert(requestError?.response?.data?.message || 'Failed to save service')
    } finally {
      setBusy(false)
    }
  }

  const onEditService = (service) => {
    setEditingServiceId(service.id)
    setServiceForm({
      name: service.name,
      categoryId: service.categoryId || '',
      price: String(service.price),
      duration: String(service.duration),
      description: service.description || '',
      image: service.image || '',
      emoji: service.emoji || '',
    })
  }

  const onDeleteService = async (serviceId) => {
    setBusy(true)
    try {
      await api.delete(`/services/${serviceId}`)
      await reloadCatalog()
    } catch (requestError) {
      window.alert(requestError?.response?.data?.message || 'Failed to delete service')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white">Manage Services</h2>

      {error ? (
        <p className="mt-3 text-xs text-amber-300">
          {error}. Changes require backend and admin auth.
        </p>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/15 bg-black/35 p-4">
          <h3 className="text-lg font-semibold text-white">Categories</h3>
          <div className="mt-3 grid gap-2">
            <input
              value={categoryForm.name}
              onChange={(event) => setCategoryForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Category name..."
              className="w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm"
            />
            <input
              value={categoryForm.icon}
              onChange={(event) => setCategoryForm((prev) => ({ ...prev, icon: event.target.value }))}
              placeholder="Icon (optional)"
              className="w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={upsertCategory}
                disabled={busy}
                className="rounded-xl bg-cyan-400/20 px-4 py-2 text-sm text-cyan-100 disabled:opacity-60"
              >
                {editingCategoryId ? 'Save Category' : 'Create Category'}
              </button>
              {editingCategoryId ? (
                <button type="button" onClick={resetCategoryForm} className="rounded-xl border border-white/20 px-4 py-2 text-sm">
                  Cancel
                </button>
              ) : null}
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between rounded-xl border border-white/15 p-3 text-sm">
                <div>
                  <p className="font-medium text-white">
                    {category.icon ? `${category.icon} ` : ''}{category.name}
                  </p>
                  <p className="text-slate-400">{category.slug} · {category.serviceCount} services</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => onEditCategory(category)} className="rounded-lg bg-white/10 px-3 py-1 text-xs">Edit</button>
                  <button type="button" onClick={() => onDeleteCategory(category.id)} className="rounded-lg bg-rose-400/20 px-3 py-1 text-xs text-rose-200">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/15 bg-black/35 p-4">
          <h3 className="text-lg font-semibold text-white">Services</h3>
          <div className="mt-3 grid gap-2">
            <input
              value={serviceForm.name}
              onChange={(event) => setServiceForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Service name..."
              className="w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm"
            />
            <select
              value={serviceForm.categoryId}
              onChange={(event) => setServiceForm((prev) => ({ ...prev, categoryId: event.target.value }))}
              className="w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm"
            >
              <option value="">Choose category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon ? `${category.icon} ` : ''}{category.name}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input
                value={serviceForm.price}
                onChange={(event) => setServiceForm((prev) => ({ ...prev, price: event.target.value }))}
                type="number"
                min="0"
                placeholder="Price"
                className="w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm"
              />
              <input
                value={serviceForm.duration}
                onChange={(event) => setServiceForm((prev) => ({ ...prev, duration: event.target.value }))}
                type="number"
                min="1"
                placeholder="Duration (mins)"
                className="w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm"
              />
            </div>
            <input
              value={serviceForm.emoji}
              onChange={(event) => setServiceForm((prev) => ({ ...prev, emoji: event.target.value }))}
              placeholder="Emoji (optional)"
              className="w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm"
            />
            <div className="grid gap-2">
              <label className="text-xs text-slate-400">
                Service image — upload to Cloudinary (admin) or paste a URL
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onServiceImageFile}
                disabled={busy || imageUploading}
                className="w-full text-sm text-slate-200 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:text-white hover:file:bg-white/15"
              />
              {imageUploading ? (
                <p className="text-xs text-cyan-200/80">Uploading image…</p>
              ) : null}
              {serviceForm.image ? (
                <img
                  src={serviceForm.image}
                  alt="Preview"
                  className="h-28 w-full max-w-xs rounded-lg border border-white/15 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = SERVICE_IMAGE_PLACEHOLDER
                  }}
                />
              ) : null}
              <input
                value={serviceForm.image}
                onChange={(event) => setServiceForm((prev) => ({ ...prev, image: event.target.value }))}
                placeholder="Image URL (optional if you uploaded above)"
                className="w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm"
              />
            </div>
            <textarea
              value={serviceForm.description}
              onChange={(event) => setServiceForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="Description..."
              rows={3}
              className="w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm"
            />
            <button
              type="button"
              onClick={upsertService}
              disabled={busy || imageUploading || !selectedCategoryInForm}
              className="rounded-xl bg-cyan-400/20 px-4 py-2 text-sm text-cyan-100 disabled:opacity-60"
            >
              {editingServiceId ? 'Save Service' : 'Create Service'}
            </button>
            {editingServiceId ? (
              <button type="button" onClick={resetServiceForm} className="rounded-xl border border-white/20 px-4 py-2 text-sm">
                Cancel
              </button>
            ) : null}
          </div>
        </section>
      </div>

      <div className="mt-6 space-y-2">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/15 p-3 text-sm">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <img
                src={service.image || SERVICE_IMAGE_PLACEHOLDER}
                alt=""
                className="h-12 w-12 shrink-0 rounded-lg border border-white/10 object-cover"
              />
              <div className="min-w-0">
                <p className="font-medium text-white">{service.name}</p>
                <p className="text-slate-400">{service.categoryName} · {formatCurrency(service.price)} · {service.duration} mins</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => onEditService(service)} className="rounded-lg bg-white/10 px-3 py-1 text-xs">Edit</button>
              <button type="button" onClick={() => onDeleteService(service.id)} className="rounded-lg bg-rose-400/20 px-3 py-1 text-xs text-rose-200">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminServicesPage
