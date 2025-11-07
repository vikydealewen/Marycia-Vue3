import type { Genre } from '@/types/genres';

export const translateGenre = (genre: Genre): string => {
  const titles = {
    history: 'Историческое',
    horror: 'Ужасы',
    scifi: 'Фантастика',
    'stand-up': 'Стендап',
    fantasy: 'Фэнтези',
    drama: 'Драма',
    mystery: 'Детектив',
    family: 'Семейное',
    comedy: 'Комедия',
    romance: 'Романтика',
    music: 'Музыка',
    crime: 'Криминальное',
    'tv-movie': 'Сериалы',
    documentary: 'Документальное',
    action: 'Боевик',
    thriller: 'Триллер',
    western: 'Вестерн',
    animation: 'Мультфильмы',
    war: 'Военное кино',
    adventure: 'Приключения',
  };

  return titles[genre];
};
