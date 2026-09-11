// The catalog uses USD. Changing locale changes formatting, not currency/value.
export const formatPrice = (value: number | string, language: string) =>
  new Intl.NumberFormat(language, { style: "currency", currency: "USD" }).format(Number(value));
