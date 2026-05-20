"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import { FiPackage, FiDollarSign, FiShoppingBag, FiRefreshCw, FiChevronDown } from "react-icons/fi";

type OrderItem = { id: string; name: string; price: number; quantity: number };

type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
  subtotal: number;
  discount_amount: number;
  promo_code: string | null;
  promo_amount: number;
  total_ils: number;
  status: string;
  created_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  paid:      "bg-blue-500/15 text-blue-400 border-blue-500/30",
  shipped:   "bg-purple-500/15 text-purple-400 border-purple-500/30",
  delivered: "bg-green-500/15 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
};

const STATUS_OPTIONS = ["pending", "paid", "shipped", "delivered", "cancelled"];

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders ?? []);
    } catch {
      setOrders([]);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.replace("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.isAdmin) fetchOrders();
  }, [user, fetchOrders]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading || !user?.isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + Number(o.total_ils), 0);

  const paidOrders = orders.filter((o) => o.status === "paid" || o.status === "shipped" || o.status === "delivered").length;

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl md:text-5xl mb-1">Admin Panel</h1>
            <p className="text-[var(--text-secondary)] text-sm">PureLife Order Management</p>
          </div>
          <button
            onClick={fetchOrders}
            disabled={fetching}
            className="btn-outline px-4 py-2 rounded-full flex items-center gap-2 text-sm disabled:opacity-50"
          >
            <FiRefreshCw size={14} className={fetching ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="card rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
              <FiShoppingBag size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Total Orders</p>
              <p className="text-2xl font-semibold">{orders.length}</p>
            </div>
          </div>

          <div className="card rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
              <FiDollarSign size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Total Revenue</p>
              <p className="text-2xl font-semibold">₪{Math.round(totalRevenue).toLocaleString()}</p>
            </div>
          </div>

          <div className="card rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
              <FiPackage size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Paid / Shipped</p>
              <p className="text-2xl font-semibold">{paidOrders}</p>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="font-display text-xl text-[var(--accent)]">Orders</h2>
          </div>

          {fetching ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <p className="text-[var(--text-muted)] text-center py-16">No orders yet.</p>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {orders.map((order) => (
                <div key={order.id}>
                  {/* Row */}
                  <div
                    className="flex flex-wrap items-center gap-3 px-6 py-4 cursor-pointer hover:bg-[var(--bg-elevated)] transition-colors"
                    onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  >
                    {/* Order ID */}
                    <span className="font-mono text-xs text-[var(--text-muted)] w-20 shrink-0">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </span>

                    {/* Customer */}
                    <div className="flex-1 min-w-[140px]">
                      <p className="font-medium text-sm truncate">{order.customer_name}</p>
                      <p className="text-xs text-[var(--text-muted)] truncate">{order.customer_email}</p>
                    </div>

                    {/* Total */}
                    <span className="text-sm font-semibold text-[var(--accent)] w-20 text-right shrink-0">
                      ₪{Number(order.total_ils).toLocaleString()}
                    </span>

                    {/* Date */}
                    <span className="text-xs text-[var(--text-muted)] w-24 text-right shrink-0">
                      {new Date(order.created_at).toLocaleDateString("en-GB")}
                    </span>

                    {/* Status dropdown */}
                    <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`appearance-none text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer pr-7 disabled:opacity-50 ${STATUS_COLORS[order.status] ?? ""}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} className="bg-[var(--bg-card)] text-[var(--text-primary)]">
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                    </div>

                    {/* Expand arrow */}
                    <FiChevronDown
                      size={16}
                      className={`text-[var(--text-muted)] transition-transform shrink-0 ${expandedId === order.id ? "rotate-180" : ""}`}
                    />
                  </div>

                  {/* Expanded detail */}
                  {expandedId === order.id && (
                    <div className="px-6 pb-5 bg-[var(--bg-elevated)] border-t border-[var(--border)]">
                      <div className="grid sm:grid-cols-2 gap-6 pt-4">
                        {/* Customer info */}
                        <div>
                          <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">Customer</p>
                          <p className="text-sm">{order.customer_name}</p>
                          <p className="text-sm text-[var(--text-secondary)]">{order.customer_email}</p>
                          {order.customer_phone && <p className="text-sm text-[var(--text-secondary)]">{order.customer_phone}</p>}
                          {order.customer_address && <p className="text-sm text-[var(--text-secondary)]">{order.customer_address}</p>}
                        </div>

                        {/* Items */}
                        <div>
                          <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">Items</p>
                          {order.items?.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span>{item.name}{item.quantity > 1 ? ` ×${item.quantity}` : ""}</span>
                              <span className="text-[var(--text-secondary)]">${item.price * item.quantity}</span>
                            </div>
                          ))}
                          <div className="divider-gold my-2" />
                          <div className="flex justify-between text-sm">
                            <span className="text-[var(--text-muted)]">Subtotal</span>
                            <span>${Math.round(order.subtotal)}</span>
                          </div>
                          {order.discount_amount > 0 && (
                            <div className="flex justify-between text-sm text-green-400">
                              <span>Discount</span>
                              <span>-${Math.round(order.discount_amount)}</span>
                            </div>
                          )}
                          {order.promo_amount > 0 && (
                            <div className="flex justify-between text-sm text-green-400">
                              <span>Promo ({order.promo_code})</span>
                              <span>-${Math.round(order.promo_amount)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm font-semibold text-[var(--accent)] mt-1">
                            <span>Total</span>
                            <span>₪{Math.round(order.total_ils)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
