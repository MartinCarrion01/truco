import { useCallback, useEffect, useMemo, useState } from "react";
import { getHand, myHand } from "../services/tableService";
import { useCurrentTable } from "../store/tableStore";

export default function useHand(username: string, isCurrentUser: boolean) {
  const table = useCurrentTable();
  const [hand, setHand] = useState<string[]>([]);

  const player = useMemo(() => {
    return table?.joined_users.find((user) => user.username === username);
  }, [table?.joined_users, username]);

  const retrieveHand = useCallback(async () => {
    if (isCurrentUser) {
      const playerHand = await myHand(table!.table_number);
      setHand(playerHand);
    } else {
      if (player?.is_showing_hand) {
        const playerHand = await getHand(table!.table_number, player.username);
        setHand(playerHand);
      } else {
        setHand(new Array(player?.hand_length).fill("r0"));
      }
    }
  }, [
    player?.hand_length,
    player?.is_showing_hand,
    player?.username,
    isCurrentUser,
    table,
  ]);

  useEffect(() => {
    if (table) {
      retrieveHand();
    }
  }, [table, retrieveHand]);

  return hand;
}
