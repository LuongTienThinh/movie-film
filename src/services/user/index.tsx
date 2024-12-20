import axios from 'axios';
import { routerApisLink } from 'utils';
import { IApiResponseData } from 'interfaces';
import Method from 'services/method';

const UserService = {
  nameLink: 'User',

  getUserTheme: async () => await Method.get(UserService.nameLink, '/theme', undefined, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access-token') || ''}`,
    },
  }),

  putUserTheme: async (theme: string) => {
    try {
      const data: IApiResponseData = await axios.put(`${routerApisLink(UserService.nameLink)}/update-theme`, { theme_mode: theme }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token') || ''}`,
        },
      });

      return data?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error?.response?.data || null;
      }

      console.log('An error occurred:', error);

      return null;
    }
  }
};

export default UserService;
