export async function submitSwap(fromCurrency: string, toCurrency: string, amount: number): Promise<{ success: boolean, message: string }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate success/failure
  const success = Math.random() > 0.2;

  return {
    success,
    message: success ? 'Swap completed successfully!' : 'Swap failed. Please try again.',
  };
}

