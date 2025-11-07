import type { IFilm } from './film';

export interface INewUserData {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export interface IProfileData {
  favorites: string[];
  surname: string;
  name: string;
  email: string;
}
