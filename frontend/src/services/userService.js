import { httpDelete, httpGet, httpPost, httpPut } from '../utilities/API';

export const loginUserService = async (email, password) =>
  await httpPost('/users/login', { email, password });

export const registerUserService = async (email, password, name) =>
  await httpPost('/users', { email, password, name });

export const getUserDataService = async (token) =>
  await httpGet('/users', token);

export const editUserDataService = async (data, token) =>
  await httpPut(`/users`, data, token);

export const editUserPasswordService = async (data, token) =>
  await httpPut(`/users/password`, data, token);
