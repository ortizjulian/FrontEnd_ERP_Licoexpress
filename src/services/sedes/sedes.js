import API from '../api';


function useSedes() {
  const getSedes = async () => {
    try {
      const response = await API('api/locations', 'GET');
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

  const createSede = async (sedeData) => {
    try {
      const response = await API('api/products', 'POST', sedeData);
      if (response && response.data) {
        console.log(response.data);
      } else {
        console.error("Error al crear sede: Respuesta inesperada");
      }
    } catch (error) {
      console.error("Error al crear sede: ", error);
    }
  };

  const deleteSede = async (id) => {
    try {
      const response = await API(`api/products/${id}`, 'DELETE');
      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error al eliminar sede: ", error);
    }
  };

  return { getSedes, deleteSede, createSede };
}


export default useSedes;