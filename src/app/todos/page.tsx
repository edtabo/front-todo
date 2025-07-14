/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useState } from 'react';
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

  React.useEffect(() => {
    if (!isTokenValid()) {
       setToken(null);
      router.push('/login');
    }
  }, [isTokenValid, setToken, router]);

  const fetchTodos = async () => {
    try {
      const req = await useAuthFetch(`${process.env.NEXT_PUBLIC_BACK}/tasks`);
      setTodos(req.data);
    } catch (error) {
      console.log(" EEEEEEEEEEEEEE ");
      console.log(error);
      console.log(" EEEEEEEEEEEEEE ");
      // setToken(null);
      // router.push('/login');
    }
  };

  const addTodo = async (title: string, description: string) => {
    try {
      const req = await useAuthFetch(`${process.env.NEXT_PUBLIC_BACK}/tasks`, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
      });
      const newData: Todo = req.data;
      setTodos([...todos, newData]);
    } catch (error) {
      console.log(error);
      setToken(null);
      router.push('/login');
    }
  };

  const deleteTodo = async (id: number) => {
    await useAuthFetch(`${process.env.NEXT_PUBLIC_BACK}/tasks/${id}`, { method: 'DELETE' });
    setTodos((prev) => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = async (id: number, title: string, description: string) => {
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