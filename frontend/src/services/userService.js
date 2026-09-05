import api from "./api";

export async function fetchUsers(search = "") {
  const { data } = await api.get("/users", { params: search ? { search } : {} });
  return data;
}

export async function fetchStats() {
  const { data } = await api.get("/users/stats");
  return data;
}

export async function fetchUserById(id) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}

export async function createUser(payload) {
  const { data } = await api.post("/users", payload);
  return data;
}

export async function updateUser(id, payload) {
  const { data } = await api.put(`/users/${id}`, payload);
  return data;
}

export async function deleteUser(id) {
  const { data } = await api.delete(`/users/${id}`);
  return data;
}
