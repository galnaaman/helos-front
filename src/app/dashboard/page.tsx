import { Users, FileText, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';

const mockData = {
  talents: {
    count: 1234,
    trend: { value: 12, isUpward: true },
  },
  reports: {
    count: 856,
    trend: { value: 8, isUpward: true },
  },
  successRate: {
    value: 94.5,
    trend: { value: 2.5, isUpward: true },
  },
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome to your HELOS-AI admin dashboard.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Talents"
          value={mockData.talents.count}
          icon={Users}
          description="Active talents in platform"
          trend={mockData.talents.trend}
          className="bg-blue-50/50"
        />
        
        <StatCard
          title="Total Reports"
          value={mockData.reports.count}
          icon={FileText}
          description="Generated reports"
          trend={mockData.reports.trend}
          className="bg-purple-50/50"
        />
        
        <StatCard
          title="Success Rate"
          value={`${mockData.successRate.value}%`}
          icon={TrendingUp}
          description="Overall success rate"
          trend={mockData.successRate.trend}
          className="bg-green-50/50"
        />
      </div>

      {/* We can add more dashboard sections here later */}
    </div>
  );
} 