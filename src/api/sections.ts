import { backend } from './utils/request';

export function getSections() {
  return backend.get('sections');
}

export function getTags(data: { sectionName: string; size: number; page: number }) {
  return backend.get('sections/tags', {
    params: data,
  });
}

export function getTagDetail(tagid: string) {
  return backend.get(`/sections/tag/${tagid}`);
}

export function getTagArticleList(data: { size: number; page: number }, id: string) {
  return backend.get(`sections/tag/${id}/articles`, { params: data });
}
