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
}

async function setUser() {
  const res = await axios.get(environment.api_url + "/users/current");
  const user = res.data["user"];
  setCurrentUser(user);
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
  console.log("token", token);
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
