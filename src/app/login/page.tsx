'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuthStore();

  const handleLogin = async () => {
    if (!email.includes('@')) return toast.error('Correo inválido');
    if (password.length < 6) return toast.error('La contraseña debe tener al menos 6 caracteres');

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();
      setToken(token);
      toast.success('Inicio de sesión exitoso');
      router.push('/todos');
    } catch (err: any) {
      toast.error(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-4">
      <h1 className="text-xl font-semibold">Iniciar sesión</h1>
      <input
        type="email"
        className="w-full border px-4 py-2 rounded-lg"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full border px-4 py-2 rounded-lg"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >Entrar</button>
    </div>
  );
}
