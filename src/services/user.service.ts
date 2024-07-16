import { IUser, IAddUserdata, IUpdateUser } from '@/types';
import { axiosClient } from '@/utils';

export const userApi = {

  getUsers: (): Promise<IUser[]> => {
    return axiosClient.get(`/getUsers`);
  },

  addUser: (payload: IAddUserdata): Promise<IAddUserdata> => {
    return axiosClient.post(`/user`, payload);
  },

  updateUser: (payload: IUpdateUser): Promise<IUser> => {
    return axiosClient.put(`/user`, payload);
  }

};