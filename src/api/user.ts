import { backend, jsonBackend } from './utils/request';

export function getUserArticleList(data: { size: number; page: number }, userID: string) {
  return backend.get(`article/list/${userID}`, { params: data });
}

export function getUserInfo(userID: string) {
  return backend.get(`user/${userID}`);
}

export function updateUserInfo(data: {
  sex: number;
  name: string;
  avatar: string;
  phone: string;
  description: string;
}) {
  return jsonBackend.post(`user/update`, data);
}

export function changePasswd(data: { oldPasswd: string; newPasswd: string }) {
  return backend.put(`auth/password`, data);
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

export function followUser(userID: string) {
  return backend.put(`user/fan/${userID}`);
}

export function cancelFollowUser(userID: string) {
  return backend.put(`user/unfan/${userID}`);
}

export function getFollowUserStatus(userID: string) {
  return backend.get(`user/fanstatus/${userID}`);
}

export function collectArticle(articleID: string) {
  return backend.put(`user/collect/${articleID}`);
}

export function getCollectStatus(articleID: string) {
  return backend.get(`user/collectStatus/${articleID}`);
}
