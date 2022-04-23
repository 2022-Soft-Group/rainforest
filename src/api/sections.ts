import { backend } from './utils/request';

export function getSections() {
  return backend.get('sections');
}

export function getTags() {
  return backend.get('sections/tags');
}
