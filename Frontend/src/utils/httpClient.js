export const BASE_URL = "http://localhost:3000";

export async function post(path, body) {
  try {
    const isFormData = body instanceof FormData;

    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",

      headers: isFormData
        ? {}
        : {
            "Content-Type": "application/json",
          },

      body: isFormData ? body : JSON.stringify(body),
    });

    return await response.json();

  } catch (error) {
    console.log("error", error);
  }
}

export async function get(path) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const data = await fetch(`${BASE_URL}${path}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  return data;
}

export async function put(path, body) {
  try {
    const isFormData = body instanceof FormData;

    const response = await fetch(`${BASE_URL}${path}`, {
      method: "PUT",

      headers: isFormData
        ? {}
        : {
            "Content-Type": "application/json",
          },

      body: isFormData ? body : JSON.stringify(body),
    });

    return await response.json();

  } catch (error) {
    console.log("error", error);
  }
}

export async function del(path) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method:"DELETE",
  });

  return await response.json();
}

// post , put =>   AI