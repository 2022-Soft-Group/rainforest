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
