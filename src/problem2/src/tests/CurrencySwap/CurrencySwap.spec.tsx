import { render, screen, fireEvent } from '@testing-library/react';
import CurrencySwap from '@/modules/CurrencySwap/CurrencySwap';
import useCurrencySwap from '@/modules/CurrencySwap/useCurrencySwap';
import "@testing-library/jest-dom";

jest.mock('@/modules/CurrencySwap/useCurrencySwap');

describe('CurrencySwap Component', () => {
  const mockUseCurrencySwap = useCurrencySwap as jest.MockedFunction<typeof useCurrencySwap>;

  beforeEach(() => {
    mockUseCurrencySwap.mockReturnValue({
      pricesLoading: false,
      handleSwap: jest.fn(),
      handleSwapCurrencies: jest.fn(),
      handleFromAmountChange: jest.fn(),
      sortedPrices: [],
      swapping: false,
      errors: {
        fromCurrency: '',
        toCurrency: '',
        fromAmount: ''
      },
      setIsDarkMode: jest.fn(),
      pricesError: null,
      isDarkMode: false,
      fromAmount: '',
      fromCurrency: '',
      setFromCurrency: jest.fn(),
      setErrors: jest.fn(),
      toCurrency: '',
      setToCurrency: jest.fn(),
      exchangeRate: 0,
      toAmount: '',
      setFromAmount: jest.fn(),
      setToAmount: jest.fn()
    });
  });

  it('should display loader when prices are loading', () => {
    mockUseCurrencySwap.mockReturnValueOnce({
      ...mockUseCurrencySwap(),
      pricesLoading: true,
    });

    render(<CurrencySwap />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should display error message when pricesError is present', () => {
    const errorMessage = 'Error fetching prices';
    mockUseCurrencySwap.mockReturnValueOnce({
      ...mockUseCurrencySwap(),
      pricesError: errorMessage,
    });

    render(<CurrencySwap />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should render the swap currencies card', () => {
    render(<CurrencySwap />);
    expect(screen.getByText('Swap Currencies')).toBeInTheDocument();
  });

  it('should call handleFromAmountChange when input value changes', () => {
    const handleFromAmountChange = jest.fn();
    mockUseCurrencySwap.mockReturnValueOnce({
      ...mockUseCurrencySwap(),
      handleFromAmountChange,
    });

    render(<CurrencySwap />);
    const input = screen.getByPlaceholderText('0.00');
    fireEvent.change(input, { target: { value: '100' } });
    expect(handleFromAmountChange).toHaveBeenCalledWith('100');
  });

  it('should call handleSwap when swap button is clicked', () => {
    const handleSwap = jest.fn();
    mockUseCurrencySwap.mockReturnValueOnce({
      ...mockUseCurrencySwap(),
      handleSwap,
    });

    render(<CurrencySwap />);
    const button = screen.getByRole('button', { name: /swap/i });
    fireEvent.click(button);
    expect(handleSwap).toHaveBeenCalled();
  });

  it('should disable swap button when swapping is true', () => {
    mockUseCurrencySwap.mockReturnValueOnce({
      ...mockUseCurrencySwap(),
      swapping: true,
    });

    render(<CurrencySwap />);
    const button = screen.getByRole('button', { name: /swapping/i });
    expect(button).toBeDisabled();
  });


  it('should display exchange rate and calculated toAmount', () => {
    mockUseCurrencySwap.mockReturnValueOnce({
      ...mockUseCurrencySwap(),
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      exchangeRate: 0.85,
      toAmount: '85.00',
    });

    render(<CurrencySwap />);

    expect(screen.getByText('1 USD = 0.850000 EUR')).toBeInTheDocument();
    expect(screen.getByText('85.00')).toBeInTheDocument();
  });

  it('should show validation errors for empty fields', () => {
    mockUseCurrencySwap.mockReturnValueOnce({
      ...mockUseCurrencySwap(),
      errors: {
        fromCurrency: 'Please select a currency.',
        toCurrency: 'Please select a currency.',
        fromAmount: 'Please enter an amount.',
      },
    });

    render(<CurrencySwap />);

    expect(screen.getAllByText('Please select a currency.').length).toBe(2);
    expect(screen.getByText('Please enter an amount.')).toBeInTheDocument();
  });
});
