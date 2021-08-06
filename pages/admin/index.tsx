import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AdminIndex() {
  const router = useRouter();
  useEffect(() => {
    router.push('/admin/users');
  }, [router]);
  return null;
}
