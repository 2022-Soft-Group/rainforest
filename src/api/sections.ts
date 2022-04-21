import { backend } from './utils/request';

export function getSections() {
  return backend.get('sections');
}

export function getGrids() {
  return backend.get('sections/grids');
}
