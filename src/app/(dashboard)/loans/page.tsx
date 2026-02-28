import Header from "@/components/layout/Header";
import Link from "next/link";

const loans = [
  { id: "LN-2024-001", member: "Maria Santos", memberId: "MBR-001", amount: 50000, balance: 42500, term: "12 months", rate: "12%", status: "Active", date: "Jan 15, 2026", nextDue: "Mar 15, 2026" },
  { id: "LN-2024-002", member: "Juan dela Cruz", memberId: "MBR-002", amount: 25000, balance: 25000, term: "6 months", rate: "10%", status: "Pending", date: "Feb 27, 2026", nextDue: "—" },
  { id: "LN-2024-003", member: "Ana Reyes", memberId: "MBR-003", amount: 75000, balance: 60000, term: "24 months", rate: "14%", status: "Active", date: "Dec 1, 2025", nextDue: "Mar 1, 2026" },
  { id: "LN-2024-004", member: "Pedro Bautista", memberId: "MBR-004", amount: 30000, balance: 0, term: "6 months", rate: "10%", status: "Rejected", date: "Feb 25, 2026", nextDue: "—" },
  { id: "LN-2024-005", member: "Rosa Mendoza", memberId: "MBR-005", amount: 60000, balance: 55000, term: "18 months", rate: "12%", status: "Active", date: "Feb 1, 2026", nextDue: "Mar 1, 2026" },
  { id: "LN-2024-006", member: "Carlos Villanueva", memberId: "MBR-006", amount: 20000, balance: 20000, term: "3 months", rate: "8%", status: "Approved", date: "Feb 28, 2026", nextDue: "Mar 28, 2026" },
  { id: "LN-2024-007", member: "Liza Gomez", memberId: "MBR-007", amount: 100000, balance: 15000, term: "36 months", rate: "15%", status: "Active", date: "Jun 1, 2023", nextDue: "Mar 1, 2026" },
  { id: "LN-2024-008", member: "Roberto Tan", memberId: "MBR-008", amount: 45000, balance: 45000, term: "12 months", rate: "12%", status: "Overdue", date: "Jan 1, 2026", nextDue: "Feb 1, 2026" },
];

const statusColors: Record<string, string> = {
  Active: "bg-blue-100 text-blue-700",
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
  Overdue: "bg-rose-100 text-rose-700",
  Paid: "bg-slate-100 text-slate-600",
};

export default function LoansPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Loan Applications"
        subtitle="Manage and track all cooperative loan applications"
        actions={
          <Link
            href="/loans/apply"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Application
          </Link>
        }
      />

      <main className="flex-1 p-4 md:p-6 overflow-x-auto">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-6 p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex-1 w-full sm:min-w-48">
              <input
                type="text"
                placeholder="Search by member name or loan ID..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Overdue</option>
            </select>
            <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">All Terms</option>
              <option>3 months</option>
              <option>6 months</option>
              <option>12 months</option>
              <option>18 months</option>
              <option>24 months</option>
              <option>36 months</option>
            </select>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-w-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Loan ID</th>
                  <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Member</th>
                  <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Amount</th>
                  <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">Balance</th>
                  <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">Term / Rate</th>
                  <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden xl:table-cell">Next Due</th>
                  <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-xs text-slate-500 whitespace-nowrap">{loan.id}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{loan.member}</p>
                        <p className="text-xs text-slate-400 sm:hidden">{loan.memberId}</p>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-slate-900 text-sm whitespace-nowrap">
                      ₱{loan.amount.toLocaleString()}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-700 text-sm hidden md:table-cell whitespace-nowrap">
                      {loan.balance > 0 ? `₱${loan.balance.toLocaleString()}` : "—"}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-600 text-sm hidden lg:table-cell whitespace-nowrap">
                      {loan.term} @ {loan.rate}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-600 text-sm hidden xl:table-cell whitespace-nowrap">{loan.nextDue}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[loan.status]}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/loans/${loan.id}`}
                          className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                        >
                          View
                        </Link>
                        {loan.status === "Pending" && (
                          <>
                            <span className="text-slate-300">|</span>
                            <button className="text-emerald-600 hover:text-emerald-700 text-xs font-medium">
                              Approve
                            </button>
                            <span className="text-slate-300 hidden sm:inline">|</span>
                            <button className="text-red-500 hover:text-red-600 text-xs font-medium hidden sm:inline">
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 sm:px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-slate-500 order-2 sm:order-1">Showing 8 of 156 loans</p>
            <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40" disabled>
                Previous
              </button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium">1</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">2</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">3</button>
              <button className="px-2 sm:px-3 py-1.5 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-600 hover:bg-slate-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
