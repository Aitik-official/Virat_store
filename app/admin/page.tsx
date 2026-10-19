import { Suspense } from 'react'
import { AdminDashboardClient } from './admin-dashboard-client'

export const metadata = {
  title: 'Admin Control Center | Virat Sports',
  description: 'Manage products, inventory, media assets, and website layout modules.',
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#f3f4f8] text-[#080d2d]">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center font-bold text-[#080d2d]">
            Loading Admin Control Center...
          </div>
        }
      >
        <AdminDashboardClient />
      </Suspense>
    </div>
  )
}
