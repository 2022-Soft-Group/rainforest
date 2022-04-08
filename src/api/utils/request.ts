import axios from 'axios';
import qs from 'qs';
const backend = axios.create({
  baseURL: 'http://kurino.top/api/',
});

backend.interceptors.request.use((config) => {
  config.headers = {
    'x-token': localStorage.getItem('token') || '',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  config.data = qs.stringify(config.data);

  return config;
});

export { backend };
