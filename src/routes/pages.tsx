import { lazy } from 'react';
import { routerLink } from 'utils';

export const pages = [
  {
    path: routerLink('HomePage'),
    component: lazy(() => import('./pages/home')),
    title: 'Home page',
  },
  {
    path: routerLink('GenrePage'),
    component: lazy(() => import('./pages/search-page')),
    title: 'Genre page',
  },
  {
    path: routerLink('SearchPage'),
    component: lazy(() => import('./pages/search-page')),
    title: 'Search page',
  },
  {
    path: routerLink('FilmDetail'),
    component: lazy(() => import('./pages/film-detail')),
    title: 'Detail page',
  },
  {
    path: routerLink('Episode'),
    component: lazy(() => import('./pages/episode')),
    title: 'Episode page',
  },
  {
    path: routerLink('Login'),
    component: lazy(() => import('./auth/login')),
    title: 'Login page',
  },
  {
    path: routerLink('SignUp'),
    component: lazy(() => import('./auth/sign-up')),
    title: 'Sign up page',
  },
  {
    path: routerLink('ForgotPassword'),
    component: lazy(() => import('./auth/forgot-password')),
    title: 'Forgot password page',
  },
  {
    path: routerLink('Profile'),
    component: lazy(() => import('./pages/profile')),
    title: 'Profile page',
  },
  {
    path: routerLink('Wishlist'),
    component: lazy(() => import('./pages/wishlist')),
    title: 'Wishlist page',
  },
];
