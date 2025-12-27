
// Currency conversion utility
// Current BDT to USD exchange rate (approximate)
const USD_TO_BDT_RATE = 110.5;

export const convertUsdToBdt = (amountUsd: number): number => {
  return amountUsd * USD_TO_BDT_RATE;
};

import { toBengaliNumerals } from "./numbers";

export const formatCurrency = (amount: number, currency: 'USD' | 'BDT' = 'USD', useBengali: boolean = false): string => {
  const formatted = amount.toFixed(2);
  const displayValue = useBengali ? toBengaliNumerals(formatted) : formatted;

  if (currency === 'BDT') {
    return `৳${displayValue}`;
  }
  return `$${displayValue}`;
};
