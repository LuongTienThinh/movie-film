import { useContext, useEffect, useState } from 'react';

import { Film, Pagination } from 'components';
import { ThemeContext } from 'contexts/themeContext';
import { useDataHook } from 'hooks';
import { IDataHook, IFilm, IPageContent, IPageManage, IResponseData } from 'interfaces';
import { Footer, Header } from 'layouts';
import { useParams, useSearchParams } from 'react-router-dom';
import { PAGE } from 'constants';
import { CategoryService } from 'services';

const SearchPage = () => {
  const themeMode = useContext(ThemeContext);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });

  const [films, setFilms] = useState<Array<IFilm>>([]);
  const [pageManage, setPageManage] = useState<IPageManage>({ page: Number(searchParams.get('page')), perPage: 24 });
  const [pageData, setPageData] = useState<IPageContent>({});

  useEffect(() => {
    if (searchParams.get('page') !== pageManage.page.toString()) {
      setPageManage((prev) => ({
        ...prev,
        page: Number(searchParams.get('page')),
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const getDataFilms = async () => {
      const response: IResponseData | null = (await pageData?.getData?.({ ...pageManage, page: searchParams.get('page') }, params.slug)) || null;

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

    if (pageData) {
      setFilms([]);
      getDataFilms();
    }
  }, [searchParams, pageData]);

  const paginationChange = (event: IPageManage) => {
    setFilms([]);
    setSearchParams({ page: event.page.toString() });
  };

  useEffect(() => {
    if (params.page) {
      setFilms([]);
      
      if (!searchParams.get('page')) {
        setSearchParams({ page: '1' });
      }

      if (params.slug) {
        const getDetail = async (params: any) => {
          const response: IResponseData | null = await CategoryService.getDetailCategory(params.page, params.slug);

          if (response) {
            setPageData({
              ...PAGE[params.page],
              title: response.data.name,
            });
          }
        };

        getDetail(params);
      } else {
        setPageData(PAGE[params.page]);
      }
    }
  }, [params.page, params.slug]);

  const pageHook: IDataHook = {
    title: pageData?.title,
    sideBar: {
      leftSide: {
        width: 12,
        content: (
          <div className='content flex flex-wrap gap-x-[5%] gap-y-3 md:gap-5 lg:gap-x-[2.5%] lg:gap-y-5 xl:gap-5'>
            {films &&
              films.length > 0 &&
              films.map((film, index) => <Film key={index} {...film} className='w-[47.5%] sm:w-3/10 md:w-[calc(25%-15px)] lg:w-[18%] xl:w-[calc(16.667%-16.667px)]' />)}
          </div>
        ),
      },
    },
    filters: true,
    pagination: films && pageManage && (
      <Pagination onChange={(page) => paginationChange({ page: page })} pageIndex={pageManage.page} showPrev sibling={3} showNext {...pageManage} />
    ),
  };
  const pageDataHook = useDataHook(pageHook);
  return (
    <>
      <Header />

      <section className={`search-page sub-content m-auto sub-content-${themeMode.theme}`}>
        <div className='container'>{pageDataHook.renderData()}</div>
      </section>

      <Footer />
    </>
  );
};

export default SearchPage;
