import { NextRequest, NextResponse } from "next/server";
import { addOrder, getOrders } from "@/lib/orders-store";

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerNote, items, subtotal, total, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Order must have at least one item" }, { status: 400 });
    }

    const order = addOrder({
      customerName: customerName || "Walk-in Customer",
      customerNote: customerNote || "",
      items,
      subtotal,
      total,
      paymentMethod: paymentMethod || "Cash",
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
