import axios from 'axios';
import qs from 'qs';
// http://127.0.0.1:4523/mock/836630
// http://kurino.top/api
const backend = axios.create({
  baseURL: 'http://127.0.0.1:4523/mock/836630',
});
// http://kurino.top/api

const jsonBackend = axios.create({
  baseURL: 'http://127.0.0.1:4523/mock/836630',
});
//  http://127.0.0.1:4523/mock/836630

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
