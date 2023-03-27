import { Box, Flex } from "@chakra-ui/react";
import { useCurrentTable } from "../../store/tableStore";
import Card from "./cards/PlayableCard";
import PlayedCards from "./PlayedCards";

export default function PlayedCardsContainer() {
  const table = useCurrentTable();
  return (
    <Flex w="400px" h="200px">
      <PlayedCards position={1}/>
      <PlayedCards position={2}/>
    </Flex>
  );
}
