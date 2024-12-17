import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from 'contexts/themeContext';
import { images } from 'images';
import Icons from 'assets/icons';
import './index.scss';

const Footer = () => {
  const themeMode = useContext(ThemeContext);

  return (
    <>
      <footer className={themeMode.theme + '-footer py-[30px]'}>
        <div className='container'>
          <div className='footer-grid relative grid max-lg:gap-y-5'>
            <div className='logo flex items-center justify-center'>
              <Link to='#'>
                <img className='h-full max-h-[82px] object-cover' src={images[`./logo-${themeMode.theme}.png`]} alt='Logo' />
              </Link>
            </div>
            <div className='btn-footer hidden flex-col items-center justify-center space-y-3 lg:flex'>
              <button>Yêu cầu phim</button>
              <button>Group bàn tán</button>
            </div>
            <div className='contact flex flex-col items-center justify-center space-y-p3 text-center'>
              <span className='title hidden xl:inline-block'>Contact with us</span>
              <ul className='social-contact flex items-center justify-center'>
                <li>
                  <a href='https://www.facebook.com/' target='__blank'>
                    <Icons themeMode={themeMode.theme} iconName={'facebook'} className='icon' />
                  </a>
                </li>
                <li>
                  <a href='https://www.instagram.com/' target='__blank'>
                    <Icons themeMode={themeMode.theme} iconName={'instagram'} className='icon' />
                  </a>
                </li>
                <li>
                  <a href='/' target='__blank'>
                    <Icons themeMode={themeMode.theme} iconName={'direct-notification'} className='icon' />
                  </a>
                </li>
                <li>
                  <a href='https://www.youtube.com/' target='__blank'>
                    <Icons themeMode={themeMode.theme} iconName={'youtube'} className='icon' />
                  </a>
                </li>
              </ul>
            </div>
            <div className='register space-y-p3 text-center'>
              <span>Đăng ký nhận thông báo anime</span>
              <div>
                <input className='w-full max-w-[450px]' type='text' placeholder='Nhập email của bạn...' />
              </div>
            </div>
            <div className='empty lg:mt-6 text-center max-lg:hidden'></div>
            <div className='ads lg:mt-6 space-y-p1 text-center'>
              <p className='text-base font-medium italic'>Liên hệ quảng cáo: animetop@gmail.com</p>
              <p className='text-xs italic'>Bản quyền thuộc về đội ngũ phát triển AnimeTOP.com</p>
            </div>
            <span className='by lg:mt-6 text-end max-lg:text-center'>By: Elas + KenJ</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
