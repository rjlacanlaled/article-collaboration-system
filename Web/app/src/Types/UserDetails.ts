export type UserDetail = {
  roles: string[];
  user: User;
};

export type User = {
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  date: any;
};
