import { backend, jsonBackend } from './utils/request';

export function addArticleToColumn(articleID: number, columnID: number) {
  return backend.post(`column/${columnID}/article/${articleID}`);
}

export function getColumnListRecommand(data: { size: number; page: number }) {
  return backend.get('column/list/recommend', { params: data });
}

export function getColumnDetail(id: string) {
  return backend.get(`/column/${id}`);
}

export function addColumn(column: ColumnUpload) {
  return jsonBackend.post(`column`, column);
}

export function getColumnArticleList(data: { size: number; page: number; id: number }) {
  return backend.get(`/column/${data.id}/articles`, { params: data });
}
