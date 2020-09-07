import { apiUrl } from "../config.json";
import { http } from "../middleware/api";

export function userUrl(id) {
  return `${apiUrl}/user/${id}`;
}

export function register(user) {
  return http.post(`${apiUrl}/users`, {
    email: user.email,
    password: user.password,
    name: user.username
  });
}
