// composables/useFormat.ts
export const useFormat = () => {
  const formatDate = (date: string | Date, locale = 'en-US', options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  };

  const formatNumber = (value: number, locale = 'en-US') => {
    return new Intl.NumberFormat(locale).format(value);
  };

  const formatMoneyUSD = (value: number, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value);
  };

  const formatMoneyLAK = (value: number, locale = 'lo-LA', currency = 'LAK') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value);
  };

  return {
    formatDate,
    formatNumber,
    formatMoneyUSD,
    formatMoneyLAK,
  };
};
