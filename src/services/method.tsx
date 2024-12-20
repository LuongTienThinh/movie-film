import axios from 'axios';
import { routerApisLink } from 'utils';
import { IApiResponseData } from 'interfaces';

const Method = {
  get: async (nameLink: string, url: string, params?: Object, body?: Object) => {    
    try {
      let data: IApiResponseData = {
        data: null,
      };

      if (params) {
        data = await axios.get(`${routerApisLink(nameLink)}${url}`, {
          params: params,
        });
      } else if (body) {
        data = await axios.get(`${routerApisLink(nameLink)}${url}`, body);
      } else {
        data = await axios.get(`${routerApisLink(nameLink)}${url}`);
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

  put: async (nameLink: string, url: string, params?: Object) => {
    try {
      let data: IApiResponseData = {
        data: null,
      };

      if (params) {
        data = await axios.put(`${routerApisLink(nameLink)}${url}`, params);
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

export default Method;