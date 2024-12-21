import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-14">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
} 