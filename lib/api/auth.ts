import client from './client';

export const login = (code: string) => {
  return client.get(`/api/auth/login?code=${code}`);
};

export const signup = (username: string, password: string) => {
  return client.post('/api/auth/signup', {
    username,
    password,
  });
};

export const token = () => {
  return client.post('/api/auth/token');
};

export const logout = () => {
  return client.post('/api/auth/logout');
};
