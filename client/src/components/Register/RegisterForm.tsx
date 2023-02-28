import { useState } from "react";
import Form from "../common/Form";
import InputText from "../common/InputText";
import SubmitButton from "../common/SubmitButton";
import UploadAvatarPrompt from "./UploadAvatarPrompt";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleLogin = () => {};

  return (
    <Form submitHandler={handleLogin} disableAutoComplete={true}>
      <InputText
        placeholder="Nombre de usuario"
        value={username}
        setValue={setUsername}
      />
      <InputText
        placeholder="Contraseña"
        value={password}
        setValue={setPassword}
        password={true}
      />
      <UploadAvatarPrompt avatar={avatar} setAvatar={setAvatar} />
      <SubmitButton text="Ingresar" />
    </Form>
  );
}
