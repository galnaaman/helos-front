'use client';

import { TalentsTable } from '@/components/talents/talents-table';
import { mockTalents } from '@/data/mock-talents';

export default function TalentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Talents Management</h1>
        <p className="text-gray-600 mt-2">
          View and manage all talents in the platform
        </p>
      </div>
      
      <TalentsTable talents={mockTalents} />
    </div>
  );
} 