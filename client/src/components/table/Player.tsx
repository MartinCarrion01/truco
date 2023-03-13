import { Avatar } from "@chakra-ui/react";
import PlayerHand from "./PlayerHand";
import Username from "./Username";

export default function Player() {
  return (
    <>
      <Avatar
        src={""}
        name="Avatar usuario"
        size="lg"
        mr="3"
      />
      <Username />
      <PlayerHand />
    </>
  );
}
