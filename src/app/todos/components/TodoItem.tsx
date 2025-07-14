'use client';
import { Todo } from '@/app/types/todo';
import { useState } from 'react';

interface Props {
  todo: Todo;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, description: string) => void;
}

export default function TodoItem({ todo, onDelete, onUpdate }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  return (
    <li className="bg-white shadow rounded-lg p-4 space-y-2 border border-gray-200">
      {editMode ? (
        <>
          <input
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => { onUpdate(todo.id, title, description); setEditMode(false); }}
            >Guardar</button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setEditMode(false)}
            >Cancelar</button>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-800">{todo.title}</h2>
            <p className="text-gray-600 text-sm">{todo.description}</p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
              onClick={() => setEditMode(true)}
            >Editar</button>
            <button
              className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
              onClick={() => onDelete(todo.id)}
            >Eliminar</button>
          </div>
        </div>
      )}
    </li>
  );
}