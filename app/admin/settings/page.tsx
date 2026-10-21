import { Suspense } from 'react'
import { AdminDashboardClient } from '../admin-dashboard-client'

export const metadata = {
  title: 'System Settings | Virat Sports Admin',
  description: 'Manage database reset and administrative configurations.',
}

export default function SettingsAdminPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center font-bold">Loading Settings...</div>}>
      <AdminDashboardClient initialTab="settings" />
    </Suspense>
  )
}
