import { useContext, useEffect, useState } from 'react';

import Icons from 'assets/icons';
import { IFilter, IListFilter, IListFilterOption, IResponseData } from 'interfaces';
import { ThemeContext } from 'contexts/themeContext';
import { CategoryService } from 'services';
import { useSearchParams } from 'react-router-dom';

const Filter = ({ name, title, options, ...props }: IFilter) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const themeMode = useContext(ThemeContext);

  return (
    <>
      {options && (
        <>
          {title && <div className='title'>{title}:</div>}
          <div className='filter-wrapper'>
            <select {...props} onChange={(e) => setSearchParams((prev) => ({ ...prev, [name]: e.target.value }))}>
              {options.map((filterItem, index) => (
                <option key={index} value={filterItem.slug}>
                  {filterItem.name}
                </option>
              ))}
            </select>
            <Icons className='icon absolute right-p2 top-1/2 -translate-y-1/2' themeMode={themeMode.theme} iconName={'chevron-down'} />
          </div>
        </>
      )}
    </>
  );
};

const ListFilter = ({ showType = false, showGenre = false, showCountry = false, showYear = false }: IListFilterOption) => {
  const initialFilter: Partial<IListFilter> = {};
  
  if (showType) {
    initialFilter.type = {
      title: 'Loại phim',
      options: [],
    };
  }
  if (showGenre) {
    initialFilter.genre = {
      title: 'Thể loại',
      options: [],
    };
  }
  if (showCountry) {
    initialFilter.country = {
      title: 'Quốc gia',
      options: [],
    };
  }
  if (showYear) {
    initialFilter.year = {
      title: 'Năm',
      options: [],
    };
  }

  const [listFilter, setListFilter] = useState<IListFilter>(initialFilter as IListFilter);

  useEffect(() => {
    const getTypes = async () => {
      const response: IResponseData | null = await CategoryService.getAllCategories('genres');

      if (response) {
        setListFilter((prev) => ({ 
          ...prev,
          type: {
            ...prev.type,
            options: response.data
          }
        }));
      }
    };

    const getGenres = async () => {
      const response: IResponseData | null = await CategoryService.getAllCategories('genres');

      if (response) {
        setListFilter((prev) => ({ 
          ...prev,
          genre: {
            ...prev.genre,
            options: response.data
          }
        }));
      }
    };

    const getCountries = async () => {
      const response: IResponseData | null = await CategoryService.getAllCategories('countries');

      if (response) {
        setListFilter((prev) => ({ 
          ...prev,
          country: {
            ...prev.country,
            options: response.data
          }
        }));
      }
    };

    const getYears = async () => {
      const response: IResponseData | null = await CategoryService.getAllCategories('genres');

      if (response) {
        setListFilter((prev) => ({ 
          ...prev,
          year: {
            ...prev.year,
            options: response.data
          }
        }));
      }
    };

    getTypes();
    getGenres();
    getCountries();
    getYears();
  }, []);

  return (
    <>
      {listFilter && (
        <ul className={`list-filter flex items-end justify-between max-lg:flex-wrap`}>
          {Object.keys(listFilter).map((key, index) => {
            return (
              <li key={index} className='filter-item w-[47.5%] sm:w-3/10 lg:w-1/5'>
                <Filter name={key} title={listFilter[key].title} options={listFilter[key].options} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ListFilter;
