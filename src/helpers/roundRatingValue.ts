export const roundRatingValue = (rating: number): string => {
  return rating.toFixed(1).replace('.', ',');
};
