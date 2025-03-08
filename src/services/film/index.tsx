import axios from 'axios';
import { routerApisLink } from 'utils';
import { IApiResponseData } from 'interfaces';

import Method from 'services/method';

const FilmService = {
  nameLink: 'Film',

  getLatest: async (params?: Object) => await Method.get(FilmService.nameLink, '/latest', params),
  getSeries: async (params?: Object) => await Method.get(FilmService.nameLink, '/series', params),
  getMovies: async (params?: Object) => await Method.get(FilmService.nameLink, '/movies', params),

  getDetailFilm: async (params?: Object) => await Method.get(FilmService.nameLink, '/detail', params),

  getFilmBySearch: async (params?: Object) => await Method.get(FilmService.nameLink, '/search', params),
  getFilmByGenre: async (params?: Object, slug?: string) => await Method.get(FilmService.nameLink, `/genre/${slug}`, params),
  getFilmByCountry: async (params?: Object, slug?: string) => await Method.get(FilmService.nameLink, `/country/${slug}`, params),

  getFilmFollow: async (params?: Object, slug?:string, userId?: Number) => await Method.get(FilmService.nameLink, `/wishlist/${userId}/follow`, params),
  getFilmViewed: async (params?: Object, slug?:string, userId?: Number) => await Method.get(FilmService.nameLink, `/wishlist/${userId}/viewed`, params),
  getUpdated: async (params?: Object, slug?:string, userId?: Number) => await Method.get(FilmService.nameLink, `/updated/${userId}`, params),

  getUserFilm: async (params?: Object, slug?:string, userId?: Number) => await Method.get(FilmService.nameLink, `/wishlist/${userId}`, params),
  getUserFilmDetail: async (params?: Object, slug?:string, userId?: Number, filmId?: Number) => await Method.get(FilmService.nameLink, `/wishlist/${userId}/${filmId}`, params),

  putWishlist: async (params?: Object, slug?: string, userId?: Number, filmId?: Number) => await Method.put(FilmService.nameLink, `/wishlist/${userId}/${filmId}`, params),
};

export default FilmService;
