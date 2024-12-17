import axios from 'axios';
import { routerApisLink } from 'utils';
import { IApiResponseData } from 'interfaces';

const FilmService = {
  nameLink: 'Film',

  getDataFilms: async (url: string, params?: Object) => {    
    try {
      let data: IApiResponseData = {
        data: null,
      };

      if (params) {
        data = await axios.get(`${routerApisLink(FilmService.nameLink)}${url}`, {
          params: params,
        });
      } else {
        data = await axios.get(`${routerApisLink(FilmService.nameLink)}${url}`);
      }

      return data?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error?.response?.data || null;
      }

      console.log('An error occurred:', error);

      return null;
    }
  },

  putDataUserFilm: async (url: string, params?: Object) => {
    try {
      let data: IApiResponseData = {
        data: null,
      };

      if (params) {
        data = await axios.put(`${routerApisLink(FilmService.nameLink)}${url}`, params);
      }

      return data?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error?.response?.data || null;
      }

      console.log('An error occurred:', error);

      return null;
    }
  },

  getDataUserFilm: async (url: string, params?: Object) => {    
    try {
      let data: IApiResponseData = {
        data: null,
      };

      if (params) {
        data = await axios.get(`${routerApisLink(FilmService.nameLink)}${url}`, {
          params: params,
        });
      } else {
        data = await axios.get(`${routerApisLink(FilmService.nameLink)}${url}`);
      }

      return data?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error?.response?.data || null;
      }

      console.log('An error occurred:', error);

      return null;
    }
  },

  getLatest: async (params?: Object) => await FilmService.getDataFilms('/latest', params),
  getSeries: async (params?: Object) => await FilmService.getDataFilms('/series', params),
  getMovies: async (params?: Object) => await FilmService.getDataFilms('/movies', params),

  getDetailFilm: async (params?: Object) => await FilmService.getDataFilms('/detail', params),

  getFilmBySearch: async (params?: Object) => await FilmService.getDataFilms('/search', params),
  getFilmByGenre: async (params?: Object, slug?: string) => await FilmService.getDataFilms(`/genre/${slug}`, params),
  getFilmByCountry: async (params?: Object, slug?: string) => await FilmService.getDataFilms(`/country/${slug}`, params),

  getFilmFollow: async (params?: Object, slug?:string, userId?: Number) => await FilmService.getDataUserFilm(`/wishlist/${userId}/follow`, params),
  getFilmViewed: async (params?: Object, slug?:string, userId?: Number) => await FilmService.getDataUserFilm(`/wishlist/${userId}/viewed`, params),

  getUserFilm: async (params?: Object, slug?:string, userId?: Number) => await FilmService.getDataUserFilm(`/wishlist/${userId}`, params),
  getUserFilmDetail: async (params?: Object, slug?:string, userId?: Number, filmId?: Number) => await FilmService.getDataUserFilm(`/wishlist/${userId}/${filmId}`, params),

  putWishlist: async (params?: Object, slug?: string, userId?: Number, filmId?: Number) => await FilmService.putDataUserFilm(`/wishlist/${userId}/${filmId}`, params),
};

export default FilmService;
