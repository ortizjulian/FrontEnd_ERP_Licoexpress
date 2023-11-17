import { useNavigate } from 'react-router-dom';
import API from '../api';


function useLogin() {
  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    return localStorage.getItem('token') || false;
  };

  const isAdmin = () => {
    return getUserInfo().rol === "Administrador";
  };

  const getUserInfo = ()=> {

    const storedJsonString = localStorage.getItem('token');

      return JSON.parse(storedJsonString);
 
  }

  const login = async (correo, contrasena) => {
    try {
      const response = await API('api/user/login', 'POST', { correo, contrasena });
      
      if (response.status)
      {
        if (response.status === 200) {
        const jsonString = JSON.stringify(response.data);

        localStorage.setItem('token', jsonString);
      
        navigate('/productos');
        return { success: true, message: 'Inicio de sesión exitoso' };
      }
      }
      return { success: false, message: 'Falló el inicio de sesión' };
    } catch (error) {
      return { success: false, message: 'Falló el inicio de sesión' };

    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return { login, logout, isUserLoggedIn ,getUserInfo,isAdmin};
}


export default useLogin;