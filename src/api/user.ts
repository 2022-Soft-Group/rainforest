import { backend } from './utils/request';

export function login(data: { email: string; password: string }) {
  return backend.post('tokens', data);
}

export function getCaptcha(data: { email: string; type: number }) {
  return backend.post('captcha', data);
}

export function register(data: { captcha: string; email: string; name: string; password: string }) {
  return backend.post('users', data);
}