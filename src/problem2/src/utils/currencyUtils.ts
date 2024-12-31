export function formatCurrency(amount: number, decimals: number = 6): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function calculateExchangeRate(fromPrice: number, toPrice: number): number {
  if (fromPrice <= 0 || toPrice <= 0) return 0;
  return toPrice / fromPrice;
}

