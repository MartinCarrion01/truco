import { Button, Flex, Heading, Image } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex flexDir="column" alignItems="center">
      <Image src="portada.jpg" alt="portada truco" boxSize="40%" rounded="md" my="2"/>
      <Heading fontFamily={"Georgia"} fontStyle="italic">Truco Online</Heading>
      <Flex width={"40%"} flexDir="column" alignItems={"center"} mt="2">
        <Button colorScheme='green' my="2">Crear una partida</Button>
        <Button colorScheme='green' my="2">Unirse a una partida</Button>
      </Flex>
    </Flex>
  );
}
