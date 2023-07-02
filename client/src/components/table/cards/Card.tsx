import { Box, Image } from "@chakra-ui/react";

interface Props {
  card_name: string;
}

export default function Card(props: Props) {
  return (
    <Box h="100%" w="70px">
      <Image src={`/cartas/${props.card_name}.png`} fit="fill" />
    </Box>
  );
}
