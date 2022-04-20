import { backend } from './utils/request';

export function getArticleListRecommand() {
  return backend.get('article/list/recommend');
}

export function getArticle(articleID: string) {
  return backend.get(`article/${articleID}`);
}

export function getUserLikeStatus(articleID: string) {
  return backend.get(`article/${articleID}/status`);
}

export function likeArticle(articleID: string) {
  return backend.put(`article/${articleID}/like`);
}

export function dislikeArticle(articleID: string) {
  return backend.put(`article/${articleID}/dislike`);
}
