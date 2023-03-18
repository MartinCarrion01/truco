import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { useCallback, useEffect, useState } from "react";
import { myHand } from "../../services/tableService";
import { useCurrentTable } from "../../store/tableStore";
import Card from "./Card";
import EmptyCard from "./EmptyCard";

interface Props {
  username: string | undefined;
  isCurrentUser: boolean;
}

export default function PlayerHand(props: Props) {
  const table = useCurrentTable();
  const [hand, setHand] = useState<string[]>([]);

  const player = useCallback(() => {
    return table?.joined_users.find((user) => user.username === props.username);
  }, [props.username, table]);

  const retrieveHand = useCallback(async () => {
    if (props.isCurrentUser) {
      if (table) {
        const playerHand = await myHand(table.table_number);
        setHand(playerHand);
      }
    }
  }, [props.isCurrentUser, table]);

  useEffect(() => {
    retrieveHand();
  }, [
    props.isCurrentUser,
    props.username,
    table?.joined_users,
    table?.table_number,
    retrieveHand,
  ]);

  const nullArray = () => {
    return new Array(player()?.hand_length).fill(null);
  };

  return (
    <HStack mx="3" spacing="3">
      {props.isCurrentUser
        ? hand.map((card, index) => <Card key={index} card_name={card} />)
        : nullArray().map((_, index) => <EmptyCard key={index} />)}
    </HStack>
  );
}
