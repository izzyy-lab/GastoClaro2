import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "/api";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function authHeaders(token) {
  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export function getApiErrorMessage(error, fallbackMessage) {
  return error?.response?.data?.message || fallbackMessage;
}
