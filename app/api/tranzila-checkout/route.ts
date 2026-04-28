import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const terminal = process.env.TRANZILA_TERMINAL;

    if (!terminal) {
      return NextResponse.json(
        { error: "Payment system not configured." },
        { status: 503 }
      );
    }

    const { amount, contact, phone, email, address, successUrl, failUrl } =
      await req.json();

    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const params = new URLSearchParams({
      sum: String(Number(amount).toFixed(2)),
      currency: "2", // USD
      cred_type: "1",
      lang: "il",
      success_url_address: successUrl || "",
      fail_url_address: failUrl || "",
      ...(contact && { contact }),
      ...(phone && { phone }),
      ...(email && { email }),
      ...(address && { address }),
    });

    const iframeUrl = `https://direct.tranzila.com/${terminal}/iframenew.php?${params.toString()}`;

    return NextResponse.json({ iframeUrl });
  } catch (error) {
    console.error("Tranzila route error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
