import { useRouter } from 'next/router';
import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react';

import * as adminApi from '../../lib/api/admin';
import userContext from '../../contexts/userContext';
import UsersView from '../../views/admin/UsersView';

export default function UsersController() {
  const router = useRouter();
  const { user, isLoad } = useContext(userContext);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await adminApi.getUsers();
      setUsers(response.data);
    } catch (e) {
      router.push('/');
      return;
    }
  };

  const updateRole = async (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.name;
    const role = e.target.value;
    try {
      await adminApi.changeRole(id, role);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as EventTarget & HTMLButtonElement;
    const id = target.name;
    try {
      await adminApi.deleteUser(id);
      await getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.role !== 'admin' && !isLoad) {
      router.push('/');
    }
    getUsers();
  }, [user, isLoad]);

  if (users === null) return null;
  return (
    <UsersView users={users} updateRole={updateRole} deleteUser={deleteUser} />
  );
}