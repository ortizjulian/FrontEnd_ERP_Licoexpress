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

  return { getProveedores };
}


export default useProveedores;