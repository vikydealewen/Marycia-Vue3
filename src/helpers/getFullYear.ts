export const getFullYear = (date: string): number => {
  const year = date.split('-')[0];

  return Number(year);
};
