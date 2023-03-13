import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useCurrentTable } from "../../store/tableStore";
import { useSessionUser } from "../../store/userStore";
import Player from "./Player";
import PlayerHand from "./PlayerHand";
import SittingPrompt from "./SittingPrompt";
import Username from "./Username";

interface Props {
  position: number;
}

export default function PlayerContainer(props: Props) {
  const table = useCurrentTable();

  const isSomeoneSitting = () => {
    return table?.joined_users.some((user) => user.position === props.position);
  };

  return (
    <Flex
      h="125px"
      w="450px"
      rounded="md"
      border="4px"
      p="3"
      my="2"
      justifyContent={"center"}
      alignItems="center"
    >
      {isSomeoneSitting() ? (
        <Player />
      ) : (
        <SittingPrompt position={props.position} />
      )}
    </Flex>
  );
}
