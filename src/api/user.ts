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

export function getUserListFollowed(data: { size: number; page: number }, userID: string) {
  return backend.get(`user/${userID}/list/followeds`, { params: data });
}

export function followUser(userID: string, dstUserID: string) {
  return backend.put(`user/${userID}/list/followings/${dstUserID}/follow`);
}

export function cancelFollowUser(userID: string, dstUserID: string) {
  return backend.put(`user/${userID}/list/followings/${dstUserID}/cancelfollow`);
}

export function getFollowUserStatus(userID: string, dstUserID: string) {
  return backend.put(`user/${userID}/list/followings/${dstUserID}/isfollowing`);
}
