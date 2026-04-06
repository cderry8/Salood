import StatCard from '../../components/cards/StatCard'
import { adminStats } from '../../data/mockData'
import MockRevenueChart from '../../features/dashboard/MockRevenueChart'
import { formatCurrency } from '../../utils/format'

function AdminDashboardPage() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total bookings" value={adminStats.totalBookings} />
        <StatCard label="Revenue" value={formatCurrency(adminStats.revenue)} accent="text-white" />
        <StatCard label="Active users" value={adminStats.activeUsers} accent="text-fuchsia-300" />
      </div>
      <div className="mt-6 rounded-2xl p-5 glass">
        <h2 className="text-xl font-semibold text-white">Mock Performance Chart</h2>
        <MockRevenueChart />
      </div>
    </div>
  )
}

export default AdminDashboardPage
