import { ChangeEvent, MouseEvent } from 'react';
import Responsive from '../../components/common/Responsive';

type UsersViewProps = {
  users: User[];
  updateRole: (e: ChangeEvent<HTMLSelectElement>) => void;
  deleteUser: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function UsersView({
  users,
  updateRole,
  deleteUser,
}: UsersViewProps) {
  return (
    <Responsive>
      <h1>유저 리스트</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>nickname</th>
            <th>role</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u, i) => (
            <tr key={i}>
              <td>{u?.accountId}</td>
              <td>{u?.nickname}</td>
              <td>
                <select
                  name={u?.accountId}
                  onChange={updateRole}
                  defaultValue={u?.role}
                >
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </td>
              <td>
                <button name={u?.accountId} onClick={deleteUser}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Responsive>
  );
}
