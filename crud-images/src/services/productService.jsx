const API_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

export async function createProduct(formData) {
  const res = await fetch(`${API_URL}/admin/products`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw await res.json();
  return res.json();
}

export async function updateProduct(id, formData) {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) throw await res.json();
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erreur de suppression");
}
