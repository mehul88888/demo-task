import { CurrencyInput } from "@/components/CurrencyInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/utils/currencyUtils";
import { Loader2 } from "lucide-react";
import useCurrencySwap from "./useCurrencySwap";
import Swap from "@/assets/icon/Swap";

export default function CurrencySwap() {
  const {
    pricesLoading,
    handleSwap,
    handleSwapCurrencies,
    handleFromAmountChange,
    sortedPrices,
    swapping,
    errors,
    pricesError,
    fromAmount,
    fromCurrency,
    setFromCurrency,
    setErrors,
    toCurrency,
    setToCurrency,
    exchangeRate,
    toAmount,
  } = useCurrencySwap();

  if (pricesLoading)
    return (
      <div className="flex justify-center items-center h-screen" role="status">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  if (pricesError)
    return <div className="text-red-500 text-center">{pricesError}</div>;

  return (
    <Card className="w-full max-w-lg mx-auto bg-[#03232e] border-0">
      <div className="relative">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl tracking-wide">Swap Currencies</CardTitle>
          </div>
          <CardDescription>
            Exchange your tokens quickly and easily
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-left">
          <label className="text-lg mb-1.5 inline-block">
              Amount to send:
            </label>
            <Input
              type="number"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              placeholder="0.00"
              className="flex-grow"
              data-testid="number-input"
            />
            {errors.fromAmount && (
              <span className="text-red-500 text-sm">{errors.fromAmount}</span>
            )}
          </div>
          <div className="flex pt-5 justify-between md:items-start items-center md:flex-row flex-col md:gap-0 gap-2.5">
            <div className="text-left">
              <CurrencyInput
                currencies={sortedPrices}
                selectedCurrency={fromCurrency}
                onCurrencyChange={(currency) => {
                  setFromCurrency(currency);
                  setErrors((prev) => ({ ...prev, fromCurrency: "" })); // Clear error
                }}
              />
              {errors.fromCurrency && (
                <span className="text-red-500 text-sm">
                  {errors.fromCurrency}
                </span>
              )}
            </div>
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSwapCurrencies}
                className="border border-gray-300 rounded-full w-10 h-10 text-blue-500 md:rotate-0 rotate-90"
              >
                <Swap className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-left">
              <CurrencyInput
                currencies={sortedPrices}
                selectedCurrency={toCurrency}
                onCurrencyChange={(currency) => {
                  setToCurrency(currency);
                  setErrors((prev) => ({ ...prev, toCurrency: "" })); // Clear error
                }}
              />
              {errors.toCurrency && (
                <span className="text-red-500 text-sm">
                  {errors.toCurrency}
                </span>
              )}
            </div>
          </div>
          {!!fromCurrency && !!exchangeRate! && !!toCurrency && !!toAmount && (
            <div className="w-full bg-black/25 border border-white/10 rounded-lg p-4 my-4 md:text-base text-sm text-left">
              <span className="flex gap-2">
                <img
                  src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${fromCurrency}.svg`}
                />{" "}
                1 {fromCurrency} ={" "}
                <img
                  src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${toCurrency}.svg`}
                />{" "}
                {formatCurrency(exchangeRate)} {toCurrency}
              </span>
              <hr className="border-gray-700 border-b my-4" />
              <div className="flex justify-between mt-2">
                <span className="flex gap-2">
                  <img
                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${toCurrency}.svg`}
                  />
                  {toCurrency}
                </span>
                <span className="text-blue-500 font-bold">{toAmount}</span>
              </div>
            </div>
          )}
        
        </CardContent>
        <CardFooter className="flex flex-col items-stretch mt-4">
          <Button
            onClick={handleSwap}
            disabled={swapping}
            className="bg-blue-500 uppercase"
          >
            {swapping ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {swapping ? "Swapping..." : "Swap"}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
