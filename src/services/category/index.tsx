import axios from 'axios';
import { routerApisLink } from 'utils';
import { IApiResponseData } from 'interfaces';

import Method from 'services/method';

const CategoryService = {
  nameLink: 'Category',

  getDetailCategory: async (category: string, slug: string) => await Method.get(CategoryService.nameLink, `/${category}/${slug}`),
  getAllCategories: async (category: string) => await Method.get(CategoryService.nameLink, `/${category}`),
};

export default CategoryService;
