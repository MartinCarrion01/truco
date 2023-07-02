import { Flex } from "@chakra-ui/react";
import PlayedCards from "./PlayedCards";

export default function PlayedCardsContainer() {
  return (
    <Flex
      w="100%"
      h="100%"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <PlayedCards position={1} />
      <PlayedCards position={2} />
    </Flex>
  );
}
