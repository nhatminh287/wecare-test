import { DefaultLayout } from '@/layouts';
import {
  UserInfo
} from '@/pages';

export const PATHS = {
  HOME: '/',
  USERINFO: '/userinfo',
  
};

export const ROUTES = [
  
  {
    path: PATHS.USERINFO,
    title: 'Nearby cities recommendation',
    layout: DefaultLayout,
    element: UserInfo,
    children: [],
  },
  
]