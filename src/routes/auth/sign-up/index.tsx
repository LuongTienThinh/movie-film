import { FormEvent, RefObject, useRef, useState } from 'react';

import useAuthHook from 'hooks/auth';
import { IAuthHook, IPopup, IPopupRef, IResponseData } from 'interfaces';
import { Footer, Header } from 'layouts';
import { Anchor, Button, Input, Popup } from 'components';
import { AuthService } from 'services';

const SignUp = () => {

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

    rePassword: {
      value: '',
      formatted: false,
      rules: 'Không trùng mật khẩu',
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    let checkSubmit = true;

    Object.keys(formData).forEach((field) => {
      const value = formData[field as keyof typeof formData];
      if (!value.formatted) {
        event.preventDefault();
        checkSubmit = false;
      }
    });

    if (checkSubmit) {
      event.preventDefault();

      const response: IResponseData | null = await AuthService.signUp({
        email: formData.email.value,
        password: formData.password.value,
      });

      if (response) {
        const { status, message } = response;

        setPopupData((prev) => ({
          ...prev,
          title: status === 200 ? 'Thông báo' : 'Lỗi đăng ký',
          message: message,
          navigateTo:  status === 200 ? '/login' : '',
        }));

        popupRef.current && popupRef.current.openModal();
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

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
    } else if (name === 'rePassword') {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: {
            ...prev[name],
            value,
            formatted: prev['password'].value === value,
          },
        };
      });
    }
  };

  const signUpHook: IAuthHook = {
    title: 'ĐĂNG KÝ',
    content: (
      <>
        <form onSubmit={handleSubmit} className='space-y-2'>
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
          <Input
            type='password'
            name='rePassword'
            placeholder='Nhập lại mật khẩu'
            formatted={formData.rePassword.formatted}
            rules={formData.rePassword.rules}
            value={formData.rePassword.value}
            required
            onChange={handleInputChange}
          />
          <Button className='w-full bg-green !py-3' type='submit' btnName='Tạo tài khoản' />
        </form>
      </>
    ),
    otherBtns: <Anchor className='mx-auto w-full bg-red !py-3' linkTo='/login' anchorName={'Đăng nhập'} />,
  };

  const signUpData = useAuthHook(signUpHook);

  return (
    <>
      <Header />

      {signUpData.renderData()}
      {popupData && <Popup {...popupData} ref={popupRef} />}

      <Footer />
    </>
  );
};

export default SignUp;
