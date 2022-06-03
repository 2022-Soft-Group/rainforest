import { backend, jsonBackend } from './utils/request';

export function getArticleListRecommand(data: { size: number; page: number }) {
  return backend.get('article/list/recommend', { params: data });
}

export function getArticle(articleID: string) {
  return backend.get(`article/${articleID}`);
}

export function getUserLikeStatus(articleID: number) {
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

export function getComments(data: { size: number; page: number; toCommentID: number | null }, articleID: number) {
  return backend.get(`article/${articleID}/comment`, { params: data });
}

export function likeComment(artcicleID: number, commentID: number) {
  return backend.post(`article/${artcicleID}/comment/${commentID}/like`);
}

// function have commentID to comment, no id for article
export function commentArticleComments(
  articleID: number,
  data: { toCommentID: number; content: string; image: string }
) {
  return backend.post(`article/${articleID}/comment`, data);
}

export function deleteComment(articleID: number, commentID: number) {
  return backend.delete(`article/${articleID}/comment/${commentID}`);
}
