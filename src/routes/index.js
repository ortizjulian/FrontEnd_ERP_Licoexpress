
// project import

import MinimalLayout from 'layout/MinimalLayout/index';
import { Navigate, Route, Routes } from '../../node_modules/react-router-dom/dist/index';
import Login from 'pages/authentication/Login';
import MainLayout from 'layout/MainLayout/index';
import DashboardDefault from 'pages/dashboard/index';
import SamplePage from 'pages/extra-pages/SamplePage';
import ProveedoresPage from 'pages/LicorExpress/Proveedores';
import Color from 'pages/components-overview/Color';

import Typography from 'pages/components-overview/Typography';
import Shadow from 'pages/components-overview/Shadow';
import AntIcons from 'pages/components-overview/AntIcons';
import useLogin from 'services/login/login';

const PrivateRoute = ({ element, ...props }) => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? (
    React.cloneElement(element, props)
  ) : (
    <Navigate to="/login" replace />
  );
};

const LoginRoutes = () => (
  <Routes>
    <Route path="/" element={<MinimalLayout />}>
      <Route path="login" element={<Login />} />
    </Route>
    <Route path="/"  element={<PrivateRoute element={<MainLayout />} />} >
      <Route path="dashboard" element={<PrivateRoute element={<DashboardDefault />} />} />
      <Route path="color" element={<PrivateRoute element={<Color />} />} />
      <Route path="dashboard" element={<PrivateRoute element={<DashboardDefault />} />} />
      <Route path="sample-page" element={<PrivateRoute element={<SamplePage />} />} />
      <Route path="shadow" element={<PrivateRoute element={<Shadow />} />} />
      <Route path="typography" element={<PrivateRoute element={<Typography />} />} />
      <Route path="icons" element={<PrivateRoute element={<AntIcons />} />} />
      <Route path="Proveedores" element={<PrivateRoute element={<ProveedoresPage />} />} />
    </Route>
  </Routes>
);


export default LoginRoutes;



