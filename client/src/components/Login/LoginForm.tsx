import { useState } from "react";
import Form from "../common/Form";
import InputText from "../common/InputText";
import SubmitButton from "../common/SubmitButton";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("password", password);
    console.log("password", username);
  };

  return (
    <Form submitHandler={handleLogin}>
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
      <SubmitButton text="Ingresar" />
    </Form>
  );
}
