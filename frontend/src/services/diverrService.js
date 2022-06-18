import { httpDelete, httpGet, httpPost, httpPut } from '../utilities/API';

export const getAllDiverrsService = async (queryParams) =>
  await httpGet(`/diverr${queryParams}`);
export const getSingleDiverrService = async (id) =>
  await httpGet(`/diverr/${id}`);
export const getDiverrSolutionService = async (id, token) =>
  await httpGet(`/diverr/${id}/solution`, token);
export const getAllDiverrsCategories = async () => await httpGet(`/categories`);

export const getAllDiverrComments = async (id) =>
  await httpGet(`/diverr/${id}/comments`);
//funcion peticion enviar comentario
//funcion peticion borrar comentario
//funcion peticion editar comentario
