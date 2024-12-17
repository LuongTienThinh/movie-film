import { ListFilter, SubHeader, SideBar } from 'components';
import { IDataHook } from 'interfaces';
import './index.scss';
import { useEffect } from 'react';

const useDataHook = ({ title, subHeader, filters, sideBar, pagination: Pagination }: IDataHook) => {
  const onChange = () => {

  };

  const renderData = () => {
    return (
      <>
        {title && <h1 className='mb-[30px] text-2xl font-bold uppercase'>{title}</h1>}
        {subHeader && <SubHeader {...subHeader} />}
        {filters && <ListFilter></ListFilter>}
        {sideBar && <SideBar {...sideBar} />}
        {Pagination && Pagination}
      </>
    );
  };

  return {
    onChange,
    renderData,
  };
};

export default useDataHook;
