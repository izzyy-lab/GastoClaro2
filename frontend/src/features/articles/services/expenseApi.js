import {
  authHeaders,
  httpClient,
} from "../../../shared/api/httpClient.js";

export async function getExpensesByDate(token, date) {
  const response = await httpClient.get("/expenses", {
    params: { date },
    headers: authHeaders(token),
  });
  return response.data;
}

export async function createExpense(token, payload) {
  const response = await httpClient.post("/expenses", payload, {
    headers: authHeaders(token),
  });
  return response.data;
}

export async function deleteExpense(token, expenseId) {
  const response = await httpClient.delete(`/expenses/${expenseId}`, {
    headers: authHeaders(token),
  });
  return response.data;
}
