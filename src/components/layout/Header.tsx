'use client'

import { Bell, User } from 'lucide-react'

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-700">Admin Dashboard</h2>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-full p-2 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <button className="rounded-full p-2 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors">
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
} 