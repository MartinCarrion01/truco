import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamBuildingInstructions(props: Props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb="6">
          <Box h="400px" w="800px">
            <Image
              boxSize="100%"
              src={"/team_build_instruction.png"}
              alt="¿Cómo armar el equipo?"
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
