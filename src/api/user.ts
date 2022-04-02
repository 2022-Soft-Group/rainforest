import { backend } from './utils/request';

export function getHello() {
  return backend.get('hello');
}
