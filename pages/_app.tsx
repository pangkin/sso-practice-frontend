import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

import '../styles/globals.css';
import userContext from '../contexts/userContext';
import * as authApi from '../lib/api/auth';
import Header from '../components/common/Header';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState<User>(null);
  const [isLoad, setIsLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const func = async () => {
      try {
        const localUser = localStorage.getItem('user');
        if (localUser) {
          setUser(JSON.parse(localUser));
        }
        try {
          const { data } = await authApi.token();
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        } catch (e) {
          localStorage.removeItem('user');
          setUser(null);
          setIsLoad(false);
        }
        setIsLoad(false);
      } catch (e) {
        console.log('localStorage is not working');
      }
    };
    func();
  }, []);

  useEffect(() => {
    const login = async () => {
      if (router.query?.code) {
        if (router.query.code instanceof Array) return;
        const { data } = await authApi.login(router.query.code);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/');
      }
    };
    login();
  }, [router]);
  if (isLoad) return null;

  return (
    <>
      <userContext.Provider value={{ user, setUser, isLoad, setIsLoad }}>
        <Header />
        <Component {...pageProps} />
      </userContext.Provider>
    </>
  );
};

export default MyApp;
