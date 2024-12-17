import { IPage } from 'interfaces';
import { FilmService } from 'services';

const PAGE: IPage = {
  latest: {
    title: 'Anime mới nhất',
    getData: FilmService.getLatest,
  },

  series: {
    title: 'Anime bộ (series)',
    getData: FilmService.getSeries,
  },

  movies: {
    title: 'Anime movie',
    getData: FilmService.getMovies,
  },

  genres: {
    getData: FilmService.getFilmByGenre,
  },

  countries: {
    getData: FilmService.getFilmByCountry,
  },

  wishlist: {
    subData: [
      {
        title: 'Đang theo dõi',
      },
      {
        title: 'Đã xem',
      }
    ],
    getData: FilmService.getUserFilm,
  }
};

export default PAGE;
