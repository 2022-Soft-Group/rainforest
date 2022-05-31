import { backend } from './utils/request';
export function getSearchHistoryAndHotWord() {
  return backend.get(`search`);
}

export function searchArticle(data: { size: number; page: number; key: string }) {
  return backend.get(`search/article`, { params: data });
}

export function searchTag(data: { size: number; page: number; key: string }) {
  return backend.get(`search/tag`, { params: data });
}

export function searchColumn(data: { size: number; page: number; key: string }) {
  return backend.get(`search/column`, { params: data });
}

export function deleteSearchHistory(id: number) {
  return backend.delete(`search/history/${id}`);
}
