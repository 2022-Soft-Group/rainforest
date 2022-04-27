import { backend } from './utils/request';

export function getSections() {
  return backend.get('sections');
}

export function getTags() {
  return backend.get('sections/tags');
}

export function getTagDetail(id: string) {
  return backend.get(`sections/${id}`);
}

export function getTagArticleList(data: { size: number; page: number }, id: string) {
  return backend.get(`sections/${id}/articles`, { params: data });
}
