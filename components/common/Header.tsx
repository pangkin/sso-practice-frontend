import Link from 'next/link';
import { useContext, MouseEvent } from 'react';
import userContext from '../../contexts/userContext';
import styles from './Header.module.scss';
import Button from './Button';
import Responsive from './Responsive';

export default function Header() {
  const { user, setUser } = useContext(userContext);
  const logout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setUser(null);
      localStorage.removeItem('user');
      const redirectUri =
        window.location.protocol + '//' + window.location.host;
      location.href = `/api/auth/logout?redirectUri=${redirectUri}`;
    } catch (e) {
      return;
    }
  };

  const login = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    location.href = '/api/auth/login';
  };

  return (
    <>
      <div className={styles.header}>
        <Responsive>
          <div className={styles.wrapper}>
            <div className={styles.menus}>
              <Link href="/" passHref>
                <div className={styles.logo}>PANGKIN</div>
              </Link>
              <Link href="/random" passHref>
                <div className={styles.link}>랜덤뽑기</div>
              </Link>
              <Link href="/message" passHref>
                <div className={styles.link}>방명록</div>
              </Link>
            </div>

            <div className={styles.right}>
              {user?.nickname ? (
                <>
                  {user.role === 'admin' ? (
                    <Link href="/admin" passHref>
                      <div className={styles.nickname}>{user.nickname}</div>
                    </Link>
                  ) : (
                    <div className={styles.nickname}>{user.nickname}</div>
                  )}

                  <Button onClick={logout}>로그아웃</Button>
                </>
              ) : (
                <Button onClick={login}>로그인</Button>
              )}
            </div>
          </div>
        </Responsive>
      </div>
      <div className={styles.spacer} />
    </>
  );
}
