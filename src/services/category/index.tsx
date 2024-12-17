import axios from 'axios';
import { routerApisLink } from 'utils';
import { IApiResponseData } from 'interfaces';

const CategoryService = {
  nameLink: 'Category',

  getAllCategories: async (category: string) => {
    try {
      let data: IApiResponseData = {
        data: null,
      };

      data = await axios.get(`${routerApisLink(CategoryService.nameLink)}/${category}`);

      return data?.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error?.response?.data || null;
      }

      console.log('An error occurred:', error);

      return null;
    }
  },

  getDetailCategory: async (category: string, slug: string) => {
    try {
      let data: IApiResponseData = {
        data: null,
      };

      data = await axios.get(`${routerApisLink(CategoryService.nameLink)}/${category}/${slug}`);

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

export default CategoryService;
