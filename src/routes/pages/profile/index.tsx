import { Tab } from '@headlessui/react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Icons from 'assets/icons';
import { ThemeContext } from 'contexts/themeContext';
import { Footer, Header } from 'layouts';
import { images } from 'images';
import Input from 'components/elements/input';
import { IResponseData, ITabSetting } from 'interfaces';
import Button from 'components/elements/button';
import { AuthContext } from 'contexts/authContext';
import './index.scss';
import { useViewport } from 'hooks';
import { AuthService } from 'services';

const TabSettingPanel = ({ title, content }: ITabSetting) => {
  const { width: viewWidth, breakPoint } = useViewport();
  return (
    <>
      <Tab.Panel className={'panel'}>
        <div className='title border-b-2 border-gray-400 p-5 text-lg font-semibold leading-none max-sm:mx-10 max-sm:text-center sm:px-10'>{title}</div>
        <div className='px-10 py-5 max-sm:text-sm'>
          {content && (
            <>
              <div className='flex items-stretch justify-between gap-5'>
                <div style={{ width: content.leftWidth ? `${(Number(content.leftWidth) / 12) * 100}%` : '100%' }}>
                  {content.left}
                  {content.submitBtn && <Button {...content.submitBtn} />}
                </div>
                {content.right && (
                  <div className='h-full self-center' style={{ width: content.rightWidth ? `${(Number(content.rightWidth) / 12) * 100}%` : '40%' }}>
                    {content.right}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Tab.Panel>
    </>
  );
};

const Profile = () => {
  const themeMode = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { width: viewWidth, breakPoint } = useViewport();

  const menuSettings: ITabSetting[] = [
    {
      iconName: 'profile',
      title: 'Thông tin tài khoản',
      content: {
        left: (
          <ul className='detail w-full'>
            <li className='max-sm:!justify-center'>
              <span className='max-sm:hidden'>Ảnh đại diện</span>
              <div className='flex items-center justify-center'>
                <div className='relative h-p12 w-p12 overflow-hidden rounded-full'>
                  <img className='h-full w-full' src={images['./avatar.png']} alt='' />
                  <div className='edit-avatar absolute bottom-0 left-1/2 w-full -translate-x-1/2 cursor-pointer py-0.5 text-center opacity-50'>
                    <Icons className='icon mx-auto' iconName='camera' themeMode={themeMode.theme} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <span>Biệt danh</span>
              <div>Sung Jin Woo</div>
              <div className='action'>
                <button className='text-gray-600'>{viewWidth >= breakPoint.sm ? 'Thay đổi' : 'Ic'}</button>
              </div>
            </li>
            <li>
              <span>Ngày sinh</span>
              <div>28/11/2000</div>
              <div className='action'>
                <button className='text-gray-600'>{viewWidth >= breakPoint.sm ? 'Thay đổi' : 'Ic'}</button>
              </div>
            </li>
            <li>
              <span>Giới tính</span>
              <div>Nam</div>
              <div className='action'>
                <button className='text-gray-600'>{viewWidth >= breakPoint.sm ? 'Thay đổi' : 'Ic'}</button>
              </div>
            </li>
            <li>
              <span>Số điện thoại</span>
              <div>0123456789</div>
            </li>
            <li>
              <span>Email liên kết</span>
              <div>animetop@gmail.com</div>
            </li>
          </ul>
        ),
        right:
          viewWidth >= breakPoint.xl ? (
            <div className='avatar hidden h-full py-[25px] xl:block'>
              <img className='aspect-[2/3] h-full w-full rounded-p2 object-cover object-center' src={images['./avatar.png']} alt='' />
            </div>
          ) : undefined,
        leftWidth: viewWidth >= breakPoint.xl ? 8 : 12,
        rightWidth: viewWidth >= breakPoint.xl ? 4 : 0,
      },
    },
    {
      iconName: 'lock',
      title: 'Thay đổi mật khẩu',
      content: {
        left: (
          <>
            <Input type='text' name='current-password' placeholder='Mật khẩu hiện tại' />
            <Input type='text' name='new-password' placeholder='Mật khẩu mới' />
            <Input type='text' name='renew-password' placeholder='Xác nhận mật khẩu mới' />
            <Input type='text' name='captcha' placeholder='Mã captcha' />
          </>
        ),
        right:
          viewWidth >= breakPoint.sm ? (
            <>
              <p>
                <span className='font-bold'>Gợi ý:</span> Dùng ít nhất 8 ký tự.
              </p>
              <p>Kết hợp các ký tự A-z, 0-9 và một số ký tự đặc biệt.</p>
              <p>Không nên sử dụng những chuỗi dễ đoán như ngày sinh trong mật khẩu.</p>
            </>
          ) : undefined,
        leftWidth: viewWidth >= breakPoint.sm ? 7 : 12,
        rightWidth: viewWidth >= breakPoint.sm ? 4 : 0,
        submitBtn: {
          btnName: 'Thay đổi',
          className: 'submit-btn',
        },
      },
    },
    {
      iconName: 'password',
      title: 'Thay đổi số điện thoại',
      content: {
        left: (
          <>
            <p className='!mb-[30px]'>Vui lòng điền số điện thoại di động. Chúng tôi sẽ gửi bạn một mã xác minh thông qua tin nhắn SMS</p>
            <Input type='text' name='phone' placeholder='Số điện thoại' />
          </>
        ),
        leftWidth: viewWidth >= breakPoint.sm ? 7 : 12,
        submitBtn: {
          btnName: 'Gửi mã',
          className: 'submit-btn',
        },
      },
    },
    {
      iconName: 'sms',
      title: 'Thay đổi email',
      content: {
        left: (
          <>
            <Input type='text' name='new-email' placeholder='Địa chỉ email mới' />
            <Input type='text' name='renew-email' placeholder='Xác nhận địa chỉ email mới' />
            <Input type='text' name='password' placeholder='Mật khẩu hiện tại' />
            <Input type='text' name='captcha' placeholder='Mã captcha' />
          </>
        ),
        leftWidth: viewWidth >= breakPoint.sm ? 7 : 12,
        submitBtn: {
          btnName: 'Thay đổi',
          className: 'submit-btn',
        },
      },
    },
    {
      iconName: 'logout',
      title: 'Đăng xuất',
      onClick: async () => {
        const response: IResponseData = await AuthService.logout();
    
        if (response) {
          const { data, status, message } = response;

          if (status === 200) {
            auth.setIsAuth(false);
            navigate('/login');
          }
        }
      },
    },
  ];

  return (
    <>
      <Header />
      <section className={`profile min-h-fvh profile-${themeMode.theme}`}>
        <div className='container'>
          <div className='mx-auto flex w-full flex-row gap-5 py-10 max-lg:flex-col sm:px-0 lg:min-h-[460px] xl:min-h-[565px]'>
            <Tab.Group>
              <Tab.List className='tab-list rounded-p2 p-5 max-lg:flex max-lg:justify-center max-lg:gap-x-5 lg:w-[35%] xl:w-3/10'>
                {menuSettings.map((menu) => (
                  <Tab key={menu.title} className={'tab common-flex-box h-10 text-left outline-none lg:mb-2.5 lg:w-full'} onClick={menu.onClick}>
                    {({ selected }) => (
                      <>
                        <div className={`min-w-[10%]`}>
                          <Icons className={`icon ${menu.iconName} ${selected ? 'selected' : ''}`} iconName={menu.iconName || ''} themeMode={themeMode.theme} />
                        </div>
                        <span className={`title p-2 max-lg:hidden lg:w-4/5 xl:w-[85%] ${selected ? 'border-l-2 ps-1.5 font-semibold' : ''}`}>{menu.title}</span>
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className='tab-panel rounded-p2 lg:w-[65%] xl:w-7/10'>
                {menuSettings.map((menu) => (
                  <TabSettingPanel key={menu.title} content={menu.content || undefined} title={menu.title} />
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
