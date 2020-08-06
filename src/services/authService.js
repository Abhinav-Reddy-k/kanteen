import jwt_decode from "jwt-decode";

import { apiUrl } from "../config.json";
import http from "./httpService";

function authUrl(id) {
  return `${apiUrl}/auth/${id}`;
}

export async function login(email, password) {
  const { data: jwt } = await http.post(`${apiUrl}/auth`, { email, password });
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
