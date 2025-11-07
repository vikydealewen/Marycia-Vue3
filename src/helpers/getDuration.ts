export const getDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return minutes !== 0 ? `${hours} ч ${minutes} мин` : `${hours} ч`;
};
