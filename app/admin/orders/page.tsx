import { Suspense } from 'react'
import { AdminDashboardClient } from '../admin-dashboard-client'

export const metadata = {
  title: 'Customer Orders | Virat Sports Admin',
  description: 'Manage incoming customer orders, tracking, and fulfillment.',
}

export default function OrdersAdminPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center font-bold">Loading Orders...</div>}>
      <AdminDashboardClient initialTab="orders" />
    </Suspense>
  )
}
