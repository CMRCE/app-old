export function formatMoney(input: number, currency: string) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });

  return formatter.format(input);
}

export function formatPercentageChange(
  input: number,
  isBase100: boolean = false
) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    signDisplay: "exceptZero",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(isBase100 ? input / 100 : input);
}
