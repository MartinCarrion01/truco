import { Box, Image } from "@chakra-ui/react";

export default function EmptyCard() {
    return (
      <Box h="90px" w="60px">
        <Image src={'/cartas/r0.png'} fit="fill"/>
      </Box>
    );
  }