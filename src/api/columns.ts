import { backend, jsonBackend } from './utils/request';

export function addArticleToColumn(articleID: number, columnID: number) {
  return backend.post(`column/${columnID}/article/${articleID}`);
}

export function getColumnListRecommand(data: { size: number; page: number }) {
  return backend.get('column/list/recommend', { params: data });
}

export function getColumnDetail(id: string) {
  return backend.get(`column/${id}`);
}

export function addColumn(column: ColumnUpload) {
  return backend.post(`column`, column);
}

export function getColumnArticleList(data: { size: number; page: number; columnID: number }) {
  return backend.get(`column/${data.columnID}/articles`, { params: data });
}

export function getMyColumns(data: { size: number; page: number }) {
  return backend.get(`column/list`, { params: data });
}

export function getUserColumns(userID: number, data: { size: number; page: number }) {
  return backend.get(`column/list/${userID}`, { params: data });
}
export function deleteColumn(id: number) {
  return backend.delete(`/column/${id}`);
}
export function collectColumn(columnID: string) {
  return jsonBackend.put(`/column/${columnID}/follow`);
}
export function getColumnFollowStatus(columnID: string) {
  return backend.get(`/column/${columnID}/follow`);
}
export function updateColumn(data: { title: string; description: string; cover: string; columnID: string }) {
  return backend.put(`/column/${data.columnID}/update`, data);
}
// export function updateUserInfo(data: {
//   sex: number;
//   name: string;
//   avatar: string;
//   phone: string;
//   description: string;
// }) {
//   return jsonBackend.post(`user/update`, data);
// }

export function getUserFollowColumn(userID: number, data: { size: number; page: number }) {
  return backend.get(`/column/collect/list/${userID}`, { params: data });
}
