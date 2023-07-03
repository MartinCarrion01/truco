import { Flex } from "@chakra-ui/react";
import PlayerContainer from "./PlayerContainer";

interface Props {
  positions: number[];
}

export default function PlayersContainer(props: Props) {
  return (
    <Flex width="100%" justifyContent="space-around">
      {props.positions.map((position) => (
        <PlayerContainer key={position} position={position} />
      ))}
    </Flex>
  );
}
