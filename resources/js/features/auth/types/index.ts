import { ReactNode } from "react";

export interface Props {
  children?: ReactNode
}

export interface AuthUser {
  id? : string;
  email: string;
  name: string;
  authenticated : boolean;
};

export type UserResponse = {
  accessToken : string;
  user : AuthUser;
};
