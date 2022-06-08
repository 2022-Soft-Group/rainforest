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

export function uploadResource(resource: File, description: string, cost: number, name: string) {
  let formData = new FormData();
  formData.append('resource', resource);
  formData.append('description', description);
  formData.append('cost', cost.toString());
  formData.append('name', name);
  return jsonBackend.post('asset/resource', formData);
}

export function purchaseResource(assetID: number) {
  return backend.post(`asset/buy/${assetID}`);
}

export function downloadResource(assetID: number) {
  return backend.get(`asset/${assetID}`, { responseType: 'blob' });
}

export function getUserResourceList(userID: string, data: { page: number; size: number }) {
  return backend.get(`asset/list/${userID}`, { params: data });
}

export function getResourceInfo(assetID: number) {
  return backend.get(`asset/detail/${assetID}`);
}
