"use client";

import { FormEvent, useState } from "react";
import {
  PaymentElement,
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useLanguage } from "../context/language-context";
import { translations } from "../translations";

export default function PaymentForm({ onSuccess }: { onSuccess?: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { lang } = useLanguage();
  const t = translations[lang];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage("");

    // Mark discount as used before redirect
    onSuccess?.();

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "Payment failed");
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ExpressCheckoutElement
        onConfirm={() => handleSubmit({ preventDefault: () => {} } as FormEvent)}
        options={{
          layout: { maxColumns: 2, maxRows: 2 },
        }}
      />

      <PaymentElement />

      {errorMessage ? (
        <p className="text-[var(--danger)] text-sm">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="btn-primary w-full py-3 rounded-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? t.processing : t.payNow}
      </button>
    </form>
  );
}
