const base = `${process.env.NEXT_PUBLIC_BASE_API_URL}/v1`;

async function send({
  method,
  path,
  data,
  token,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  data?: any;
  token?: string;
}) {
  return fetch(`${base}/${path}`, {
    method,
    ...(data && { body: JSON.stringify(data) }),
    headers: {
      Accepts: "application/json",
      ...(data && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
    .then((r) => r.text())
    .then((json) => {
      try {
        return JSON.parse(json);
      } catch (err) {
        return json;
      }
    });
}

export function get(path: string, token?: string) {
  return send({ method: "GET", path, token });
}

export function del(path: string, token?: string) {
  return send({ method: "DELETE", path, token });
}

export function post(path: string, data: any, token?: string) {
  return send({ method: "POST", path, data, token });
}

export function put(path: string, data: any, token?: string) {
  return send({ method: "PUT", path, data, token });
}
