import { backend } from './utils/request';

export function getMessages() {
  return backend.get('user/messages');
}

export function getUserInfo(userID: number) {
  return backend.get(`user/${userID}`);
}
