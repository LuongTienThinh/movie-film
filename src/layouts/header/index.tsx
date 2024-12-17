import { Fragment, useContext, useEffect, useState } from 'react';
import { Menu, Transition, Combobox, Disclosure, Switch } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';

import './index.scss';
import Icons from 'assets/icons';
import { images } from 'images';
import { ThemeContext } from 'contexts/themeContext';
import { ICountry, IFilm, IGenre, IResponseData } from 'interfaces';
import { AuthContext } from 'contexts/authContext';
import { useViewport } from 'hooks';
import { MenuBar } from 'components';
import { AuthService, FilmService, CategoryService } from 'services';

const Header = () => {
  const themeMode = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const { width: viewWidth, breakPoint } = useViewport();

  const [comboboxSearchOpen, setComboboxSearchOpen] = useState<boolean>(false);
  const [films, setFilms] = useState<Array<IFilm>>([]);
  const [genres, setGenres] = useState<Array<IGenre>>([]);
  const [countries, setCountries] = useState<Array<ICountry>>([]);
  const [searchFilmText, setSearchFilmText] = useState<string>('');
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');
  const [filteredFilm, setFilteredFilm] = useState<IFilm[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getApiLatest = async () => {
      const response: IResponseData = await FilmService.getLatest();
      setFilms(response?.data?.movie);
    };
    
    const getApiGenres = async () => {
      const response: IResponseData = await CategoryService.getAllCategories('genres');
      setGenres(response?.data);
    };
    
    const getApiCountries = async () => {
      const response: IResponseData = await CategoryService.getAllCategories('countries');
      setCountries(response?.data);
    };

    getApiLatest();
    getApiGenres();
    getApiCountries();
  }, []);
  
  useEffect(() => {
    const queueSearch = setTimeout(() => {
      setDebouncedSearchText(searchFilmText);
    }, 500);

    return () => {
      clearTimeout(queueSearch);
    }
  }, [searchFilmText]);

  useEffect(() => {
    const handleSearchFilm = async () => {
      const response: IResponseData = await FilmService.getFilmBySearch({ search: searchFilmText});
      setFilteredFilm(response?.data);
    };

    handleSearchFilm();
  }, [debouncedSearchText]);

  const handleSearch = (isOpen: boolean) => {
    setComboboxSearchOpen(isOpen);
  };

  const handleToggleTheme = () => {
    themeMode.toggleTheme(themeMode.theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const response: IResponseData = await AuthService.logout();
    
    if (response) {
      const { data, status, message } = response;

      if (status === 200) {
        auth.setIsAuth(false);
        navigate('/login');
      }
    }
  };

  return (
    <header className={`${themeMode.theme}-header ${viewWidth < breakPoint.lg ? 'mobile' : ''} py-p1`}>
      <div className='container'>
        <div className='common-flex-box h-[50px]'>
          <Link className={comboboxSearchOpen && viewWidth < breakPoint.sm ? `hidden` : 'logo h-full'} to='/'>
            <img className='h-full' src={images[`./logo-${themeMode.theme}.png`]} alt='Logo' />
          </Link>
          <div className='header-nav-mid'>
            {viewWidth < breakPoint.lg ? (
              <>
                {viewWidth >= breakPoint.sm && (
                  <div className='nav-search common-flex-box relative rounded-2xl px-1'>
                    <Combobox nullable>
                      {({ open }) => {
                        setTimeout(() => handleSearch(open));
                        return (
                          <>
                            <Combobox.Button>
                              <Icons themeMode={themeMode.theme} iconName='search' className='header-icon search-icon' />
                            </Combobox.Button>
                            <Combobox.Input
                              className={'w-[300px] p-1'}
                              type='text'
                              displayValue={(item: IFilm) => item?.label}
                              onChange={(e) => setSearchFilmText(e.target.value.toLocaleLowerCase())}
                              autoComplete='off'
                            />
                            {filteredFilm.length > 0 ? (
                              <Transition
                                as={Fragment}
                                enter='transition ease-out duration-100'
                                enterFrom='transform opacity-0 scale-95'
                                enterTo='transform opacity-100 scale-100'
                                leave='transition ease-in duration-75'
                                leaveFrom='transform opacity-100 scale-100'
                                leaveTo='transform opacity-0 scale-95'
                                afterLeave={() => setSearchFilmText('')}
                              >
                                <div className='header-nav-dropdown dropdown-search absolute left-1/2 translate-x-[-50%]'>
                                  <Combobox.Options className='custom-scroll'>
                                    {filteredFilm.map((item, index) => (
                                      <Combobox.Option value={item.slug} key={index}>
                                        <Link className='common-flex-box !h-[50px]' to={`/film-detail/${item.id}/${item.slug}`}>
                                          <div className='h-full w-1/4'>
                                            <img className='h-full w-[40px] rounded-p1' src={item.poster_url} alt='' />
                                          </div>
                                          <div className='flex h-full w-3/4 flex-col justify-between'>
                                            <p className='overflow-hidden text-ellipsis text-nowrap text-sm font-semibold'>{item.name}</p>
                                            <div className='common-flex-box text-xs font-light'>
                                              <span>{item.year}</span>
                                              <div>
                                                <span>{item.quality}</span>
                                                <span className='ms-p2'>Vietsub</span>
                                              </div>
                                            </div>
                                          </div>
                                        </Link>
                                      </Combobox.Option>
                                    ))}
                                  </Combobox.Options>
                                </div>
                              </Transition>
                            ) : (
                              ''
                            )}
                          </>
                        );
                      }}
                    </Combobox>
                  </div>
                )}
              </>
            ) : (
              <ul className='common-flex-box'>
                <li>
                  <Link to={'/pages/series'} className='common-flex-box'>
                    <span>Anime bộ</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/pages/movies'} className='common-flex-box'>
                    <span>Movie (OVA)</span>
                  </Link>
                </li>
                <Menu as='li' className='relative'>
                  <Menu.Button className='common-flex-box'>
                    {({ open }) => (
                      <>
                        <span className='me-1'>Thể loại</span>
                        <Icons themeMode={themeMode.theme} iconName={open ? 'dropdownfirst-up' : 'dropdownfirst-down'} className='dropdown-icon' />
                      </>
                    )}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='header-nav-dropdown dropdown-genre absolute left-1/2 translate-x-[-50%]'>
                      <ul className='common-flex-box w-full flex-wrap overflow-hidden p-3 py-1'>
                        {genres &&
                          genres.length > 0 &&
                          genres.map((genre) => (
                            <Menu.Item as='li' key={genre.slug}>
                              {({ close }) => (
                                <Link to={`/pages/genres/${genre.slug}`} onClick={close}>
                                  {genre.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                      </ul>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu as='li' className='relative'>
                  <Menu.Button className='common-flex-box'>
                    {({ open }) => (
                      <>
                        <span className='me-1'>Quốc gia</span>
                        <Icons themeMode={themeMode.theme} iconName={open ? 'dropdownfirst-up' : 'dropdownfirst-down'} className='dropdown-icon' />
                      </>
                    )}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='header-nav-dropdown dropdown-country absolute left-1/2 translate-x-[-50%]'>
                      <ul className='common-flex-box w-full flex-wrap overflow-hidden p-3 py-1'>
                        {countries &&
                          countries.length > 0 &&
                          countries.map((country) => (
                            <Menu.Item as='li' key={country.slug}>
                              {({ close }) => (
                                <Link to={`/pages/countries/${country.slug}`} onClick={close}>
                                  {country.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                      </ul>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </ul>
            )}
          </div>
          <div className={`header-nav-end common-flex-box ${viewWidth < breakPoint.sm && comboboxSearchOpen ? 'w-full' : ''}`}>
            {(viewWidth >= breakPoint.lg || viewWidth < breakPoint.sm) && (
              <div
                className={`nav-search common-flex-box relative rounded-2xl px-1 ${viewWidth < breakPoint.sm ? (comboboxSearchOpen ? 'w-full' : 'max-md:!bg-transparent') : ''}`}
              >
                <Combobox nullable>
                  {({ open }) => {
                    setTimeout(() => handleSearch(open));
                    return (
                      <>
                        <Combobox.Button>
                          <Icons themeMode={themeMode.theme} iconName='search' className='header-icon search-icon' />
                        </Combobox.Button>
                        {(viewWidth >= breakPoint.lg || (comboboxSearchOpen && viewWidth < breakPoint.sm)) && (
                          <Combobox.Input
                            className={
                              comboboxSearchOpen
                                ? `p-1 max-sm:w-full lg:w-[214px] xl:w-[226px]`
                                : auth.isAuth
                                  ? 'p-1 lg:w-[100px] xl:w-[226px]'
                                  : 'p-1 lg:w-[72px] xl:w-[226px]'
                            }
                            type='text'
                            displayValue={(item: IFilm) => item?.label}
                            onChange={(e) => setSearchFilmText(e.target.value.toLocaleLowerCase())}
                            autoComplete='off'
                          />
                        )}
                        {filteredFilm.length > 0 ? (
                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                            afterLeave={() => setSearchFilmText('')}
                          >
                            <div className='header-nav-dropdown dropdown-search absolute left-1/2 translate-x-[-50%]'>
                              <Combobox.Options className='custom-scroll'>
                                {filteredFilm.map((item, index) => (
                                  <Combobox.Option value={item.slug} key={index}>
                                    <Link className='common-flex-box !h-[50px]' to={`/film-detail/${item.id}/${item.slug}`}>
                                      <div className='h-full w-1/4'>
                                        <img className='h-full w-[40px] rounded-p1' src={item.poster_url} alt='' />
                                      </div>
                                      <div className='flex h-full w-3/4 flex-col justify-between'>
                                        <p className='overflow-hidden text-ellipsis text-nowrap text-sm font-semibold'>{item.name}</p>
                                        <div className='common-flex-box text-xs font-light'>
                                          <span>{item.year}</span>
                                          <div>
                                            <span>{item.quality}</span>
                                            <span className='ms-p2'>Vietsub</span>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </Combobox.Option>
                                ))}
                              </Combobox.Options>
                            </div>
                          </Transition>
                        ) : (
                          ''
                        )}
                      </>
                    );
                  }}
                </Combobox>
              </div>
            )}

            {/* Theme mode */}
            <button onClick={handleToggleTheme} className={comboboxSearchOpen ? 'hidden sm:inline-block lg:hidden xl:inline-block' : 'hidden md:inline-block'}>
              <Icons themeMode={themeMode.theme} iconName='thememode' className='header-icon toggle-icon' />
            </button>
            {/* End theme mode */}

            {auth.isAuth && (
              <Menu as='div' className={comboboxSearchOpen ? 'relative lg:hidden xl:block' : 'relative'}>
                {({ open: menuOpen }) => (
                  <>
                    <Menu.Button className='common-flex-box'>
                      <Icons
                        themeMode={themeMode.theme}
                        iconName={films?.filter((item) => !item.seen).length > 0 ? 'notify-seen' : 'notify'}
                        className={`header-icon notify-icon ${menuOpen && 'active'}`}
                      />
                    </Menu.Button>
                    {films.length > 0 ? (
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='header-nav-dropdown dropdown-notify absolute'>
                          <ul className='custom-scroll'>
                            {films.map((item, index) => (
                              <Menu.Item as='li' key={index} className={!item.seen ? 'unseen' : ''}>
                                {({ active }) => (
                                  <Link className='common-flex-box relative !h-[50px]' to={`/film-detail/${item.id}/${item.slug}`}>
                                    <div className='h-full w-1/4'>
                                      <img className='h-full w-[40px] rounded-p1' src={images[`./${item.slug}.jpg`]} alt='' />
                                    </div>
                                    <div className='h-full w-3/4'>
                                      <p className='h-full overflow-hidden text-ellipsis text-sm font-semibold'>
                                        <b>{item.film}</b> vừa mới ra mắt ngay hôm nay.
                                      </p>
                                    </div>
                                    {!item.seen && <div className='absolute right-1 top-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-[50%] bg-[#406AFF]'></div>}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </ul>
                        </Menu.Items>
                      </Transition>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </Menu>
            )}

            {viewWidth >= breakPoint.lg ? (
              <>
                {auth.isAuth ? (
                  <>
                    {/* Account manage */}
                    <Menu as='div' className={comboboxSearchOpen ? 'account relative lg:hidden xl:block' : 'account relative'}>
                      <Menu.Button className='common-flex-box'>
                        {({ open }) => (
                          <>
                            <img className='h-9 w-9 rounded-p1' src={images['./avatar.png']} alt='' />
                          </>
                        )}
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='header-nav-dropdown dropdown-user absolute right-0'>
                          <ul className='w-full overflow-hidden py-p1'>
                            <Menu.Item as='li'>
                              <Link to={'/profile'} className='common-flex-box'>
                                <Icons themeMode={themeMode.theme} iconName='account' className='header-icon' />
                                <span>Tài khoản</span>
                              </Link>
                            </Menu.Item>
                            <Menu.Item as='li'>
                              <Link to={'/wishlist'} className='common-flex-box'>
                                <Icons themeMode={themeMode.theme} iconName='collection' className='header-icon' />
                                <span>Bộ sưu tập</span>
                              </Link>
                            </Menu.Item>
                            <Menu.Item as='li'>
                              <Link to={'/login'} className='common-flex-box' onClick={handleLogout}>
                                <Icons themeMode={themeMode.theme} iconName='logout' className='header-icon' />
                                <span>Đăng xuất</span>
                              </Link>
                            </Menu.Item>
                          </ul>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    {/* End account manage */}
                  </>
                ) : (
                  <>
                    <Link
                      to={'/login'}
                      className={
                        comboboxSearchOpen
                          ? 'login-btn rounded-p2 px-2 py-1.5 font-semibold leading-[1.3rem] lg:hidden xl:block'
                          : 'login-btn rounded-p2 px-2 py-1.5 font-semibold leading-[1.3rem]'
                      }
                    >
                      Đăng nhập
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Menu as='div' className={comboboxSearchOpen ? 'relative lg:hidden xl:block' : 'relative'}>
                  {({ open }) => (
                    <>
                      <Menu.Button className='common-flex-box'>
                        <MenuBar className={open ? 'active' : ''} />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 translate-x-full'
                        enterTo='transform opacity-100 translate-x-0'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 translate-x-0'
                        leaveTo='transform opacity-0 translate-x-full'
                      >
                        <Menu.Items className='menu py-5'>
                          <div className='container'>
                            <ul className='pages space-y-5 text-lg'>
                              <li>
                                <Link to={'/'} className='common-flex-box'>
                                  <span>Trang chủ</span>
                                </Link>
                              </li>
                              <li>
                                <Link to={'/series'} className='common-flex-box'>
                                  <span>Anime bộ</span>
                                </Link>
                              </li>
                              <li>
                                <Link to={''} className='common-flex-box'>
                                  <span>Movie (OVA)</span>
                                </Link>
                              </li>
                              <Disclosure as='li' className='relative'>
                                <Disclosure.Button className='common-flex-box'>
                                  {({ open }) => (
                                    <>
                                      <span className='me-1'>Thể loại</span>
                                      <Icons themeMode={themeMode.theme} iconName={open ? 'dropdownfirst-up' : 'dropdownfirst-down'} className='dropdown-icon' />
                                    </>
                                  )}
                                </Disclosure.Button>
                                <Transition
                                  as={Fragment}
                                  enter='transition ease-out duration-100'
                                  enterFrom='transform opacity-0 scale-95'
                                  enterTo='transform opacity-100 scale-100'
                                  leave='transition ease-in duration-75'
                                  leaveFrom='transform opacity-100 scale-100'
                                  leaveTo='transform opacity-0 scale-95'
                                >
                                  <Disclosure.Panel className='header-nav-dropdown dropdown-genre' onClickCapture={(e) => e.stopPropagation()}>
                                    <ul className='mt-5 w-full flex-wrap overflow-hidden bg-transparent'>
                                      {genres &&
                                        genres.length > 0 &&
                                        genres.map((genre, index) => (
                                          <li key={`${genre} + ${index}`}>
                                            <Link to={`/pages/genres/${genre.slug}`} className={''}>
                                              {genre.name}
                                            </Link>
                                          </li>
                                        ))}
                                    </ul>
                                  </Disclosure.Panel>
                                </Transition>
                              </Disclosure>
                              <Disclosure as='li' className='relative'>
                                <Disclosure.Button className='common-flex-box'>
                                  {({ open }) => (
                                    <>
                                      <span className='me-1'>Quốc gia</span>
                                      <Icons themeMode={themeMode.theme} iconName={open ? 'dropdownfirst-up' : 'dropdownfirst-down'} className='dropdown-icon' />
                                    </>
                                  )}
                                </Disclosure.Button>
                                <Transition
                                  as={Fragment}
                                  enter='transition ease-out duration-100'
                                  enterFrom='transform opacity-0 scale-95'
                                  enterTo='transform opacity-100 scale-100'
                                  leave='transition ease-in duration-75'
                                  leaveFrom='transform opacity-100 scale-100'
                                  leaveTo='transform opacity-0 scale-95'
                                >
                                  <Disclosure.Panel className='header-nav-dropdown dropdown-genre' onClickCapture={(e) => e.stopPropagation()}>
                                    <ul className='mt-5 w-full flex-wrap overflow-hidden bg-transparent'>
                                      {countries &&
                                        countries.length > 0 &&
                                        countries.map((country, index) => (
                                          <li key={`${country} + ${index}`}>
                                            <Link to={`/pages/countries/${country.slug}`} className={''}>
                                              {country.name}
                                            </Link>
                                          </li>
                                        ))}
                                    </ul>
                                  </Disclosure.Panel>
                                </Transition>
                              </Disclosure>
                              {auth.isAuth ? (
                                <>
                                  <Disclosure as='li' className={'account relative'}>
                                    <Disclosure.Button>
                                      {({ open }) => (
                                        <div className='common-flex-box space-x-1'>
                                          <img className='h-9 w-9 rounded-p1' src={images['./avatar.png']} alt='' />
                                          <span>Cá nhân</span>
                                          <Icons themeMode={themeMode.theme} iconName={open ? 'dropdownfirst-up' : 'dropdownfirst-down'} className='dropdown-icon' />
                                        </div>
                                      )}
                                    </Disclosure.Button>
                                    <Transition
                                      as={Fragment}
                                      enter='transition ease-out duration-100'
                                      enterFrom='transform opacity-0 scale-95'
                                      enterTo='transform opacity-100 scale-100'
                                      leave='transition ease-in duration-75'
                                      leaveFrom='transform opacity-100 scale-100'
                                      leaveTo='transform opacity-0 scale-95'
                                    >
                                      <Disclosure.Panel className='header-nav-dropdown'>
                                        <ul className='mt-3 !block space-y-3'>
                                          <li>
                                            <Link to={'/profile'} className={''}>
                                              <span className=''>Tài khoản</span>
                                            </Link>
                                          </li>
                                          <li>
                                            <Link to={'/wishlist'} className={''}>
                                              <span className=''>Bộ sưu tập</span>
                                            </Link>
                                          </li>
                                          <li>
                                            <Link to={'/login'} className='common-flex-box' onClick={handleLogout}>
                                              <span className=''>Đăng xuất</span>
                                            </Link>
                                          </li>
                                        </ul>
                                      </Disclosure.Panel>
                                    </Transition>
                                  </Disclosure>
                                </>
                              ) : (
                                <>
                                  <li>
                                    <Link to={'/login'} className={'login-btn rounded-p2 px-2 py-1.5 font-semibold leading-[1.3rem]'}>
                                      Đăng nhập
                                    </Link>
                                  </li>
                                </>
                              )}
                              <li>
                                <Switch className={'w-16 rounded-full bg-gray-400 p-1'} checked={themeMode.theme === 'dark'} onChange={handleToggleTheme}>
                                  <Transition
                                    as={'div'}
                                    enter='transition ease-out duration-100'
                                    enterFrom='transform opacity-0 scale-95'
                                    enterTo='transform opacity-100 scale-100'
                                    leave='transition ease-in duration-75'
                                    leaveFrom='transform opacity-100 scale-100'
                                    leaveTo='transform opacity-0 scale-95'
                                    className={'flex w-full justify-between'}
                                  >
                                    <Icons
                                      themeMode={'light'}
                                      iconName='thememode'
                                      className={`header-icon toggle-icon ${themeMode.theme === 'light' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
                                    />
                                    <Icons
                                      themeMode={'dark'}
                                      iconName='thememode'
                                      className={`header-icon toggle-icon ${themeMode.theme === 'dark' ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
                                    />
                                  </Transition>
                                </Switch>
                              </li>
                            </ul>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
