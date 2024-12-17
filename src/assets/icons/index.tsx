import DarkIcons from './dark';
import LightIcons from './light';
import { IIcon } from 'interfaces';

const Icons = ({ themeMode, fill = 'currentColor', iconName, ...props }: IIcon) => {
  switch (themeMode) {
    case 'dark':
      return <DarkIcons iconName={iconName} fill={fill} {...props} />;
  
    default:
      return <LightIcons iconName={iconName} fill={fill} {...props} />;
  }
}

export default Icons;