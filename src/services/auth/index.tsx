import axios from 'axios';
import { routerApisLink } from 'utils';
import { IApiResponseData } from 'interfaces';

const AuthService = {
  nameLink: 'Auth',

  login: async (params: Object) => {
    try {
      let data: IApiResponseData = {
        data: null,
      };

      await axios
        .get('/sanctum/csrf-cookie', {
          withCredentials: true,
        })
        .then(async (res) => {
          data = await axios.post(`${routerApisLink(AuthService.nameLink)}/login`, { ...params });
        });

      return data?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error?.response?.data || null;
      }

      console.log('An error occurred:', error);

      return null;
    }
  },

  signUp: async (params: Object) => {
    try {
      const data: IApiResponseData = await axios.post(`${routerApisLink(AuthService.nameLink)}/sign-up`, { ...params });

      return data?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error?.response?.data || null;
      }

      console.log('An error occurred:', error);

      return null;
    }
  },

  logout: async () => {
    try {
      const data: IApiResponseData = await axios.post(`${routerApisLink(AuthService.nameLink)}/logout`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token') || ''}`,
        },
      });

      if (data?.data?.status == 200) {
        localStorage.removeItem('access-token');
      }

      return data?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error?.response?.data || null;
      }

      console.log('An error occurred:', error);

      return null;
    }
  },
};

export default AuthService;
