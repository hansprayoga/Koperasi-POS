// In-memory order store shared across API routes (server-side singleton)
// In production, replace with a real database

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  unit: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerNote: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  paymentMethod: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
}

// Module-level singleton — persists across requests in the same Node.js process
const ordersStore: Order[] = [];

export function getOrders(): Order[] {
  return [...ordersStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addOrder(order: Omit<Order, "id" | "createdAt" | "status">): Order {
  const newOrder: Order = {
    ...order,
    id: `ORD-${Date.now().toString().slice(-6)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  ordersStore.push(newOrder);
  return newOrder;
}

export function updateOrderStatus(id: string, status: Order["status"]): Order | null {
  const order = ordersStore.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  return order;
}
