# GastoClaro

Aplicacion web para registro y control de gastos diarios con dashboard, autenticacion JWT y persistencia en MongoDB Atlas.

## Descripcion
GastoClaro permite crear cuenta, iniciar sesion y registrar gastos personales por fecha y categoria. El proyecto esta dividido en frontend (React + MUI + Vite + PWA) y backend (Express + MongoDB + JWT).

## Caracteristicas Principales
- Registro e inicio de sesion funcionales con base de datos MongoDB Atlas.
- Dashboard protegido: no se puede acceder sin sesion iniciada.
- CRUD de gastos diarios (crear, listar por fecha y eliminar).
- Validaciones de formularios en frontend y backend.
- Campo de monto restringido a multiplos de 50.
- Resumen visual diario y mensual con distribucion por categorias.
- Landing page responsive y enlace visible al repositorio GitHub (placeholder editable).
- Configuracion PWA activa (manifest + service worker).

## Instalacion
### 1) Clonar e instalar frontend
```bash
cd frontend
npm install
```

### 2) Instalar backend
```bash
cd ../backend
npm install
```

### 3) Variables de entorno
Crear los archivos a partir de los ejemplos:

- `/.env` (basado en `/.env.example`)
- `/backend/.env` (basado en `/backend/.env.example`)

Ejemplo backend:
```env
PORT=4000
MONGODB_URI=mongodb+srv://usuario:contrasena@cluster0.e6cegoo.mongodb.net/GastoClaro?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=cambia-este-secreto-por-uno-seguro
TOKEN_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Ejemplo frontend:
```env
VITE_API_URL=http://localhost:4000/api
```

## Ejecucion
### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
npm run dev
```

## Tecnologias
- Frontend: React 19, Vite, Material UI, React Router DOM, Axios
- Backend: Node.js, Express, Mongoose, JWT, Bcrypt, CORS, Morgan
- Base de datos: MongoDB Atlas
- PWA: `vite-plugin-pwa`

## Arquitectura / Encarpetado
```text
.
├─ backend/
│  ├─ src/
│  │  ├─ config/
│  │  ├─ controllers/
│  │  ├─ middlewares/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ utils/
│  │  ├─ app.js
│  │  └─ server.js
│  └─ package.json
├─ src/
│  ├─ features/
│  │  ├─ auth/
│  │  ├─ articles/
│  │  ├─ api/
│  │  └─ layout/
│  └─ shared/
└─ README.md
```

## Screenshot de la Interfaz
![Dashboard de GastoClaro]
<img width="1908" height="872" alt="image" src="https://github.com/user-attachments/assets/421ba12c-a86f-4120-83be-377e78a9eaaa" />


## Enlace al Repositorio GitHub
El landing ya incluye un enlace visible:
- `https://github.com/izzyy-lab/GastoClaro`

## Datos Importantes del Autor
- Nombre: **FELIPE ECHEVERRI DAVID**
- Programa/Ficha: **ADSO/3256538**
- Correo: **felipe.echeverri06@gmail.com**
- GitHub: **github.com/izzyy-lab**

## Notas
- Este proyecto necesita backend y frontend corriendo en paralelo.
- Si cambias puertos, actualiza `CLIENT_URL` y `VITE_API_URL`.
