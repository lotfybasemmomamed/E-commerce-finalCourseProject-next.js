/*eslint-disable */
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User["user"]

 
}
  interface User  {
     token: string;
    user: {
      role?: string;
      name:string;
      email:string;
  }
}


}
declare module "next-auth/jwt" {
  interface JWT extends User {
    
  }
}