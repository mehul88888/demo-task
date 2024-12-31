import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { TokenPrice } from "../hooks/useTokenPrices";

interface CurrencyInputProps {
  currencies: TokenPrice[];
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  disabled?: boolean;
}

export function CurrencyInput({

  currencies,
  selectedCurrency,
  onCurrencyChange,
  disabled = false,
}: CurrencyInputProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="flex space-x-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="md:w-[200px] w-[285px] justify-between"
              disabled={disabled}
            >
              {selectedCurrency ? (
                <div className="flex items-center">
                  <img
                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${selectedCurrency}.svg`}
                    alt={selectedCurrency}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  {selectedCurrency}
                </div>
              ) : (
                "Select token"
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[180px] p-0">
            <Command>
              <CommandInput placeholder="Search token..." />
              <CommandList>
                <CommandEmpty>No token found.</CommandEmpty>
                <CommandGroup>
                  {currencies.map((token, index) => (
                    <CommandItem
                      key={`${token.currency}-${token.date}-${index}`}
                      value={token.currency}
                      onSelect={(currentValue) => {
                        onCurrencyChange(currentValue);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <img
                          src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
                          alt={token.currency}
                          width={24}
                          height={24}
                          className="mr-2"
                        />
                        {token.currency}
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedCurrency === token.currency
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
