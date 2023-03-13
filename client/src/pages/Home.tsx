import { Button, Flex, Heading, Image, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoinTable from "../components/home/JoinTable";
import { createTable } from "../services/tableService";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreateTable = async () => {
    setLoading(true);
    try {
      const table = await createTable();
      navigate(`/table/${table.table_number}`);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Flex flexDir="column" alignItems="center">
      <Image
        src="portada.jpg"
        alt="portada truco"
        boxSize="40%"
        rounded="md"
        my="2"
      />
      <Heading fontFamily={"Georgia"} fontStyle="italic">
        Truco Online
      </Heading>
      <Flex width={"40%"} flexDir="column" alignItems={"center"} mt="2">
        <Button
          onClick={handleCreateTable}
          colorScheme="green"
          my="2"
          isDisabled={loading}
        >
          Crear una partida
        </Button>
        <Button
          onClick={onOpen}
          colorScheme="green"
          my="2"
          isDisabled={loading}
        >
          Unirse a una partida
        </Button>
        <JoinTable isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Flex>
  );
}
