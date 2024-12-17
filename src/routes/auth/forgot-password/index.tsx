import { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ThemeContext } from 'contexts/themeContext';
import useAuthHook from 'hooks/auth';
import { IAuthHook } from 'interfaces';
import { Footer, Header } from 'layouts';
import Input from 'components/elements/input';

const ForgotPassword = () => {
  const themeMode = useContext(ThemeContext);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [step, setStep] = useState<string | null>(params.get('step') || '1');

  const forgotHook: IAuthHook =
    step === '1'
      ? {
          title: 'Tìm lại tài khoản của bạn',
          content: (
            <div className='space-y-p3'>
              <div className='note text-left text-sm'>
                <p className='text-justify font-light'>Vui lòng nhập lại email hoặc số điện thoại để tìm kiếm tài khoản của bạn</p>
              </div>
              <div>
                <Input type='text' name='mail-phone' placeholder='Email hoặc số điện thoại' />
              </div>
            </div>
          ),
          confirmBtns: {
            cancelBtn: {
              btnName: 'Huỷ',
            },
            continueBtn: {
              btnName: 'Gửi mã',
              onClick: () => {
                setStep('2');
                navigate('?step=2');
              },
            },
          },
        }
      : step === '2'
        ? {
            title: 'Xác thực tài khoản',
            content: (
              <div className='space-y-p3'>
                <div className='note p-2.5 text-left text-sm'>
                  <p className='mb-2.5 text-justify font-light'>Nhập mã OTP để xác thực tài khoản của bạn</p>
                  <strong className='italic'>Lưu ý:</strong>
                  <p className='text-justify font-light italic'>Không chia sẻ mã OTP cho bất kỳ ai, điều đó có thể ảnh hưởng tới tài khoản của bạn!</p>
                </div>
                <div className='space-y-p2'>
                  <Input type='text' name='otp' placeholder='Nhập mã xác thực' />
                  <Input type='text' name='captcha' placeholder='Mã captcha' />
                </div>
              </div>
            ),
            confirmBtns: {
              cancelBtn: {
                btnName: 'Huỷ',
              },
              continueBtn: {
                btnName: 'Xác nhận',
                onClick: () => {
                  setStep('3');
                  navigate('?step=3');
                },
              },
            },
          }
        : step === '3'
          ? {
              title: 'Đặt lại mật khẩu',
              content: (
                <>
                  <div className='space-y-p2'>
                    <Input type='text' name='new-password' placeholder='Mật khẩu mới' />
                    <Input type='text' name='renew-password' placeholder='Xác nhận mật khẩu mới' />
                    <Input type='text' name='captcha' placeholder='Mã captcha' />
                  </div>
                </>
              ),
              confirmBtns: {
                cancelBtn: {
                  btnName: 'Huỷ',
                },
                continueBtn: {
                  btnName: 'Thay đổi',
                  onClick: () => {
                    setStep('4');
                    navigate('?step=4');
                  },
                },
              },
            }
          : {
              title: 'Đặt lại mật khẩu',
              content: (
                <>
                  <div className='note p-2.5 text-left text-sm'>
                    <p className='text-justify font-light'>Thay đổi mật khẩu thành công. Nhấn xác nhận để quay lại trang đăng nhập!</p>
                  </div>
                </>
              ),
              confirmBtns: {
                continueBtn: {
                  btnName: 'Xác nhận',
                  onClick: () => {
                    navigate('/login');
                  }
                },
              },
            };

  const forgotData = useAuthHook(forgotHook);

  return (
    <>
      <Header />

      {forgotData.renderData()}

      <Footer />
    </>
  );
};

export default ForgotPassword;
