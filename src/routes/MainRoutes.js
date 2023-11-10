import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Productos = Loadable(lazy(() => import('pages/LicorExpress/Productos')));
const Proveedores = Loadable(lazy(() => import('pages/LicorExpress/Proveedores')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'producots',
      element: <Productos />
    },
    {
      path: 'Proveedores',
      element: <Proveedores />
    }
  ]
};

export default MainRoutes;
