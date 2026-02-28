interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  iconBg: string;
}

export default function StatCard({ title, value, change, changeType = "neutral", icon, iconBg }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {change && (
            <p
              className={`text-xs mt-1 font-medium ${
                changeType === "up"
                  ? "text-emerald-600"
                  : changeType === "down"
                  ? "text-red-500"
                  : "text-slate-400"
              }`}
            >
              {changeType === "up" ? "↑" : changeType === "down" ? "↓" : ""} {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
