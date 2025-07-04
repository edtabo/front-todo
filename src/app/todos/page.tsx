/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthFetch } from '@/lib/fetcher';
import { useAuthStore } from '../store/auth';
import { Todo } from '../types/todo';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { isTokenValid, setToken } = useAuthStore();
  const router = useRouter();

  const fetchTodos = async () => {
    try {
      const data = await useAuthFetch(`${process.env.NEXT_PUBLIC_BACK}/tasks`);
      setTodos(data.data);
    } catch (err) {
      console.log(" 88888888888888888 ");
      console.log(err);
      console.log(" 88888888888888888 ");
      // setToken(null);
      // router.push('/login');
    }
  };

  const addTodo = async (title: string, description: string) => {
    const newTodo = await useAuthFetch<Todo>(`${process.env.NEXT_PUBLIC_BACK}/tasks`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    });
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (id: string) => {
    await useAuthFetch(`${process.env.NEXT_PUBLIC_BACK}/tasks/${id}`, { method: 'DELETE' });
    setTodos((prev) => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = async (id: string, title: string, description: string) => {
    setTodos([]);
    await useAuthFetch(`${process.env.NEXT_PUBLIC_BACK}/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title, description }),
    });
    fetchTodos();
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Mis Tareas</h1>
      <TodoForm
        onAdd={addTodo}
        onLoad={fetchTodos}
        validate={() => {
          if (!isTokenValid()) {
            setToken(null);
            router.push('/login');
            return false;
          }
          return true;
        }}
      />
      {todos.length > 0 && (
        <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
      )}
    </div>
  );
}