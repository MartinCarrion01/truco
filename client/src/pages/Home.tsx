import { Button, Flex, Heading, Image, useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JoinTable from "../components/home/JoinTable";
import { createTable } from "../services/tableService";
import ChooseGameType from "../components/home/ChooseGameType";
import { useSessionUser } from "../store/userStore";
import { getTableByCurrentUser } from "../services/userService";
import { setCurrentTable } from "../store/tableStore";

export default function Home() {
  const user = useSessionUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();
  const {
    isOpen: isOpenJoin,
    onOpen: onOpenJoin,
    onClose: onCloseJoin,
  } = useDisclosure();

  const getCurrentTable = useCallback(async () => {
    if (user?.is_playing) {
      const table = await getTableByCurrentUser();
      if (table) {
        setCurrentTable(table);
        navigate(`/table/${table.table_number}`);
      }
    }
  }, [navigate, user?.is_playing]);

  useEffect(() => {
    getCurrentTable();
  }, [getCurrentTable]);

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
          onClick={onOpenCreate}
          colorScheme="green"
          my="2"
          isDisabled={loading}
        >
          Crear una mesa
        </Button>
        <ChooseGameType
          setLoading={setLoading}
          isOpen={isOpenCreate}
          onClose={onCloseCreate}
        />
        <Button
          onClick={onOpenJoin}
          colorScheme="green"
          my="2"
          isDisabled={loading}
        >
          Unirse a una mesa
        </Button>
        <JoinTable isOpen={isOpenJoin} onClose={onCloseJoin} />
      </Flex>
    </Flex>
  );
}
