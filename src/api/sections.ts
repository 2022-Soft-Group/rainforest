import { backend } from './utils/request';

export function getSections() {
  return backend.get('sections');
}
