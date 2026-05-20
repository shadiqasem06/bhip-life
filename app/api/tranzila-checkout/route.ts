import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const terminal = process.env.TRANZILA_TERMINAL;
    if (!terminal) {
      return NextResponse.json({ error: "Payment system not configured." }, { status: 503 });
    }

    const body = await req.json();
    const {
      amount, contact, phone, email, address, successUrl, failUrl,
      items, subtotal, discountAmount, promoCode, promoAmount, userId,
    } = body;

    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Save pending order to Supabase
    let orderId: string | null = null;
    try {
      const sb = createServerClient();
      const { data } = await sb
        .from("orders")
        .insert({
          user_id: userId ?? null,
          customer_name: contact ?? "",
          customer_email: email ?? "",
          customer_phone: phone ?? "",
          customer_address: address ?? "",
          items: items ?? [],
          subtotal: Number(subtotal ?? amount),
          discount_amount: Number(discountAmount ?? 0),
          promo_code: promoCode ?? null,
          promo_amount: Number(promoAmount ?? 0),
          total_ils: Number(amount),
          status: "pending",
        })
        .select("id")
        .single();
      orderId = data?.id ?? null;
    } catch (dbErr) {
      console.error("Supabase order insert error:", dbErr);
    }

    // Build Tranzila iframe URL
    const params = new URLSearchParams({
      sum: String(Number(amount).toFixed(2)),
      currency: "2",
      cred_type: "1",
      lang: "il",
      success_url_address: orderId ? `${successUrl}?order=${orderId}` : successUrl || "",
      fail_url_address: failUrl || "",
      ...(contact && { contact }),
      ...(phone && { phone }),
      ...(email && { email }),
      ...(address && { address }),
    });

    const iframeUrl = `https://direct.tranzila.com/${terminal}/iframenew.php?${params.toString()}`;
    return NextResponse.json({ iframeUrl, orderId });
  } catch (error) {
    console.error("Tranzila route error:", error);
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 });
  }
}
