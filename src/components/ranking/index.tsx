import { useContext } from 'react';
import { Tab } from '@headlessui/react';

import Icons from 'assets/icons';
import { ThemeContext } from 'contexts/themeContext';
import { images } from 'images';
import { IFilm, IRanking } from 'interfaces';
import './index.scss';

const tabs = ['Top ngày', 'Top tuần', 'Top tháng'];

const Ranking = ({ listFilm }: IRanking) => {
  const themeMode = useContext(ThemeContext);
  const films: Array<Array<IFilm | undefined> | undefined> = tabs.map((e, i) => (i % 2 === 0 ? listFilm && [...listFilm] : listFilm && [...listFilm]?.reverse()));

  return (
    <>
      <div className={`ranking ranking-${themeMode.theme} w-full max-w-md px-2 sm:px-0`}>
        <Tab.Group>
          <Tab.List className='flex overflow-hidden rounded-t-xl text-lg font-semibold'>
            {tabs &&
              tabs.map((tab, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    selected ? 'tab selected w-full border-t-4 py-2.5 pt-1.5 font-medium shadow outline-none' : 'tab w-full py-2.5 font-medium outline-none'
                  }
                >
                  {tab}
                </Tab>
              ))}
          </Tab.List>
          <Tab.Panels>
            {films &&
              films.map((film, idx) => (
                <Tab.Panel key={idx} className='tab-panel rounded-b-xl'>
                  <ul>
                    {film &&
                      film.map((e, i) => (
                        <div key={i}>
                          {e && (
                            <li className='rank-item relative flex items-center justify-center p-2'>
                              <div
                                className='w-1/5 text-center text-4xl font-extrabold leading-none'
                                style={{ color: i + 1 === 1 ? '#F12828' : i + 1 === 2 ? '#26BE0D' : i + 1 === 3 ? '#0A85DD' : 'inherit' }}
                              >
                                {i + 1}
                              </div>
                              <div className='flex h-12 w-4/5 items-center justify-between'>
                                <img className='h-full w-12 rounded-p1 object-cover object-center' src={e.poster_url} alt='' />
                                <div className='flex h-full w-[75%] flex-col justify-between'>
                                  <span className='text-[13px] font-extrabold max-sm:leading-none'>{e.name}</span>
                                  <div className='common-flex-box'>
                                    <span className='text-[10px] font-semibold'>{e.year}</span>
                                    <div className='flex min-w-[25%] items-center text-[8px] italic'>
                                      <Icons className='me-1 h-2.5 w-2.5 icon' themeMode={themeMode.theme} iconName={'view'} />
                                      <span>15.314k</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )}
                        </div>
                      ))}
                  </ul>
                </Tab.Panel>
              ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default Ranking;
