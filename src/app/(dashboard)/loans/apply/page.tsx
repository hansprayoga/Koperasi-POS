import Header from "@/components/layout/Header";
import Link from "next/link";

export default function LoanApplicationPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="New Loan Application"
        subtitle="Fill out the form below to submit a loan application"
        actions={
          <Link
            href="/loans"
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            ← Back to Loans
          </Link>
        }
      />

      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Member Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">1</span>
              Member Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Member ID</label>
                <input
                  type="text"
                  placeholder="e.g. MBR-001"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Member's full name"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Contact Number</label>
                <input
                  type="tel"
                  placeholder="+63 9XX XXX XXXX"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="member@email.com"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Home Address</label>
                <input
                  type="text"
                  placeholder="Complete address"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">2</span>
              Loan Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Loan Type</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select loan type</option>
                  <option>Emergency Loan</option>
                  <option>Regular Loan</option>
                  <option>Business Loan</option>
                  <option>Educational Loan</option>
                  <option>Housing Loan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Loan Amount (₱)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  min="1000"
                  step="500"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Loan Term</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Select term</option>
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>12 months</option>
                  <option>18 months</option>
                  <option>24 months</option>
                  <option>36 months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Interest Rate (%)</label>
                <input
                  type="number"
                  placeholder="e.g. 12"
                  min="0"
                  step="0.5"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Application Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Mode</label>
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>Monthly</option>
                  <option>Semi-monthly</option>
                  <option>Weekly</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Purpose of Loan</label>
                <textarea
                  rows={3}
                  placeholder="Describe the purpose of this loan..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Loan Summary */}
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
            <h2 className="text-base font-semibold text-blue-900 mb-4">Loan Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Principal Amount", value: "₱0.00" },
                { label: "Total Interest", value: "₱0.00" },
                { label: "Monthly Payment", value: "₱0.00" },
                { label: "Total Payable", value: "₱0.00" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                  <p className="text-lg font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Co-maker / Guarantor */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">3</span>
              Co-maker / Guarantor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Co-maker Name</label>
                <input
                  type="text"
                  placeholder="Full name of co-maker"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Co-maker Member ID</label>
                <input
                  type="text"
                  placeholder="e.g. MBR-002"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Relationship</label>
                <input
                  type="text"
                  placeholder="e.g. Spouse, Sibling, Friend"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Co-maker Contact</label>
                <input
                  type="tel"
                  placeholder="+63 9XX XXX XXXX"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pb-6">
            <Link
              href="/loans"
              className="px-6 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
              Submit Application
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
