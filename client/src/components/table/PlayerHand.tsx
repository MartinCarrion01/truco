import { Box, HStack, Image } from "@chakra-ui/react";
import Card from "./Card";

export default function PlayerHand() {
  return (
    <HStack mx="3" spacing="3">
      <Card />
      <Card />
      <Card />
    </HStack>
  );
}
