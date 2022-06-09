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

export function getTagArticleList(data: { size: number; page: number; id: number }) {
  return backend.get(`sections/tag/${data.id}/articles`, { params: data });
}

export function addTag(tag: TagItem) {
  return backend.post(`/sections/tag`, tag);
}
export function deleteTag(tagID: string) {
  return backend.delete(`/sections/tag/${tagID}`);
}
