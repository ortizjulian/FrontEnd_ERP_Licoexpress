
// project import
import React from 'react';
import MinimalLayout from 'layout/MinimalLayout/index';
import {  Route, Routes } from '../../node_modules/react-router-dom/dist/index';
import Login from 'pages/authentication/Login';
import MainLayout from 'layout/MainLayout/index';
import DashboardDefault from 'pages/dashboard/index';
import SamplePage from 'pages/extra-pages/SamplePage';
import ProveedoresPage from 'pages/LicorExpress/Proveedores';
import ProductsPage from 'pages/LicorExpress/Productos';
import SedesPage from 'pages/LicorExpress/Sedes';
import UsuariosPage from 'pages/LicorExpress/Usuarios';
import InventarioPage from 'pages/LicorExpress/Inventario';
//import useLogin from 'services/login/login';

const PrivateRoute = ({ element, ...props }) => {
  

  return React.cloneElement(element, props);
};

const LoginRoutes = () => (
  <Routes>
    <Route path="/" element={<MinimalLayout />}>
      <Route path="login" element={<Login />} />
    </Route>
    <Route path="/"  element={<PrivateRoute element={<MainLayout />} />} >
      <Route path="dashboard" element={<PrivateRoute element={<DashboardDefault />} />} />
      <Route path="sample-page" element={<PrivateRoute element={<SamplePage />} />} />
      <Route path="productos" element={<PrivateRoute element={<ProductsPage />} />} />
      <Route path="sedes" element={<PrivateRoute element={<SedesPage />} />} />
      <Route path="inventario" element={<PrivateRoute element={<InventarioPage />} />} />
      <Route path="usuarios" element={<PrivateRoute element={<UsuariosPage />} />} />
      <Route path="Proveedores" element={<PrivateRoute element={<ProveedoresPage />} />} />
    </Route>
  </Routes>
);


export default LoginRoutes;



