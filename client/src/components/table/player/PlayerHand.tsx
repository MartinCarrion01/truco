import { HStack } from "@chakra-ui/react";
import useHand from "../../../hooks/useHand";
import Card from "../cards/Card";
import PlayableCard from "../cards/PlayableCard";

interface Props {
  username: string | undefined;
  isCurrentUser: boolean;
}

export default function PlayerHand(props: Props) {
  const hand = useHand(props.username!, props.isCurrentUser);

  const renderHand = () => {
    if (props.isCurrentUser) {
      return hand.map((card, index) => (
        <PlayableCard key={index} card_name={card} />
      ));
    } else {
      return hand.map((card, index) => <Card key={index} card_name={card} />);
    }
  };

  return (
    <HStack w="100%" spacing="3">
      {hand && renderHand()}
    </HStack>
  );
}
