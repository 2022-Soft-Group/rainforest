import { backend } from './utils/request';

export function addArticleToColumn(articleID: number, columnID: number) {
  return backend.post(`column/${columnID}/article/${articleID}`);
}
