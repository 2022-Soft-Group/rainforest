import axios from 'axios';

const backend = axios.create({
  baseURL: 'http://47.96.71.148/',
});

// backend.interceptors.request.use((config) => {
//   config.headers = { 'x-token': localStorage.getItem('token') || '' };
//   return config;
// });
export { backend };
