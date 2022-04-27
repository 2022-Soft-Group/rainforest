import { backend } from './utils/request';

export function getArticleListRecommand() {
  return backend.get('article/list/recommend');
}
