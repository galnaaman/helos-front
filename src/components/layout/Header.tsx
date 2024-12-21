'use client'

import { 
  Bell, 
  Search, 
  MessageSquare, 
  HelpCircle,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const { theme, setTheme } = useTheme()

  const notifications = [
    {
      id: 1,
      title: 'New Report Available',
      description: 'A new talent report has been generated',
      time: '5m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'System Update',
      description: 'Platform maintenance scheduled for tonight',
      time: '1h ago',
      unread: false,
    },
  ]

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 px-4 sm:px-6">
      {/* Left side - Search */}
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500"
          />
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-500" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-500" />
        </button>

        {/* Help Button */}
        <div className="relative">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <HelpCircle className="h-5 w-5 text-gray-500" />
          </button>

          {showHelp && (
            <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="space-y-2">
                <a href="/docs" className="block rounded-md p-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300">
                  Documentation
                </a>
                <a href="/support" className="block rounded-md p-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300">
                  Contact Support
                </a>
                <a href="/tutorials" className="block rounded-md p-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300">
                  Video Tutorials
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
          <MessageSquare className="h-5 w-5 text-gray-500" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                <h3 className="font-semibold dark:text-gray-200">Notifications</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  Mark all as read
                </button>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700",
                      notification.unread && "bg-blue-50/50 dark:bg-blue-900/20"
                    )}
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                      <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium dark:text-gray-200">{notification.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{notification.description}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{notification.time}</p>
                    </div>
                    {notification.unread && (
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 p-2 dark:border-gray-700">
                <button className="w-full rounded-md p-2 text-sm text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="hidden h-6 w-px bg-gray-200 dark:bg-gray-700 sm:block" />

        {/* User Menu Trigger */}
        <button className="hidden items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 sm:flex">
          <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center dark:bg-blue-900">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">A</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </header>
  )
} 