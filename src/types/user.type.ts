export interface IUser {
    id: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    role: "Admin" | "User" | "Editor";
    image: string;
}

export interface IAddUserdata {
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    image: string;
  }

  export interface IUpdateUser {
    id: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    image: string;
  }