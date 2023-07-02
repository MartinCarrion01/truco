import axios from "axios";
import { setCurrentTable } from "../store/tableStore";
import { environment } from "../utils/environment";

interface JoinedUser {
  id: number;
  position: number;
  played_cards: string[];
  hand_length: number;
  username: string;
  avatar_url: string;
  role: string;
  is_showing_hand: boolean;
}

interface Team {
  id: number;
  kind_team: "diagonal" | "anti_diagonal";
  points: number;
  usernames: string[];
}

export interface Table {
  table_number: number;
  game_type: "singles" | "doubles";
  status: "waiting_players" | "waiting" | "playing" | "finished" | "closed";
  dealer: number;
  joined_users: JoinedUser[];
  teams: Team[];
}

export async function createTable(game_type: string) {
  const res = await axios.post(environment.api_url + "/tables", {
    game_type: game_type,
  });

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

export async function addPoint(table_number: number, kind_team: string) {
  await axios.put(
    environment.api_url + "/tables/" + table_number + "/add_point",
    {
      kind_team: kind_team,
    }
  );
}

export async function removePoint(table_number: number, kind_team: string) {
  await axios.put(
    environment.api_url + "/tables/" + table_number + "/remove_point",
    {
      kind_team: kind_team,
    }
  );
}

export async function forfeit(table_number: number) {
  await axios.put(environment.api_url + "/tables/" + table_number + "/forfeit");
}

export async function showHand(table_number: number) {
  await axios.put(
    environment.api_url + "/tables/" + table_number + "/show_hand"
  );
}

export async function getHand(table_number: number, username: string) {
  const res = await axios.get(
    environment.api_url +
      "/tables/" +
      table_number +
      "/joined_users/" +
      username +
      "/hand"
  );
  return res.data.hand;
}

export async function leaveTable(table_number: number) {
  await axios.put(
    environment.api_url + "/tables/" + table_number + "/leave_table"
  );
}

export async function closeTable(table_number: number) {
  await axios.put(
    environment.api_url + "/tables/" + table_number + "/close_table"
  );
}
