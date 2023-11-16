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

  return { getSedes };
}


export default useSedes;