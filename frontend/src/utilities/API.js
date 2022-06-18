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
  let header;
  if (token && data instanceof FormData) {
    header = { Authorization: token };
  } else if (token) {
    header = { Authorization: token, 'Content-Type': 'application/json' };
  } else {
    header = { 'Content-Type': 'application/json' };
  }
  const response = await fetch(`${process.env.REACT_APP_BACKEND}${url}`, {
    method: 'POST',
    headers: header,
    body: data instanceof FormData ? data : JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) throw new Error(json.message);

  return json.message;
};

//Función que hace una petición httpPost cualquiera.
// Puede requerir cabecera de autentificación
// El data se pasa serializada en el body
const httpPut = async (url, data, token = null) => {
  let header;
  if (token && data instanceof FormData) {
    header = { Authorization: token };
  } else if (token) {
    header = { Authorization: token, 'Content-Type': 'application/json' };
  } else {
    header = { 'Content-Type': 'application/json' };
  }

  const response = await fetch(`${process.env.REACT_APP_BACKEND}${url}`, {
    method: 'PUT',
    headers: header,
    body: data instanceof FormData ? data : JSON.stringify(data),
  });

  const json = await response.json();
  console.log(json);
  if (!response.ok) throw new Error(json.message);

  return json.message;
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
