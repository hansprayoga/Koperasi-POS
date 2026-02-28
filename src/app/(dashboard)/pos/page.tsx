"use client";

import { useState } from "react";

const products = [
  { id: 1, name: "Rice (5kg)", category: "Grains", price: 285, stock: 150, unit: "bag" },
  { id: 2, name: "Cooking Oil (1L)", category: "Condiments", price: 95, stock: 80, unit: "bottle" },
  { id: 3, name: "Sugar (1kg)", category: "Condiments", price: 65, stock: 200, unit: "pack" },
  { id: 4, name: "Salt (500g)", category: "Condiments", price: 18, stock: 300, unit: "pack" },
  { id: 5, name: "Canned Sardines", category: "Canned Goods", price: 28, stock: 500, unit: "can" },
  { id: 6, name: "Canned Tuna", category: "Canned Goods", price: 45, stock: 350, unit: "can" },
  { id: 7, name: "Instant Noodles", category: "Noodles", price: 12, stock: 1000, unit: "pack" },
  { id: 8, name: "Soy Sauce (350ml)", category: "Condiments", price: 32, stock: 120, unit: "bottle" },
  { id: 9, name: "Vinegar (350ml)", category: "Condiments", price: 22, stock: 100, unit: "bottle" },
  { id: 10, name: "Flour (1kg)", category: "Baking", price: 55, stock: 90, unit: "pack" },
  { id: 11, name: "Eggs (tray of 30)", category: "Dairy", price: 195, stock: 60, unit: "tray" },
  { id: 12, name: "Milk (evap 370ml)", category: "Dairy", price: 38, stock: 200, unit: "can" },
  { id: 13, name: "Coffee (200g)", category: "Beverages", price: 125, stock: 75, unit: "pack" },
  { id: 14, name: "Laundry Soap", category: "Household", price: 22, stock: 400, unit: "bar" },
  { id: 15, name: "Dishwashing Liquid", category: "Household", price: 48, stock: 150, unit: "bottle" },
  { id: 16, name: "Toothpaste (75ml)", category: "Personal Care", price: 55, stock: 200, unit: "tube" },
];

const categories = ["All", "Grains", "Condiments", "Canned Goods", "Noodles", "Baking", "Dairy", "Beverages", "Household", "Personal Care"];

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  unit: string;
}

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountTendered, setAmountTendered] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [txnId] = useState(() => String(Date.now()).slice(-6));
  const [currentDate] = useState(() =>
    new Date().toLocaleDateString("en-PH", { weekday: "short", year: "numeric", month: "short", day: "numeric" })
  );

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1, unit: product.unit }];
    });
  };

  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
    }
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;
  const change = parseFloat(amountTendered || "0") - total;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowReceipt(true);
  };

  const handleNewTransaction = () => {
    setCart([]);
    setDiscount(0);
    setAmountTendered("");
    setShowReceipt(false);
  };

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden">
      {/* POS Header */}
      <div className="bg-[#0f172a] text-white px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-sm">POS Terminal</p>
            <p className="text-xs text-slate-400">Cashier: Clerk A</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <span>TXN: TXN-{txnId}</span>
          <span className="text-slate-500">|</span>
          <span>{currentDate}</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Products Panel */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          {/* Search & Category */}
          <div className="p-4 bg-white border-b border-slate-200 space-y-3 flex-shrink-0">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-white rounded-xl p-4 text-left shadow-sm border border-slate-100 hover:border-violet-300 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center mb-3 group-hover:bg-violet-100 transition-colors">
                    <span className="text-lg">
                      {product.category === "Grains" ? "🌾" :
                       product.category === "Condiments" ? "🧂" :
                       product.category === "Canned Goods" ? "🥫" :
                       product.category === "Noodles" ? "🍜" :
                       product.category === "Baking" ? "🧁" :
                       product.category === "Dairy" ? "🥛" :
                       product.category === "Beverages" ? "☕" :
                       product.category === "Household" ? "🧹" :
                       product.category === "Personal Care" ? "🪥" : "📦"}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-tight mb-1">{product.name}</p>
                  <p className="text-xs text-slate-400 mb-2">{product.stock} {product.unit}s in stock</p>
                  <p className="text-base font-bold text-violet-600">₱{product.price.toFixed(2)}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Panel */}
        <div className="w-80 bg-white border-l border-slate-200 flex flex-col flex-shrink-0">
          {/* Cart Header */}
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Current Order</h2>
            {cart.length > 0 && (
              <button
                onClick={() => setCart([])}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-sm text-slate-500">No items in cart</p>
                <p className="text-xs text-slate-400 mt-1">Click products to add them</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {cart.map((item) => (
                  <div key={item.id} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{item.name}</p>
                        <p className="text-xs text-slate-400">₱{item.price.toFixed(2)} / {item.unit}</p>
                      </div>
                      <p className="text-sm font-bold text-slate-900 flex-shrink-0">
                        ₱{(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-slate-800">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="border-t border-slate-100 p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium text-slate-800">₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 flex-shrink-0">Discount</span>
              <div className="flex items-center gap-1 flex-1">
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                  className="w-16 px-2 py-1 border border-slate-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-violet-500"
                  min="0"
                  max="100"
                />
                <span className="text-sm text-slate-500">%</span>
              </div>
              <span className="text-sm font-medium text-red-500">−₱{discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-xl font-bold text-violet-600">₱{total.toFixed(2)}</span>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Payment Method</label>
              <div className="grid grid-cols-3 gap-1.5">
                {["Cash", "GCash", "Card"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                      paymentMethod === method
                        ? "bg-violet-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === "Cash" && (
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Amount Tendered</label>
                <input
                  type="number"
                  value={amountTendered}
                  onChange={(e) => setAmountTendered(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                {parseFloat(amountTendered) >= total && total > 0 && (
                  <div className="mt-2 flex items-center justify-between bg-emerald-50 rounded-lg px-3 py-2">
                    <span className="text-xs text-emerald-700 font-medium">Change</span>
                    <span className="text-sm font-bold text-emerald-700">₱{change.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
            >
              {cart.length === 0 ? "Add items to checkout" : `Checkout — ₱${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="p-6 text-center border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Payment Successful!</h3>
              <p className="text-sm text-slate-500 mt-1">Transaction completed</p>
            </div>

            <div className="p-6 space-y-3">
              <div className="bg-slate-50 rounded-xl p-4 font-mono text-xs space-y-2">
                <div className="text-center font-bold text-slate-800 text-sm mb-3">CoopSystem Store</div>
                <div className="border-t border-dashed border-slate-300 pt-2 space-y-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-slate-600">{item.name} x{item.qty}</span>
                      <span className="text-slate-800">₱{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-dashed border-slate-300 pt-2 space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>₱{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-red-500">
                      <span>Discount ({discount}%)</span>
                      <span>−₱{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-slate-900 text-sm">
                    <span>TOTAL</span>
                    <span>₱{total.toFixed(2)}</span>
                  </div>
                  {paymentMethod === "Cash" && (
                    <>
                      <div className="flex justify-between text-slate-600">
                        <span>Cash</span>
                        <span>₱{parseFloat(amountTendered || "0").toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Change</span>
                        <span>₱{change.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="text-center text-slate-400 pt-2 border-t border-dashed border-slate-300">
                  Thank you for your purchase!
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleNewTransaction}
                  className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  New Transaction
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-medium transition-colors"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
