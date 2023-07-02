import { Flex } from "@chakra-ui/react";
import { useCurrentTable } from "../../../store/tableStore";
import { useSessionUser } from "../../../store/userStore";
import Player from "./Player";
import SittingPrompt from "./SittingPrompt";

interface Props {
  position: number;
}

export default function PlayerContainer(props: Props) {
  const table = useCurrentTable();
  const user = useSessionUser();

  const isSomeoneSitting = () => {
    return table?.joined_users.some((user) => user.position === props.position);
  };

  const player = () =>
    table?.joined_users.find((user) => user.position === props.position);

  const isCurrentUserInThisPosition = () => {
    return player()?.username === user?.username;
  };

  return (
    <Flex
      h="125px"
      w="520px"
      rounded="md"
      p="3"
      my="4"
      bg="gray.200"
      alignItems="center"
      justifyContent="center"
      boxShadow="md"
    >
      {isSomeoneSitting() ? (
        <Player
          username={player()?.username}
          avatar_url={player()?.avatar_url}
          isCurrentUser={isCurrentUserInThisPosition()}
        />
      ) : (
        <SittingPrompt position={props.position} />
      )}
    </Flex>
  );
}
