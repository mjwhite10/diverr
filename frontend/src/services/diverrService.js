import { httpDelete, httpGet, httpPost, httpPut } from '../utilities/API';

export const getAllDiverrsService = async (queryParams) =>
  await httpGet(`/diverr${queryParams}`);
