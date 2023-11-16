import API from '../api';

function useUsers() {
  const getUsers = async () => {
    try {
      const response = await API('api/user', 'GET');
      if (response.data ) {
    
        return response.data;
      }
      else{
        return [];
      }
    } catch (error) {
      alert("Error")
      return [];
    }
  };

  const createUser = async (correo, contrasena, rol,sede_id) => {
    try {
      const response = await API('api/user/signup', 'POST', { correo, contrasena, rol,sede_id });
      if (response.data ) {
        console.log(response.data)
      } 
    } catch (error) {
      alert("Error")
    }
  };

  const deleteUsers = async (id) => {
    try {
      const response = await API('api/user/'+id, 'DELETE');
      if (response.data ) {
        console.log(response.data);
      }
    } catch (error) {
      alert("Error")
    }
  };

  return { getUsers, createUser, deleteUsers };
}


export default useUsers;