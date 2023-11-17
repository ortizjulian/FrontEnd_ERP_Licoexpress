import { useCallback, useState } from 'react';
import API from '../api';


function useInventario() {

  const [state, setState] = useState({ data: [], aux:[]});

  const getInventario = async (id) => {
    try {
      const response = await API('api/inventories/'+id, 'GET');
      if (response.data ) {
        
        setState({

          data: response.data,
          aux: response.data
        });
        return response.data;
      }
      else{
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  const createRegistro = async (sede_id, producto_id,fecha_registro,lote,stock) => {
    try {
       await API('api/inventories', 'POST', { sede_id, producto_id,fecha_registro,lote,stock });
    
      
    } catch (error) {

      console.log("Error")
    }
  };

  const handleFilter = useCallback(data => {
    setState(s => ({...s, data}))
  },[setState])

  return {state, getInventario,handleFilter,createRegistro };
}


export default useInventario;