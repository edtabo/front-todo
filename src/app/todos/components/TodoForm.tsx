'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  onAdd: (title: string, description: string) => void;
  onLoad: () => void;
  validate: () => boolean;
}

export default function TodoForm({ onAdd, onLoad, validate }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return toast.error('El título es obligatorio');
    if (!description.trim()) return toast.error('La descripción es obligatoria');
    if (validate()) {
      onAdd(title, description);
      toast.success('Tarea agregada');
      setTitle('');
      setDescription('');
    }
  };

  const handleLoad = () => {
    if (validate()) {
      onLoad();
      toast.success('Tareas cargadas');
    }
  };

  return (
    <div className="space-y-2 bg-white p-4 rounded-xl shadow">
      <input
        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Título"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Descripción"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <div className="flex gap-2">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >Agregar</button>
        <button
          onClick={handleLoad}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >Cargar tareas</button>
      </div>
    </div>
  );
}