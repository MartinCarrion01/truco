import { useState } from "react";
import Form from "../common/Form";
import InputText from "../common/InputText";
import SubmitButton from "../common/SubmitButton";
import UploadAvatarPrompt from "../common/UploadAvatarPrompt";

export default function RegisterForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {};

  return (
    <Form submitHandler={handleRegister}>
      <InputText
        value={username}
        setValue={setUsername}
        label="Nombre de usuario"
        name="username"
      />
      <InputText
        value={password}
        setValue={setPassword}
        password={true}
        label="Contraseña"
        name="password"
      />
      <InputText
        label={"Confirmar contraseña"}
        name="passwordConfirmation"
        value={passwordConfirmation}
        setValue={setPasswordConfirmation}
        password={true}
      />
      <UploadAvatarPrompt avatar={avatar} setAvatar={setAvatar}/>
      <SubmitButton text="Crear cuenta" />
    </Form>
  );
}
