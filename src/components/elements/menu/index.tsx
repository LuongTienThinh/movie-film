import { RefObject, useContext, useEffect, useRef, useState } from 'react';

import { ThemeContext } from 'contexts/themeContext';
import { IMenuBar } from 'interfaces';
import './index.scss';

const MenuBar = ({ className, ...props }: IMenuBar) => {
  const themeMode = useContext(ThemeContext);

  return (
    <>
      <label className={`menu-bar menu-bar-${themeMode.theme} ${className}`} htmlFor='menu-bar' {...props}>
        <span></span>
        <span></span>
        <span></span>
      </label>
    </>
  );
};

export default MenuBar;
