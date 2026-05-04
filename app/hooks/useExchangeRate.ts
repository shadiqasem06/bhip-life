"use client";

import { useState, useEffect } from "react";

const FALLBACK_RATE = 2.95;
const CACHE_KEY = "usd_ils_rate";
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

interface CachedRate {
  rate: number;
  timestamp: number;
}

export function useExchangeRate() {
  const [rate, setRate] = useState<number>(FALLBACK_RATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage cache first
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed: CachedRate = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          setRate(parsed.rate);
          setLoading(false);
          return;
        }
      }
    } catch {
      // ignore cache errors
    }

    // Fetch live rate
    fetch("https://api.frankfurter.app/latest?from=USD&to=ILS")
      .then((res) => res.json())
      .then((data) => {
        const liveRate = data?.rates?.ILS;
        if (liveRate && typeof liveRate === "number") {
          setRate(liveRate);
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ rate: liveRate, timestamp: Date.now() })
            );
          } catch {
            // ignore
          }
        }
      })
      .catch(() => {
        // fallback stays as is
      })
      .finally(() => setLoading(false));
  }, []);

  const toILS = (usd: number): string => "₪" + Math.round(usd * rate);

  return { rate, loading, toILS };
}
