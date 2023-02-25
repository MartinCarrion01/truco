import { useState } from "react";
import InputText from "../common/InputText";
import SubmitButton from "../common/SubmitButton";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    console.log("password", password);
    console.log("password", username);
  };

  return (
    <form
      className="bg-gray-200 p-10 rounded-lg shadow-md w-3/4 mb-2"
      onSubmit={handleLogin}
    >
      <InputText
        placeholder="Nombre de usuario"
        value={username}
        setValue={setUsername}
      />
      <InputText
        placeholder="Contraseña"
        value={password}
        setValue={setPassword}
      />
      <SubmitButton text="Ingresar" />
    </form>
  );
}
