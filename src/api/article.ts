import { backend, jsonBackend } from './utils/request';

export function getArticleListRecommand(data: { size: number; page: number }) {
  return backend.get(`article/list/recommend`, { params: data });
}

export function getDraftList(data: { size: number; page: number }) {
  return backend.get(`article/list/draft`, { params: data });
}

export function getArticle(articleID: string) {
  return backend.get(`article/${articleID}`);
}
export function getMyArticle(data: { size: number; page: number }) {
  return backend.get(`/article/list`, { params: data });
}

export function getUserArticleStatus(articleID: number) {
  return backend.get(`article/${articleID}/status`);
}

export function likeArticle(articleID: string) {
  return backend.put(`article/${articleID}/like`);
}

export function dislikeArticle(articleID: string) {
  return backend.put(`article/${articleID}/dislike`);
}

export function collectArticle(artcicleID: string) {
  return backend.put(`article/${artcicleID}/collect`);
}

export function addArticle(article: ArticleUpload) {
  return jsonBackend.post(`article`, article);
}

export function setArticleTags(articleID: number, tags: Array<number>) {
  return jsonBackend.post(`article/${articleID}/tag`, { tags: tags });
}

export function deleteArticle(artcicleID: number) {
  return backend.delete(`article/${artcicleID}`);
}

export function getDraft(draftID: string) {
  return backend.get(`article/draft/${draftID}`);
}

export function addDraft(article: ArticleUpload) {
  return jsonBackend.post(`article/draft`, article);
}

export function deleteDraft(draftID: number) {
  return backend.delete(`article/draft/${draftID}`);
}

export function modifyArticle(article: ArticleUpload, artcicleID: number) {
  return jsonBackend.put(`article/${artcicleID}`, article);
}

export function modifyDraft(article: ArticleUpload, draftID: number) {
  return jsonBackend.put(`article/draft/${draftID}`, article);
}

export function publishDraft(draftID: number) {
  return backend.post(`article/draft/${draftID}/publish`);
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
