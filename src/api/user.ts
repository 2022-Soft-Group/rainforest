import { backend } from './utils/request';

export function login(data: { uid: string; passwd: string }) {
  return backend.post('dologin', data);
}

export function getCaptcha(data: { uid: string }) {
  return backend.post('common/sendmail', data);
}

export function register(data: { uid: string; passwd: string; code: string }) {
  return backend.post('common/register', data);
}

export function deleteUser(data: { uid: string }) {
  return backend.post('common/delete', data);
}

export function hello() {
  return backend.get('user/hello');
}
