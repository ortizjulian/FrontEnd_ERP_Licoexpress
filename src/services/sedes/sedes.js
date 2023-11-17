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

  const createSede = async (nombre, ciudad, direccion, nombre_admin, telefono_admin, contacto_admin) => {
    try {
      const response = await API('api/locations', 'POST', { nombre, ciudad, direccion, nombre_admin, telefono_admin, contacto_admin });
      if (response && response.data) {
        console.log(response.data);
      } else {
        console.error("Error al crear sede: Respuesta inesperada");
      }
    } catch (error) {
      console.error("Error al crear sede: ", error);
    }
  };

  const updateSede = async (id, sedeData) => {
    try {
      const response = await API(`api/locations/${id}`, 'PUT', sedeData);
      if (response && response.data) {
        console.log(response.data);
      } else {
        console.error("Error al actualizar sede: Respuesta inesperada");
      }
    } catch (error) {
      console.error("Error al actualizar sede: ", error);
    }
  };

  const deleteSede = async (id) => {
    try {
      const response = await API('api/locations/'+id, 'DELETE');
      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error al eliminar sede: ", error);
    }
  };

  return { getSedes, deleteSede, createSede, updateSede };
}


export default useSedes;