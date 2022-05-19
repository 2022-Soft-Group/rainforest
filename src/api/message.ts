import { backend } from './utils/request';

export function getMessages() {
  return backend.get('message/news');
}

export function markReadMessage(messageID: number) {
  return backend.post('message/read', { msgID: messageID });
}
