import { backend } from './utils/request';

export function getArticleListRecommand() {
  return backend.get('article/list/recommend');
}

export function getUserLikeStatus(articleID: number) {
  return backend.get(`article/${articleID}/status`);
}

export function likeArticle(articleID: number) {
  return backend.put(`article/${articleID}/like`);
}

export function dislikeArticle(articleID: number) {
  return backend.put(`article/${articleID}/dislike`);
}
