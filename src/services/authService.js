import jwt_decode from "jwt-decode";

import { http } from "../middleware/api";

export async function login(email, password) {
  const { data: jwt } = await http.post(`/auth`, { email, password });
  console.log(jwt);
  localStorage.setItem("token", jwt);
}
export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwt_decode(jwt);
  } catch (error) {
    return null;
  }
}
