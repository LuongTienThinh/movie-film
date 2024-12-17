import { FormEvent, RefObject, useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Footer, Header } from 'layouts';
import { useAuthHook, useViewport } from 'hooks';
import { IAuthHook, IPopup, IPopupRef, IResponseData } from 'interfaces';
import Icons from 'assets/icons';
import { ThemeContext } from 'contexts/themeContext';
import { AuthContext } from 'contexts/authContext';
import { Anchor, Button, Input, Popup } from 'components';
import { AuthService } from 'services';

const Login = () => {
  const themeMode = useContext(ThemeContext);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { width: viewWidth, breakPoint } = useViewport();

  const popupRef: RefObject<IPopupRef> = useRef(null);
  const [popupData, setPopupData] = useState<IPopup>({});

  const [formData, setFormData] = useState({
    email: {
      value: '',
      formatter: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g,
      formatted: false,
      rules: 'Không đúng định dạng email',
    },

    password: {
      value: '',
      formatter: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#_?&])[A-Za-z\d@$!%*#_?&]{8,}$/g,
      formatted: false,
      rules: 'Mật khẩu có ít nhất 8 ký tự bao gồm chữ hoa, số và ký tự đặc biệt',
    },

    remember: {
      formatted: null,
      value: false,
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    let checkSubmit = true;

    Object.keys(formData).forEach((field) => {
      const value = formData[field as keyof typeof formData];
      if (field !== 'remember') {
        if (!value.formatted) {
          event.preventDefault();
          checkSubmit = false;
        }
      }
    });

    if (checkSubmit) {
      event.preventDefault();

      const response: IResponseData = await AuthService.login({
        email: formData.email.value,
        password: formData.password.value,
        remember: formData.remember.value,
      });

      if (response) {
        const { data, status, message } = response;

        if (status === 200) {
          if (data) {
            data.token && localStorage.setItem('access-token', data.token);
          }

          auth.setIsAuth(true);
          navigate('/');
        }

        setPopupData((prev) => ({
          ...prev,
          title: status === 200 ? 'Thông báo' : 'Lỗi đăng nhập',
          message: message,
        }));

        popupRef.current && popupRef.current.openModal();
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    if (name === 'email' || name === 'password') {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: {
            ...prev[name],
            value,
            formatted: !!value.match(prev[name].formatter),
          },
        };
      });
    } else if (name === 'remember') {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: {
            formatted: null,
            value: checked,
          },
        };
      });
    }
  };

  const loginHook: IAuthHook = {
    title: 'ĐĂNG NHẬP',
    content: (
      <div className='space-y-p5'>
        <div className='flex items-center justify-between sm:block sm:space-y-p2 gap-5'>
          <Button
            className='w-full bg-blue-light'
            leftIcon={<Icons className='icon' themeMode={themeMode.theme} iconName={'facebook'} />}
            btnName={viewWidth >= breakPoint.sm ? 'Đăng nhập bằng tài khoản Facebook' : 'Facebook'}
          />
          <Button
            className='w-full bg-red-light'
            leftIcon={<Icons className='icon' themeMode={themeMode.theme} iconName={'google'} />}
            btnName={viewWidth >= breakPoint.sm ? 'Đăng nhập bằng tài khoản Gmail' : 'Gmail'}
          />
        </div>
        <div className='text-xl font-bold uppercase'>Hoặc</div>
        <form onSubmit={handleSubmit} className='space-y-p2'>
          <Input
            type='text'
            name='email'
            placeholder='Email hoặc số điện thoại'
            formatted={formData.email.formatted}
            rules={formData.email.rules}
            value={formData.email.value}
            required
            onChange={handleInputChange}
          />
          <Input
            type='password'
            name='password'
            placeholder='Mật khẩu'
            formatted={formData.password.formatted}
            rules={formData.password.rules}
            value={formData.password.value}
            required
            onChange={handleInputChange}
          />
          <Button className='w-full bg-red !py-3' type='submit' btnName='Đăng nhập' />
          <div className='common-flex-box mt-2.5 text-base'>
            <div className='save'>
              <Input type='checkbox' id='remember' name='remember' label='Ghi nhớ mật khẩu' checked={formData.remember.value} onChange={handleInputChange} />
            </div>
            <Link to={'/forgot-password?step=1'} className='forgot font-semibold text-blue max-sm:text-xs'>
              Quên mật khẩu ?
            </Link>
          </div>
        </form>
      </div>
    ),
    otherBtns: <Anchor className='mx-auto w-1/2 bg-green py-3' linkTo='/sign-up' anchorName={'Đăng ký'} />,
  };

  const loginData = useAuthHook(loginHook);

  return (
    <>
      <Header />

      {loginData.renderData()}

      {popupData && <Popup {...popupData} ref={popupRef} />}

      <Footer />
    </>
  );
};

export default Login;
