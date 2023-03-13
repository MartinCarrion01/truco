import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinTable } from "../../services/tableService";
import Form from "../common/Form";
import InputText from "../common/InputText";
import SubmitButton from "../common/SubmitButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const numberRegex = /([0-9]{6})+/;

export default function JoinTable(props: Props) {
  const [tableNumber, setTableNumber] = useState("");
  const navigate = useNavigate();
  const handleJoinTable = async () => {
    try {
      const table = await joinTable(tableNumber);
      props.onClose();
      navigate(`/table/${table.table_number}`);
    } catch (error: any) {
      console.log(error)
    }
  };
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => {
        setTableNumber("");
        props.onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Unirse a una partida de truco</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="3">
          <Text fontSize="md" mb="3">
            Para unirte a una partida, escribí el numero (de 6 dígitos) de la
            partida a la que deseas unirte
          </Text>
          <Form submitHandler={handleJoinTable}>
            <InputText
              label="Numero de la partida"
              name="table_number"
              value={tableNumber}
              setValue={setTableNumber}
            />
            <Button
              colorScheme={"green"}
              type="submit"
              isDisabled={
                tableNumber.length !== 6 || !numberRegex.test(tableNumber)
              }
            >
              Unirse
            </Button>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
