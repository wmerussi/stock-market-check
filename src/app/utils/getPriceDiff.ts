export function getPriceDiff(basePrice: number, compPrice: number): number {
  return ((compPrice * 100) / basePrice - 100) / 100;
}
