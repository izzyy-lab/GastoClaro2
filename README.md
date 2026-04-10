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

## Instalacion local
### 1) Instalar frontend
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

- `/frontend/.env` (basado en `/frontend/.env.example`)
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
cd frontend
npm run dev
```

## Despliegue en Vercel con GitHub
La forma mas estable para este repositorio es crear **2 proyectos en Vercel** usando el mismo repositorio de GitHub:

### 1) Backend en Vercel
- Crear un proyecto nuevo en Vercel.
- Seleccionar este repositorio de GitHub.
- En **Root Directory** elegir `backend`.
- Vercel usara `backend/vercel.json` para publicar la API como funcion serverless.
- Agregar estas variables de entorno en Vercel:

```env
MONGODB_URI=tu_uri_de_mongo_atlas
JWT_SECRET=un_secreto_largo_y_seguro
TOKEN_EXPIRES_IN=7d
CLIENT_URL=https://tu-frontend.vercel.app
```

- Desplegar y guardar la URL final, por ejemplo:
  `https://gastoclaro-backend.vercel.app`

La API quedara disponible con rutas como:
- `https://gastoclaro-backend.vercel.app/api/health`
- `https://gastoclaro-backend.vercel.app/api/auth/login`
- `https://gastoclaro-backend.vercel.app/api/expenses`

### 2) Frontend en Vercel
- Crear otro proyecto en Vercel con el mismo repositorio.
- En **Root Directory** elegir `frontend`.
- Agregar esta variable de entorno:

```env
VITE_API_URL=https://tu-backend.vercel.app/api
```

- Desplegar.

### 3) Conectar frontend y backend
- Si el backend ya fue desplegado, copia su URL publica en `VITE_API_URL`.
- Luego vuelve a verificar que `CLIENT_URL` en el backend tenga la URL publica del frontend.
- Si cambias alguna de esas variables, haz **Redeploy** en el proyecto afectado.

### 4) Configuracion en Mongo Atlas
- En Mongo Atlas, entra a **Network Access**.
- Permite acceso desde `0.0.0.0/0` o agrega la salida requerida por tu politica.
- Usa la misma URI de Atlas en `MONGODB_URI`.
- Verifica que el usuario de base de datos tenga permisos sobre la base `GastoClaro`.

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
<img width="1910" height="873" alt="image" src="https://github.com/user-attachments/assets/ccb20e2c-6304-4b9d-809a-0ac3af4541f2" />



## Enlace al Repositorio GitHub
El landing ya incluye un enlace visible:
- `https://github.com/izzyy-lab/GastoClaro`

## Datos Importantes del Autor
- Nombre: **FELIPE ECHEVERRI DAVID**
- Programa/Ficha: **ADSO/3256538**
- Correo: **felipe.echeverri06@gmail.com**
- GitHub: **github.com/izzyy-lab**

## Notas
- En local, este proyecto necesita backend y frontend corriendo en paralelo.
- En Vercel, frontend y backend se despliegan como proyectos separados del mismo repositorio.
- Si cambias dominios o puertos, actualiza `CLIENT_URL` y `VITE_API_URL`.
