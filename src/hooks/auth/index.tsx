import { useContext } from 'react';

import { IAuthHook } from 'interfaces';
import { ThemeContext } from 'contexts/themeContext';
import Button from 'components/elements/button';
import './index.scss';

const useAuthHook = ({ title, content: Content, otherBtns: OtherBtns, confirmBtns }: IAuthHook) => {
  const themeMode = useContext(ThemeContext);

  const renderData = () => {
    return (
      <>
        <section className={`auth auth-${themeMode.theme} min-h-fvh py-20`}>
          <div className='container'>
            <div className='auth-area mx-auto w-full rounded-[20px] px-p6 py-5 text-center sm:w-[550px] sm:px-[75px]'>
              <div className='space-y-p5'>
                <h1 className='text-3xl font-bold'>{title}</h1>
                {Content && <div className='content'>{Content}</div>}
                {OtherBtns && (
                  <>
                    <hr className='h-[1px] border-0' />
                    <div className='btn-area'>{OtherBtns}</div>
                  </>
                )}
                {confirmBtns && (
                  <>
                    <div className='confirm-btns flex justify-end gap-x-2.5'>
                      {confirmBtns.cancelBtn && <Button className='cancel-btn px-4 py-2' {...confirmBtns.cancelBtn} />}
                      {confirmBtns.continueBtn && <Button className='continue-btn px-4 py-2' {...confirmBtns.continueBtn} />}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return {
    renderData,
  };
};

export default useAuthHook;
