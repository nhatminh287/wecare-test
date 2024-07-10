import { columns } from "@/components/DataTable/Column"
import { IUser } from "@/types"
import { DataTable } from "@/components"
import { useState, useEffect } from 'react';
import { userApi } from "@/services";

const data : IUser[] = [
  {
    email: 'example@gmail.com',
    phone: '099837473643',
    firstName: 'John',
    lastName: 'Smith',
    role: 'Admin'
  },
  {
    email: 'example@gmail.com',
    phone: '099837473643',
    firstName: 'John',
    lastName: 'Smith',
    role: 'User'
  },
  {
    email: 'example@gmail.com',
    phone: '099837473643',
    firstName: 'John',
    lastName: 'Smith',
    role: 'Editor'
  },
  {
    email: 'example@gmail.com',
    phone: '099837473643',
    firstName: 'John',
    lastName: 'Smith',
    role: 'User'
  },
  {
    email: 'example@gmail.com',
    phone: '099837473643',
    firstName: 'John',
    lastName: 'Smith',
    role: 'User'
  },
  {
    email: 'example@gmail.com',
    phone: '099837473643',
    firstName: 'John',
    lastName: 'Smith',
    role: 'User'
  },
  
]
const UserInfo = () => {
  const [userdata, setUserdata] = useState<IUser[]>();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await userApi.getUsers();
    if (res) {
      console.log(res);
      
      setUserdata(res);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={userdata? userdata: data} />
    </div>
  )
}
 
export default UserInfo;