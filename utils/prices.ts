export function parsePrice(text: string): number {
  const value = Number(text.replace(/[^\d.-]/g, ''));
  if (!Number.isFinite(value)) throw new Error(`Cannot parse price: ${text}`);
  return value;
}
