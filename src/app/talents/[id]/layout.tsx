'use client';

import { mockTalents } from '@/data/mock-talents';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ProfileTabs } from '@/components/talents/profile-tabs';

export default function TalentLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const talent = mockTalents.find(t => t.id === id);

  if (!talent) {
    return <div>Talent not found</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      {/* Back Button */}
      <Link 
        href="/talents" 
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Talents
      </Link>
      {/* Page Content */}
      <div className="min-h-[calc(100vh-300px)]">
        {children}
      </div>
    </div>
  );
} 