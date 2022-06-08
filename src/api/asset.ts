import { jsonBackend, backend } from './utils/request';

export function uploadImage(img: File, width: number | null, height: number | null) {
  let formData = new FormData();
  formData.append('image', img);
  if (width != null && height != null) {
    formData.append('width', width.toString());
    formData.append('height', height.toString());
  }

  return jsonBackend.post('asset/uploadimg', formData);
}

export function uploadResource(resouce: File, description: string) {
  let formData = new FormData();
  formData.append('resouce', resouce);
  formData.append('description', description);
  return jsonBackend.post('asset/resouce', formData);
}

export function getUserResourceList(userID: string, data: { page: number; size: number }) {
  return backend.get(`asset/list/${userID}`, { params: data });
}
