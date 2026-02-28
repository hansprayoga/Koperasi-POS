import Header from "@/components/layout/Header";

const products = [
  { id: "PRD-001", name: "Rice (5kg)", category: "Grains", price: 285, cost: 240, stock: 150, unit: "bag", status: "In Stock" },
  { id: "PRD-002", name: "Cooking Oil (1L)", category: "Condiments", price: 95, cost: 78, stock: 80, unit: "bottle", status: "In Stock" },
  { id: "PRD-003", name: "Sugar (1kg)", category: "Condiments", price: 65, cost: 52, stock: 200, unit: "pack", status: "In Stock" },
  { id: "PRD-004", name: "Salt (500g)", category: "Condiments", price: 18, cost: 12, stock: 300, unit: "pack", status: "In Stock" },
  { id: "PRD-005", name: "Canned Sardines", category: "Canned Goods", price: 28, cost: 20, stock: 500, unit: "can", status: "In Stock" },
  { id: "PRD-006", name: "Canned Tuna", category: "Canned Goods", price: 45, cost: 35, stock: 350, unit: "can", status: "In Stock" },
  { id: "PRD-007", name: "Instant Noodles", category: "Noodles", price: 12, cost: 8, stock: 1000, unit: "pack", status: "In Stock" },
  { id: "PRD-008", name: "Soy Sauce (350ml)", category: "Condiments", price: 32, cost: 24, stock: 5, unit: "bottle", status: "Low Stock" },
  { id: "PRD-009", name: "Vinegar (350ml)", category: "Condiments", price: 22, cost: 15, stock: 0, unit: "bottle", status: "Out of Stock" },
  { id: "PRD-010", name: "Flour (1kg)", category: "Baking", price: 55, cost: 42, stock: 90, unit: "pack", status: "In Stock" },
  { id: "PRD-011", name: "Eggs (tray of 30)", category: "Dairy", price: 195, cost: 165, stock: 60, unit: "tray", status: "In Stock" },
  { id: "PRD-012", name: "Milk (evap 370ml)", category: "Dairy", price: 38, cost: 28, stock: 200, unit: "can", status: "In Stock" },
];

const statusColors: Record<string, string> = {
  "In Stock": "bg-emerald-100 text-emerald-700",
  "Low Stock": "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-red-100 text-red-700",
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Products"
        subtitle="Manage cooperative store inventory"
        actions={
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        }
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Inventory Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Products", value: "48", color: "text-violet-600", bg: "bg-violet-50" },
            { label: "In Stock", value: "41", color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Low Stock", value: "5", color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Out of Stock", value: "2", color: "text-red-600", bg: "bg-red-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4`}>
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Add Product Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Name</label>
              <input type="text" placeholder="Product name" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white">
                <option>Grains</option>
                <option>Condiments</option>
                <option>Canned Goods</option>
                <option>Noodles</option>
                <option>Baking</option>
                <option>Dairy</option>
                <option>Beverages</option>
                <option>Household</option>
                <option>Personal Care</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Selling Price (₱)</label>
              <input type="number" placeholder="0.00" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Stock Quantity</label>
              <input type="number" placeholder="0" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors">
              Add Product
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Product Inventory</h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search products..."
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 w-48"
              />
              <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product ID</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cost Price</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Selling Price</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Margin</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.map((product) => {
                  const margin = ((product.price - product.cost) / product.price * 100).toFixed(1);
                  return (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{product.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">₱{product.cost.toFixed(2)}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">₱{product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-emerald-600 font-medium">{margin}%</td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${product.stock === 0 ? "text-red-500" : product.stock <= 10 ? "text-amber-600" : "text-slate-800"}`}>
                          {product.stock} {product.unit}s
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[product.status]}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">Edit</button>
                          <span className="text-slate-300">|</span>
                          <button className="text-emerald-600 hover:text-emerald-700 text-xs font-medium">Restock</button>
                          <span className="text-slate-300">|</span>
                          <button className="text-red-500 hover:text-red-600 text-xs font-medium">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
