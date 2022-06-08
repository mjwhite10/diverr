//Función que hace una petición httpGet cualquiera.
// Puede requerir cabecera de autentificación
const httpGet = async (url, token = null) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND}${url}`,
    token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : null
  );

  const json = await response.json();
  if (!response.ok) throw new Error(json.message);

  return json.message;
};

//Función que hace una petición httpPost cualquiera.
// Puede requerir cabecera de autentificación
// El data se pasa serializada en el body
const httpPost = async (url, data, token = null) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}${url}`, {
    method: 'POST',
    headers: token
      ? {
          Authorization: token,
        }
      : { 'Content-Type': 'application/json' },
    body: data instanceof FormData ? data : JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json.data;
};

//Función que hace una petición httpPost cualquiera.
// Puede requerir cabecera de autentificación
// El data se pasa serializada en el body
const httpPut = async (url, data, token = null) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}${url}`, {
    method: 'PUT',
    headers: token
      ? {
          Authorization: token,
        }
      : { 'Content-Type': 'application/json' },
    body: data instanceof FormData ? data : JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json.data;
};

//Función que hace una petición httpDelete cualquiera.
// Puede requerir cabecera de autentificación
const httpDelete = async (url, token = null) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}${url}`, {
    method: 'DELETE',
    headers: token
      ? {
          Authorization: token,
        }
      : null,
  });
  const json = await response.json();

  if (!response.ok) throw new Error(json.message);
};

export { httpGet, httpPost, httpPut, httpDelete };
