import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './index.scss';
import Icons from 'assets/icons';
import { Footer, Header } from 'layouts';
import { IFilm, IPopup, IPopupRef, IResponseData } from 'interfaces';
import { ThemeContext } from 'contexts/themeContext';
import { FilmService } from 'services';
import { Button, Popup } from 'components';
import { AuthContext } from 'contexts/authContext';

const FilmDetail = () => {
  const themeMode = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const params = useParams();
  const popupRef: RefObject<IPopupRef> = useRef(null);

  const [film, setFilm] = useState<IFilm>();
  const [popupData, setPopupData] = useState<IPopup>({});

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

  const handlePopup = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!film?.episodes[0]) {
      event.preventDefault();

      setPopupData((prev) => ({
        ...prev,
        title: 'Thông báo',
        message: "Phim chuẩn bị ra mắt, hãy chờ đón nhé!",
      }));
      
      popupRef.current && popupRef.current.openModal();
    } else {
      if (auth.user.id && film?.id) {
        const response: IResponseData = await FilmService.putWishlist({ viewed: true, followed: film.is_follow }, '', auth.user.id, film.id);
      }
    }
  }
  
  const updateFollowState = async () => {
    if (auth.user.id && film?.id) {
      const response: IResponseData = await FilmService.putWishlist({ viewed: film.is_view, followed: !film.is_follow }, '', auth.user.id, film.id);
    }
  }

  return (
    <>
      <Header />
      <section className='m-auto '>
        {film && (
          <div className={`film-detail film-detail-${themeMode.theme} relative`}>
            <img className='h-[min(400px,100vh-150px)] w-full object-cover brightness-50 lg:h-[min(700px,100vh-150px)]' src={film.thumbnail_url} alt='' />
            <div className='container'>
              <div className='wrapper relative z-40 -mt-[380px] lg:-mt-[260px] xl:-mt-[360px]'>
                <div className='flex justify-between gap-5 max-lg:flex-col xl:gap-10'>
                  <div className='poster w-[210px] space-y-p2 max-lg:self-center lg:overflow-hidden xl:h-[420px] xl:w-[300px]'>
                    <img className='h-full w-full rounded-p2 object-cover max-lg:aspect-auto max-lg:h-auto' src={film.poster_url} alt='' />
                    <div className='btn flex items-center justify-between lg:hidden'>
                      <Link className='inline-block px-10' onClick={handlePopup} to={film.episodes[0] ? `/film-detail/${film.id}/${film.slug}/${film.episodes[0].slug}` : ''}>
                        Xem ngay
                      </Link>
                      <Link className='!m-0 inline-block !bg-none !p-0' to={'#'} onClick={updateFollowState}>
                        <Icons themeMode={themeMode.theme} iconName={'follow'} className='icon h-p6 w-p6' />
                      </Link>
                    </div>
                  </div>
                  <div className='description flex flex-col justify-between gap-y-p2 lg:w-[40%]'>
                    <h1 className='title text-2xl font-bold xl:text-3xl text-nowrap'>{film.name}</h1>
                    <ul>
                      <li>Tên gốc: {film.origin_name}</li>
                      <li>Tình trạng: {film.status == 'completed' ? 'Hoàn thành' : 'Đang ra'}</li>
                      <li>
                        Số tập: {film.episode_current}/{film.episode_total}
                      </li>
                      <li>Thời lượng: {film.time}</li>
                      <li>Năm phát hành: {film.year}</li>
                      <li>Quốc gia: {film.countries.map((e) => e.name).join(', ')}</li>
                      <li>Định dạng phim: {film.quality}</li>
                      <li>Chất lượng: {film.quality}</li>
                    </ul>
                    <div className='btn max-lg:hidden'>
                      <Link className='inline-block px-10' onClick={handlePopup} to={film.episodes[0] ? `/film-detail/${film.id}/${film.slug}/${film.episodes[0].slug}` : ''}>
                        Xem ngay
                      </Link>
                      <Link to={'#'} className='ms-5 inline-block px-5' onClick={updateFollowState}>
                        {film.is_follow ? 'Huỷ theo dõi' : 'Theo dõi'}
                      </Link>
                    </div>
                  </div>
                  <div className='genres max-lg:space-y-p3 lg:flex lg:w-[35%] lg:items-end'>
                    <div className='genre-title text-lg font-bold lg:hidden'>Thể loại</div>
                    <ul className='genre-item flex w-full flex-wrap gap-2.5 lg:flex-wrap-reverse lg:justify-end'>
                      {film.genres.map((genre, index) => (
                        <li key={genre + index}>
                          <Link to={`/pages/genres/${genre.slug}`}>{genre.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className='summary py-10'>
                <h3 className='text-[22px] font-bold xl:text-[26px]'>Nội dung phim</h3>
                <hr className='my-p3 h-[1px] border-none' />
                <p className='text-justify text-base font-medium xl:text-xl'>
                  {film.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />

      {popupData && <Popup {...popupData} ref={popupRef} />}
    </>
  );
};

export default FilmDetail;
