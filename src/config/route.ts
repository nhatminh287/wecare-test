import { DefaultLayout } from '@/layouts';
import {
  UserInfo,
} from '@/pages';

export const PATHS = {
  HOME: '/',
  USERINFO: '/userinfo',
};

export const ROUTES = [
  
  {
    path: PATHS.HOME,
    title: 'User Info',
    layout: DefaultLayout,
    element: UserInfo,
    children: [],
  },
  {
    path: PATHS.USERINFO,
    title: 'User Info',
    layout: DefaultLayout,
    element: UserInfo,
    children: [],
  },
  
]