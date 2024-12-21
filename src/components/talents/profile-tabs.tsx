'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ProfileTabs({ talentId }: { talentId: string }) {
  const pathname = usePathname();
  
  const tabs = [
    {
      label: 'OVERVIEW',
      href: `/talents/${talentId}`,
    },
    {
      label: 'FILES',
      href: `/talents/${talentId}/files`,
    },
    {
      label: 'REPORTS',
      href: `/talents/${talentId}/reports`,
    },
    {
      label: 'MONETIZE',
      href: `/talents/${talentId}/monetize`,
    },
  ].map(tab => ({
    ...tab,
    active: pathname === tab.href,
  }));

  return (
    <div className="flex space-x-2 mb-6">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "px-6 py-2 rounded-lg font-medium transition-colors",
            tab.active
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
} 