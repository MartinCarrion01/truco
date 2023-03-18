import { Avatar } from "@chakra-ui/react";
import { useCurrentTable } from "../../store/tableStore";
import PlayerHand from "./PlayerHand";
import Username from "./Username";

interface Props {
  username: string | undefined;
  avatar_url: string | undefined;
  isCurrentUser: boolean;
}

export default function Player(props: Props) {
  return (
    <>
      <Avatar src={props.avatar_url} name="Avatar usuario" size="lg" mr="3" />
      <Username username={props.username} />
      <PlayerHand
        username={props.username}
        isCurrentUser={props.isCurrentUser}
      />
    </>
  );
}
