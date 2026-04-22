import { NextResponse } from "next/server";

type CartItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  quantity?: number;
};

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Payment system not configured yet." },
        { status: 503 }
      );
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeSecretKey);

    const { cartItems } = await req.json();

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const amount = cartItems.reduce((total: number, item: CartItem) => {
      const quantity = item.quantity || 1;
      const price = Number(String(item.price).replace("₪", ""));
      return total + price * quantity;
    }, 0);

    if (!amount || Number.isNaN(amount)) {
      return NextResponse.json(
        { error: "Invalid cart amount" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "ils",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe route error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to create payment intent";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
