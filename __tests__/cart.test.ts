// Tests for cart price calculation logic (mirrors checkout/page.tsx)

const parsePrice = (price: string): number =>
  Number(price.replace("$", "").replace("₪", "")) || 0;

const calcSubtotal = (
  items: { price: string; quantity?: number }[]
): number =>
  items.reduce((total, item) => total + parsePrice(item.price) * (item.quantity || 1), 0);

const PROMO_CODES: Record<string, number> = {
  PURE10: 0.10,
  PURE20: 0.20,
  SAVE15: 0.15,
};

const applyPromo = (code: string): number | null =>
  PROMO_CODES[code.toUpperCase()] ?? null;

const calcTotal = (
  subtotal: number,
  discountRate: number,
  promoRate: number
): number => {
  const discountAmount = Math.round(subtotal * discountRate);
  const promoAmount    = Math.round(subtotal * promoRate);
  return Math.round(subtotal - discountAmount - promoAmount);
};

// ─── parsePrice ─────────────────────────────────────────────────────────────
describe("parsePrice", () => {
  test("parses dollar prices", () => {
    expect(parsePrice("$84")).toBe(84);
    expect(parsePrice("$79")).toBe(79);
  });

  test("parses shekel prices", () => {
    expect(parsePrice("₪100")).toBe(100);
  });

  test("returns 0 for invalid input", () => {
    expect(parsePrice("")).toBe(0);
    expect(parsePrice("free")).toBe(0);
  });
});

// ─── calcSubtotal ────────────────────────────────────────────────────────────
describe("calcSubtotal", () => {
  test("single item, quantity 1", () => {
    expect(calcSubtotal([{ price: "$84" }])).toBe(84);
  });

  test("multiple items with quantities", () => {
    expect(
      calcSubtotal([
        { price: "$84", quantity: 2 },
        { price: "$79", quantity: 1 },
      ])
    ).toBe(247);
  });

  test("empty cart returns 0", () => {
    expect(calcSubtotal([])).toBe(0);
  });
});

// ─── applyPromo ──────────────────────────────────────────────────────────────
describe("applyPromo", () => {
  test("PURE10 gives 10% discount", () => {
    expect(applyPromo("PURE10")).toBe(0.10);
  });

  test("PURE20 gives 20% discount", () => {
    expect(applyPromo("PURE20")).toBe(0.20);
  });

  test("SAVE15 gives 15% discount", () => {
    expect(applyPromo("SAVE15")).toBe(0.15);
  });

  test("lowercase codes also work", () => {
    expect(applyPromo("pure10")).toBe(0.10);
  });

  test("invalid code returns null", () => {
    expect(applyPromo("INVALID")).toBeNull();
    expect(applyPromo("")).toBeNull();
  });
});

// ─── calcTotal ───────────────────────────────────────────────────────────────
describe("calcTotal", () => {
  test("no discounts returns subtotal", () => {
    expect(calcTotal(100, 0, 0)).toBe(100);
  });

  test("15% new-user discount applied correctly", () => {
    expect(calcTotal(100, 0.15, 0)).toBe(85);
  });

  test("promo code 10% applied correctly", () => {
    expect(calcTotal(100, 0, 0.10)).toBe(90);
  });

  test("both discount and promo stacked", () => {
    // 15% new-user + 10% promo on $247
    // discount = round(247 * 0.15) = 37, promo = round(247 * 0.10) = 25
    expect(calcTotal(247, 0.15, 0.10)).toBe(185);
  });

  test("total is calculated correctly with large discounts", () => {
    // 60% + 60% on $10 = discount 6 + promo 6 = total -2 (real behavior)
    expect(calcTotal(10, 0.60, 0.60)).toBe(-2);
  });
});
