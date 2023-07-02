import { Avatar, Grid, GridItem } from "@chakra-ui/react";
import PlayerHand from "./PlayerHand";
import Username from "./Username";

interface Props {
  username: string | undefined;
  avatar_url: string | undefined;
  isCurrentUser: boolean;
}

export default function Player(props: Props) {
  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      alignItems="center"
      gap="2"
      width="100%"
    >
      <GridItem colSpan={1}>
        <Avatar src={props.avatar_url} name="Avatar usuario" size="lg" />
      </GridItem>
      <GridItem colSpan={4}>
        <Username username={props.username} />
      </GridItem>
      <GridItem colSpan={5}>
        <PlayerHand
          username={props.username}
          isCurrentUser={props.isCurrentUser}
        />
      </GridItem>
    </Grid>
  );
}
