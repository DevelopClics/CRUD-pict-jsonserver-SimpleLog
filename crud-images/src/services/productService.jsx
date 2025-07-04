import { getAccessToken, refreshAccessToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

async function authHeader() {
  let token = getAccessToken();
  if (!token) {
    try {
      token = await refreshAccessToken();
    } catch {
      return {};
    }
  }
  return { Authorization: `Bearer ${token}` };
}

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`, {
    headers: await authHeader(),
  });
  return res.json();
}

export async function createProduct(formData) {
  const res = await fetch(`${API_URL}/admin/products`, {
    headers: await authHeader(),
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw await res.json();
  return res.json();
}

export async function updateProduct(id, formData) {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "PATCH",
    headers: await authHeader(),
    body: formData,
  });

  if (!res.ok) throw await res.json();
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "DELETE",
    headers: await authHeader(),
  });

  if (!res.ok) throw new Error("Erreur de suppression");
}
