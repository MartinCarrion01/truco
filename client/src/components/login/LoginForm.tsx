import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/userService";
import AlertMessage from "../common/AlertMessage";
import Form from "../common/Form";
import InputText from "../common/InputText";
import SubmitButton from "../common/SubmitButton";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(username, password);
      navigate("/")
    } catch (error: any) {
      setErrorMessage(JSON.stringify(error.response.data.message));
      setLoading(false);
    }
  };

  return (
    <Form submitHandler={handleLogin}>
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
      <InputText
        value={password}
        setValue={setPassword}
        password={true}
        label="Contraseña"
        name="password"
      />
      <SubmitButton text="Ingresar" disabled={loading} />
    </Form>
  );
}
