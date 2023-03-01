import axios from "axios";
import { setCurrentUser } from "../store/userStore";
import { environment } from "../utils/environment";

export interface User {
  username: string;
  password: string;
  password_confirmation: string;
}

export async function login(username: string, password: string) {
  const res = await axios.post(environment.api_url + "/auth/login", {
    username,
    password,
  });

  const token = res.data["token"];
  axios.defaults.headers.common.Authorization = token;

  await setUser();

  return res;
}

async function setUser() {
  const res = await axios.get(environment.api_url + "/users/current");
  const user = res.data["user"];
  setCurrentUser(user);
}

export async function register(user: User) {
  const res = await axios.post(environment.api_url + "/users", { user });
  await login(user.username, user.password)
  return res;
}
