import { IRouterLink } from 'interfaces';

const RouterApisLink = (name: string): string | undefined => {
  const apisLink: IRouterLink = {
    Auth: 'auth',
    User: 'user',
    Film: 'film',
    Genre: 'genre',
    Country: 'country',
    Category: 'category',
  };

  return `api/${apisLink[name]}`;
};

export default RouterApisLink;
