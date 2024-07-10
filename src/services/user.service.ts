import { IUser } from '@/types';
import { axiosClient } from '@/utils';

export const userApi = {

  getUsers: (): Promise<IUser[]> => {
    return axiosClient.get(`/getUsers`);
  },

  addUser: (payload: IUser): Promise<IUser> => {
    return axiosClient.post(`/user`, payload);
  },

};