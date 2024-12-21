import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react'

import './index.scss';
import { Footer, Header } from 'layouts';
import { IEpisodeBtn, IEpisodeTabData, IFilm, IResponseData } from 'interfaces';
import { ThemeContext } from 'contexts/themeContext';
import { FilmService } from 'services';
import { AuthContext } from 'contexts/authContext';
import { Button } from 'components';

const EpisodeBtn = ({ filmId, ep, filmSlug, slug }: IEpisodeBtn) => {
  const params = useParams();

  useEffect(() => {
    const listBtnEp = document.querySelectorAll('.btn-ep');

    listBtnEp.forEach((btn) => {
      if (btn.textContent?.toLowerCase() === (params.ep  && (params.ep.split('-')[1] || params.ep))?.toLowerCase()) {
        btn.classList.add('active');}
      else {
        btn.classList.remove('active');
      }
    });
  }, [params]);

  return (
    <li className='w-[23%] text-center sm:w-[13%] md:w-[9%]'>
      <Link
        to={`/film-detail/${filmId}/${filmSlug}/${slug}`}
        className={`btn-ep block rounded-p2 bg-[#03AE00] py-1.5 font-medium !leading-none text-[#ffffff] max-lg:text-xs lg:text-sm xl:text-base`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        {ep && (ep.split(' ')[1] || ep)}
      </Link>
    </li>
  );
};

const Episode = () => {
  const themeMode = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const params = useParams();

  const [film, setFilm] = useState<IFilm>();
  const [listTab, setListTab] = useState<Array<any>>([]);
  const [tabData, setTabData] = useState<IEpisodeTabData>({ firstTab: 1, lastTab: 1, itemPerTab: 100 });

  useEffect(() => {
    const timing = performance.now();

    const setViewed = async () => {
      if (auth.user.id && film?.id) {
        await FilmService.putWishlist({ viewed: true, followed: film.is_follow }, '', auth.user.id, film.id);
      }
    };

    if (film) {
      setTabData((prev) => ({ ...prev, lastTab: Math.ceil(film.episodes.length / prev.itemPerTab) }));
    }

    return () => {
      const elapsedTime = (performance.now() - timing) / 1000;
      if (elapsedTime > 30) { 
        setViewed().catch(err => console.error(err));
      }
    };
  }, [film]);

  useEffect(() => {
    const getApiDetail = async () => {
      const response: IResponseData = auth.user.id
        ? await FilmService.getUserFilmDetail(params, '', auth.user.id, Number(params.id))
        : await FilmService.getDetailFilm(params);

      setFilm(response?.data);
    };

    if (params) {
      getApiDetail();
    }
  }, [params, auth.user]);

  useEffect(() => {
    if (film) {
      if (film?.episodes.length <= tabData.itemPerTab) {
        setListTab([{ tabName: `1 - ${film?.episodes.length}` }]);
      } else {
        const data = [];

        for (let index = tabData.firstTab; index <= tabData.lastTab; index++) {
          data.push({
            tabName: `${tabData.itemPerTab * (index - 1) + 1} - ${Math.min(tabData.itemPerTab * index, film?.episodes.length)}`,
            firstIndex: tabData.itemPerTab * (index - 1) + 1 || 1,
            lastIndex: Math.min(tabData.itemPerTab * index, film?.episodes.length) || film?.episodes.length,
          });
        }

        setListTab(data);
      }
    }
  }, [film, tabData]);

  return (
    <>
      <Header />
      <section className={`episodes m-auto  episodes-${themeMode.theme}`}>
        {film && (
          <>
            <div className='film-watching relative'>
              <iframe title={film.episodes.find((e) => e.slug === params.ep)?.link} src={film.episodes.find((e) => e.slug === params.ep)?.link} allowFullScreen />
            </div>
            <div className='list-episodes py-10'>
              <div className='container'>
                <div className='title mb-2.5 text-2xl font-bold capitalize xl:text-3xl'>{film.name}</div>
                <div className='mb-[30px] text-sm font-semibold xl:text-base'>
                  Số tập: {film.episode_current}/{film.episode_total}
                </div>
                <Tab.Group>
                  {listTab.length > 1 && 
                    <div className='custom-scroll w-full overflow-x-auto mb-4'>
                      <Tab.List className={`inline-flex gap-2.5 mb-2`}>
                        {listTab.map((tabItem) => (
                          <Tab key={tabItem.tabName} className={`tab-episode w-[200px] border-2 border-black rounded-p2 py-1.5 text-base font-bold`}>
                            {tabItem.tabName}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                  }
                  <Tab.Panels>
                    {film.episodes && film.episodes.length > 0 &&
                      listTab.map((tabItem, index) => (
                        <Tab.Panel key={tabItem.tabName}>
                          <ul className='flex flex-wrap gap-x-[2%] gap-y-2.5 sm:gap-x-[1%]'>
                            {film.episodes.slice(tabItem.firstIndex - 1, tabItem.lastIndex).map((episode) => (
                                <EpisodeBtn key={episode.name} filmId={film.id} ep={episode.name} filmSlug={film.slug} slug={episode.slug} />
                            ))}
                          </ul>
                        </Tab.Panel>
                      ))}
                  </Tab.Panels>
                </Tab.Group>
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
