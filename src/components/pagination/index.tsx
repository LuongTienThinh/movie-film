import { useContext, useState } from 'react';

import { IPagination } from 'interfaces';
import { useViewport } from 'hooks';
import Icons from 'assets/icons';
import { ThemeContext } from 'contexts/themeContext';

const Pagination = ({ pageIndex, perPage, totalItem, sibling = 1, showGoToFirst, showGoToLast, showNext, showPrev, onChange }: IPagination) => {
  const { width: viewWidth, breakPoint } = useViewport();
  const themeMode = useContext(ThemeContext);

  const firstPage = 1;
  const lastPage = (totalItem && perPage && Math.ceil(totalItem / perPage)) || firstPage;

  const [currentPage, setCurrentPage] = useState(pageIndex || 1);

  const inputPage = () => {};

  const DotsBtn = () => {
    return (
      <li className='item'>
        <button onClick={inputPage} style={{ minWidth: 28 }}>
          ...
        </button>
      </li>
    );
  };

  const generatePage = (pageIndex: number | undefined) => {
    if (pageIndex) {
      const listPage = [];
      if (lastPage - (sibling * 2 + 1) <= 4) {
        for (let index = firstPage; index <= lastPage; index++) {
          listPage.push(index);
        }
      } else {
        if (pageIndex <= sibling + 3) {
          for (let index = firstPage; index <= sibling * 2 + 3; index++) {
            listPage.push(index);
          }
          listPage.push(-1, lastPage);
        }

        if (pageIndex > sibling + 3) {
          listPage.push(firstPage, -1);

          if (pageIndex < lastPage - sibling - 2) {
            for (let index = pageIndex - sibling; index <= pageIndex + sibling; index++) {
              listPage.push(index);
            }

            listPage.push(-1, lastPage);
          } else {
            for (let index = lastPage - (sibling * 2 + 3 - 1); index <= lastPage; index++) {
              listPage.push(index);
            }
          }
        }
      }

      return listPage.map((page, i) => (
        <div key={i}>
          {page && (
            <>
              {page === -1 ? (
                <DotsBtn key={i} />
              ) : (
                <li className='item' key={i}>
                  <button className={page === currentPage ? 'active' : ''} onClick={() => onChangePage(page)}>
                    {page}
                  </button>
                </li>
              )}
            </>
          )}
        </div>
      ));
    }
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    onChange && onChange(page);
  };

  const showPagination = () => {
    return !!totalItem && !!perPage && !!(lastPage > firstPage);
  };

  return (
    <>
      {showPagination() && (
        <div className='mt-[30px] text-center'>
          <ul className='pagination flex items-center justify-center'>
            {showGoToFirst && (
              <li className='item'>
                <button className='max-sm:!border-0 max-sm:!p-0' onClick={() => onChangePage(firstPage)} disabled={currentPage === 1}>
                  {viewWidth >= breakPoint.sm ? 'Trang đầu' : ''}
                </button>
              </li>
            )}

            {showPrev && (
              <li className='item'>
                <button className='max-sm:!border-0 max-sm:!p-0' onClick={() => onChangePage(currentPage - 1)} disabled={currentPage === 1}>
                  {viewWidth >= breakPoint.sm ? 'Trang trước' : <Icons themeMode={themeMode.theme} iconName='btn-prev' className='icon' />}
                </button>
              </li>
            )}

            {currentPage && generatePage(currentPage)}

            {showNext && (
              <li className='item'>
                <button className='max-sm:!border-0 max-sm:!p-0' onClick={() => onChangePage(currentPage + 1)} disabled={currentPage === lastPage}>
                  {viewWidth >= breakPoint.sm ? 'Trang sau' : <Icons themeMode={themeMode.theme} iconName='btn-next' className='icon' />}
                </button>
              </li>
            )}

            {showGoToLast && (
              <li className='item'>
                <button className='max-sm:!border-0 max-sm:!p-0' onClick={() => onChangePage(lastPage)} disabled={currentPage === lastPage}>
                  {viewWidth >= breakPoint.sm ? 'Trang cuối' : ''}
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Pagination;
