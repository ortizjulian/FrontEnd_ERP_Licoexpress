import { useNavigate } from 'react-router-dom';
import API from '../api';


function useLogin() {
  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    return !!localStorage.getItem('token');
  };


  const login = async (email, password) => {
    try {
      const response = await API('login', 'POST', { email, password });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
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