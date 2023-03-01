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
      <SubmitButton text="Ingresar" />
    </Form>
  );
}
