import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getHand, myHand } from "../../../services/tableService";
import { useCurrentTable } from "../../../store/tableStore";
import PlayableCard from "../cards/PlayableCard";
import useHand from "../../../hooks/useHand";
import Card from "../cards/Card";

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
    <HStack w='100%' spacing="3">
      {hand && renderHand()}
    </HStack>
  );
}
