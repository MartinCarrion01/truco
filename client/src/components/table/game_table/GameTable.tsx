import { Flex } from "@chakra-ui/react";
import { useCurrentTable } from "../../../store/tableStore";
import PlayedCardsContainer from "./PlayedCardsContainer";
import TableNumberMessage from "./TableNumberMessage";

export default function GameTable() {
  const table = useCurrentTable();
  const isWaitingPlayers =
    table &&
    table.status === "waiting_players" &&
    table.joined_users.length < 2;
  return (
    <Flex
      h="400px"
      w="800px"
      bg="green.600"
      rounded="md"
      borderColor="yellow.800"
      borderStyle="solid"
      borderWidth="16px"
      alignItems="center"
      justifyContent="center"
    >
      {isWaitingPlayers ? (
        <TableNumberMessage
          number={table.table_number}
          game_type={table.game_type}
        />
      ) : (
        <PlayedCardsContainer />
      )}
    </Flex>
  );
}
