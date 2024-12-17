import { ReactNode, ComponentType, ReactElement } from 'react';
import Slider from 'react-slick';

export interface ILazyComponent {
  title?: string;
  component: ComponentType<any>;
}

export interface IRouterLink {
  [key: string]: string;
}

export interface IComponentProps {
  children: ReactNode;
}

export interface IAssetImage {
  [key: string]: string;
}

export interface ITabSetting {
  iconName?: string | undefined;
  title?: string | undefined;
  content?: {
    left?: ReactElement<any, any> | undefined;
    right?: ReactElement<any, any> | undefined;
    leftWidth?: Number | undefined;
    rightWidth?: Number | undefined;
    submitBtn?: IButton;
  };
  onClick?: () => void;
}

export interface IIcon {
  themeMode: string;
  iconName: string;
  className?: string;
  fill?: string;
  stroke?: string;
}

export interface IThemeIcon {
  [key: string]: any;
}

export interface IThemeContext {
  theme: string;
  toggleTheme: (newTheme: string) => void;
}

export interface IAuthContext {
  user: {
    id?: Number | undefined;
    email?: string | undefined;
    name?: string | undefined;
    avatar?: string | undefined;
    gender?: boolean;
    phone?: string | undefined;
    [key: string]: any;
  };
  setUser: (user: Object) => void;
  isAuth: boolean;
  accessToken: string;
  setIsAuth: (newState: boolean) => void;
  setAccessToken: (newValue: string) => void;
}

export type SliderType = typeof Slider;

export interface IEpisode {
  title?: string;
  name?: string;
  slug?: string;
  link?: string;
}

export interface IFilm {
  label: string;
  name: string;
  thumbnail_url: string;
  poster_url: string;
  genres: Array<any>;
  countries: Array<any>;
  episodes: Array<IEpisode>;
  is_view?: Boolean;
  is_follow?: Boolean;
  [key: string]: any;
}

export interface IRanking {
  listFilm?: Array<IFilm>;
}

export interface ITopFilm extends IFilm {
  rank: number | undefined;
}

export interface IListFilter {
  [key: string]: IFilter;
}

export interface IFilter {
  options?: Array<{
    name: string;
    slug: string;
    [key: string]: any;
  }>;
  title?: string;
  [key: string]: any;
}

export interface ISideBarItem {
  header?: IHeader | undefined;
  width?: number | undefined;
  content?: ReactElement<any, any> | undefined;
}

export interface ISideBar {
  leftSide?: ISideBarItem | undefined;
  rightSide?: ISideBarItem | undefined;
}

export interface IHeader {
  title?: string | undefined;
  btnMore?: boolean | undefined;
  titleWidth?: number | undefined;
  btnMoreWidth?: number | undefined;
  linkTo?: string | undefined;
}

export interface IPageManage {
  page: number | 1;
  perPage?: number | 0;
}

export interface IPagination {
  perPage?: number | undefined;
  pageIndex?: number | undefined;
  showGoToFirst?: boolean | undefined;
  showGoToLast?: boolean | undefined;
  showPrev?: boolean | undefined;
  showNext?: boolean | undefined;
  totalItem?: number | undefined;
  sibling?: number | undefined;
  onChange?: (page: number) => void;
}

export interface IDataHook {
  title?: string | undefined;
  subHeader?: IHeader | undefined;
  filters?: boolean | undefined;
  sideBar?: ISideBar | undefined;
  pagination?: ReactElement<any, any> | undefined;
}

export interface IButton {
  leftIcon?: ReactElement<any, any> | undefined;
  btnName?: string | undefined;
  rightIcon?: ReactElement<any, any> | undefined;
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: string | undefined;
  onClick?: () => void;
  [key: string]: any;
}

export interface IAnchor {
  anchorName?: string | undefined;
  linkTo?: string | undefined;
  className?: string | undefined;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  [key: string]: any;
}

export interface IInput {
  placeholder?: string | 'Nhập giá trị';
  className?: string | undefined;
  type: string | undefined;
  label?: string | undefined;
  name: string | undefined;
  value?: string | undefined;
  rules?: string | undefined;
  formatted?: boolean | undefined;
  checked?: boolean | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export interface IAuthHook {
  title?: string | undefined;
  content?: ReactElement<any, any> | undefined;
  otherBtns?: ReactElement<any, any> | undefined;
  confirmBtns?:
    | {
        cancelBtn?: IButton;
        continueBtn?: IButton;
      }
    | undefined;
}

export interface IResponseData {
  data: any;
  message?: string | undefined;
  status?: Number;
}

export interface IApiResponseData {
  data: IResponseData | null;
}

export interface IPageContent {
  title?: string | undefined;
  getData?: (params?: Object, slug?: string, userId?: Number) => Promise<IResponseData>;
  subData?: Array<IPageContent>
}

export interface IPage {
  [key: string]: IPageContent;
}

export interface IPopup {
  title?: string | undefined;
  message?: string | undefined;
  navigateTo?: string | undefined;
  closeBtnTitle?: string | undefined;
}

export interface IPopupRef {
  openModal: () => void;
}

export interface INavSearch {
  onToggleSearch?: (isOpen: boolean) => void;
  [key: string]: any;
}

export interface IMenuBar {
  open?: boolean;
  onMenuClick?: () => void;
  [key: string]: any;
}

export interface IGenre {
  id?: number;
  name?: string;
  slug?: string;
}

export interface ICountry {
  id?: number;
  name?: string;
  slug?: string;
}
