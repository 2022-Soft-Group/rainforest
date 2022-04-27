import { backend, jsonBackend } from './utils/request';

export function getArticleListRecommand(data: { size: number; page: number }) {
  return backend.get('article/list/recommend', { params: data });
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

export function addArticle(article: ArticleUpload) {
  return jsonBackend.post(`article`, article);
}
