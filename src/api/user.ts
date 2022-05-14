import { backend } from './utils/request';

export function getUserInfo(userID: string) {
  return backend.get(`user/${userID}`);
}

export function getUserFeature(userID: string) {
  return backend.get(`user/${userID}/feature`);
}

export function getUserListFollowing(data: { size: number; page: number }, userID: string) {
  return backend.get(`user/${userID}/list/followings`, { params: data });
}
