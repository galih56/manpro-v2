export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role : string
};

export type UserResponse = {
  accessToken : string;
  user : AuthUser;
};
