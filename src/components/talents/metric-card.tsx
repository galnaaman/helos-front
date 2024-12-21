interface MetricCardProps {
  title: string;
  value: number;
  trend?: {
    value: number;
    isUpward: boolean;
  };
  icon: React.ReactNode;
}

export function MetricCard({ title, value, trend, icon }: MetricCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
          {icon}
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend.isUpward ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isUpward ? '+' : '-'}{trend.value}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
} 