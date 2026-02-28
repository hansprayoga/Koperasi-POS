"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import type { Order } from "@/lib/orders-store";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  completed: "Completed",
  cancelled: "Cancelled",
};

const methodColors: Record<string, string> = {
  Cash: "bg-slate-100 text-slate-600",
  GCash: "bg-sky-100 text-sky-600",
  Card: "bg-blue-100 text-blue-600",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Order["status"]>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    // Poll every 10 seconds for new orders
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const updateStatus = async (id: string, status: Order["status"]) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status } : o))
        );
      }
    } catch {
      // silently fail
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const processingCount = orders.filter((o) => o.status === "processing").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;
  const totalRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Customer Orders"
        subtitle="Orders placed from the public ordering page"
        actions={
          <div className="flex items-center gap-3">
            <a
              href="/order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Order Page
            </a>
            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        }
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Pending", value: pendingCount, color: "text-amber-600", bg: "bg-amber-50", dot: "bg-amber-400" },
            { label: "Processing", value: processingCount, color: "text-blue-600", bg: "bg-blue-50", dot: "bg-blue-400" },
            { label: "Completed", value: completedCount, color: "text-emerald-600", bg: "bg-emerald-50", dot: "bg-emerald-400" },
            { label: "Revenue", value: `₱${totalRevenue.toFixed(2)}`, color: "text-violet-600", bg: "bg-violet-50", dot: "bg-violet-400" },
          ].map((card) => (
            <div key={card.label} className={`${card.bg} rounded-2xl p-5`}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${card.dot}`} />
                <p className="text-xs text-slate-500">{card.label}</p>
              </div>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "processing", "completed", "cancelled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === f
                  ? "bg-violet-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f === "all" ? `All Orders (${orders.length})` : `${statusLabels[f]} (${orders.filter((o) => o.status === f).length})`}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-slate-500">Loading orders...</p>
              </div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="font-medium text-slate-600">No orders yet</p>
              <p className="text-sm text-slate-400 mt-1">
                {filter === "all"
                  ? "Orders placed from the public page will appear here."
                  : `No ${filter} orders at the moment.`}
              </p>
              {filter === "all" && (
                <a
                  href="/order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Open Order Page →
                </a>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {filteredOrders.map((order) => (
                <div key={order.id} className="px-6 py-5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      {/* Order Header */}
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-mono text-sm font-bold text-slate-800">{order.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                        {order.paymentMethod && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${methodColors[order.paymentMethod] ?? "bg-slate-100 text-slate-600"}`}>
                            {order.paymentMethod}
                          </span>
                        )}
                        <span className="text-xs text-slate-400">
                          {new Date(order.createdAt).toLocaleString("en-PH", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {/* Customer */}
                      <p className="text-sm font-medium text-slate-700 mb-2">
                        👤 {order.customerName || "Walk-in Customer"}
                      </p>

                      {/* Items */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                            {item.name} ×{item.qty}
                          </span>
                        ))}
                      </div>

                      {/* Note */}
                      {order.customerNote && (
                        <p className="text-xs text-slate-400 italic">📝 &quot;{order.customerNote}&quot;</p>
                      )}
                    </div>

                    {/* Right side: total + actions */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <p className="text-xl font-bold text-slate-900">₱{order.total.toFixed(2)}</p>

                      {/* Status Actions */}
                      <div className="flex gap-2 flex-wrap justify-end">
                        {order.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(order.id, "processing")}
                              disabled={updatingId === order.id}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => updateStatus(order.id, "cancelled")}
                              disabled={updatingId === order.id}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 disabled:opacity-50 text-red-600 border border-red-200 rounded-lg text-xs font-semibold transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {order.status === "processing" && (
                          <button
                            onClick={() => updateStatus(order.id, "completed")}
                            disabled={updatingId === order.id}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
                          >
                            Mark Complete
                          </button>
                        )}
                        {(order.status === "completed" || order.status === "cancelled") && (
                          <span className="text-xs text-slate-400 italic">No actions</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Auto-refresh notice */}
        <p className="text-xs text-slate-400 text-center">
          Orders refresh automatically every 10 seconds. Click Refresh to update now.
        </p>
      </main>
    </div>
  );
}
