import { backend } from './utils/request';

export function getMessages() {
  return backend.get('user/messages');
}
