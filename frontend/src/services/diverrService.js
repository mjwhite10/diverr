import { httpDelete, httpGet, httpPost, httpPut } from '../utilities/API';

export const getAllDiverrsService = async (queryParams) =>
  await httpGet(`/diverr${queryParams}`);


  //funcion peticion enviar comentario
  //funcion peticion borrar comentario
  //funcion peticion editar comentario