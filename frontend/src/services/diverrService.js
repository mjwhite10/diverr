import { httpDelete, httpGet, httpPost, httpPut } from '../utilities/API';

//DIVERRS//
export const getAllDiverrsService = async (queryParams) =>
  await httpGet(`/diverr${queryParams}`);
export const getSingleDiverrService = async (id) =>
  await httpGet(`/diverr/${id}`);
//SOLUTIONS//
export const getDiverrSolutionService = async (id, token) =>
  await httpGet(`/diverr/${id}/solution`, token);
//CATEGORIES
export const getAllDiverrsCategories = async () => await httpGet(`/categories`);
//COMENTARIOS//
export const getAllDiverrComments = async (id) =>
  await httpGet(`/diverr/${id}/comments`);

export const sendDiverrCommentService = async (id, data, token) =>
  await httpPost(`/diverr/${id}/comments`, data, token);

export const editDiverrCommentService = async (
  idDiverr,
  idComment,
  data,
  token
) => await httpPut(`/diverr/${idDiverr}/comments/${idComment}`, data, token);

export const deleteDiverrCommentService = async (idDiverr, idComment, token) =>
  await httpDelete(`/diverr/${idDiverr}/comments/${idComment}`, token);
//funcion peticion enviar comentario
//funcion peticion borrar comentario
//funcion peticion editar comentario
