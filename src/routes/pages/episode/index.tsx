import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './index.scss';
import { Footer, Header } from 'layouts';
import { IFilm, IResponseData } from 'interfaces';
import { ThemeContext } from 'contexts/themeContext';
import { FilmService } from 'services';

interface IEpisodeBtn {
  filmId: Number | undefined;
  ep: string | undefined;
  slug: string | undefined;
  filmSlug: string | undefined;
}

const EpisodeBtn = ({ filmId, ep, filmSlug, slug }: IEpisodeBtn) => {
  return (
    <li className='w-[23%] text-center sm:w-[13%] md:w-[9%]'>
      <Link
        to={`/film-detail/${filmId}/${filmSlug}/${slug}`}
        className='block rounded-p2 bg-[#03AE00] py-1.5 font-medium !leading-none text-[#ffffff] max-lg:text-xs lg:text-sm xl:text-base'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        {ep && ep.split(' ')[1]}
      </Link>
    </li>
  );
};

const Episode = () => {
  const themeMode = useContext(ThemeContext);
  const params = useParams();

  const [film, setFilm] = useState<IFilm>();

  useEffect(() => {
    const getApiDetail = async () => {
      const response: IResponseData = await FilmService.getDetailFilm({
        slug: params.slug,
      });

      setFilm(response?.data);
    };

    if (params) {
      getApiDetail();
    }
  }, [params]);

  return (
    <>
      <Header />
      <section className={`episodes m-auto  episodes-${themeMode.theme}`}>
        {film && (
          <>
            <div className='film-watching relative'>
              <iframe src={film.episodes.find((e) => e.slug == params.ep)?.link} allowFullScreen />
            </div>
            <div className='list-episodes py-10'>
              <div className='container'>
                <div className='title mb-2.5 text-2xl font-bold capitalize xl:text-3xl'>{film.name}</div>
                <div className='mb-[30px] text-sm font-semibold xl:text-base'>
                  Số tập: {film.episode_current}/{film.episode_total}
                </div>
                <ul className='flex flex-wrap gap-x-[2%] gap-y-2.5 sm:gap-x-[1%]'>
                  {film.episodes &&
                    film.episodes.length > 0 &&
                    film.episodes.map((episode, index) => <EpisodeBtn key={index} filmId={film.id} ep={episode.name} slug={episode.slug} filmSlug={film.slug} />)}
                </ul>
              </div>
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Episode;
