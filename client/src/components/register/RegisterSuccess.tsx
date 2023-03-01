import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Image,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../services/userService";
import AlertMessage from "../common/AlertMessage";
import Subheader from "../common/Subheader";
import UploadAvatarPrompt from "../common/UploadAvatarPrompt";

export default function RegisterSuccess() {
  const [showUploadPic, setShowUploadPic] = useState<boolean>(true);

  return (
    <>
      {showUploadPic ? (
        <ImageUpload setShowUploadPic={setShowUploadPic} />
      ) : (
        <SuccessAlert />
      )}
    </>
  );
}

function ImageUpload(props: any) {
  const [avatar, setAvatar] = useState<any>("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const imageSrc = () => {
    return URL.createObjectURL(avatar);
  };

  const handleSave = async () => {
    setIsUploading(true)
    try {
      await uploadImage(avatar);
      props.setShowUploadPic(false);
      axios.defaults.headers.common.Authorization = "";
    } catch (error: any) {
      setErrorMessage(JSON.stringify(error.response.data.message));
      setIsUploading(false)
    }
  };

  const handleSkip = () => {
    props.setShowUploadPic(false);
  };

  return (
    <VStack spacing={4}>
      <Subheader text="Elegí una foto de perfil" />
      {errorMessage ? (
        <AlertMessage status="error" description={errorMessage} />
      ) : (
        <></>
      )}
      <Image
        borderRadius="full"
        boxSize="150px"
        src={imageUploaded ? imageSrc() : "default_avatar.png"}
        alt="Avatar por defecto"
      />
      <UploadAvatarPrompt
        setAvatar={setAvatar}
        setImageUploaded={setImageUploaded}
      />
      <Flex justify="space-between" width="full">
        <Button
          onClick={handleSave}
          colorScheme="green"
          mr={2}
          isDisabled={!imageUploaded || isUploading}
        >
          Guardar
        </Button>
        <Button onClick={handleSkip} variant="ghost" colorScheme="gray" isDisabled={isUploading}>
          Omitir
        </Button>
      </Flex>
    </VStack>
  );
}

function SuccessAlert() {
  const navigate = useNavigate();

  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        ¡Se ha registrado correctamente!
      </AlertTitle>
      <Button colorScheme={"teal"} my={2} onClick={() => navigate('/login')}>
        Volver a iniciar sesión
      </Button>
    </Alert>
  );
}
