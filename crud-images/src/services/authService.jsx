// const API_URL = "http://localhost:3004";
// VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL;

export async function login(id, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
  });

  if (!res.ok) throw new Error("Identifiants invalides");
  const data = await res.json();
  localStorage.setItem("currentUser", JSON.stringify(data.user));
  return data.user;
}

export async function logout() {
  await fetch(`${API_URL}/logout`, { method: "POST" });
  localStorage.removeItem("currentUser");
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}
