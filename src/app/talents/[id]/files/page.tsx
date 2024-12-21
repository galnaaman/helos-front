'use client';

import { mockTalents } from '@/data/mock-talents';
import { useParams } from 'next/navigation';
import { Upload, Image, Mic } from 'lucide-react';

export default function TalentFilesPage() {
  const { id } = useParams();
  const talent = mockTalents.find(t => t.id === id);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Photos Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Photos</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Photo
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {talent?.photos.map((photo, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img src={photo} alt={`Talent photo ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            {Array.from({ length: Math.max(0, 6 - (talent?.photos.length || 0)) }).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                <Image className="h-8 w-8 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Voice Records Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Voice Records</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Record
            </button>
          </div>
          <div className="space-y-4">
            {talent?.voiceRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mic className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{record.title}</p>
                    <p className="text-sm text-gray-500">{record.duration}</p>
                  </div>
                </div>
                <audio controls className="w-48">
                  <source src={record.url} type="audio/mpeg" />
                </audio>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 