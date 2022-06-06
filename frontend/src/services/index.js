export const registerUserService = async ({ username, email, password }) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message);
  }
};
