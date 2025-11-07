import { convertCurrencyFormat } from '@/helpers/convertCurrencyFormat';
import { convertLocaleToLanguage } from '@/helpers/convertLocaleToLanguage';
import type { IFilm, IFilmCardData } from '@/types/film';

type FilmCardKey = keyof IFilmCardData;

export const filmCharacteristicsMap: Record<
  FilmCardKey,
  { label: string; format?: (v: string) => string }
> = {
  language: { label: 'Язык оригинала', format: convertLocaleToLanguage },
  budget: { label: 'Бюджет', format: convertCurrencyFormat },
  revenue: { label: 'Выручка', format: convertCurrencyFormat },
  director: { label: 'Режиссёр' },
  production: { label: 'Производство' },
  awardsSummary: { label: 'Награды' },
};

export const extractFilmCharacteristics = (film: IFilm): Partial<IFilmCardData> => {
  const result = {} as Partial<IFilmCardData>;

  (Object.keys(filmCharacteristicsMap) as (keyof IFilmCardData)[]).forEach((key) => {
    const { format } = filmCharacteristicsMap[key];
    const value = film[key];

    if (!value) return;

    result[key] = format ? format(value) : value;
  });

  return result;
};
