import Header from "@/components/layout/Header";
import Link from "next/link";

const repayments = [
  { id: "PAY-001", loanId: "LN-2024-001", member: "Maria Santos", amount: 4583.33, date: "Feb 15, 2026", method: "Cash", status: "Paid", balance: 42500 },
  { id: "PAY-002", loanId: "LN-2024-003", member: "Ana Reyes", amount: 3750.00, date: "Feb 1, 2026", method: "Bank Transfer", status: "Paid", balance: 60000 },
  { id: "PAY-003", loanId: "LN-2024-005", member: "Rosa Mendoza", amount: 3888.89, date: "Feb 1, 2026", method: "Cash", status: "Paid", balance: 55000 },
  { id: "PAY-004", loanId: "LN-2024-007", member: "Liza Gomez", amount: 3611.11, date: "Feb 1, 2026", method: "GCash", status: "Paid", balance: 15000 },
  { id: "PAY-005", loanId: "LN-2024-008", member: "Roberto Tan", amount: 4125.00, date: "Feb 1, 2026", method: "Cash", status: "Overdue", balance: 45000 },
  { id: "PAY-006", loanId: "LN-2024-001", member: "Maria Santos", amount: 4583.33, date: "Jan 15, 2026", method: "Cash", status: "Paid", balance: 45833.33 },
];

const statusColors: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Overdue: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-700",
};

const methodColors: Record<string, string> = {
  Cash: "bg-slate-100 text-slate-600",
  "Bank Transfer": "bg-blue-100 text-blue-600",
  GCash: "bg-sky-100 text-sky-600",
};

export default function RepaymentsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Loan Repayments"
        subtitle="Track and record loan payment transactions"
        actions={
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Record Payment
          </button>
        }
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Collected (Feb)", value: "₱156,250", color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Overdue Payments", value: "₱82,500", color: "text-red-600", bg: "bg-red-50" },
            { label: "Expected This Month", value: "₱238,750", color: "text-blue-600", bg: "bg-blue-50" },
          ].map((card) => (
            <div key={card.label} className={`${card.bg} rounded-2xl p-5 border border-white`}>
              <p className="text-sm text-slate-600 mb-1">{card.label}</p>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Record Payment Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Record New Payment</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Loan ID</label>
              <input
                type="text"
                placeholder="e.g. LN-2024-001"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Amount (₱)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Method</label>
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>GCash</option>
                <option>Maya</option>
                <option>Check</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
                Record Payment
              </button>
            </div>
          </div>
        </div>

        {/* Repayments Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Payment History</h2>
            <div className="flex items-center gap-3">
              <select className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>February 2026</option>
                <option>January 2026</option>
                <option>December 2025</option>
              </select>
              <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment ID</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Loan ID</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount Paid</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Remaining Balance</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Method</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {repayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{pay.id}</td>
                    <td className="px-6 py-4">
                      <Link href={`/loans/${pay.loanId}`} className="text-blue-600 hover:underline font-mono text-xs">
                        {pay.loanId}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">{pay.member}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">₱{pay.amount.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-slate-600">₱{pay.balance.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-slate-600">{pay.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${methodColors[pay.method] || "bg-slate-100 text-slate-600"}`}>
                        {pay.method}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[pay.status]}`}>
                        {pay.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
