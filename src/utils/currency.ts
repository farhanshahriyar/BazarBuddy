
// Currency conversion utility
// Current BDT to USD exchange rate (approximate)
const USD_TO_BDT_RATE = 110.5;

export const convertUsdToBdt = (amountUsd: number): number => {
  return amountUsd * USD_TO_BDT_RATE;
};

import { toBengaliNumerals } from "./numbers";

export const formatCurrency = (amount: number | null | undefined, currency: 'USD' | 'BDT' = 'BDT', useBengali: boolean = false): string => {
  const numericAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  const formatted = numericAmount.toFixed(2);
  const displayValue = useBengali ? toBengaliNumerals(formatted) : formatted;

  if (currency === 'BDT') {
    return `৳${displayValue}`;
  }
  return `$${displayValue}`;
};
