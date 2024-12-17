import { useContext, useEffect, useState } from 'react';

import { Film, Loading, Pagination } from 'components';
import { ThemeContext } from 'contexts/themeContext';
import { useDataHook } from 'hooks';
import { IDataHook, IFilm, IPageContent, IPageManage, IResponseData } from 'interfaces';
import { Footer, Header } from 'layouts';
import { PAGE } from 'constants';
import { AuthContext } from 'contexts/authContext';

const SearchPage = () => {
  const themeMode = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const params = {
    page: 'wishlist',
  };

  const [films, setFilms] = useState<Array<IFilm>>([]);
  const [followFilms, setFollowFilms] = useState<Array<IFilm>>([]);
  const [viewFilms, setViewFilms] = useState<Array<IFilm>>([]);
  const [pageManage, setPageManage] = useState<IPageManage>({ page: 1, perPage: 12 });
  const [pageData, setPageData] = useState<IPageContent>({});

  useEffect(() => {
    const getDataFilms = async () => {
      const response: IResponseData | null = (await pageData?.getData?.(pageManage, '', auth.user.id)) || null;

      if (response) {
        setFilms(response?.data?.movie || []);
        setPageManage((prev) => ({
          ...prev,
          page: response?.data?.pagination.currentPage,
          perPage: response?.data?.pagination.perPage,
          totalItem: response?.data?.pagination.totalItem,
          totalPage: response?.data?.pagination.totalPage,
        }));
      }
    };

    if (pageData && auth.user.id) {
      setFilms([]);
      getDataFilms();
    }
  }, [pageData, pageManage.page, pageManage.perPage, auth.user]);

  useEffect(() => {
    setFollowFilms(films.filter(film => film.is_follow));
    setViewFilms(films.filter(film => film.is_view));
  }, [films]);
  

  const paginationChange = (event: IPageManage) => {
    setFilms([]);
    setPageManage((prev) => ({ ...prev, ...event }));
  };

  useEffect(() => {
    if (params.page) {
      const getDetail = async (params: any) => {
        setPageData({
          ...PAGE[params.page],
        });
      };

      getDetail(params);
    }
  }, []);

  const wishlistHook: IDataHook = {
    title: pageData?.subData?.[0].title,
    sideBar: {
      leftSide: {
        width: 12,
        content: (
          <div className='content flex flex-wrap gap-x-[5%] gap-y-3 md:gap-5 lg:gap-x-[2.5%] lg:gap-y-5 xl:gap-5'>
            {followFilms &&
              followFilms.length > 0 &&
              followFilms.map(film => <Film key={film.id} {...film} className='w-[47.5%] sm:w-3/10 md:w-[calc(25%-15px)] lg:w-[18%] xl:w-[calc(16.667%-16.667px)]' />)}
          </div>
        ),
      },
    },
    filters: false,
    pagination: followFilms.filter(film => film.is_follow) && pageManage && (
      <Pagination onChange={(page) => paginationChange({ page: page })} totalItem={followFilms.length} showPrev sibling={1} showNext {...pageManage} />
    ),
  };

  const viewedHook: IDataHook = {
    title: pageData?.subData?.[1].title,
    sideBar: {
      leftSide: {
        width: 12,
        content: (
          <div className='content flex flex-wrap gap-x-[5%] gap-y-3 md:gap-5 lg:gap-x-[2.5%] lg:gap-y-5 xl:gap-5'>
            {viewFilms &&
              viewFilms.length > 0 &&
              viewFilms.map(film => <Film key={film.id} {...film} className='w-[47.5%] sm:w-3/10 md:w-[calc(25%-15px)] lg:w-[18%] xl:w-[calc(16.667%-16.667px)]' />)}
          </div>
        ),
      },
    },
    filters: false,
    pagination: viewFilms && pageManage && (
      <Pagination onChange={(page) => paginationChange({ page: page })} totalItem={viewFilms.length} showPrev sibling={1} showNext {...pageManage} />
    ),
  };

  const wishlistDataHook = useDataHook(wishlistHook);
  const viewedDataHook = useDataHook(viewedHook);
  
  return (
    <>
      <Header />
      <section className={`wishlist-page sub-content m-auto  sub-content-${themeMode.theme}`}>
        <div className='container'>
          <div>{wishlistDataHook.renderData()}</div>
          <div className='w-full h-0.5 my-8 bg-black'></div>
          <div>{viewedDataHook.renderData()}</div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SearchPage;
