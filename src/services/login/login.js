import { useNavigate } from 'react-router-dom';
import API from '../api';


function useLogin() {
  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    return !!localStorage.getItem('token');
  };


  const login = async (correo, contrasena) => {
    try {
      const response = await API('user/login', 'POST', { correo, contrasena });
      if (response.data ) {
        alert(response.data)
        localStorage.setItem('token', response.data);
        navigate('/dashboard');
      } 
    } catch (error) {
      alert("Error")

    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return { login, logout, isUserLoggedIn };
}


export default useLogin;