import { Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import {
  register,
  setUser,
  update,
  uploadImage,
  User,
} from "../../services/userService";
import AlertMessage from "../common/AlertMessage";
import Form from "../common/Form";
import InputText from "../common/InputText";
import SubmitButton from "../common/SubmitButton";
import UploadAvatarPrompt from "../common/UploadAvatarPrompt";
import { useSessionUser } from "../../store/userStore";

interface Props {
  onClose: () => void;
}

export default function EditProfileForm(props: Props) {
  const user = useSessionUser();
  const [username, setUsername] = useState<string>(user ? user.username : "");
  const [loading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<any>("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const imageSrc = () => {
    return URL.createObjectURL(avatar);
  };

  const handleSave = async () => {
    setLoading(true)
    try {
      if (imageUploaded) {
        await uploadImage(avatar);
      }
      if (username !== user?.username) {
        await update(username);
      }
      await setUser();
      props.onClose();
    } catch (error: any) {
      setErrorMessage(JSON.stringify(error.response.data.message));
      setLoading(false);
    }
    setLoading(false)
  };

  const hasAnythingChanged = () => {
    return username === user?.username && !imageUploaded;
  };

  return (
    <VStack spacing={4} align="center">
      {errorMessage ? (
        <AlertMessage status="error" description={errorMessage} />
      ) : (
        <></>
      )}
      <InputText
        value={username}
        setValue={setUsername}
        label="Nombre de usuario"
        name="username"
      />
      <Text width="100%" align="left">
        Foto de perfil:{" "}
      </Text>
      <Image
        borderRadius="full"
        boxSize="150px"
        src={imageUploaded ? imageSrc() : user?.avatar_url}
        alt="Avatar por defecto"
      />
      <UploadAvatarPrompt
        setAvatar={setAvatar}
        setImageUploaded={setImageUploaded}
      />
      <Flex p="4" width="100%" justifyContent="flex-end" gap="4">
        <Button
          colorScheme="green"
          isDisabled={hasAnythingChanged() || loading || username === ""}
          onClick={handleSave}
        >
          Guardar
        </Button>
        <Button colorScheme="gray" onClick={props.onClose}>
          Cerrar
        </Button>
      </Flex>
    </VStack>
  );
}
