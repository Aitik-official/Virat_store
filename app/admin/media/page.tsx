import { Suspense } from 'react'
import { AdminDashboardClient } from '../admin-dashboard-client'

export const metadata = {
  title: 'Homepage Media CMS | Virat Sports Admin',
  description: 'Manage hero banners, promotional split posters, categories, and video player.',
}

export default function MediaAdminPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center font-bold">Loading Media CMS...</div>}>
      <AdminDashboardClient initialTab="media" />
    </Suspense>
  )
}
