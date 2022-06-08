import { httpDelete, httpGet, httpPost, httpPut } from '../utilities/API';

export const getAllDiverrsService = async () => await httpGet('/diverr');
