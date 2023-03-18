import axios from "axios";
import { setCurrentTable } from "../store/tableStore";
import { environment } from "../utils/environment";

interface JoinedUsers {
  id: number;
  position: number;
  played_cards: string[];
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

export async function dealCards(table_number: number) {
  await axios.put(
    environment.api_url + "/tables/" + table_number + "/deal_cards"
  );
}

export async function myHand(table_number: number) {
  const res = await axios.get(
    environment.api_url + "/tables/" + table_number + "/my_hand"
  );
  return res.data.hand;
}

export async function playCard(table_number: number, card: string) {
  await axios.put(
    environment.api_url + "/tables/" + table_number + "/play_card",
    {
      card: card,
    }
  );
}
