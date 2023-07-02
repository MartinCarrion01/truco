import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../App";
import { createTable } from "../../services/tableService";
import { setUser } from "../../services/userService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setLoading: (loading: boolean) => void;
}

export default function ChooseGameType(props: Props) {
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);

  const handleCreateTable = async (game_type: string) => {
    props.setLoading(true);
    try {
      const table = await createTable(game_type);
      navigate(`/table/${table.table_number}`);
      await setUser();
    } catch (error: any) {
      props.setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => {
        props.onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Elegí el tipo de partida</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="3">
          <Text fontSize="lg" mb="3">
            Si queres jugar 1v1, elegí{" "}
            <Text as="span" color="blue.500">
              Solo
            </Text>
            , si queres jugar 2v2 elegí{" "}
            <Text as="span" color="blue.500">
              Parejas
            </Text>
          </Text>
          <Flex p="5" justifyContent={"space-between"}>
            <Button
              colorScheme={"green"}
              onClick={() => handleCreateTable("singles")}
            >
              Solo
            </Button>
            <Button
              colorScheme={"green"}
              onClick={() => handleCreateTable("doubles")}
            >
              Parejas
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
