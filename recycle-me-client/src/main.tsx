import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';

import App from './App.tsx';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import MapPage from './pages/MapPage.tsx';
// <-- NOVO: Importar a página de usuário
import UserPage from './pages/UserPage.tsx'; 
import {ProtectedRoute} from './components/ProtectedRoute.tsx';

import './index.css';

const router = createBrowserRouter(
 [
 {
 path: "/",
element: <App />, // O Layout (Header/Footer)
 children: [
// --- ROTAS PÚBLICAS ---
 { index: true, element: <HomePage /> },
{ path: "login", element: <LoginPage /> },
 { path: "cadastro", element: <RegisterPage /> },
  

 // --- ROTAS PROTEGIDAS ---
 {
element: <ProtectedRoute />, // Este layout (o "Segurança")
 children: [
// Rotas que só aparecem se o usuário estiver logado:
 { path: "mapa", element: <MapPage /> },
 { path: "perfil", element: <UserPage /> },
            // <-- NOVO: Adicionar a rota de Perfil aqui
            
]
},
 
 // Opcional: Rota 404
 // { path: "*", element: <Pagina404 /> }
 ],
 },
 ],
 {
 basename: "/recycle-me/", 
 }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
 <React.StrictMode>
 <AuthProvider>
   <RouterProvider router={router} />
 </AuthProvider>
 </React.StrictMode>,
);