import { backend } from './utils/request';

export function getSections() {
  return backend.get('sections');
}

export function getTags(data: { size: number; page: number }, sectionName: string) {
  return backend.get('sections/tags');
}

export function getTagDetail(id: string) {
  return backend.get(`sections/tag/${id}`);
}

export function getTagArticleList(data: { size: number; page: number }, id: string) {
  return backend.get(`sections/tag/${id}/articles`, { params: data });
}
