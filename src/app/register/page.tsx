/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleRegister = async () => {
    if (!email.includes('@')) return toast.error('Correo inválido');
    if (password.length < 6) return toast.error('La contraseña debe tener al menos 6 caracteres');
    if (!fullName.trim()) return toast.error('Nombre completo obligatorio');

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: fullName });
      const token = await userCred.user.getIdToken();

      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, fullName }),
      });

      toast.success('Registro exitoso');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Error en el registro');
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-4">
      <h1 className="text-xl font-semibold">Registro</h1>
      <input
        type="text"
        className="w-full border px-4 py-2 rounded-lg"
        placeholder="Nombre completo"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
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
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >Registrarse</button>
    </div>
  );
}