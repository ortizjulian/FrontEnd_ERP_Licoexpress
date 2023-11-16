// services/productos/productos.js

import API from '../api';

function useProductos() {
  const getProductos = async () => {
    try {
      const response = await API('api/products', 'GET');
      if (response.data) {
        console.log(response.data);
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error al obtener productos: ", error);
      return [];
    }
  };

  const createProducto = async (productoData) => {
    try {
      const response = await API('api/products', 'POST', productoData);
      if (response && response.data) {
        console.log(response.data);
      } else {
        console.error("Error al crear producto: Respuesta inesperada");
      }
    } catch (error) {
      console.error("Error al crear producto: ", error);
    }
  };
  

  const deleteProducto = async (id) => {
    try {
      const response = await API(`api/products/${id}`, 'DELETE');
      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error al eliminar producto: ", error);
    }
  };

  return { getProductos, createProducto, deleteProducto };
}

export default useProductos;
