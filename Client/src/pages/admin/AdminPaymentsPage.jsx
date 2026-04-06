import { useState } from 'react'
import { transactions } from '../../data/mockData'
import { formatCurrency } from '../../utils/format'

function AdminPaymentsPage() {
  const [rows, setRows] = useState(transactions)

  const refund = (id) => {
    setRows((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'Refunded' } : item)))
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white">Payments</h2>
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/15">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-3">Transaction</th>
              <th className="px-4 py-3">Booking</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-white/10">
                <td className="px-4 py-3 text-white">{row.id}</td>
                <td className="px-4 py-3 text-slate-300">{row.bookingId}</td>
                <td className="px-4 py-3 text-slate-300">{row.method}</td>
                <td className="px-4 py-3 text-emerald-300">{formatCurrency(row.amount)}</td>
                <td className="px-4 py-3 text-cyan-300">{row.status}</td>
                <td className="px-4 py-3">
                  <button type="button" onClick={() => refund(row.id)} className="rounded-lg bg-rose-400/20 px-3 py-1 text-xs text-rose-100">
                    Refund UI
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPaymentsPage
