'use client'

import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  DollarSign,
  History,
  Star,
  Boxes,
  FileCode2,
  BookOpen,
  Building2,
  Plane,
  MoreHorizontal,
  ChevronDown,
  CreditCard,
  Bell,
  User,
  LogOut,
  Crown
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

const mainItems = [
  {
    title: 'Main',
    items: [
      { title: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { title: 'Talents', icon: Users, href: '/talents' },
      { title: 'Reports', icon: FileText, href: '/reports' },
      { title: 'Monetization', icon: DollarSign, href: '/monetization' },
      { title: 'Settings', icon: Settings, href: '/settings' },
    ]
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [selectedTeam, setSelectedTeam] = useState('HELOS-AI')
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const teams = [
    { name: 'HELOS-AI', id: '1' },
    { name: 'Team B', id: '2' },
    { name: 'Team C', id: '3' },
  ]

  const userMenuItems = [
    { title: 'Upgrade to Pro', icon: Crown, href: '/upgrade' },
    { title: 'Account', icon: User, href: '/account' },
    { title: 'Billing', icon: CreditCard, href: '/billing' },
    { title: 'Notifications', icon: Bell, href: '/notifications' },
    { title: 'Log out', icon: LogOut, href: '/logout' },
  ]

  return (
    <div className="flex h-full w-[250px] flex-col bg-white border-r border-gray-200">
      {/* Team Selector */}
      <div className="p-4">
        <button
          onClick={() => setIsTeamMenuOpen(!isTeamMenuOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-700">
              {selectedTeam[0]}
            </div>
            <span className="text-sm font-medium">{selectedTeam}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
        
        {isTeamMenuOpen && (
          <div className="absolute mt-1 w-[218px] rounded-lg border border-gray-200 bg-white shadow-lg z-50">
            <div className="p-1">
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => {
                    setSelectedTeam(team.name)
                    setIsTeamMenuOpen(false)
                  }}
                  className="flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-gray-50"
                >
                  <div className="h-6 w-6 rounded bg-blue-100 flex items-center justify-center font-medium text-blue-700">
                    {team.name[0]}
                  </div>
                  {team.name}
                </button>
              ))}
              <Separator className="my-1" />
              <button
                className="flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-gray-50"
              >
                <div className="h-6 w-6 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                  +
                </div>
                Add team
              </button>
            </div>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4 py-4">
          {mainItems.map((section) => (
            <div key={section.title}>
              <div className="px-3">
                <h2 className="mb-2 text-xs font-semibold tracking-tight text-gray-500">
                  {section.title}
                </h2>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                        pathname === item.href
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* User Section with Dropdown */}
      <div className="relative mt-auto border-t border-gray-200 p-4">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex w-full items-center gap-2 rounded-lg p-2 text-sm hover:bg-gray-50"
        >
          <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Users className="h-4 w-4 text-blue-700" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium">Admin</div>
            <div className="text-xs text-gray-500">admin@helos-ai.com</div>
          </div>
          <MoreHorizontal className="h-4 w-4 text-gray-500" />
        </button>

        {isUserMenuOpen && (
          <div className="absolute bottom-full left-4 right-4 mb-2 rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="p-1">
              {userMenuItems.map((item, index) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-gray-50"
                  >
                    <item.icon className="h-4 w-4 text-gray-500" />
                    <span className={cn(
                      "flex-1",
                      item.title === 'Upgrade to Pro' && "text-blue-600 font-medium"
                    )}>
                      {item.title}
                    </span>
                  </Link>
                  {index === 0 && <Separator className="my-1" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 