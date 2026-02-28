import Header from "@/components/layout/Header";
import StatCard from "@/components/ui/StatCard";
import Link from "next/link";

const recentLoans = [
  { id: "LN-2024-001", member: "Maria Santos", amount: "₱50,000", status: "Approved", date: "Feb 28, 2026" },
  { id: "LN-2024-002", member: "Juan dela Cruz", amount: "₱25,000", status: "Pending", date: "Feb 27, 2026" },
  { id: "LN-2024-003", member: "Ana Reyes", amount: "₱75,000", status: "Active", date: "Feb 26, 2026" },
  { id: "LN-2024-004", member: "Pedro Bautista", amount: "₱30,000", status: "Rejected", date: "Feb 25, 2026" },
  { id: "LN-2024-005", member: "Rosa Mendoza", amount: "₱60,000", status: "Active", date: "Feb 24, 2026" },
];

const recentSales = [
  { id: "TXN-001", cashier: "Clerk A", items: 5, total: "₱1,250.00", time: "10:32 AM" },
  { id: "TXN-002", cashier: "Clerk B", items: 3, total: "₱875.50", time: "10:15 AM" },
  { id: "TXN-003", cashier: "Clerk A", items: 8, total: "₱2,340.00", time: "09:58 AM" },
  { id: "TXN-004", cashier: "Clerk C", items: 2, total: "₱450.00", time: "09:40 AM" },
];

const statusColors: Record<string, string> = {
  Approved: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Active: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Dashboard"
        subtitle="Welcome back, Admin. Here's what's happening today."
      />

      <main className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Total Members"
            value="1,248"
            change="12 new this month"
            changeType="up"
            iconBg="bg-blue-50"
            icon={
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Active Loans"
            value="₱4.2M"
            change="8 new applications"
            changeType="up"
            iconBg="bg-emerald-50"
            icon={
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Today's Sales"
            value="₱18,450"
            change="vs ₱15,200 yesterday"
            changeType="up"
            iconBg="bg-violet-50"
            icon={
              <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Overdue Loans"
            value="23"
            change="3 more than last month"
            changeType="down"
            iconBg="bg-red-50"
            icon={
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {[
            { href: "/loans/apply", label: "New Loan Application", color: "bg-blue-600 hover:bg-blue-700", icon: "📋" },
            { href: "/members/new", label: "Register Member", color: "bg-emerald-600 hover:bg-emerald-700", icon: "👤" },
            { href: "/pos", label: "Open POS Terminal", color: "bg-violet-600 hover:bg-violet-700", icon: "🛒" },
            { href: "/loans/repayments", label: "Record Payment", color: "bg-amber-600 hover:bg-amber-700", icon: "💳" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`${action.color} text-white rounded-xl p-3 md:p-4 flex flex-col items-center gap-1 md:gap-2 text-center transition-colors shadow-sm`}
            >
              <span className="text-xl md:text-2xl">{action.icon}</span>
              <span className="text-xs md:text-sm font-medium leading-tight">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Recent Loans */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Recent Loan Applications</h2>
              <Link href="/loans" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentLoans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-mono text-xs text-slate-500">{loan.id}</td>
                      <td className="px-6 py-3 font-medium text-slate-800">{loan.member}</td>
                      <td className="px-6 py-3 font-semibold text-slate-900">{loan.amount}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[loan.status]}`}>
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Sales */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Today&apos;s POS Transactions</h2>
              <Link href="/pos/sales" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">TXN ID</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cashier</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Items</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 font-mono text-xs text-slate-500">{sale.id}</td>
                      <td className="px-6 py-3 font-medium text-slate-800">{sale.cashier}</td>
                      <td className="px-6 py-3 text-slate-600">{sale.items} items</td>
                      <td className="px-6 py-3 font-semibold text-slate-900">{sale.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
