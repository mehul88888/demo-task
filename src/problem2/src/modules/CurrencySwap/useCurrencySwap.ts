import { useTokenPrices } from "@/hooks/useTokenPrices";
import { calculateExchangeRate } from "@/utils/currencyUtils";
import { useEffect, useMemo, useState } from "react";

const useCurrencySwap = () => {
  const {
    prices,
    loading: pricesLoading,
    error: pricesError,
  } = useTokenPrices();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [swapping, setSwapping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [errors, setErrors] = useState({
    fromCurrency: "",
    toCurrency: "",
    fromAmount: "",
  });

  const sortedPrices = useMemo(() => {
    if (!Array.isArray(prices)) return [];

    const uniqueCurrencies = prices.reduce((uniqueList, currentItem) => {
      const isAlreadyIncluded = uniqueList.some(
        (item) => item.currency === currentItem.currency
      );
      if (!isAlreadyIncluded) {
        return [...uniqueList, currentItem];
      }
      return uniqueList;
    }, [] as typeof prices);

    // Sort currencies
    return uniqueCurrencies.sort((a, b) =>
      a.currency.localeCompare(b.currency)
    );
  }, [prices]);

  const fromPrice = prices.find((p) => p.currency === fromCurrency)?.price || 0;
  const toPrice = prices.find((p) => p.currency === toCurrency)?.price || 0;
  const exchangeRate = calculateExchangeRate(fromPrice, toPrice);

  const handleFromAmountChange = (amount: string) => {
    setFromAmount(amount);
    setErrors((prev) => ({ ...prev, fromAmount: "" })); // Clear error
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    const newErrors = {
      fromCurrency: fromCurrency ? "" : "Please select a currency.",
      toCurrency: toCurrency ? "" : "Please select a currency.",
      fromAmount: fromAmount ? "" : "Please enter an amount.",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    setSwapping(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSwapping(false);

    if (fromAmount && exchangeRate) {
      setToAmount((parseFloat(fromAmount) * exchangeRate).toFixed(6));
    }
  };

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return {
    pricesLoading,
    handleSwap,
    handleSwapCurrencies,
    handleFromAmountChange,
    sortedPrices,
    swapping,
    errors,
    setIsDarkMode,
    pricesError,
    isDarkMode,
    fromAmount,
    fromCurrency,
    setFromCurrency,
    setErrors,
    toCurrency,
    setToCurrency,
    exchangeRate,
    toAmount,
    setFromAmount,
    setToAmount
  };
};

export default useCurrencySwap;
