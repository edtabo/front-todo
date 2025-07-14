'use client';
import { Todo } from '@/app/types/todo';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, description: string) => void;
}

export default function TodoList({ todos, onDelete, onUpdate }: Props) {
  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}