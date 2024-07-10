export interface IUser {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: "Admin" | "User" | "Editor";
}