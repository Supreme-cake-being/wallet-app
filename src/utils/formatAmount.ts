export function formatAmount(
  amount: number,
  type: "Credit" | "Payment",
): string {
  const abs = Math.abs(amount).toFixed(2);
  if (type === "Payment") return `+$${abs}`;
  return `-$${abs}`;
}

export function formatAmountLarge(
  amount: number,
  type: "Credit" | "Payment",
): string {
  const abs = Math.abs(amount).toFixed(2);
  if (type === "Payment") return `+$${abs}`;
  return `-$${abs}`;
}
