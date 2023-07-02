import axios from "axios";
import { cleanupCurrentUser, setCurrentUser } from "../store/userStore";
import { environment } from "../utils/environment";
import { setCurrentTable } from "../store/tableStore";
import { Table } from "./tableService";

export interface User {
  username: string;
  password: string;
  password_confirmation: string;
  is_playing?: boolean;
  avatar_url?: string;
}

export async function login(username: string, password: string) {
  const res = await axios.post(environment.api_url + "/auth/login", {
    username,
    password,
  });

  const token = res.data["token"];
  axios.defaults.headers.common.Authorization = token;

  await setUser();
}

export async function setUser() {
  const res = await axios.get(environment.api_url + "/users/current");
  const user = res.data["user"];
  setCurrentUser(user);
}

export async function getTableByCurrentUser() {
  const res = await axios.get(environment.api_url + "/users/current_table");
  const data = res.status === 200 ? res.data['table'] as Table : null
  return data;
}


export async function register(user: User) {
  const createdRes = await axios.post(environment.api_url + "/users", { user });
  const createdUser = createdRes.data["user"];
  const loginRes = await axios.post(environment.api_url + "/auth/login", {
    username: createdUser.username,
    password: user.password,
  });

  const token = loginRes.data["token"];
  axios.defaults.headers.common.Authorization = token;
}

export async function update(username: string) {
  await axios.put(environment.api_url + "/users", { username });
}


export async function uploadImage(avatar: any) {
  const formData = new FormData();
  formData.append("avatar", avatar);
  await axios.put(
    environment.api_url + "/users/upload_avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export async function logout(){
  axios.defaults.headers.common.Authorization = "";
  cleanupCurrentUser();
}