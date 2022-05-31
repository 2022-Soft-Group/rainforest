import { jsonBackend } from './utils/request';

export function uploadImage(img: File, width: number | null, height: number | null) {
  let formData = new FormData();
  formData.append('image', img);
  if (width != null && height != null) {
    formData.append('width', width.toString());
    formData.append('height', height.toString());
  }

  return jsonBackend.post('asset/uploadimg', formData);
}
