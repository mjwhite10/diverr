import { httpDelete, httpGet, httpPost, httpPut } from '../utilities/API';

export const loginUserService = async (email, password) => {
  return await httpPost('/users/login', { email, password });
};

export const getUserDataService = async (token) => {
  return await httpGet('/users', token);
};
