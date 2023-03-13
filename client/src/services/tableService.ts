import axios from "axios";
import { setCurrentTable } from "../store/tableStore";
import { environment } from "../utils/environment";

interface JoinedUsers {
  id: number;
  position: number;
  hand_length: number;
  username: string;
  avatar_url: string;
}

export interface Table {
  table_number: number;
  joined_users: JoinedUsers[];
}

export async function createTable() {
  const res = await axios.post(environment.api_url + "/tables");

  const table = res.data["table"] as Table;
  setCurrentTable(table);
  return table;
}

export async function joinTable(table_number: string) {
  const res = await axios.put(
    environment.api_url + "/tables/" + table_number + "/join"
  );
  const table = res.data["table"] as Table;
  setCurrentTable(table);
  return table;
}

export async function sit(table_number: number, position: number) {
  await axios.put(environment.api_url + "/tables/" + table_number + "/sit", {
    position: position,
  });
}
