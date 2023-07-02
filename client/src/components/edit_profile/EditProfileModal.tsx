import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import EditProfileForm from "./EditProfileForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function EditProfileModal(props: Props) {
  const handleSubmit = () => {

  }
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editá tu perfil de usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <EditProfileForm onClose={props.onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
