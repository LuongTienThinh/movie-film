import { Dialog, Transition } from '@headlessui/react';
import { IPopup, IPopupRef } from 'interfaces';
import { Fragment, forwardRef, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Popup = forwardRef<IPopupRef>((props: IPopup, ref) => {
  const navigate = useNavigate();
  const { title, message, navigateTo, closeBtnTitle } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    navigateTo && navigate(navigateTo);
  };

  useImperativeHandle(ref, () => ({ openModal }));

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-[1000]' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-y-0 left-0 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-bold uppercase text-gray-900'>
                    {title}
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>{message}</p>
                  </div>
                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      {closeBtnTitle || 'Xác nhận'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});

export default Popup;
