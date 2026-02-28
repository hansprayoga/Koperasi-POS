import Header from "@/components/layout/Header";

const sales = [
  {
    id: "TXN-2026-001",
    cashier: "Clerk A",
    items: [
      { name: "Rice (5kg)", qty: 2, price: 285 },
      { name: "Cooking Oil (1L)", qty: 1, price: 95 },
      { name: "Sugar (1kg)", qty: 1, price: 65 },
    ],
    subtotal: 730,
    discount: 0,
    total: 730,
    method: "Cash",
    time: "10:32 AM",
    date: "Feb 28, 2026",
  },
  {
    id: "TXN-2026-002",
    cashier: "Clerk B",
    items: [
      { name: "Canned Sardines", qty: 5, price: 28 },
      { name: "Instant Noodles", qty: 10, price: 12 },
    ],
    subtotal: 260,
    discount: 5,
    total: 247,
    method: "GCash",
    time: "10:15 AM",
    date: "Feb 28, 2026",
  },
  {
    id: "TXN-2026-003",
    cashier: "Clerk A",
    items: [
      { name: "Eggs (tray of 30)", qty: 2, price: 195 },
      { name: "Milk (evap 370ml)", qty: 4, price: 38 },
      { name: "Coffee (200g)", qty: 1, price: 125 },
      { name: "Sugar (1kg)", qty: 2, price: 65 },
    ],
    subtotal: 797,
    discount: 0,
    total: 797,
    method: "Cash",
    time: "09:58 AM",
    date: "Feb 28, 2026",
  },
  {
    id: "TXN-2026-004",
    cashier: "Clerk C",
    items: [
      { name: "Laundry Soap", qty: 3, price: 22 },
      { name: "Dishwashing Liquid", qty: 1, price: 48 },
    ],
    subtotal: 114,
    discount: 0,
    total: 114,
    method: "Card",
    time: "09:40 AM",
    date: "Feb 28, 2026",
  },
  {
    id: "TXN-2026-005",
    cashier: "Clerk B",
    items: [
      { name: "Rice (5kg)", qty: 1, price: 285 },
      { name: "Canned Tuna", qty: 3, price: 45 },
      { name: "Soy Sauce (350ml)", qty: 2, price: 32 },
    ],
    subtotal: 449,
    discount: 10,
    total: 404.1,
    method: "GCash",
    time: "09:20 AM",
    date: "Feb 28, 2026",
  },
];

const methodColors: Record<string, string> = {
  Cash: "bg-slate-100 text-slate-600",
  GCash: "bg-sky-100 text-sky-600",
  Card: "bg-blue-100 text-blue-600",
};

export default function SalesHistoryPage() {
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const totalTransactions = sales.length;
  const totalItems = sales.reduce((sum, s) => sum + s.items.reduce((a, i) => a + i.qty, 0), 0);
  const avgTransaction = totalRevenue / totalTransactions;

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Sales History"
        subtitle="View and analyze all POS transactions"
        actions={
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white">
              <option>Today — Feb 28, 2026</option>
              <option>Yesterday</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
              Export CSV
            </button>
          </div>
        }
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue", value: `₱${totalRevenue.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`, color: "text-violet-600", bg: "bg-violet-50" },
            { label: "Transactions", value: totalTransactions.toString(), color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Items Sold", value: totalItems.toString(), color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Avg. Transaction", value: `₱${avgTransaction.toFixed(2)}`, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((card) => (
            <div key={card.label} className={`${card.bg} rounded-2xl p-5`}>
              <p className="text-xs text-slate-500 mb-1">{card.label}</p>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Sales by Payment Method */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { method: "Cash", count: 2, total: 1527, color: "bg-slate-600" },
            { method: "GCash", count: 2, total: 651.1, color: "bg-sky-500" },
            { method: "Card", count: 1, total: 114, color: "bg-blue-600" },
          ].map((m) => (
            <div key={m.method} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${m.color}`} />
                <span className="font-semibold text-slate-800">{m.method}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">₱{m.total.toFixed(2)}</p>
              <p className="text-sm text-slate-500 mt-1">{m.count} transactions</p>
            </div>
          ))}
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Transaction Details</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {sales.map((sale) => (
              <div key={sale.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-slate-500">{sale.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${methodColors[sale.method]}`}>
                        {sale.method}
                      </span>
                      <span className="text-xs text-slate-400">{sale.time} · {sale.cashier}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sale.items.map((item, idx) => (
                        <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                          {item.name} ×{item.qty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {sale.discount > 0 && (
                      <p className="text-xs text-slate-400 line-through">₱{sale.subtotal.toFixed(2)}</p>
                    )}
                    <p className="text-lg font-bold text-slate-900">₱{sale.total.toFixed(2)}</p>
                    {sale.discount > 0 && (
                      <p className="text-xs text-emerald-600">{sale.discount}% discount applied</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Top Selling Products Today</h2>
          <div className="space-y-3">
            {[
              { name: "Rice (5kg)", sold: 3, revenue: 855, pct: 100 },
              { name: "Instant Noodles", sold: 10, revenue: 120, pct: 85 },
              { name: "Canned Sardines", sold: 5, revenue: 140, pct: 70 },
              { name: "Eggs (tray of 30)", sold: 2, revenue: 390, pct: 55 },
              { name: "Canned Tuna", sold: 3, revenue: 135, pct: 45 },
            ].map((product) => (
              <div key={product.name} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-800">{product.name}</span>
                    <span className="text-sm text-slate-500">{product.sold} sold · ₱{product.revenue}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all"
                      style={{ width: `${product.pct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
