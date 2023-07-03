import { Flex } from "@chakra-ui/react";
import { useCurrentTable } from "../../../store/tableStore";
import PlayedCards from "./PlayedCards";

const singlesCards = () => {
  return (
    <>
      <PlayedCards position={1} />
      <PlayedCards position={2} />
    </>
  );
};

const doublesCards = () => {
  return (
    <>
      <Flex w="100%" flexDir="row" justifyContent="space-around">
        <PlayedCards position={1} />
        <PlayedCards position={2} />
      </Flex>
      <Flex w="100%" flexDir="row" justifyContent="space-around">
        <PlayedCards position={3} />
        <PlayedCards position={4} />
      </Flex>
    </>
  );
};

export default function PlayedCardsContainer() {
  const table = useCurrentTable();

  return table ? (
    <Flex
      w="100%"
      h="100%"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      {table.game_type === "singles" ? singlesCards() : doublesCards()}
    </Flex>
  ) : (
    <></>
  );
}
