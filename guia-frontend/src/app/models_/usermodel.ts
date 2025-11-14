export interface UserModel {
  id: string;
  email: string;
  name: string;
  password: string;
  type: string;
  photo?: File | string; // 👈 puede ser un archivo o el nombre/URL
  role:string;
  city?:string;
}
export interface UserCredentials {
    email: string;
    password: string;
}
