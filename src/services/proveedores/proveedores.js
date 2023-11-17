import API from '../api';


function useProveedores() {
  const getProveedores = async () => {
    try {
      const response = await API('api/suppliers', 'GET');
      if (response.data ) {
        
        console.log(response.data);
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

  const createProveedor = async (nombre_empresa, responsable, numero_registro, direccion_empresa, ciudad, correo, numero_contacto) => {
    try {
      const response = await API('api/suppliers', 'POST', { nombre_empresa, responsable, numero_registro, direccion_empresa, ciudad, correo, numero_contacto });
      if (response.data ) {
        console.log(response.data)
      } 
    } catch (error) {
      alert("Error")
    }
  };

  const deleteProveedor = async (id) => {
    try {
      const response = await API('api/suppliers/'+id, 'DELETE');
      if (response.data ) {
        console.log(response.data);
      }
    } catch (error) {
      alert("Error")
    }
  };

  return { getProveedores, createProveedor, deleteProveedor };
}


export default useProveedores;