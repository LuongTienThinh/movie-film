import { useContext, useEffect, useState } from 'react';

import { ITab, ITabList } from 'interfaces';
import { useViewport } from 'hooks';
import Icons from 'assets/icons';
import { ThemeContext } from 'contexts/themeContext';
import { Link } from 'react-router-dom';
import Button from 'components/elements/button';

const TabList = ({ tabData, itemPerTab, onChange }: ITabList) => {
  const themeMode = useContext(ThemeContext);

  const firstTab = 1;
  const lastTab = (tabData?.data.length && itemPerTab && Math.ceil(tabData?.data.length / itemPerTab)) || firstTab;

  const [listTab, setListTab] = useState<Array<ITab>>([]);

  useEffect(() => {
    if (tabData.data.length <= itemPerTab) {
      setListTab([{ tabName: `1 - ${tabData?.data.length}` }]);
    } else {
      const data = [];

      for (let index = firstTab; index <= lastTab; index++) {
        data[index] = {
          tabName: `${itemPerTab * (index - 1) + 1} - ${Math.min(itemPerTab * index, tabData.data.length)}`,
        }
      }

      setListTab(data);
    }
  }, []);

  return (
    <>
      {listTab && listTab.length > 0 && (
        <ul className='flex flex-wrap justify-center mb-4 gap-x-[2%] gap-y-2.5 sm:gap-x-[1%]'>
          {listTab.map((tab) => (
            <li className='w-auto' key={tab.tabName}>
              <Button
                className={`text-center block rounded-p2 bg-[#03AE00] px-4 py-1.5 font-medium !leading-standard text-[#ffffff] max-lg:text-xs lg:text-sm xl:text-base`}
              >
                {tab.tabName}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TabList;
