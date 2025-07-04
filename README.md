<p align="center">
  <a href="https://nextjs.org/" target="blank"><img src="https://icon.icepanel.io/Technology/svg/Next.js.svg" width="120" alt="Next.js" /></a>
</p>

# Frontend - Aplicación de Gestión de Tareas

Una aplicación web moderna construida con Next.js 15, TypeScript y Firebase para la gestión de tareas personales.

## 🚀 Características

- **Autenticación**: Sistema de login/registro con Firebase Auth
- **Gestión de Tareas**: CRUD completo para tareas personales
- **Interfaz Moderna**: Diseño responsive con Tailwind CSS
- **Estado Global**: Gestión de estado con Zustand
- **Notificaciones**: Sistema de notificaciones con react-hot-toast
- **TypeScript**: Tipado completo para mejor desarrollo

## 📋 Prerrequisitos

- Node.js 18+ 
- npm, yarn, pnpm o bun
- Cuenta de Firebase
- Backend API configurado

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd front
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

## ⚙️ Configuración

### Firebase Configuration

1. **Crear proyecto en Firebase Console**
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente
   - Habilita Authentication con Email/Password

2. **Obtener configuración**
   - En la configuración del proyecto, copia las credenciales
   - Crea un archivo `.env.local` en la raíz del proyecto

3. **Variables de entorno**
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Backend API URL
NEXT_PUBLIC_BACK=http://localhost:3005/api
```

## 🚀 Ejecutar el proyecto

### Desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción
```bash
npm run build
npm start
```

## 📱 Vistas de la Aplicación

### 1. Página Principal (`/`)
- **Propósito**: Redirección automática basada en estado de autenticación
- **Comportamiento**: 
  - Si hay token válido → redirige a `/todos`
  - Si no hay token → redirige a `/login`
- **Componente**: `src/app/page.tsx`

### 2. Login (`/login`)
- **Propósito**: Autenticación de usuarios existentes
- **Funcionalidades**:
  - Validación de email y contraseña
  - Integración con Firebase Auth
  - Redirección automática a `/todos` tras login exitoso
- **Componente**: `src/app/login/page.tsx`

### 3. Registro (`/register`)
- **Propósito**: Creación de nuevas cuentas de usuario
- **Funcionalidades**:
  - Validación de formulario (email, contraseña, nombre completo)
  - Creación de usuario en Firebase Auth
  - Registro en backend API
  - Redirección a `/login` tras registro exitoso
- **Componente**: `src/app/register/page.tsx`

### 4. Gestión de Tareas (`/todos`)
- **Propósito**: CRUD completo de tareas personales
- **Funcionalidades**:
  - Listar todas las tareas del usuario
  - Crear nuevas tareas
  - Editar tareas existentes
  - Eliminar tareas
  - Validación de token de autenticación
- **Componente**: `src/app/todos/page.tsx`

## 🔌 API Requests

### Autenticación

#### POST `/api/register`
- **Propósito**: Registrar usuario en el backend
- **Body**:
```json
{
  "token": "firebase_id_token",
  "fullName": "Nombre Completo"
}
```

### Tareas

#### GET `/api/tasks`
- **Propósito**: Obtener todas las tareas del usuario
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "data": [
    {
      "id": "task_id",
      "title": "Título de la tarea",
      "description": "Descripción de la tarea"
    }
  ]
}
```

#### POST `/api/tasks`
- **Propósito**: Crear nueva tarea
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "title": "Título de la tarea",
  "description": "Descripción de la tarea"
}
```

#### PATCH `/api/tasks/:id`
- **Propósito**: Actualizar tarea existente
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "title": "Nuevo título",
  "description": "Nueva descripción"
}
```

#### DELETE `/api/tasks/:id`
- **Propósito**: Eliminar tarea
- **Headers**: `Authorization: Bearer <token>`

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── login/           # Página de login
│   ├── register/        # Página de registro
│   ├── todos/           # Página de gestión de tareas
│   │   └── components/  # Componentes específicos de tareas
│   ├── store/           # Estado global (Zustand)
│   ├── types/           # Definiciones de tipos TypeScript
│   └── layout.tsx       # Layout principal
├── lib/
│   ├── firebase.ts      # Configuración de Firebase
│   ├── fetcher.ts       # Cliente HTTP con autenticación
│   └── middleware.ts    # Middleware de Next.js
```

## 🔧 Tecnologías Utilizadas

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Autenticación**: Firebase Auth
- **Estado**: Zustand
- **Notificaciones**: react-hot-toast
- **HTTP Client**: Fetch API con wrapper personalizado

## 🐛 Solución de Problemas

### Error de Firebase
- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de que Authentication esté habilitado en Firebase Console

### Error de CORS
- Verifica que el backend esté configurado para aceptar requests desde `http://localhost:3000`

### Error de Token
- El token se renueva automáticamente, pero si persiste el error, intenta hacer logout y login nuevamente

## 📝 Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Construir para producción
npm run start    # Ejecutar en modo producción
npm run lint     # Ejecutar linter
```