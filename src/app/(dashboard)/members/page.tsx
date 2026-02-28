import Header from "@/components/layout/Header";
import Link from "next/link";

const members = [
  { id: "MBR-001", name: "Maria Santos", email: "maria@email.com", phone: "+63 912 345 6789", joined: "Jan 10, 2020", shares: "₱25,000", loans: 2, status: "Active" },
  { id: "MBR-002", name: "Juan dela Cruz", email: "juan@email.com", phone: "+63 917 234 5678", joined: "Mar 5, 2019", shares: "₱15,000", loans: 1, status: "Active" },
  { id: "MBR-003", name: "Ana Reyes", email: "ana@email.com", phone: "+63 918 345 6789", joined: "Jun 20, 2021", shares: "₱30,000", loans: 1, status: "Active" },
  { id: "MBR-004", name: "Pedro Bautista", email: "pedro@email.com", phone: "+63 919 456 7890", joined: "Sep 15, 2022", shares: "₱10,000", loans: 0, status: "Inactive" },
  { id: "MBR-005", name: "Rosa Mendoza", email: "rosa@email.com", phone: "+63 920 567 8901", joined: "Nov 1, 2020", shares: "₱20,000", loans: 1, status: "Active" },
  { id: "MBR-006", name: "Carlos Villanueva", email: "carlos@email.com", phone: "+63 921 678 9012", joined: "Feb 14, 2023", shares: "₱5,000", loans: 1, status: "Active" },
  { id: "MBR-007", name: "Liza Gomez", email: "liza@email.com", phone: "+63 922 789 0123", joined: "Apr 30, 2018", shares: "₱50,000", loans: 1, status: "Active" },
  { id: "MBR-008", name: "Roberto Tan", email: "roberto@email.com", phone: "+63 923 890 1234", joined: "Jul 7, 2021", shares: "₱12,000", loans: 1, status: "Suspended" },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Inactive: "bg-slate-100 text-slate-600",
  Suspended: "bg-red-100 text-red-700",
};

export default function MembersPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Members"
        subtitle="Manage cooperative members and their accounts"
        actions={
          <Link
            href="/members/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Register Member
          </Link>
        }
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Members", value: "1,248", color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Active Members", value: "1,189", color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Inactive", value: "42", color: "text-slate-600", bg: "bg-slate-50" },
            { label: "Suspended", value: "17", color: "text-red-600", bg: "bg-red-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4`}>
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex-1 min-w-48">
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Suspended</option>
            </select>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member ID</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Joined</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Share Capital</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Loans</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{member.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-medium text-slate-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-slate-700">{member.phone}</p>
                        <p className="text-xs text-slate-400">{member.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{member.joined}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{member.shares}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${member.loans > 0 ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                        {member.loans}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[member.status]}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/members/${member.id}`} className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                          View
                        </Link>
                        <span className="text-slate-300">|</span>
                        <button className="text-slate-500 hover:text-slate-700 text-xs font-medium">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">Showing 8 of 1,248 members</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40" disabled>
                Previous
              </button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium">1</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">2</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">3</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
