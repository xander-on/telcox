import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ClientesPage, MainPage } from '../main/pages';
import { MainLayout } from '@/main/layouts/MainLayout';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/login', element: <ClientesPage/> },
    ],
  },
];

const router = createBrowserRouter(routes);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
