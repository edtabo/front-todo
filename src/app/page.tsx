'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/auth';

export default function HomePage() {
  const router = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      router.push('/todos');
    } else {
      router.push('/login');
    }
  }, [token]);

  return null;
}