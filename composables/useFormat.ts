// composables/useFormat.ts
export const useFormat = () => {
  const formatDate = (date: string | Date, locale = 'en-US', options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  };

  const formatTime = (date: string | Date, locale = 'en-US', options?: Intl.DateTimeFormatOptions) => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true // Use 12-hour format with AM/PM
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    return new Intl.DateTimeFormat(locale, finalOptions).format(new Date(date));
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
    formatTime,
    formatNumber,
    formatMoneyUSD,
    formatMoneyLAK,
  };
};
