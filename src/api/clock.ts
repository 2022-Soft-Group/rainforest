import { backend, jsonBackend } from './utils/request';

export function getSignInStatus() {
  return backend.get(`clock`);
}

export function signIn() {
  return backend.post(`clock`);
}
