export type AuthUser = {
  id: string;
  email: string;
  name: string;
  authenticated : boolean;
};

export type UserResponse = {
  accessToken : string;
  user : AuthUser;
};
