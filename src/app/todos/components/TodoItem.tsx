'use client';
import { Todo } from '@/app/types/todo';
import { useState } from 'react';

interface Props {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
}

export default function TodoItem({ todo, onDelete, onUpdate }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  return (
    <li className="border p-2 rounded space-y-2">
      {editMode ? (
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} className="input w-full" />
          <input value={description} onChange={e => setDescription(e.target.value)} className="input w-full" />
          <div className="flex gap-2">
            <button className="btn" onClick={() => { onUpdate(todo.id, title, description); setEditMode(false); }}>Guardar</button>
            <button className="btn" onClick={() => setEditMode(false)}>Cancelar</button>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-start">
          <div>
            <strong>{todo.title}</strong>
            <p>{todo.description}</p>
          </div>
          <div className="space-x-2">
            <button className="text-blue-500 hover:underline" onClick={() => setEditMode(true)}>Editar</button>
            <button className="text-red-500 hover:underline" onClick={() => onDelete(todo.id)}>Eliminar</button>
          </div>
        </div>
      )}
    </li>
  );
}