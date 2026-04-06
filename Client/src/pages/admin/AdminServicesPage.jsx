import { useState } from 'react'
import { services as seedServices } from '../../data/mockData'
import { formatCurrency } from '../../utils/format'

function AdminServicesPage() {
  const [list, setList] = useState(seedServices)
  const [name, setName] = useState('')

  const addService = () => {
    if (!name.trim()) return
    setList((prev) => [
      { id: `sv-${Date.now()}`, category: 'haircut', name, price: 15000, duration: 45, description: 'New custom service' },
      ...prev,
    ])
    setName('')
  }

  const removeService = (id) => setList((prev) => prev.filter((service) => service.id !== id))

  return (
    <div>
      <h2 className="text-xl font-semibold text-white">Manage Services</h2>
      <div className="mt-4 flex gap-2">
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Add a service..." className="w-full rounded-xl border border-white/20 bg-slate-950/50 p-3 text-sm" />
        <button type="button" onClick={addService} className="rounded-xl bg-cyan-400/20 px-4 py-2 text-sm text-cyan-100">
          Add
        </button>
      </div>
      <div className="mt-5 space-y-2">
        {list.map((service) => (
          <div key={service.id} className="flex items-center justify-between rounded-xl border border-white/15 p-3 text-sm">
            <div>
              <p className="font-medium text-white">{service.name}</p>
              <p className="text-slate-400">{service.category} · {formatCurrency(service.price)} · {service.duration} mins</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="rounded-lg bg-white/10 px-3 py-1 text-xs">Edit</button>
              <button type="button" onClick={() => removeService(service.id)} className="rounded-lg bg-rose-400/20 px-3 py-1 text-xs text-rose-200">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminServicesPage
