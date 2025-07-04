const API_URL = import.meta.env.VITE_API_URL;

const TOKEN_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";
const EXP_KEY = "tokenExpiry";

export async function login(id, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
  });

  if (!res.ok) throw new Error("Identifiants invalides");
  const data = await res.json();
  // stocke les infos utilisateur
  localStorage.setItem("currentUser", JSON.stringify(data.user));
  // stocke les jetons
  localStorage.setItem(TOKEN_KEY, data.accessToken);
  localStorage.setItem(REFRESH_KEY, data.refreshToken);
  // calcul d'expiration (durée fournie ou 1h par défaut)
  const exp = Date.now() + (data.expiresIn ? data.expiresIn * 1000 : 3600_000);
  localStorage.setItem(EXP_KEY, exp.toString());
  return data.user;
}

export async function logout() {
  try {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
  } catch (err) {
    // ignore network errors during logout
  }
  [TOKEN_KEY, REFRESH_KEY, EXP_KEY, "currentUser"].forEach((k) =>
    localStorage.removeItem(k)
  );
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function getAccessToken() {
  // vérifie expiration
  const exp = parseInt(localStorage.getItem(EXP_KEY), 10);
  if (!exp || Date.now() > exp) return null;
  return localStorage.getItem(TOKEN_KEY);
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  if (!refreshToken) throw new Error("Session expirée");
  const res = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) throw new Error("Impossible de rafraîchir la session");
  const data = await res.json();
  localStorage.setItem(TOKEN_KEY, data.accessToken);
  const exp = Date.now() + (data.expiresIn ? data.expiresIn * 1000 : 3600_000);
  localStorage.setItem(EXP_KEY, exp.toString());
  return data.accessToken;
}
