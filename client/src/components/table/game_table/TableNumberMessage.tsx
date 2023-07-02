import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface Props{
  number: number
  game_type: string
}

export default function TableNumberMessage(props: Props){
  return (
    <Flex bgColor="gray.300" borderRadius="md "flexDirection={"column"} alignItems={"center"} p="5" gap={4}>
      <Text fontSize="xl">El numero de esta mesa es:</Text>
      <Heading size="3xl">{props.number}</Heading>
      <Text fontSize="xl">Pasale este numero a un amigo para que se una a la mesa para jugar</Text>
    </Flex>
  );
}