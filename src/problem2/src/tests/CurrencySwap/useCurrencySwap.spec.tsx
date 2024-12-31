import { renderHook, act } from '@testing-library/react';

import { useTokenPrices } from '@/hooks/useTokenPrices';
import { calculateExchangeRate } from '@/utils/currencyUtils';
import useCurrencySwap from '@/modules/CurrencySwap/useCurrencySwap';

jest.mock('@/hooks/useTokenPrices');
jest.mock('@/utils/currencyUtils');

describe('useCurrencySwap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default values', () => {
    (useTokenPrices as jest.Mock).mockReturnValue({ prices: [], loading: false, error: null });

    const { result } = renderHook(() => useCurrencySwap());

    expect(result.current.pricesLoading).toBe(false);
    expect(result.current.swapping).toBe(false);
    expect(result.current.errors).toEqual({
      fromCurrency: '',
      toCurrency: '',
      fromAmount: '',
    });
    expect(result.current.isDarkMode).toBe(false);
    expect(result.current.sortedPrices).toEqual([]);
  });

  it('handles dark mode toggling', () => {
    (useTokenPrices as jest.Mock).mockReturnValue({ prices: [], loading: false, error: null });

    const { result } = renderHook(() => useCurrencySwap());

    act(() => {
      result.current.setIsDarkMode(true);
    });

    expect(document.body.classList.contains('dark')).toBe(true);

    act(() => {
      result.current.setIsDarkMode(false);
    });

    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('sorts and filters unique prices correctly', () => {
    const mockPrices = [
      { currency: 'USD', price: 1 },
      { currency: 'EUR', price: 0.9 },
      { currency: 'USD', price: 1 }, // Duplicate
      { currency: 'GBP', price: 0.8 },
    ];

    (useTokenPrices as jest.Mock).mockReturnValue({ prices: mockPrices, loading: false, error: null });

    const { result } = renderHook(() => useCurrencySwap());

    expect(result.current.sortedPrices).toEqual([
      { currency: 'EUR', price: 0.9 },
      { currency: 'GBP', price: 0.8 },
      { currency: 'USD', price: 1 },
    ]);
  });

  it('calculates exchange rate and updates toAmount on handleSwap', async () => {
    const mockPrices = [
      { currency: 'USD', price: 1 },
      { currency: 'EUR', price: 0.9 },
    ];

    (useTokenPrices as jest.Mock).mockReturnValue({ prices: mockPrices, loading: false, error: null });
    (calculateExchangeRate as jest.Mock).mockReturnValue(0.9);

    const { result } = renderHook(() => useCurrencySwap());

    act(() => {
      result.current.setFromCurrency('USD');
      result.current.setToCurrency('EUR');
      result.current.handleFromAmountChange('100');
    });

    await act(async () => {
      await result.current.handleSwap();
    });

    expect(result.current.toAmount).toBe('90.000000');
  });

  it('handles validation errors on handleSwap', async () => {
    (useTokenPrices as jest.Mock).mockReturnValue({ prices: [], loading: false, error: null });

    const { result } = renderHook(() => useCurrencySwap());

    await act(async () => {
      await result.current.handleSwap();
    });

    expect(result.current.errors).toEqual({
      fromCurrency: 'Please select a currency.',
      toCurrency: 'Please select a currency.',
      fromAmount: 'Please enter an amount.',
    });
  });

  
});
