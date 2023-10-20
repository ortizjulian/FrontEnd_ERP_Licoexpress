import Axios from 'axios';

const URL=`https://localhost:5052/`;

export default async (path, method, data, headers={},options={}) => {
    try {
      return await Axios({
        url: URL + path,
        method: method,
        data: data,
        headers: headers,
        ...options
      })
        
    } catch (err) {
      console.log(err);
      
    }
  };