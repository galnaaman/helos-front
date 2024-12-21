import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
  trend?: {
    value: number;
    isUpward: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, description, trend, className }: StatCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${className}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4">
        {trend && (
          <span className={`inline-flex items-center text-sm font-medium ${
            trend.isUpward ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isUpward ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
        <span className="ml-2 text-sm text-gray-500">{description}</span>
      </div>
    </div>
  );
} 