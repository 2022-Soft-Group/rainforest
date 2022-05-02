import { backend } from './utils/request';

export function getUserInfo(userID: string) {
  return backend.get(`user/${userID}`);
}
