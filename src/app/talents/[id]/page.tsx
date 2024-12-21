'use client';

import { mockTalents } from '@/data/mock-talents';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { 
  Bell,
  FileText,
  Activity,
  Folder,
  Settings,
  Instagram,
  Twitter,
  Youtube,
  Music2,
  Globe,
  Mail,
  AlertCircle,
  DollarSign,
  Upload,
  Image,
  Mic,
  Download,
  MapPin,
  Calendar,
  Link,
} from 'lucide-react';
import { MetricCard } from '@/components/talents/metric-card';
import { UnderConstruction } from '@/components/under-construction';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { AnimatedGlobe } from '@/components/talents/animated-globe';

type TabType = 'overview' | 'monetization' | 'files' | 'reports';

export default function TalentProfilePage() {
  const { id } = useParams();
  const talent = mockTalents.find(t => t.id === id);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (!talent) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'files', label: 'Files', icon: Folder },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'monetization', label: 'Monetization', icon: DollarSign },
  ];

  const mockReports = [
    {
      id: 'REP-001',
      title: 'Copyright Violation - Instagram Post',
      date: '2024-03-01',
      status: 'Ready for Download',
      type: 'Copyright',
    },
    {
      id: 'REP-002',
      title: 'Unauthorized Music Usage',
      date: '2024-02-28',
      status: 'Processing',
      type: 'Copyright',
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Artist Overview */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">Artist Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MetricCard
                    title="Real Time Alerts"
                    value={224}
                    trend={{ value: 5, isUpward: true }}
                    icon={<Bell className="h-6 w-6 text-blue-500" />}
                  />
                  <MetricCard
                    title="Reports"
                    value={talent.reportsCount}
                    trend={{ value: 5, isUpward: true }}
                    icon={<FileText className="h-6 w-6 text-purple-500" />}
                  />
                  <MetricCard
                    title="Scans"
                    value={156}
                    trend={{ value: 12, isUpward: true }}
                    icon={<Activity className="h-6 w-6 text-green-500" />}
                  />
                  <MetricCard
                    title="Files"
                    value={30}
                    icon={<Folder className="h-6 w-6 text-orange-500" />}
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 font-display">Social Media</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {talent.socialMedia.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {social.platform === 'instagram' && <Instagram className="h-5 w-5 text-pink-500" />}
                      {social.platform === 'twitter' && <Twitter className="h-5 w-5 text-blue-400" />}
                      {social.platform === 'youtube' && <Youtube className="h-5 w-5 text-red-500" />}
                      {social.platform === 'spotify' && <Music2 className="h-5 w-5 text-green-500" />}
                      {!['instagram', 'twitter', 'youtube', 'spotify'].includes(social.platform) && 
                        <Globe className="h-5 w-5 text-gray-500" />
                      }
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 capitalize truncate">{social.platform}</p>
                        <p className="text-sm text-gray-500 truncate">@{social.username}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Web Scanning Status - Moved to right column */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 font-display">Web Scanning Status</h2>
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-medium",
                    talent.status === 'active' 
                      ? "bg-green-50 text-green-700" 
                      : "bg-gray-50 text-gray-600"
                  )}>
                    {talent.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-center p-2">
                  <div className="w-full aspect-square max-w-[300px]">
                    <AnimatedGlobe isActive={talent.status === 'active'} />
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-4 w-4 text-gray-400" />
                  <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-sm">Real-time Alerts</p>
                        <p className="text-xs text-gray-500">Get instant notifications</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-sm">Email Reports</p>
                        <p className="text-xs text-gray-500">Daily summary via email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-sm">Critical Updates</p>
                        <p className="text-xs text-gray-500">Important notifications</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'files':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Photos Section */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Photos</h2>
                <button className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {talent.photos.map((photo, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={photo} alt={`Talent photo ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                {Array.from({ length: Math.max(0, 6 - talent.photos.length) }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                    <Image className="h-8 w-8 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Records Section */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Voice Records</h2>
                <button className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Record
                </button>
              </div>
              <div className="space-y-4">
                {talent.voiceRecords.map((record) => (
                  <div key={record.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mic className="h-5 w-5 shrink-0 text-gray-400" />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">{record.title}</p>
                        <p className="text-sm text-gray-500">{record.duration}</p>
                      </div>
                    </div>
                    <audio controls className="w-full sm:w-48">
                      <source src={record.url} type="audio/mpeg" />
                    </audio>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Legal Reports</h2>
              <button className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" />
                Generate New Report
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {report.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(report.date), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'monetization':
        return (
          <UnderConstruction
            title={`Monetization Features for ${talent.firstName} ${talent.lastName}`}
            description="We're building powerful monetization tools to help you manage and optimize revenue streams for this talent. Check back soon for exciting updates!"
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600" />
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center -mt-12">
            <div className="relative">
              <div className="h-24 w-24 rounded-xl bg-white shadow-lg overflow-hidden">
                {talent.avatarUrl ? (
                  <img
                    src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'
                    alt={`${talent.firstName} ${talent.lastName}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-blue-50 flex items-center justify-center">
                    <span className="text-3xl font-semibold text-blue-500">
                      {talent.firstName[0]}{talent.lastName[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {talent.firstName} {talent.lastName}
                </h1>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  {talent.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>United States</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{talent.age} years old</span>
                </div>
                <div className="flex items-center gap-1">
                  <Link className="h-4 w-4" />
                  <span>{talent.industry}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {talent.subIndustry.map((industry) => (
                  <span
                    key={industry}
                    className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 w-full sm:w-auto">
                <Mail className="h-4 w-4" />
                Contact
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-full sm:w-auto">
                <FileText className="h-4 w-4" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-8 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "flex items-center gap-2 border-b-2 pb-4 pt-2 text-sm font-medium transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-w-0">
        {renderTabContent()}
      </div>
    </div>
  );
} 