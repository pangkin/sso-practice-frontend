import client from './client';

export const getMessages = () => {
  return client.get<Message[]>('/api/msg');
};

export const createMessage = (body: string, username: string) => {
  return client.post('/api/msg', { body, username });
};

export const deleteMessage = (_id: string) => {
  return client.delete(`/api/msg/${_id}`);
};
