import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

interface Props {
  avatar: any;
  setAvatar: (e: any) => void;
}

export default function UploadAvatarPrompt(props: Props) {
  const handleAvatarChange = (event: any) => {
    props.setAvatar(event.target.files[0]);
  };

  return (
    <FormControl>
      <FormLabel>Foto de perfil</FormLabel>
      <Input
        type="file"
        name="avatar"
        value={props.avatar}
        onChange={handleAvatarChange}
        size="md"
      />
    </FormControl>
  );
}
