import { backend } from './utils/request';

export function getMessages() {
  return backend.get('message/news');
}

export function markReadMessage(messageID: number) {
  return backend.post('message/read', { msgID: messageID });
}

export function getTrends(data: { page: number; size: number; new: number }) {
  return backend.get('message/fan/articles', { params: data });
}

export function markReadTreads() {
  return backend.post('message/fan/read');
}
