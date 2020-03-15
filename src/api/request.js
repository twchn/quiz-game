import axios from 'axios';

const request = (method = 'GET', url = '', data = {}) => {
  let result;
  switch (method.toUpperCase()) {
    case 'GET':
      result = axios.get(url, {
        params: data
      });
      break;
    default:
      result = axios({ method, url, data });
      break;
  }
  return result;
};

export default request;
