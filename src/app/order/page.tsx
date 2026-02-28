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

const categoryEmoji: Record<string, string> = {
  Grains: "🌾",
  Condiments: "🧂",
  "Canned Goods": "🥫",
  Noodles: "🍜",
  Baking: "🧁",
  Dairy: "🥛",
  Beverages: "☕",
  Household: "🧹",
  "Personal Care": "🪥",
};

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  unit: string;
}

type Step = "browse" | "checkout" | "confirmed";

export default function OrderPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [step, setStep] = useState<Step>("browse");
  const [customerName, setCustomerName] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState("");
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (product: (typeof products)[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1, unit: product.unit }];
    });
  };

  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim() || "Walk-in Customer",
          customerNote: customerNote.trim(),
          items: cart,
          subtotal,
          total: subtotal,
          paymentMethod,
        }),
      });
      if (!res.ok) throw new Error("Failed to place order");
      const data = await res.json();
      setConfirmedOrderId(data.order.id);
      setStep("confirmed");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewOrder = () => {
    setCart([]);
    setCustomerName("");
    setCustomerNote("");
    setPaymentMethod("Cash");
    setStep("browse");
    setShowCart(false);
  };

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Order Placed! 🎉</h1>
          <p className="text-slate-500 mb-4">Your order has been received and is being processed.</p>
          <div className="bg-slate-50 rounded-2xl p-4 mb-6">
            <p className="text-xs text-slate-400 mb-1">Order Reference</p>
            <p className="text-2xl font-bold text-violet-600 font-mono">{confirmedOrderId}</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Order Summary</p>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-slate-600">{item.name} ×{item.qty}</span>
                <span className="font-medium text-slate-800">₱{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-slate-200 pt-2 flex justify-between font-bold">
              <span className="text-slate-800">Total</span>
              <span className="text-violet-600">₱{subtotal.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 mb-6">Payment: {paymentMethod} · Please proceed to the counter.</p>
          <button
            onClick={handleNewOrder}
            className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-semibold transition-colors"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  if (step === "checkout") {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
          <button
            onClick={() => setStep("browse")}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="font-bold text-slate-900">Review Order</h1>
            <p className="text-xs text-slate-400">{cartCount} item{cartCount !== 1 ? "s" : ""}</p>
          </div>
        </div>

        <div className="max-w-lg mx-auto p-4 space-y-4 pb-32">
          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">Your Items</h2>
            </div>
            <div className="divide-y divide-slate-50">
              {cart.map((item) => (
                <div key={item.id} className="px-4 py-3 flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-400">₱{item.price.toFixed(2)} / {item.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-900 w-20 text-right">
                    ₱{(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 bg-slate-50 flex justify-between items-center">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-xl font-bold text-violet-600">₱{subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-4">
            <h2 className="font-semibold text-slate-900">Your Details</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Name (optional)</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Juan dela Cruz"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Special Instructions (optional)</label>
              <textarea
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                placeholder="Any special requests or notes..."
                rows={2}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
            <h2 className="font-semibold text-slate-900 mb-3">Payment Method</h2>
            <div className="grid grid-cols-3 gap-3">
              {["Cash", "GCash", "Card"].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-3 rounded-xl text-sm font-semibold transition-all border-2 ${
                    paymentMethod === method
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {method === "Cash" ? "💵" : method === "GCash" ? "📱" : "💳"} {method}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Place Order Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4">
          <div className="max-w-lg mx-auto">
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl font-bold text-base transition-colors shadow-lg"
            >
              {isSubmitting ? "Placing Order..." : `Place Order — ₱${subtotal.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Browse step
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm leading-tight">CoopSystem Store</p>
              <p className="text-xs text-slate-400">Order Online</p>
            </div>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart
            {cartCount > 0 && (
              <span className="bg-white text-violet-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Search & Categories */}
        <div className="max-w-4xl mx-auto px-4 pb-3 space-y-3">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-slate-50"
          />
          <div className="flex gap-2 overflow-x-auto pb-1">
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
      </div>

      {/* Product Grid */}
      <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredProducts.map((product) => {
            const inCart = cart.find((i) => i.id === product.id);
            return (
              <div
                key={product.id}
                className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all ${
                  inCart ? "border-violet-300 shadow-md" : "border-slate-100 hover:border-violet-200 hover:shadow-md"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-3 text-2xl">
                  {categoryEmoji[product.category] ?? "📦"}
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-tight mb-1">{product.name}</p>
                <p className="text-xs text-slate-400 mb-3">{product.category}</p>
                <p className="text-base font-bold text-violet-600 mb-3">₱{product.price.toFixed(2)}</p>

                {inCart ? (
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => updateQty(product.id, inCart.qty - 1)}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold transition-colors"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold text-slate-800">{inCart.qty}</span>
                    <button
                      onClick={() => updateQty(product.id, inCart.qty + 1)}
                      className="w-8 h-8 rounded-lg bg-violet-100 hover:bg-violet-200 flex items-center justify-center text-violet-600 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-2 bg-violet-50 hover:bg-violet-100 text-violet-600 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-slate-500 font-medium">No products found</p>
            <p className="text-slate-400 text-sm mt-1">Try a different search or category</p>
          </div>
        )}
      </div>

      {/* Cart Drawer / Bottom Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          {/* Cart Items Drawer */}
          {showCart && (
            <div className="bg-white border-t border-slate-200 max-h-64 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900">Cart ({cartCount} items)</h3>
                  <button
                    onClick={() => setCart([])}
                    className="text-xs text-red-500 hover:text-red-600 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <span className="flex-1 text-sm text-slate-700">{item.name}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-xs font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-slate-800 w-16 text-right">
                        ₱{(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Checkout Bar */}
          <div className="bg-white border-t border-slate-200 px-4 py-3 shadow-2xl">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs text-slate-400">{cartCount} item{cartCount !== 1 ? "s" : ""}</p>
                <p className="font-bold text-slate-900">₱{subtotal.toFixed(2)}</p>
              </div>
              <button
                onClick={() => setStep("checkout")}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-sm transition-colors shadow-lg"
              >
                Review & Order →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
