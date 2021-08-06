import { createContext, Dispatch, SetStateAction } from 'react';

type UserContext = {
  user: User;
  setUser: (value: User) => void;
  isLoad: false;
  setIsLoad: (value: boolean) => void;
};

const userContext = createContext<UserContext>({
  user: null,
  setUser: (value) => {},
  isLoad: false,
  setIsLoad: (value) => {},
});

export default userContext;
