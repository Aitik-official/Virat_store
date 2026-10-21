import { Suspense } from 'react'
import { AdminDashboardClient } from '../admin-dashboard-client'

export const metadata = {
  title: 'Taxonomies & Categories | Virat Sports Admin',
  description: 'Manage main categories, sub-categories, badges, sizes, sports, announcement bar, and contact details.',
}

export default function TaxonomyAdminPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center font-bold">Loading Taxonomies...</div>}>
      <AdminDashboardClient initialTab="taxonomy" />
    </Suspense>
  )
}
