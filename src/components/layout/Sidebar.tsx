'use client'

import { cn } from '@/lib/utils'
import { LayoutDashboard, Users, Settings, FileText, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Talents',
    icon: Users,
    href: '/talents',
  },
  {
    title: 'Reports',
    icon: FileText,
    href: '/reports',
  },
  {
    title: 'Monetization',
    icon: DollarSign,
    href: '/monetization',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[250px] flex-col bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">HELOS.AI</h1>
      </div>
      <div className="flex-1">
        <nav className="space-y-1 p-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                pathname === item.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
} 