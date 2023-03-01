import { FormControl, FormLabel, Image, Input, Text } from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  avatar: string;
  setAvatar: (e: any) => void;
}

export default function UploadAvatarPrompt(props: Props) {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (event: any) => {
    const files = fileInput.current?.files;
    if (!files) {
      return;
    }
    props.setAvatar(files[0]);
  };

  return (
    <FormControl>
      <FormLabel>Foto de perfil</FormLabel>
      <Input
        type="file"
        ref={fileInput}
        name="avatar"
        onChange={handleAvatarChange}
        size="md"
        pt='1'
      />
    </FormControl>
  );
}
