import { HStack } from "@chakra-ui/react";
import { useCurrentTable } from "../../store/tableStore";
import Card from "./cards/Card";

interface Props{
    position: number
}

export default function PlayedCards(props: Props) {
  const table = useCurrentTable();
  const playedCards = table?.joined_users.find(user => user.position === props.position)?.played_cards;

  return (
    <HStack mx="auto" mb="2">
      {playedCards && playedCards?.map((card, index) => (
        <Card card_name={card} key={index} />
      ))}
    </HStack>
  );
}
