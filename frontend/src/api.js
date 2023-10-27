const url = "http://127.0.0.1:5000";
export async function createUser(creds) {
  console.log(creds);
  const res = await fetch(`${url}/signup`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    // eslint-disable-next-line
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export async function loginUser(creds) {
    await  sleep(1000)
  const res = await fetch(`${url}/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    // eslint-disable-next-line
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}

export async function getProducts(id) {
  const finalUrl = id ? `${url}/api/products/${id}` : `${url}/api/products` 
  const res = await fetch(finalUrl)
  
  if (!res.ok) {
      // eslint-disable-next-line
      throw {
          message: "Failed to fetch products",
          statusText: res.statusText,
          status: res.status
      }
  }
  const data = await res.json()
  return data.products
}
