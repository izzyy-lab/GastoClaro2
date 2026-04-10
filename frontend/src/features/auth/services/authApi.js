import { httpClient } from "../../../shared/api/httpClient.js";

export async function registerUser(payload) {
  const response = await httpClient.post("/auth/register", payload);
  return response.data;
}

export async function loginUser(payload) {
  const response = await httpClient.post("/auth/login", payload);
  return response.data;
}

export async function getCurrentUser(token) {
  const response = await httpClient.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
