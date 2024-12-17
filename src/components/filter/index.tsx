import { useContext, useEffect, useState } from 'react';

import Icons from 'assets/icons';
import { IFilter, IListFilter, IResponseData } from 'interfaces';
import { ThemeContext } from 'contexts/themeContext';
import { CategoryService } from 'services';

const Filter = ({ title, options, ...props }: IFilter) => {
  const themeMode = useContext(ThemeContext);

  return (
    <>
      {options && (
        <>
          {title && <div className='title'>{title}:</div>}
          <div className='filter-wrapper'>
            <select {...props}>
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

const ListFilter = () => {
  const [typeData, setTypeData] = useState<IFilter>({});
  const [genreData, setGenreData] = useState<IFilter>({});
  const [countryData, setCountryData] = useState<IFilter>({});
  const [yearData, setYearData] = useState<IFilter>({});
  const [numberEpisodeData, setNumberEpisodeData] = useState<IFilter>({});

  const listFilter: IListFilter = {
    type: {
      title: 'Loại phim',
      option: typeData,
    },
    genre: {
      title: 'Thể loại',
      option: genreData,
    },
    country: {
      title: 'Quốc gia',
      option: countryData,
    },
    year: {
      title: 'Năm',
      option: yearData,
    },
    numberEpisode: {
      title: 'Số tập',
      option: numberEpisodeData,
    },
  };

  useEffect(() => {
    const getTypes = async () => {
      const response: IResponseData | null = await CategoryService.getAllCategories('genres');

      if (response) {
        setTypeData(response.data);
        setCountryData(response.data);
        setGenreData(response.data);
        setNumberEpisodeData(response.data);
        setYearData(response.data);
      }
    };

    getTypes();
  }, []);

  useEffect(() => {
  }, [typeData]);
  return (
    <>
      {listFilter && (
        <ul className={`list-filter flex items-end justify-between max-lg:flex-wrap`}>
          {Object.keys(listFilter).map((key, index) => {
            return (
              <li key={index} className='filter-item w-[47.5%] sm:w-3/10 lg:w-1/5'>
                <Filter title={listFilter[key].title} options={listFilter[key].options} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ListFilter;
