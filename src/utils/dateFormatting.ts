export function formatTransactionDate(dateStr: string): string {
  const txDate = new Date(dateStr);
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  if (txDate >= sevenDaysAgo) {
    return txDate.toLocaleDateString("en-US", { weekday: "long" });
  }

  const month = (txDate.getMonth() + 1).toString();
  const day = txDate.getDate().toString();
  const year = String(txDate.getFullYear()).slice(2);
  return `${month}/${day}/${year}`;
}

export function formatFullDate(dateStr: string): string {
  const d = new Date(dateStr);
  return (
    d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }) +
    " at " +
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  );
}
