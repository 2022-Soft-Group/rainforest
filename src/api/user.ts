import { backend } from './utils/request';

export function getUserInfo(userID: string) {
  return backend.get(`user/${userID}`);
}

export function getUserArticleNum(userID: string) {
  return backend.get(`user/${userID}/articleNum`);
}

export function getUserAchivement(userID: string) {
  return backend.get(`user/${userID}/achivement`);
}
