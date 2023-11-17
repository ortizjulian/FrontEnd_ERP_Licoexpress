
// project import
import React from 'react';
import MinimalLayout from 'layout/MinimalLayout/index';
import {  Navigate, Route, Routes } from '../../node_modules/react-router-dom/dist/index';
import Login from 'pages/authentication/Login';
import MainLayout from 'layout/MainLayout/index';
import ProveedoresPage from 'pages/LicorExpress/Proveedores';
import ProductsPage from 'pages/LicorExpress/Productos';
import SedesPage from 'pages/LicorExpress/Sedes';
import InventarioPage from 'pages/LicorExpress/Inventario/Inventarios'; 
import InventarioTotalizadoPage from 'pages/LicorExpress/InventariosTotales/InventarioTotalizadoPage'; 
import UsersPage from 'pages/LicorExpress/Users/Users'; 
import useLogin from 'services/login/login';



const PrivateRoute = ({ element, ...props }) => {
  const { isUserLoggedIn } = useLogin();

  return isUserLoggedIn() ? (
    React.cloneElement(element, props)
  ) : (
    <Navigate to="/login" replace />
  );
}; 

const LoggedUser = ({ element, ...props }) => {
  const { isUserLoggedIn } = useLogin();
  return isUserLoggedIn() ? (
    <Navigate to="/productos" replace />
  ) : (
    React.cloneElement(element, props)
  );
};

const LoginRoutes = () => (
  <Routes>
    <Route path="/"  element={<LoggedUser element={<MinimalLayout />} />}>
      <Route path="login" element={<LoggedUser element={<Login />} />} />
    </Route>
 <Route path="/"  element={<PrivateRoute element={<MainLayout />} />} >
      <Route path="productos" element={<PrivateRoute element={<ProductsPage />} />} />
      <Route path="sedes" element={<PrivateRoute element={<SedesPage />} />} />
      <Route path="inventario" element={<PrivateRoute element={<InventarioPage />} />} />
      <Route path="inventario-total" element={<PrivateRoute element={<InventarioTotalizadoPage />} />} />
      <Route path="Proveedores" element={<PrivateRoute element={<ProveedoresPage />} />} />
      <Route path="administrar-usuarios" element={<PrivateRoute element={<UsersPage />} />} />
    </Route> 
  </Routes>
);


export default LoginRoutes;



