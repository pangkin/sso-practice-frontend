import client from './client';

export const getUsers = () => {
  return client.get('/api/admin/users');
};

export const changeRole = (id: string, role: string) => {
  return client.patch('/api/admin/users', { id, role });
};

export const deleteUser = (id: string) => {
  return client.delete(`/api/admin/users/${id}`);
};
