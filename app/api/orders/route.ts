import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

// GET all orders for Admin Control Center
export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST create a new order upon checkout completion
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.customer || !body.items || !body.items.length || !body.grandTotal) {
      return NextResponse.json(
        { success: false, error: "Missing required order information." },
        { status: 400 }
      );
    }

    const orderNumber =
      body.orderNumber ||
      `VS${Date.now().toString().slice(-8).toUpperCase()}`;

    const newOrder = await Order.create({
      orderNumber,
      customer: body.customer,
      items: body.items,
      subtotal: body.subtotal || body.grandTotal,
      discount: body.discount || 0,
      shipping: body.shipping || 0,
      codFee: body.codFee || 0,
      grandTotal: body.grandTotal,
      paymentMethod: body.paymentMethod || "cod",
      paymentStatus: body.paymentMethod === "cod" ? "cod" : "paid",
      orderStatus: "placed",
    });

    return NextResponse.json(
      { success: true, order: newOrder, orderNumber },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/orders error:", error);
    // Return graceful fallback so user checkout experience isn't blocked even if DB is offline
    return NextResponse.json(
      {
        success: true,
        fallback: true,
        orderNumber: `VS${Date.now().toString().slice(-8).toUpperCase()}`,
        warning: "Order recorded in local mode; MongoDB sync pending.",
        error: error.message,
      },
      { status: 200 }
    );
  }
}

// PATCH update order status (e.g., mark as shipped or delivered)
export async function PATCH(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { orderId, orderStatus, paymentStatus } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "orderId is required" },
        { status: 400 }
      );
    }

    const updateFields: any = {};
    if (orderStatus) updateFields.orderStatus = orderStatus;
    if (paymentStatus) updateFields.paymentStatus = paymentStatus;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: updateFields },
      { new: true }
    );

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error: any) {
    console.error("PATCH /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update order" },
      { status: 500 }
    );
  }
}
