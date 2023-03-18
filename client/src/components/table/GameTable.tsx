import { Box, Flex } from "@chakra-ui/react";
import PlayedCardsContainer from "./PlayedCardsContainer";

export default function GameTable() {
  return (
    <Flex
      h="400px"
      w="800px"
      bg="green.600"
      rounded={"md"}
      borderColor="yellow.800"
      borderStyle="solid"
      borderWidth="16px"
      alignItems="center"
      justifyContent="center"
    >
      <PlayedCardsContainer/>
    </Flex>
  );
}
