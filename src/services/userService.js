import { http } from "../middleware/api";

export function userUrl(id) {
  return `/user/${id}`;
}

export function register(user) {
  return http.post(`/users`, {
    email: user.email,
    password: user.password,
    name: user.username,
  });
}
