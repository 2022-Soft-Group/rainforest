import axios from 'axios';
import qs from 'qs';
const backend = axios.create({
  baseURL: 'http://47.96.71.148/api/',
});

const jsonBackend = axios.create({
  baseURL: 'http://47.96.71.148/api/',
});

backend.interceptors.request.use((config) => {
  config.headers = {
    Authorization: localStorage.getItem('token') || '',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  config.data = qs.stringify(config.data);
  return config;
});

jsonBackend.interceptors.request.use((config) => {
  config.headers = {
    Authorization: localStorage.getItem('token') || '',
  };
  return config;
});

export { backend, jsonBackend };
