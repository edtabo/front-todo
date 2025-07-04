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
      const data = await useAuthFetch<Todo[]>('/api/todos');
      setTodos(data);
    } catch (err) {
      console.error(err);
      setToken(null);
      router.push('/login');
    }
  };

  const addTodo = async (title: string, description: string) => {
    const newTodo = await useAuthFetch<Todo>('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    });
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (id: string) => {
    await useAuthFetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos((prev) => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = async (id: string, title: string, description: string) => {
    const updated = await useAuthFetch<Todo>(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
    });
    setTodos(todos.map(t => t.id === id ? updated : t));
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
      <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
    </div>
  );
}