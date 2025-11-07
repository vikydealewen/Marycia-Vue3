export const convertCurrencyFormat = (
  amount: string,
  currency: string = 'USD',
  locale: string = 'ru-RU',
): string => {
  const num = parseInt(amount);

  if (isNaN(num)) return '—';

  return num.toLocaleString(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });
};
