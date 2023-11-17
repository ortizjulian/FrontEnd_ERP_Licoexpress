import API from '../api';


function useTipos() {
  const getTipos = async () => {
    try {
      const response = await API('api/products/tipos', 'GET');
      if (response.data ) {
        
        console.log(response.data);
        return response.data;
      }
      else{
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  return { getTipos };
}


export default useTipos;