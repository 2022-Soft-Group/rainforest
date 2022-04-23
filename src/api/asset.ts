import { jsonBackend } from './utils/request';

export function uploadImage(img: File) {
  let formData = new FormData();
  formData.append('image', img);
  return jsonBackend.post('asset/uploadimg', formData);
}
